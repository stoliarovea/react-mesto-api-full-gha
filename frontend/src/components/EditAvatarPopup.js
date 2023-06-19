import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

    const inputAvatarRef = React.useRef();

    React.useEffect(() => {
        inputAvatarRef.current.value = '';
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: inputAvatarRef.current.value
        });
    }

    return (
        <PopupWithForm
            popupId="popup-avatar"
            formName="popup-avatar-form"
            formHeader="Обновить аватар"
            buttonId="popup-avatar-form-button"
            buttonSign="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <input
                name="input-avatar-link"
                className="popup__input"
                type="url"
                placeholder="Ссылка на картинку"
                ref={inputAvatarRef}
                required />
            <span
                className="popup__input-error input-avatar-link-error">
            </span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;