const User = require("../model.js/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const FB = require("fb");

module.exports = {
  logIn (req, res) {
    console.log(req.body)
    FB.api("me", { fields: ["id", "email"], access_token: req.body.access_token },
      function(data) {
        console.log(data)
        console.log(data.error)
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
                  console.log('test')
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
        } else {
          
        }
      })
  },

  readAllUsers (req, res) {
    User.find(function (err, users) {
      if(err) return res.status(500).json({ message: err })
      return res.status(201).json({
        message: 'Getting all users',
        users
      })
    })
  },

  destroyUser(req, res) {
    User.findOneAndRemove({ _id: req.params.id }, function(err, user) {
      if(err) return res.status(500).json({ message: err })
      return res.status(201).json({
        message: 'User deleted',
        user
      })
    })
  }
};
