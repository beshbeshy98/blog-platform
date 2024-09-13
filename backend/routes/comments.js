const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const auth = require('../middlewares/auth');

router.get('/api/posts/:postId/comments', auth, commentsController.getComments);
router.post('/api/posts/:postId/comments', auth, commentsController.addComment);
router.put('/api/comments/:id', auth, commentsController.updateComment);
router.delete('/api/comments/:id', auth, commentsController.deleteComment);

module.exports = router;
