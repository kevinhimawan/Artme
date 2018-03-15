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
        const {username,password} = req.body
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
    }
}