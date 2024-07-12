import React, { useState } from "react";
import { PropTypes } from "prop-types";

function RegisterInput({ register }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmitEventHandler(event) {
        event.preventDefault();
        setIsLoading(true);
        await register({name, email, password});
        setIsLoading(false);
        setName('');
        setEmail('');
        setPassword('');
    }
    
    return (
        <div className='register-input'>
            <h2>Register</h2>
            <form onSubmit={onSubmitEventHandler}>
                <input required className='register-input__name' type="text" placeholder="Masukkan nama..." value={name} onChange={(event) => setName(event.target.value)} />
                <input required className='register-input__email' type="email" placeholder="Masukkan email..." value={email} onChange={(event) => setEmail(event.target.value)} />
                <input required className='register-input__password' type="password" placeholder="Masukkan password..." value={password} onChange={(event) => setPassword(event.target.value)} />
                <button type="submit" disabled={isLoading} className="register-input__button">{isLoading ? 'Loading...' : 'Register'}</button>
            </form>
        </div>
    )
}

RegisterInput.propTypes = {
    register: PropTypes.func
}

export default RegisterInput

