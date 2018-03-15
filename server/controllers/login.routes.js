const User = require("../model.js/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const FB = require("fb");

module.exports = {
  signIn(req, res) {
    FB.api("me", { fields: ["email"], access_token: req.body.access_token },
      function(data) {
        if (!data.error) {
          let newUser = new User({
            email: data.email
          });
        }

        User.findOne({ id_fb: data.id })
          .exec()
          .then(user => {
            if (user) {
              res.status(201).json({
                message: "Signin success!",
                id: user._id,
                token: jwt.sign({ id: user._id }, req.body.access_token)
              });
            } else {
              newUser.save(err => {
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
    )
  }
};
