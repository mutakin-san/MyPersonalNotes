import React, { useState } from "react";
import { PropTypes } from "prop-types";

function LoginInput({ login }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmitEventHandler(event) {
        event.preventDefault();

        setIsLoading(true);
        await login({email, password});
        setIsLoading(false);
        setEmail('');
        setPassword('');
    }

    
    return (
        <div className='login-input'>
            <h2>Login</h2>
            <form onSubmit={onSubmitEventHandler}>
                <input required className='login-input__email' type="email" placeholder="Masukkan email..." value={email} onChange={(event) => setEmail(event.target.value)} />
                <input required className='login-input__password' type="password" placeholder="Masukkan password..." value={password} onChange={(event) => setPassword(event.target.value)} />
                <button type="submit" disabled={isLoading} className="login-input__button">{isLoading ? 'Loading...' : 'Login'}</button>
            </form>
        </div>
    )
    

}


LoginInput.propTypes = {
    login: PropTypes.func.isRequired
}

export default LoginInput