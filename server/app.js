const express = require('express')
const app = express()
const multer = require('multer')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
app.use(cors())

// Public
app.use(express.json())
app.use(express.static('public'))

// Body-Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false,
}))
// Monggose
const dbURL = 'mongodb://andrew:12345@cluster0-shard-00-00-nrxtg.mongodb.net:27017,cluster0-shard-00-01-nrxtg.mongodb.net:27017,cluster0-shard-00-02-nrxtg.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'

mongoose.connect(dbURL, (err) => {
  if (!err) {
    console.log(`Connected to database`)
  }
});




// Routes
const Login = require('./routes/login.routes')
const Home = require('./routes/home.routes')

// App use

app.use('/login',Login)
app.use('/home',Home)


app.listen(80, () => {
  console.log(`Welcome Abroad`)
})