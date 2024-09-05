const {model, Schema} = require("mongoose")

const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true},
    imgUrl: {type: String, required: false},
    email: {type: String, required: true},
    password: {type: String, required: true},
    facebook: {type: String, required: false},
    instagram: {type: String, required: false},
    whatsapp: {type: String, required: false},
    address: {
        city: {type: String, required: false},
        province: {type: String, required: false},
        country: {type: String, required: false}
    },
    dateCreated: {type: Date, required: false}
})

module.exports = model("user", userSchema)