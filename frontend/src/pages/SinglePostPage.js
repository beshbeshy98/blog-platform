import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import { fetchSinglePost, deletePost } from '../actions/postActions';

const SinglePostPage = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const { post, loading, error } = useSelector((state) => state.postDetails);

    useEffect(() => {
        dispatch(fetchSinglePost(postId));
    }, [dispatch, postId]);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            dispatch(deletePost(postId));
        }
    };

    if (loading) return <p>Loading post...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!post) return <p>No post available</p>;

    return (
        <div className='single-post-page'>
            <Navbar />
            <div className='post-detail'>
                <h1>{post.title}</h1>
                <p>{post.content}</p>
                <p>Published: {new Date(post.publishDate).toLocaleDateString()}</p>
                <p>Author: {post.author?.username}</p>
                <div className='tags'>
                    <p>Tags: {post.tags?.join(', ')}</p>
                </div>
                <div className="button-container">
                    <Link to={`/edit/${postId}`} className="edit-post-link">Edit Post</Link>
                    <Link to="/create" className="create-post-link">Create New Post</Link>
                    <button onClick={handleDelete} className="delete-post-button">Delete Post</button>
                </div>
                <div className='comments-sections'>
                    <h2>Comments</h2>
                    {post.comments?.length > 0 ? (
                        post.comments.map(comment => (
                            <div className='comment' key={comment._id}>
                                <p>{comment.text}</p>
                                <p>By: {comment.author?.username}</p>
                                <p>Date: {new Date(comment.date).toLocaleDateString()}</p>
                            </div>
                        ))
                    ) : (
                        <p>No comments available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SinglePostPage;
