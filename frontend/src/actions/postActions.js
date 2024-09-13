import axios from 'axios';

export const fetchPosts = () => async (dispatch) => {
    try{
        dispatch({ type: 'FETCH_POSTS_REQUEST' });

        const { data } = await axios.get('http://localhost:5000/api/posts');

        dispatch({ 
            type: 'FETCH_POSTS_SUCCESS',
            payload: data
        });
    }catch(error){
        dispatch({
            type: 'FETCH_POSTS_FAIL',
            payload: error.response?.data?.message || error.message
        });
    }
};

export const fetchSinglePost = (postId) => async (dispatch) => {
    try{
        dispatch({ type: 'POST_DETAIL_REQUEST' });

        const { data } = await axios.get(`http://localhost:5000/api/posts/${postId}`);

        dispatch ({ 
            type : 'POST_DETAIL_SUCCESS',
            payload: data
        });
    }catch(error){
        dispatch ({
            type: 'POST_DETAIL_FAIL',
            payload: error.response?.data?.message || error.message
        });
    }
};

export const createPost = (postData) => async (dispatch) => {
    try{
        dispatch({ type: 'CREATE_POST_REQUEST' });

        const { data } = await axios.post('http://localhost:5000/api/posts', postData);

        dispatch({ 
            type: 'CREATE_POST_SUCCESS',
            payload: data
        });

    }catch(error){
        dispatch({
            type: 'CREATE_POST_FAIL',
            payload: error
        });
    }
};

export const updatePost = (postId, postData) => async (dispatch) => {
    try{
        dispatch({ type: 'UPDATE_POST_REQUEST' });
        
        const { data } = await axios.put(`http://localhost:5000/api/posts/${postId}`, postData);

        dispatch({ 
            type: 'UPDATE_POST_SUCCESS',
            payload: data
        });
    }catch(error){
        dispatch({
            type: 'UPDATE_POST_FAIL',
            payload: error
        });
    }
};
export const deletePost = (postId) => async (dispatch) => {
    try {
        dispatch({ type: 'DELETE_POST_REQUEST' });

        await axios.delete(`http://localhost:5000/api/posts/${postId}`);

        dispatch({ 
            type: 'DELETE_POST_SUCCESS',
            payload: postId
        });

    } catch (error) {
        dispatch({
            type: 'DELETE_POST_FAIL',
            payload: error.response?.data?.message || error.message
        });
    }
};