const router = require("express").Router()

const { checkIsSigned, checkImTheFollower } = require("../../middlewares/token_middlewares")
const Follow = require("../../models/follow.model")

router.get("/", checkIsSigned, async (req, res) => {
    try {
        const follows = await Follow.find(req.query) 
        return res.json(follows)
    } catch (error) {
        console.log(error);
    }
})

router.post("/", checkIsSigned, checkIsTheFollower, async (req, res) => {
    try {
        await Follow.create(req.body).then(() => {
            return res.json({message: "Followed"})
        })
        
    } catch (error) {
        console.log(error);
    }
})

router.delete("/", checkIsSigned, checkIsTheFollower, async (req, res) => {
    try {
        const deletedFollow = await Follow.findOneAndDelete(req.query)
        console.log(req.query );
        return res.json(deletedFollow)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router