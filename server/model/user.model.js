const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
    username: String,
    email:{
        type:String,
        required: {
            type: true,
            message: 'Email is required',
            name: 'emailValidation',
            path: 'email'
        },
        unique: [true,'Email has already taken'],
        trim: true,
        validate: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: String,
    post:[{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    avatar:String,
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    follower: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    like:[{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    view:[{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
})

const User = mongoose.model('User',userSchema)
module.exports = User