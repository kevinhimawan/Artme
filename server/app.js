const express = require('express')
const app = express()
const multer = require('multer')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
app.use(cors())

// Public
app.use(express.static('public'))

// Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))
// Monggose
const dbURL = 'mongodb://localhost/artme'

mongoose.connect(dbURL, (err) => {
  if (!err) {
    console.log(`Connected to database`)
  }
});


// Routes
const Login = require('./routes/login.routes')
const Home = require('./routes/home.routes')

// App use
app.use('/login', Login)
app.use('/home', Home)

app.listen(3000, () => {
  console.log(`Welcome Abroad`)
})