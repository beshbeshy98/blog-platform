import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = ({ post }) => {
    return (
        <div className='post-item'>
            <h2><Link to={`/posts/${post._id}`}>{post.title}</Link></h2>
            <p>By {post.author ? post.author.name : 'Unknown'} on {new Date(post.publishDate).toLocaleDateString()}</p>
            <div className='tags'>
                {post.tags.map(tag => (
                    <span className='tag' key={tag}>{tag}</span>
                ))}
            </div>
            <p>{post.content.substring(0, 150)}...</p>
            <Link to={`/posts/${post._id}`}>Read more</Link>
        </div>
    );
};


export default PostItem;