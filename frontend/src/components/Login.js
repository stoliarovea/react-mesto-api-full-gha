import React from 'react';

function Login(props) {

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
        props.onSingIn(email, password);
    }

    return (
        <form className="signup-signin-form" onSubmit={handleSubmit}>
            <h2 className="signup-signin-form__header">Вход</h2>
            <input
                className="signup-signin-form__input"
                type="text"
                value={email || ''}
                onChange={handleEmailChange}
                placeholder="Email"
                required />
            <input
                className="signup-signin-form__input"
                type="password"
                value={password || ''}
                onChange={handlePasswordChange}
                placeholder="Пароль"
                required />
            <button className="signup-signin-form__submit-button" type="submit">Войти</button>
        </form>
    );
}

export default Login;