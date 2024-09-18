const router = require("express").Router()

const { checkIsSigned, checkIsOwner } = require("../../middlewares/token_middlewares");
const Dog = require("../../models/dog.model")



router.get("/",  checkIsSigned, async (req, res) => {
    try {

        const {idOwner, name, breed, sex, locality, municipality, province} = req.query
        let filter = {}

        if(idOwner) {
            filter.idOwner = idOwner
        }

        if(name) {
            console.log("Checking NAME");
            
            filter.name = {$regex : name, $options: 'i'}
        }

        if(sex) {
            console.log("Checking SEX" + sex);
            
            filter.sex = sex

        }
        if (breed) {
            console.log("Checking BREED" + breed);

            filter.breed = breed
        }

        if(locality) {
            let newAttribute = "address.locality"
            filter[newAttribute] = locality
        }
        if(municipality) {
            let newAttribute = "address.municipality"
            filter[newAttribute] = municipality
        }
        if(province) {
            let newAttribute = "address.province"
            filter[newAttribute] = province
        }

        console.log(filter);
        

        

        const dogs = await Dog.find(filter)

        return res.json(dogs)


        //With Filter
        // if(req.query.name != undefined){
        //     if(req.query.name == '') {
        //         const dogs = await Dog.find()
        //         console.log("Estos son los perros: "+ dogs);
                
        //         return res.json(dogs)
        //     }else{
        //         const dogs = await Dog.find({
        //             name: {$regex: req.query.name, $options: 'i'}
        //         })
        //         console.log(req.query.name);
        //         return res.json(dogs)
        //     }
        // }else{
        //     const dogs = await Dog.find(req.query)
        //     console.log(req.query);
        //     return res.json(dogs)
        // }
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
        console.log(req.body);
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
        console.log(error);
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