const Post = require('../model/post.model')
const Comment = require('../model/comment.model')
const User = require('../model/user.model')

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

    editPost(req,res){
        
    },

    showAllPost(req,res){
        Post.find()
        .populate('comment')
        .exec()
        .then(postsData=>{
            res.status(200).json(postsData)
        })
    },

    likePost(req,res){
        const { user,post } = req.body
        Post.update({'_id': post},
            {'$push': {like: user}},
        function (err,result){
            if(!err){
                User.update({'_id': user},
                {'$push': {like: post}},
                function (err,result){
                    if(!err){res.status(200).json(result)}
                    else{
                        res.status(409).json({message: `Like function is fail`})
                    }
                })
            }
            else{res.status(409).json({message: `Like function is fail`})}
        })
    },

    unLikePost(req,res){
        const { user,post } = req.body
        Post.update({'_id': post},
            {'$pull': {like: user}},
        function (err,result){
            if(!err){
                User.update({'_id': user},
                    {'$pull': {like: post}},
                function(err,data){
                    if(!err){res.status(200).json(result)}
                    else{res.status(409).json({message: `Unlike function is fail`})}
                })
            }
            else{res.status(409).json({message: `Like function is fail`})}
        })
    },

    deletePost(req,res){
        Post.deleteOne({"_id": req.body.postid})
        .then(deleted=>{
            res.status(200).json(deleted)
        })
    },

    postAndCreateComment(req,res){
        const {user,post,text} = req.body
        const newComment = new Comment({
            user,post,text
        })
        newComment.save((err,newCommentData)=>{
            Post.update(
                {'_id': post},
                {"$push": {"comment":newCommentData._id}},
                function(err,success){
                    if(!err){res.status(200).json(success)}
                    if(err){res.status(409).json({message: 'Comment fail'})}
                }
            )
        })
    },

    deleteComment(req,res){
        const {user,comment} = req.body
        Comment.findOne({'_id': comment})
        .exec()
        .then(commentData=>{
            if(String(commentData.user) === String(user)){
                Comment.deleteOne({'_id': comment})
                .then(deleteCommentResult=>{
                    Post.findOne({'_id': commentData.post})
                    .exec()
                    .then(postData=>{
                        Post.update({'_id': commentData.post}, 
                            {$pull: { comment: comment}},
                        function (err,data) {
                            if(!err){res.status(200).json(data)}
                            else{res.status(409).json({message: 'Comment has not been deleted'})}
                            
                        });
                        
                    })
                })
            }else{
                res.status(409).json({message:'You dont have any access to delete this'})
            }
        })
        
    },

    getComment (req,res){
        Comment.find()
        .exec()
        .then(commentData=>{
            res.status(200).json(commentData)
        })
    },

    getThisComment(req,res){
        const {comment, user} = req.body
        Comment.findOne({'_id': comment})
        .exec()
        .then(commentData=>{
            if(String(commentData.user === String(user))){
                res.status(200).json(commentData)
            }else{
                res.status(409).json({message: `You dont have any access to get this`})
            }
        })
    },

    editComment(req,res){
        const {comment, text} = req.body
        Comment.update({'_id': comment},
            {text: text},
        function(err,updateResult){
                if(!err){res.status(200).json({message:`Message update successfully`})}
                else{res.status(409).json({message: `Message edit failed`})}
            }
        )
    },

    followUser(req,res){
        const {userfollow, userfollowed} = req.body
        // Following update
        User.update({'_id': userfollow},
        {'$push':{following: userfollowed}},
        function(err,result){
            if(!err){
                // Followed Update
                User.update({'_id': userfollowed},
                {'$push': {follower: userfollow}},
                function(err,result){
                    if(!err){res.status(200).json({message: `Following success`})}
                    else{res.status(409).json({message: `Follower error`})}
                })
            }else{
                res.status(409).json({message: `Following error`})
            }
        })
    },

    unfollowUser(req,res){
        const {userunfollow, userunfollowed} = req.body
        // Following update
        User.update({'_id': userunfollow},
        {'$pull':{following: userunfollowed}},
        function(err,result){
            if(!err){
                // Followed Update
                User.update({'_id': userunfollowed},
                {'$pull': {follower: userunfollow}},
                function(err,result){
                    if(!err){res.status(200).json({message: `Unfollowing success`})}
                    else{res.status(409).json({message: `Unfollower error`})}
                })
            }else{
                res.status(409).json({message: `Unfollowing error`})
            }
        })
    },

    viewPost(req,res){
        const{user,post} = req.body
        User.findOne({'_id':user})
        .exec()
        .then(userData=>{
            const index = userData.view.indexOf(post)
            if(index === -1){
                User.update({'_id': user},
                    {'$push':{view: post}},
                function(err,result){
                    if(!err){
                        Post.findOne({'_id': post})
                        .exec()
                        .then(postData=>{
                            const indexPost = postData.viewer.indexOf(user)
                            if(indexPost === -1){
                                Post.update({'_id': post},
                                    {"$push": {viewer: user}},
                                function(err,result){
                                    if(!err){res.status(200).json({message: `Added view list has successfully`})}
                                    else{res.status(409).json({message: `Error to add view list in Post`})}
                                })
                            }else{
                                res.status(200).json({message: `Nothing to add in post`})
                            }
                        })
                    }else{
                        res.status(409).json({message:`Error to add view list in User`})
                    }
                })
            }else{
                res.status(200).json({message: `Nothing to add in user`})
            }
        })
    }
}