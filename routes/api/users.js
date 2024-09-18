const router = require("express").Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const { checkIsSigned, checkIsThePerson } = require("../../middlewares/token_middlewares")
const User = require("../../models/user.model")

router.get("/", checkIsSigned, async (req, res) => {
    try {
        const {search} = req.query

        let filter = {}

        if(search) {
            filter = {$or: [
                {firstName: {$regex: search, $options: 'i'}},
                {lastName: {$regex: search, $options: 'i'}}
            ]}
        }


        const users = await User.find(filter).limit(20)
        for(let user of users) {
            user.password = "No allowed to see it Pale"
            user.email = "Not allowed to see this pale"
        }
        return res.json(users)
    } catch (error) {
        console.log(error);
    }
})

router.get("/:id", checkIsSigned, async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        user.password = "No allowed to see this brah"
        return res.json(user)
    } catch (error) {
        console.log(error);
    }
})

router.put("/:id", checkIsSigned, checkIsThePerson, async (req, res) => {
    try {
        const {id} = req.params

        console.log("Updating");
        
        if(req.body.password) {
            console.log("Hay password");
            
            await User.findById(id).then(async user => {
                if (await bcrypt.compare(req.body.oldPassword, user.password)) {
                    const password = await bcrypt.hash(req.body.password,await bcrypt.genSalt()) 
                    const updatedUser = await User.findByIdAndUpdate(id, {password : password}, {new: true})
                    const token = generateToken(updatedUser)
                    return res.json({token: token})
                }else {
                    return res.json({message: "Incorrect Old Password"})
                }
            })
        }else{
            console.log("Normal Update");
            
            const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true})
            const token = generateToken(updatedUser)
            console.log(token);
            return res.json({token: token})
        }

        
        
    } catch (error) {
        console.log(error);
    }
})

router.delete("/:id", checkIsSigned, checkIsThePerson, async (req, res) => {
    try {
        const {id} = req.params
        

        await User.findByIdAndDelete(id).then(() => {
            return res.json({message: "Deleted"})
        })

    } catch (error) {
        console.log(error);
    }
})

function generateToken(user) {
    const payload = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        imgUrl: user.imgUrl,
        exp: Date.now() + (60 * 15) * 1000     // 15 Mins 
    }

    const token = jwt.sign(payload, process.env.SECRET)

    return token
}

module.exports = router