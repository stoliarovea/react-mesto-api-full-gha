import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser, props.isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleStatusChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: name,
            about: description
        });
    }

    return (
        <PopupWithForm
            popupId="popup-profile"
            formName="popup-profile-form"
            formHeader="Редактировать профиль"
            buttonId="popup-profile-form-button"
            buttonSign="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <input
                name="input-profile-name"
                className="popup__input"
                type="text"
                value={name || ''}
                onChange={handleNameChange}
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                required />
            <span
                className="popup__input-error input-profile-name-error">
            </span>
            <input
                name="input-profile-status"
                className="popup__input"
                type="text"
                value={description || ''}
                onChange={handleStatusChange}
                placeholder="Статус"
                minLength="2"
                maxLength="200"
                required />
            <span
                className="popup__input-error input-profile-status-error">
            </span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;