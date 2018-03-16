const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fileSchema = new Schema({
    name: String,
    path: String,
    post:{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },

})

const File = mongoose.model('File',fileSchema)
module.exports = File