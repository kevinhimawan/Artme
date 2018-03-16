
const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const FB = require("fb");

// module.exports = {
//   

//   readAllUsers (req, res) {
//     User.find(function (err, users) {
//       if(err) return res.status(500).json({ message: err })
//       return res.status(201).json({
//         message: 'Getting all users',
//         users
//       })
//     })
//   },

//   destroyUser(req, res) {
//     User.findOneAndRemove({ _id: req.params.id }, function(err, user) {
//       if(err) return res.status(500).json({ message: err })
//       return res.status(201).json({
//         message: 'User deleted',
//         user
//       })
//     })
//   }
// };

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
        const {username,password} = req.body
        console.log(req.body)
        User.findOne({$or:[
            {email: username},
            {username: username}
        ]})
        .exec()
        .then(userData=>{
            if(userData){
                const check = bcrypt.compareSync(password, userData.password)
                if(check){
                    const token = jwt.sign({id: userData._id,email: userData.email,username: userData.username},'secret')
                    res.status(200).json(token)
                }else{
                    res.status(409).json(`Password is incorrect`)
                }
            }else{
                res.status(409).json('User or email address is not found')
            }
        })
    },

    deleteUser(req,res){
        User.deleteMany({'username':'andrewkusuma'})
        .then(data=>{
            res.status(200).json(data)
        })
    },

    getUser(req,res){
        User.find()
        .exec()
        .then(userData=>{
            res.status(200).send(userData)
        })
    },

    LogIn (req, res) {
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
                          console.log(newUser)
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
          }
        }
      )
    }
}

