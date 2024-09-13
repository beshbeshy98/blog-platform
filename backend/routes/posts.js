const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const auth = require('../middlewares/auth');

router.get('/', auth, postsController.getAllPosts);  
router.get('/:postId', auth, postsController.getPost);
router.post('/', auth, postsController.createPost);
router.put('/:postId', auth, postsController.updatePost);
router.delete('/:postId', auth, postsController.deletePost);


module.exports = router;
