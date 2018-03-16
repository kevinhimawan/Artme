const User = require('../model/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

module.exports = {
    createUser(req,res){
        const {username,email,password} = req.body
        User.findOne({'email':email})
        .exec()
        .then(userData=>{
            if(userData){
                res.status(409).json({
                    message: 'Username has already been used'
                })
            }else{
                const hash = bcrypt.hashSync(password, salt);
                const newUser = new User({
                    username,email,password:hash
                })
                newUser.save((err,success)=>{
                    if(!err){
                        const token = jwt.sign({id: success._id,email: success.email,username: success.username},'secret')
                        res.status(200).json(token)
                    }
                })
            }
        })  
    },

    loginUser(req,res){
      if(req.body.access_token) {
        FB.api("me", { fields: ["id", "email"], access_token: req.body.access_token },
          function(data) {
            if (!data.error) {
              let newUser = new User({
                email: data.email
              });
              User.findOne({ email: data.email })
                .exec()
                .then(user => {
                  if (user) {
                    res.status(201).json({
                      message: "Signin success!",
                      id: user._id,
                      token: jwt.sign({ id: user._id }, req.body.access_token)
                    });
                  } else {
                    newUser.save((err, user) => {
                      if (err) return res.status(500).json({ message: err });
                      return res.status(201).json({
                        message: "New User Created from Facebook!",
                        user,
                        token: jwt.sign({ id: user._id }, req.body.access_token)
                      });
                    });
                  }
                })
                .catch(err => {
                  res.status(500).json({
                    message: err
                  })
                })
            }
          })
      } else {
        User.findOne({ email: req.body.email }, function(err, user) {
          if(err) return res.status(500).json({ message: 'Username not found' })
          let match = bcrypt.compareSync(req.body.password, user.password)
          let token
          if(match) {
            token = jwt.sign({ id: user._id }, 'secret')
            return res.status(201).json({
              message: 'Login success',
              token
            })
          } else {
            return res.status(500).json({
              message: 'Wrong Password'
            })
          }
        })
      }
    },

    deleteUser(req, res) {
      User.findOneAndRemove({ _id: req.params.id }, function(err, user) {
        if(err) return res.status(500).json({ message: err })
        return res.status(201).json({
          message: 'User deleted',
          user
        })
      })
    },

    getUser(req,res){
        User.find()
        .exec()
        .then(userData=>{
            res.status(200).send(userData)
        })
    }
}

