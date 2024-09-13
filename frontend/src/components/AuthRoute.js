import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    // If the user is authenticated, render the children components (the protected route)
    // Otherwise, redirect to the login page
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default AuthRoute;
