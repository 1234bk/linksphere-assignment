const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const { addpost, allposts ,getLikeStatus , likePost} = require('../controllers/datacontrollers');
const upload = require('../middleware/upload'); // Import multer middleware


console.log("✅ dataroutes loaded"); 



router.post('/addpost', upload.single('image'), addpost);
router.get('/allposts', allposts);
// router.get('/likestatus/:postId', authenticateToken, getLikeStatus);
// router.post('/like/:postId', authenticateToken, likePost);
 // Get posts by user ID
module.exports = router;

