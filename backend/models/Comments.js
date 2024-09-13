const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogPost'
    },
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentsSchema);

module.exports = Comment;