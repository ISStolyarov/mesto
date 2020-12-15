class FormValidation {
    constructor(config, element) {
        this._element = element;
        this._inputSelector = config.inputSelector;
        this._inputInvalidClass = config.inputInvalidClass;
        this._submitButtonSelector = config.submitButtonSelector;
        this._formSelector = config.formSelector;
        this._buttonInvalidClass = config.buttonInvalidClass;
    };

    _showError(input, errorMessage) {
        const error = this._element.querySelector(`#${input.id}-error`);
        error.textContent = errorMessage;
        input.classList.add(this._inputInvalidClass);
    };

    _hideError(input) {
        const error = this._element.querySelector(`#${input.id}-error`);
        error.textContent = "";
        input.classList.remove(this._inputInvalidClass);
    };

    _checkInputValidity(input) {
        if (!input.validity.valid) {
            this._showError(input, input.validationMessage);
        } else {
            this._hideError(input);
        }
    };

    _setButtonState(button, isActive) {
        if (isActive) {
            button.classList.remove(this._buttonInvalidClass);
            button.disabled = false;
        } else {
            button.classList.add(this._buttonInvalidClass);
            button.disabled = true;
        }
    };

    _setEventListener() {
        const inputsList = Array.from(this._element.querySelectorAll(this._inputSelector));
        const submitButton = this._element.querySelector(this._submitButtonSelector);
        inputsList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._setButtonState(submitButton, this._element.checkValidity());
            });
        });
    };

    enableValidation() {
        const submitButton = this._element.querySelector(this._submitButtonSelector);
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._setButtonState(submitButton, false);
        });
        this._setEventListener();
        this._setButtonState(submitButton, this._element.checkValidity());
    };
};

export default FormValidation
