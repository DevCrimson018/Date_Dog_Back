const router = require("express").Router()

const { checkIsSigned, checkIsOwner } = require("../../middlewares/token_middlewares");
const Dog = require("../../models/dog.model")



router.get("/",  checkIsSigned, async (req, res) => {
    try {
        const dogs = await Dog.find(req.query)
        console.log(req.query);
        return res.json(dogs)
    } catch (error) {
        console.log(error);
    }
})

router.get("/:id", checkIsSigned, async (req, res) => {
    try {
        const {id} = req.params

        const dog = await Dog.findById(id)
        return res.json(dog)
    } catch (error) {
        console.log(error);
    }
})

router.post("/", checkIsSigned, checkIsOwner, async (req, res) => {
    try {
        const newDog = await Dog.create(req.body)
        return res.json(newDog)
    } catch (error) {
        console.log(error);
    }
})

router.put("/:id", checkIsSigned, checkIsOwner, async (req, res) => {
    try {
        const {id} = req.params
        await Dog.findByIdAndUpdate(id, req.body, {new : true}).then(() => {
            return res.json({message: "Done"})
        })
    } catch (error) {
        console.log();
    }
})

router.delete("/:id", checkIsSigned, checkIsOwner, async (req, res) => {
    try {
        const {id} = req.params
        await Dog.findById(id).then(() => {
            return res.json({message: "Deleted"})
        })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router