import axios from 'axios';

export const setAuthToken = (token) => {
    try{
        if (token) {
            axios.defaults.headers.common['x-auth-token'] = token; 
        } else {
            delete axios.defaults.headers.common['x-auth-token'];
        }
    }catch(error){
        console.error('Error setting auth token:', error);
    }

}