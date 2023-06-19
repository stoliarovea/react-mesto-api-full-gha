import React from 'react';
import { Link } from "react-router-dom";

function Register(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onSingUp(email, password);
    }

    return (
        <form className="signup-signin-form" onSubmit={handleSubmit}>
            <h2 className="signup-signin-form__header">Регистрация</h2>
            <input
                className="signup-signin-form__input"
                type="text"
                value={email || ''}
                onChange={handleEmailChange}
                placeholder="Email"
                maxLength="40"
                required />
            <input
                className="signup-signin-form__input"
                type="password"
                value={password || ''}
                onChange={handlePasswordChange}
                placeholder="Пароль"
                required />
            <button className="signup-signin-form__submit-button" type="submit">Зарегистрироваться</button>
            <p className="signup-signin-form__sign">Уже зарегистрированы? 
            <Link className="signup-signin-form__link" to="/sign-in"> Войти</Link></p>
        </form>
    );
}

export default Register;