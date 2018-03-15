const express = require('express')
const router = express.Router()

const { createPost, editPost, showAllPost, likePost, unLikePost, deletePost, postAndCreateComment, deleteComment, getComment, getThisComment, editComment, followUser, unfollowUser, viewPost } = require('../controllers/home.controller')

// Post
router.post('/createpost', createPost)
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