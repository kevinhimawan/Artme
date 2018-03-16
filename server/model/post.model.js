const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: String,
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comment:[{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    file:[{
        type: Schema.Types.ObjectId,
        ref: 'File'
    }],
    like: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    viewer:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    description:String
})

const Post = mongoose.model('Post',postSchema)
module.exports = Post