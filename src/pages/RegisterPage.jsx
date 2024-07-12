import React from "react";
import { register } from "../utils/network-data";
import RegisterInput from "../components/RegisterInput";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function RegisterPage() {



    const navigate = useNavigate();


    async function onRegisterHandler(user) {
        const { error } = await register(user)

        if (!error) {
            navigate('/login')
        }

    }


    return (
        <div className="register-page">
            <RegisterInput register={onRegisterHandler} />
            <p className="register-page__login">Sudah punya akun? <Link to="/login">Login</Link></p>
        </div>
    )
}

export default RegisterPage