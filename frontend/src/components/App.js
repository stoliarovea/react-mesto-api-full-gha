import '../index.css';
import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import ProtectedRouteElement from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import apiAuth from '../utils/apiAuth';
import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [registered, setRegistered] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  const navigate = useNavigate();

  function handleSignUp(email, password) {
    apiAuth.signUp(email, password).then((data) => {
      if (data) {
        setRegistered(true);
        setInfoTooltipOpen(true);
        navigate('/sign-in');
      }
    }).catch((err) => {
      setRegistered(false);
      setInfoTooltipOpen(true);
    });
  };

  function handleSignIn(email, password) {
    apiAuth.signIn(email, password).then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        setUserEmail(email);
        setLoggedIn(true);
        navigate('/');
      } else {
        setInfoTooltipOpen(true);
      }
    }).catch((err) => {
      console.log(err);
      setInfoTooltipOpen(true);
    });
  };

  function checkToken() {
    localStorage.getItem('token')
    const token = localStorage.getItem('token');
    if (token) {
      apiAuth.checkToken(token).then((data) => {
        setUserEmail(data.data.email);
        setLoggedIn(true);
        navigate('/');
      }).catch((err) => {
        console.log(err);
      });
    };
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/sign-in');
  };

  function handleUpdateAvatar(link) {
    api.changeAvatar(link.avatar).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
    });
  };

  function handleUpdateUser(newData) {
    api.editProfile(newData.name, newData.about).then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
    });
  };

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  function handleAddPlaceSubmit(newLocation, newLink) {
    api.addNewCard(newLocation, newLink).then((data) => {
      setCards([data, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
    });
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter(i => i._id !== card._id));
    }).catch((err) => {
      console.log(err);
    });
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setInfoTooltipOpen(false);
    setRegistered(false);
    setSelectedCard({});
  };

  React.useEffect(() => {
    checkToken();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err);
        });
      api.getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="content">
          <Header
            loggedIn={loggedIn}
            email={userEmail}
            onLogout={handleLogout} />
          <Routes>
            <Route path="/sign-up" element={
              <>
                <Register
                  onSingUp={handleSignUp} />
              </>
            } />
            <Route path="/sign-in" element={
              <>
                <Login
                  onSingIn={handleSignIn} />
              </>
            } />
            <Route path="/" element={
              <>
                <ProtectedRouteElement
                  loggedIn={loggedIn}
                  element={Main}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards} />
                <Footer />
              </>
            } />
          </Routes>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit} />
          <PopupWithForm
            popupId="popup-confirmation"
            formName="popup-confirmation-form"
            formHeader="Вы уверены?"
            buttonId="popup-confirmation-form-button"
            buttonSign="Да" />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups} />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            isRegistered={registered}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;