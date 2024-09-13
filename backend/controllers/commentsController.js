const Post = require('../models/Posts');
const Comment = require('../models/Comments');

exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId }).populate('author', ['username']);

        if (!comments) {
            return res.status(404).send({ msg: 'Comments not found' });
        }

        res.json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ msg: 'Server Error' });
    }
};

exports.addComment = async (req, res) => {
    const { text } = req.body;

    try {
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).send({ msg: 'Post not found' });
        }

        const newComment = new Comment({
            text,
            author: req.user.id,
            post: req.params.postId
        });

        const comment = await newComment.save();

        post.comments.push(comment.id);
        await post.save();

        res.json(comment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ msg: 'Server Error' });
    }
};

exports.updateComment = async (req, res) => {
    const { text } = req.body;

    try {
        let comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }

        if (comment.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User is not authorized' });
        }

        comment = await Comment.findByIdAndUpdate(req.params.id, { $set: { text } }, { new: true });

        res.json(comment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }

        if (comment.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User is not authorized' });
        }

        await comment.remove();

        res.json({ msg: 'Comment Deleted!' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
