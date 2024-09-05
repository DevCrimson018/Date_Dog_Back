const router = require("express").Router()

const { checkIsSigned, checkIsThePerson } = require("../../middlewares/token_middlewares")
const User = require("../../models/user.model")

router.get("/", checkIsSigned, async (req, res) => {
    try {
        const users = await User.find(req.query).limit(20)
        for(let user of users) {
            user.password = "No allowed to see it Pale"
            user.email = "Not allowed to see this pale"
        }
        return res.json(users)
    } catch (error) {
        console.log(error);
    }
})

router.get("/:id", checkIsSigned, checkIsThePerson, async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        return res.json(user)
    } catch (error) {
        console.log(error);
    }
})

router.put("/:id", checkIsSigned, checkIsThePerson, async (req, res) => {
    try {
        const {id} = req.params

        const updatedUser = await User.findByIdAndUpdate(id, user, {new: true})

        return res.json(updatedUser)
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

module.exports = router