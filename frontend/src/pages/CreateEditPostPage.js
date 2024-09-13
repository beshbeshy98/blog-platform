import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSinglePost, createPost, updatePost } from '../actions/postActions';
import Navbar from '../components/Navbar';

const CreateEditPostPage = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { post, loading, error } = useSelector((state) => state.postDetails);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');

    useEffect(() => {
        if (postId) {
            dispatch(fetchSinglePost(postId));
        }
    }, [dispatch, postId]);

    useEffect(() => {
        if (post) {
            setTitle(post.title || '');
            setContent(post.content || '');
            setTags(post.tags?.join(', ') || '');
        }
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const postTags = tags.split(',').map(tag => tag.trim());

        if (postId) {
            dispatch(updatePost({ ...post, title, content, tags: postTags }));
        } else {
            dispatch(createPost({ title, content, tags: postTags }));
        }
        navigate('/');
    };

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">Error: {error}</p>;

    return (
        <div className='create-edit-post-page'>
            <Navbar />
            <h1>{postId ? 'Edit Post' : 'Create New Post'}</h1>
            <div className='form-container'>
                <form onSubmit={handleSubmit} className='create-edit-post-form'>
                    <div className='form-group'>
                        <label>
                            Title:
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label>
                            Content:
                            <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label>
                            Tags (comma-separated):
                            <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
                        </label>
                    </div>
                    <button type="submit" className='create-post-button'>
                        {postId ? 'Update Post' : 'Create Post'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateEditPostPage;
