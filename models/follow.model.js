const {model, Schema} = require("mongoose")

const followSchema = new Schema({
    followerId: {type: String, required: true},
    followerFirstName: {type: String, required: true},
    followerLastName: {type: String, required: true},
    followerImgUrl: {type: String, required: true},

    followedId: {type: String, required: true},
    followedFirstName: {type: String, required: true},
    followedLastName: {type: String, required: true},
    followedImgUrl: {type: String, required: true}
})

module.exports = model("follow", followSchema)