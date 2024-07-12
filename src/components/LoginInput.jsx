import React from "react";
import { PropTypes } from "prop-types";

class LoginInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }

        this.onEmailChangeEventHandler = this.onEmailChangeEventHandler.bind(this);

        this.onPasswordChangeEventHandler = this.onPasswordChangeEventHandler.bind(this);

        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
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
        this.props.loginHandler(this.state);
        this.setState(() => {
            return {
                email: '',
                password: '',
            }
        })
    }

    render() {
        return (
            <div className='login-input'>
                <h2>Login</h2>
                <form onSubmit={this.onSubmitEventHandler}>
                    <input required className='login-input__email' type="email" placeholder="Masukkan email..." value={this.state.email} onChange={this.onEmailChangeEventHandler} />
                    <input required className='login-input__password' type="password" placeholder="Masukkan password..." value={this.state.password} onChange={this.onPasswordChangeEventHandler} />
                    <button type="submit" className="login-input__button">Login</button>
                </form>
            </div>
        )
    }

}


LoginInput.propTypes = {
    loginHandler: PropTypes.func.isRequired
}

export default LoginInput