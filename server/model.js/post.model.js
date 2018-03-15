const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: String,
    created: Date.now,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    commend:{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    file:[{
        type: Schema.Types.ObjectId,
        ref: 'File'
    }],
    like: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

const Post = mongoose.model('Post',postSchema)
module.exports = Post