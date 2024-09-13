import React from 'react';
import PostItem from './PostItem';

const PostList = ({ posts }) => {
    return(
        <div className='post-list'>
            {posts.length > 0 ? (
                posts.map(post => <PostItem key = {post._id} post = {post}/>)
            ) : (
                <p>No posts available.</p>
            )
        }
        </div>
    )
}

export default PostList;