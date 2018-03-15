const Category = require('../model/category.model')
const User = require('../model/user.model')

module.exports = {
    createCategory(req,res){
        User.findOne({'_id': req.body.userid})
        .exec()
        .then(userData=>{
            if(userData.username === 'admin'){
                const {name} = req.body
                const newCategory = new Category({
                    name
                })
                newCategory.save((err,categoryData)=>{
                    if(!err){res.status(200).send(categoryData)}
                    else{res.status(409).send(`This category has already existed`)}
                })   
            }else{
                res.status(409).json({
                    message: `You dont have access to this function`
                })
            }
        })
    },
    getCategory(req,res){
        Category.find()
        .exec()
        .then(categoryData=>{
            res.status(200).json(categoryData)
        })
    }
}