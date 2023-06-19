import logo from '../images/logo.svg';
import { Routes, Route, Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип." />
      <p className="header__email">{props.loggedIn ? props.email : ''}</p>
      <Routes>
        <Route path="/sign-in" element={<Link className="header__link" to='/sign-up' >Регистрация</Link>} />
        <Route path="/sign-up" element={<Link className="header__link" to='/sign-in' >Вход</Link>} />
        <Route path="/" element={<Link className="header__link header__link_dark" to='/sign-in' onClick={props.loggedIn ? props.onLogout : null}>Выйти</Link>} />
      </Routes>
    </header>
  );
}

export default Header;