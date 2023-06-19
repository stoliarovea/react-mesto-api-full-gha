import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

    const newLocationRef = React.useRef();
    const newLinkRef = React.useRef();

    React.useEffect(() => {
        if (!props.isOpen) {
            newLocationRef.current.value = '';
            newLinkRef.current.value = '';
        }
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace(newLocationRef.current.value, newLinkRef.current.value);
    }

    return (
        <PopupWithForm
            popupId="popup-card"
            formName="popup-card-form"
            formHeader="Новое место"
            buttonId="popup-card-form-button"
            buttonSign="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <input
                name="input-card-location"
                className="popup__input"
                type="text"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                ref={newLocationRef}
                required />
            <span
                className="popup__input-error input-card-location-error">
            </span>
            <input
                name="input-card-link"
                className="popup__input"
                type="url"
                placeholder="Ссылка на картинку"
                ref={newLinkRef}
                required />
            <span
                className="popup__input-error input-card-link-error">
            </span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;