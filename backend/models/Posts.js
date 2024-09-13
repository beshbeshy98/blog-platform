const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    publishDate : {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    tags: [{
        type: String,
    }]
}, { timestamps: true });

const Post = mongoose.model('BlogPost', PostsSchema);

module.exports = Post;