const router = require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const User = require("../../models/user.model")

router.post("/signup", async (req, res) => {
    try {
        const user = req.body
        const salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(user.password, salt)

        const newUser = await User.create(user)
        return res.json({token: generateToken(newUser)})
    } catch (error) {
        console.log(error);
    }
})

router.post("/signin", async (req, res) => {
    try {
        const user = await User.find({email: req.body.email})

        if(user.length == 0) {
            return res.json({message: "No user with this email"})
        }

        if(await bcrypt.compare(req.body.password, user[0].password)){
            return res.json({token: generateToken(user[0])})
        }else{
            return res.json({message: "Password Incorrect"})
        }
    } catch (error) {
        console.log(error);
    }
})


function generateToken(user) {
    const payload = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        exp: Date.now() + (60 * 15) * 1000     // 15 Mins 
    }

    const token = jwt.sign(payload, process.env.SECRET)

    return token
}
module.exports = router