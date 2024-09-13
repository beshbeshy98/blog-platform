const initialAuthState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loading: false,
    error: null
};
export const authReducer = (state = initialAuthState, action) => {
    switch(action.type){
        case 'USER_LOAD_REQUEST':
        case 'REGISTER_REQUEST':
        case 'LOGIN_REQUEST':
            return{
                ...state,
                loading: true,
                error: null
            };
        case 'USER_LOADED':
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                token: action.payload.token,
                error: null
            };
        case 'REGISTER_FAIL':
        case 'LOGIN_FAIL':
        case 'AUTH_ERROR':
        case 'LOGOUT':
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                token: null,
                user: null,
                error: action.payload,
            };
        default:
            return state;
    }
}