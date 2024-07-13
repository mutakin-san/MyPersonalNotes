import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { useTranslation } from "react-i18next";
import { useInput } from "../utils/customHooks";

function LoginInput({ login }) {

    const [email, setEmail] = useInput('');
    const [password, setPassword] = useInput('');
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

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
            <h2>{t('login')}</h2>
            <form onSubmit={onSubmitEventHandler}>
                <input required className='login-input__email' type="email" placeholder={t('emailPlaceholder')} value={email} onChange={(event) => setEmail(event.target.value)} />
                <input required className='login-input__password' type="password" placeholder={t('passwordPlaceholder')} value={password} onChange={(event) => setPassword(event.target.value)} />
                <button type="submit" disabled={isLoading} className="login-input__button">{isLoading ? 'Loading...' : t('login')}</button>
            </form>
        </div>
    )
    

}


LoginInput.propTypes = {
    login: PropTypes.func.isRequired
}

export default LoginInput