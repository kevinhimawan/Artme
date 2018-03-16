const express = require('express')
const mongoose = require('mongoose')
const app = express()
const multer  = require('multer')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
const Signup = require('./routes/signup.routes')

// App use
app.use('/login',Login)
app.use('/home',Home)
app.use('/signup',Signup)

app.listen(3000,()=>{console.log(`Welcome Abroad`)})