import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { useTranslation } from "react-i18next";
import { useInput } from "../utils/customHooks";

function RegisterInput({ register }) {
    const [name, setName] = useInput('');
    const [email, setEmail] = useInput('');
    const [password, setPassword] = useInput('');
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

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
            <h2>{t('register')}</h2>
            <form onSubmit={onSubmitEventHandler}>
                <input required className='register-input__name' type="text" placeholder={t('namePlaceholder')} value={name} onChange={(event) => setName(event.target.value)} />
                <input required className='register-input__email' type="email" placeholder={t('emailPlaceholder')} value={email} onChange={(event) => setEmail(event.target.value)} />
                <input required className='register-input__password' type="password" placeholder={t('passwordPlaceholder')} value={password} onChange={(event) => setPassword(event.target.value)} />
                <button type="submit" disabled={isLoading} className="register-input__button">{isLoading ? 'Loading...' : t('register')}</button>
            </form>
        </div>
    )
}

RegisterInput.propTypes = {
    register: PropTypes.func
}

export default RegisterInput

