const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


//Check the user is signed and have a valid token
const checkIsSigned = (req, res, next) => {
    const token = req.headers.authorization

    if(token) {
        console.log("Is Signed");
        
        return next()
    }else {
        return res.json({message: "No Signed"})
    }
}


//Check the user is the owner of the dog
const checkIsOwner = (req, res, next) => {
    const token = req.headers.authorization

    const payload = jwt.verify(token, process.env.SECRET)

    if(req.body.idOwner == payload._id){
        return next()
    }else{
        return res.json({message: "No Owner"})
    }
}


//Check the person trying to do an update on a user is same user
const checkIsThePerson = (req, res, next) => {
    const token = req.headers.authorization
    
    const payload = jwt.verify(token, process.env.SECRET)

    console.log(payload);
    console.log(req.body);
    
    

    if(req.body._id == payload._id) {
        return next()
    }else{
        console.log("Bobo mio");
        
        return res.json({message: "No The Same Person"})
    }
}


const checkIsTheFollower = (req, res, next) => {
    const token = req.headers.authorization

    const payload = jwt.verify(token, process.env.SECRET)

    let followerId = ""

    if(req.query.followerId){
        followerId = req.query.followerId
        
    }else{
        followerId = req.body.followerId

    }
    
    
    
    if(payload._id == followerId) {
        return next()
    }else{
        console.log("No The Same Person");
        
        return res.json({message: "No The Same Person"})
    }
}
module.exports = {checkIsSigned, checkIsOwner, checkIsThePerson, checkIsTheFollower}
