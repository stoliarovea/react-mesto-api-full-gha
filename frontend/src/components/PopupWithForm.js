import closeIcon from '../images/close-icon.svg';

function PopupWithForm(props) {
    return (
        <div id={props.popupId} className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" onClick={props.onClose}>
                    <img className="popup__close-icon" src={closeIcon} alt="Иконка." />
                </button>
                <form name={props.formName} className="form" onSubmit={props.onSubmit} noValidate>
                    <h2 className="popup__header">{props.formHeader}</h2>
                    {props.children}
                    <button id={props.buttonId} className="popup__submit-button" type="submit">{props.buttonSign}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;