const express = require('express')
const app = express()
const multer  = require('multer')
const mongoose = require('mongoose')
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

// Testing
app.get('/',(req,res)=>{
    res.status(200).json('testing')
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