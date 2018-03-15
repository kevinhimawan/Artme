const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: String,
    post:{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
})

const Comment = mongoose.model('Comment',commentSchema)