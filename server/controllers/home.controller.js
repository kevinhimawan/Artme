const Post = require('../model/post.model')

module.exports = {
    createPost(req,res){
        const {title,user,category} = req.body
        const newPost = new Post ({
            title,user,category
        })
        newPost.save((err,newPostData)=>{
            if(!err){res.status(200).json(newPostData)}
            else{res.status(409).json(err)}
        })
    },
    showAllPost(req,res){
        Post.find()
        .exec()
        .then(postsData=>{
            res.status(200).json(postsData)
        })
    }
}