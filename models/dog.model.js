const {model, Schema} = require("mongoose")

const dogSchema = new Schema({
    idOwner: {type: String, required: true},
    name: {type: String, required: true},
    dob: {type: Date, required: true},
    breed: {type: String, required: true},
    sex: {type: String, required: true},
    vaccinePhotos: [
        {
            photoId: {type: String, required: false},
            imgUrl: {type: String, required: false}
        }
    ],
    photos: [
        {
            photoId: {type: String, required: false},
            imgUrl: {type: String, required: false}
        }
    ],
    horny: {type: Boolean, default: false},
    address: {
        city: {type: String, required: false},
        province: {type: String, required: false},
        country: {type: String, required: false}
    },
    dateCreated: {type: Date, required: false}
})

module.exports = model("dog", dogSchema)