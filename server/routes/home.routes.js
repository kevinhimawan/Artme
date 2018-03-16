const express = require('express')
const router = express.Router()
const multer  = require('multer')

const { createPost, editPost, showAllPost, likePost, unLikePost, deletePost, postAndCreateComment, deleteComment, getComment, getThisComment, editComment, followUser, unfollowUser, viewPost } = require('../controllers/home.controller')

// Multer
const uploadDisk = multer({
    storage : multer.diskStorage({
        destination: (req,file,cb)=>{
        cb(null,'./assets/user_photo_asset')
        },
        filename:(req,file,cb)=>{
        cb(null,`${Date.now()}.${file.originalname.split('.').pop()}`)
        }
    })
})

// Post
router.post('/createpost', uploadDisk.array('image', 12), createPost)
router.post('/editpost', editPost)
router.get('/', showAllPost)
router.post('/like', likePost)
router.post('/unlike', unLikePost)
router.post('/deletepost', deletePost)
router.post('/viewpost', viewPost)


// Comment
router.post('/postcomment', postAndCreateComment)
router.post('/deletecomment',deleteComment)
router.get('/getcomment', getComment)
router.post('/getthiscomment', getThisComment)
router.post('/editthiscomment', editComment)

// User Following
router.post('/follow', followUser)
router.post('/unfollow', unfollowUser)

module.exports = router