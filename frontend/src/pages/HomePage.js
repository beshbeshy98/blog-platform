import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import Navbar from '../components/Navbar';
import PostList from '../components/PostList';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const dispatch = useDispatch();
    const { posts, loading, error } = useSelector((state) => state.posts);
        
    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const tags = posts.length > 0 ? [...new Set(posts.flatMap(post => post.tags || []))] : [];

    return (
        <div className='home-page'>
            <Navbar tags={tags} />

            <div className='hero-section'>
                <h1>Welcome to the Blog</h1>
                <p>Explore our latest posts and stay updated.</p>
            </div>

            <div className='create-post-button-container'>
                <Link to="/create" className="create-post-button">
                    Create New Post
                </Link>
            </div>

            {loading ? (
                <p className="loading">Page is loading...</p>
            ) : error ? (
                <p className="error">Error: {error}</p>
            ) : (
                <div className='post-list-container'>
                    <PostList posts={posts} />
                </div>
            )}

        </div>
    );
};

export default HomePage;
