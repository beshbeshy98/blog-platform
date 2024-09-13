import axios from 'axios';
import { setAuthToken } from '../utils/setAuthToken';

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: 'USER_LOAD_REQUEST' });

        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        const { data } = await axios.get("http://localhost:5000/api/auth/user");

        dispatch({
            type: 'USER_LOADED',
            payload: data
        });
    } catch (error) {
        dispatch({
            type: 'AUTH_ERROR',
            payload: error.response?.data?.message || error.message
        });
    }
};

export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: 'REGISTER_REQUEST' });

        const config = {
            headers: { 'Content-Type': 'application/json' }
        };

        const { data } = await axios.post('http://localhost:5000/api/auth/register', userData, config);

        dispatch({
            type: 'REGISTER_SUCCESS',
            payload: data
        });

        localStorage.setItem('token', data.token);

        dispatch(loadUser());
    } catch (error) {
        dispatch({
            type: 'REGISTER_FAIL',
            payload: error.response?.data?.message || error.message
        });
    }
};

export const login = (userData) => async (dispatch) => {
    try {
        dispatch({ type: 'LOGIN_REQUEST' });

        const config = {
            headers: { 'Content-Type': 'application/json' }
        };

        const { data } = await axios.post('http://localhost:5000/api/auth/login', userData, config);

        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: data
        });

        localStorage.setItem('token', data.token);

        dispatch(loadUser());
    } catch (error) {
        dispatch({
            type: 'LOGIN_FAIL',
            payload: error.response?.data?.message || error.message
        });
    }
};

export const logout = () => (dispatch) => {
    try {
        dispatch({ type: 'LOGOUT_REQUEST' });

        localStorage.removeItem('token');

        dispatch({ type: 'LOGOUT' });
    } catch (error) {
        console.error('Error during logout', error.message || error);
    }
};
