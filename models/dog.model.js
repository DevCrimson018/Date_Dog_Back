const {model, Schema} = require("mongoose")

const dogSchema = new Schema({
    idOwner: {type: String, required: true},
    photoOwner: {type: String, required: false},
    name: {type: String, required: true},
    dob: {type: Date, required: true},
    breed: {type: String, required: true},
    sex: {type: String, required: true},
    profilePhoto: {type: String, required: false},
    description: {type: String, required: false},
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
        locality: {type: String, required: false},
        municipality: {type: String, required: false},
        province: {type: String, required: false}
    },
    dateCreated: {type: Date, required: false}
})

module.exports = model("dog", dogSchema)