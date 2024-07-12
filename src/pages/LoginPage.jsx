import React from "react";
import { login } from "../utils/network-data";
import LoginInput from "../components/LoginInput";
import { Link } from "react-router-dom";

function LoginPage({ onLoginSuccess }) {
    async function onLoginHandler({ email, password }) {
        const { error, data } = await login({ email, password });
        if (!error) {
            onLoginSuccess(data);
        }
    }
    
    return (
        <div className="login-page">
            <LoginInput loginHandler={onLoginHandler} />
            <p className="login-page__register">Belum punya akun? <Link to="/register">Register</Link></p>
        </div>
    );
}

export default LoginPage