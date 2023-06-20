import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import trashCan from '../images/trash-can.svg';

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const card = props.card;
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (`element__like ${isLiked && 'element__like_active'}`);

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <div className="element">
            {isOwn && <button className="element__delete" type="button" onClick={handleDeleteClick}>
                <img src={trashCan} alt="Иконка." />
            </button>}
            <img className="element__image element__mask" src={card.link} alt={card.name} onClick={handleClick} />
            <div className="element__sign-like">
                <h2 className="element__sign">{card.name}</h2>
                <div>
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} ></button>
                    <p className="element__likes-counter">{card.likes.length}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;