const express = require('express')
const mongoose = require('mongoose')
const app = express()
const multer  = require('multer')
const cors = require('cors')

app.use(cors())

// Monggose
const dbURL = 'mongodb://localhost:27017/artme'
mongoose.connect(dbURL,(err)=>{
  if(!err){
    console.log(`Connected to database`)
  }
});

// Routes
const Login = require('./routes/login.routes')
const Home = require('./routes/home.routes')

// App use
app.use('/login',Login)
app.use('/home',Home)

app.listen(3000,()=>{console.log(`Welcome Abroad`)})