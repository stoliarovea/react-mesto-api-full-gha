import pencil from '../images/pencil.svg';
import plus from '../images/plus.svg';
import React from 'react';
import Card from '../components/Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <button className="profile__edite-icon-avatar" type="button" onClick={props.onEditAvatar}>
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар." />
                </button>
                <div className="profile__info">
                    <div className="profile__name-button">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__edit-button" type="button" onClick={props.onEditProfile}>
                            <img className="profile__edit-icon" src={pencil} alt="Иконка." />
                        </button>
                    </div>
                    <p className="profile__status">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}>
                    <img className="profile__add-button-plus" src={plus} alt="Иконка." />
                </button>
            </section>
            <section className="elements">
                {props.cards.map((card, i) => (
                    <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
                ))}
            </section>
        </main>);
}

export default Main;