const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const { addpost, allposts, likePost, getLikeStatusetLiked, getLikeStatus , postbyid ,getUserById, searchUsers} = require('../controllers/datacontrollers');


router.get('/user/:userId',getUserById );
router.get('/myprofile/:userId',postbyid );
router.get('/profile/:userId',postbyid );
router.get('/search-users/:query',searchUsers)


module.exports = router;