import React from "react";
import { PropTypes } from "prop-types";

class RegisterInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
        }

        this.onNameChangeEventHandler = this.onNameChangeEventHandler.bind(this);

        this.onEmailChangeEventHandler = this.onEmailChangeEventHandler.bind(this);

        this.onPasswordChangeEventHandler = this.onPasswordChangeEventHandler.bind(this);

        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onNameChangeEventHandler(event) {
        this.setState(() => {
            return {
                name: event.target.value
            }
        })
    }



    onEmailChangeEventHandler(event) {
        this.setState(() => {
            return {
                email: event.target.value
            }
        })
    }


    onPasswordChangeEventHandler(event) {
        this.setState(() => {
            return {
                password: event.target.value
            }
        })
    }


    onSubmitEventHandler(event) {
        event.preventDefault();
        this.props.register(this.state);
        this.setState(() => {
            return {
                name: '',
                email: '',
                password: '',
            }
        })
    }
    render() {
        return (
            <div className='register-input'>
                <h2>Register</h2>
                <form onSubmit={this.onSubmitEventHandler}>
                    <input required className='register-input__name' type="text" placeholder="Masukkan nama..." value={this.state.name} onChange={this.onNameChangeEventHandler} />
                    <input required className='register-input__email' type="email" placeholder="Masukkan email..." value={this.state.email} onChange={this.onEmailChangeEventHandler} />
                    <input required className='register-input__password' type="password" placeholder="Masukkan password..." value={this.state.password} onChange={this.onPasswordChangeEventHandler} />
                    <button type="submit" className="register-input__button">Register</button>
                </form>
            </div>
        )
    }
}

RegisterInput.propTypes = {
    register: PropTypes.func
}

export default RegisterInput

