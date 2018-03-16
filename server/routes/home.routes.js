const express = require('express')
const router = express.Router()
const multer = require('multer')
// GCS
const ImgUpload = require('../controllers/gcs')

const {
    createPost,
    editPost,
    showAllPost,
    likePost,
    unLikePost,
    deletePost,
    postAndCreateComment,
    deleteComment,
    getComment,
    getThisComment,
    editComment,
    followUser,
    unfollowUser,
    viewPost
} = require('../controllers/home.controller')

// Multer
const uploadDisk = multer({

    storage: multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024
})



// Post
router.post('/createpost', uploadDisk.array('image'), ImgUpload.sendUploadToGCS, createPost)
router.post('/editpost', editPost)
router.get('/', showAllPost)
router.post('/like', likePost)
router.post('/unlike', unLikePost)
router.post('/deletepost', deletePost)
router.post('/viewpost', viewPost)


// Comment
router.post('/postcomment', postAndCreateComment)
router.post('/deletecomment', deleteComment)
router.get('/getcomment', getComment)
router.post('/getthiscomment', getThisComment)
router.post('/editthiscomment', editComment)

// User Following
router.post('/follow', followUser)
router.post('/unfollow', unfollowUser)

module.exports = router