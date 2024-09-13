// reducers/postReducers.js

const initialPostDetailsState = {
    post: null,
    loading: false,
    error: null
};

export const postDetailsReducer = (state = initialPostDetailsState, action) => {
    switch(action.type){
        case 'POST_DETAIL_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'POST_DETAIL_SUCCESS':
            return {
                ...state,
                post: action.payload,
                loading: false
            };
        case 'POST_DETAIL_FAIL':
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case 'DELETE_POST_SUCCESS':
            return {
                ...state,
                post: state.post && state.post._id === action.payload ? null : state.post
            };
        default:
            return state;
    }
};

const initialCreatePostState = {
    loading: false,
    success: false,
    post: null,
    error: null
};

export const createPostReducer = (state = initialCreatePostState, action) => {
    switch (action.type){
        case 'CREATE_POST_REQUEST':
            return{...state, loading: true, success: false};
        case 'CREATE_POST_SUCCESS':
            return{...state, loading: false, success: true, post: action.payload};
        case 'CREATE_POST_FAIL' :
            return{...state, loading: false, success: false, error: action.payload};
        default:
            return state;
    };
};

const initialUpdatePostState = {
    post: null,
    error: null,
    loading: false,
    success: false
};

export const updatePostReducer = (state = initialUpdatePostState, action) => {
    switch(action.type){
        case 'UPDATE_POST_REQUEST' :
            return{...state, loading: true, success: false};
        case 'UPDATE_POST_SUCCESS' :
            return{...state, loading: false, success: true, post: action.payload};
        case 'UPDATE_POST_FAIL' :
            return{...state, loading: false, success: false, error: action.payload}
        case 'DELETE_POST_SUCCESS':
            return {
                ...state,
                post: state.post && state.post._id === action.payload ? null : state.post
            };
        default:
            return state;
    }
};
