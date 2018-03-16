const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        unique: [true,`This category name has already existed`],  
    },
    post:[{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
})

const Category = mongoose.model('Category',categorySchema)
module.exports = Category