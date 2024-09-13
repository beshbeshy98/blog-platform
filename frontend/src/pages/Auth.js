import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, login } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const { username, email, password } = registerData;
    const { email: loginEmail, password: loginPassword } = loginData;

    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const loading = useSelector(state => state.auth.loading); 
    const error = useSelector(state => state.auth.error); 
    const navigate = useNavigate();

    const onChangeRegister = e => setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    const onChangeLogin = e => setLoginData({ ...loginData, [e.target.name]: e.target.value });

    const onSubmitRegister = e => {
        e.preventDefault();
        dispatch(register({ username, email, password }));
    };

    const onSubmitLogin = e => {
        e.preventDefault();
        dispatch(login({ email: loginEmail, password: loginPassword }));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={onSubmitRegister}>
                <input type="text" name="username" value={username} onChange={onChangeRegister} placeholder="Username" />
                <input type="email" name="email" value={email} onChange={onChangeRegister} placeholder="Email" />
                <input type="password" name="password" value={password} onChange={onChangeRegister} placeholder="Password" />
                <button type="submit" disabled={loading}>Register</button>
            </form>

            {error && <p>{error}</p>}

            <h1>Login</h1>
            <form onSubmit={onSubmitLogin}>
                <input type="email" name="email" value={loginEmail} onChange={onChangeLogin} placeholder="Email" />
                <input type="password" name="password" value={loginPassword} onChange={onChangeLogin} placeholder="Password" />
                <button type="submit" disabled={loading}>Login</button>
            </form>

            {error && <p>{error}</p>}
        </div>
    );
};

export default Auth;
