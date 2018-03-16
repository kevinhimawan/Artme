const express = require('express')
const mongoose = require('mongoose')
const app = express()
const multer  = require('multer')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
app.use(cors())

// Body-Parser
app.use(bodyParser.urlencoded({extended:false}))

// Monggose
const dbURL = 'mongodb://localhost/artme'

mongoose.connect(dbURL,(err)=>{
  if(!err){
    console.log(`Connected to database`)
  }
});

// Multer
const uploadDisk = multer({
  storage : multer.diskStorage({
    destination: (req,file,cb)=>{
      cb(null,'./image')
    },
    filename:(req,file,cb)=>{
      cb(null,`${Date.now()}.${file.originalname.split('.').pop()}`)
    }
  })
})


// app.post('/upload', uploadDisk.single('image'), function (req, res, next) {
//   console.log(req.file)
// })

app.post('/upload', uploadDisk.array('image', 12), function (req, res, next) {
  console.log(req.files)
})


// Routes
const Login = require('./routes/login.routes')
const Home = require('./routes/home.routes')
const Admin = require('./routes/admin.routes')

// App use
app.use('/login',Login)
app.use('/home',Home)
app.use('/admin',Admin)

app.listen(3000,()=>{console.log(`Welcome Abroad`)})