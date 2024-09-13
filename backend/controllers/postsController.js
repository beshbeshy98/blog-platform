const Post = require('../models/Posts');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        console.log(posts);
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ msg: 'Server error' });
    }
};

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).send({ msg: 'Post not found' });
        }

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ msg: 'Server Error' });
    }
};

exports.createPost = async (req, res) => {
    const { title, content, tags } = req.body;

    try {
        const newPost = new Post({
            title,
            content,
            tags,
        });

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ msg: 'Server Error' });
    }
};

exports.updatePost = async (req, res) => {
    const { title, content, tags } = req.body;

    try {
        let post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).send({ msg: 'Post not found' });
        }

        post = await Post.findByIdAndUpdate(req.params.postId, { $set: { title, content, tags } }, { new: true });

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ msg: 'Server Error' });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.postId);

        if (!post) {
            return res.status(404).send({ msg: 'Post not found' });
        }

        res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ msg: 'Server Error' });
    }
};
