const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export { initialCards };


class Card {
    constructor(data, cardSelector) {
      this._image = data.link;
      this._title = data.name;
      this._cardSelector = cardSelector;
    }
  
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);
  
      return cardElement;
    }
  
    generateCard() {
      this._element = this._getTemplate();
  
      this._setEventListeners();
  
      const image = this._element.querySelector('.card__image');
  
      this._element.querySelector('.card__image').src = this._image;
      this._element.querySelector('.card__title').textContent = this._title;
  
      image.src = this._image;
      image.alt = this._title;
  
      return this._element;
    }
  
    _setEventListeners() {
      this._element.querySelector('.card__heart').addEventListener('click', () => {
        this._handleHeartClick();
      });
  
      this._element.querySelector('.card__trash').addEventListener('click', () => {
        this._handleTrashClick();
      });
  
      this._element.querySelector('.card__image').addEventListener('click', () => {
        this._handleOpenPopupZoom();
      });
  
    };
  
    _handleHeartClick() {
      this._element.querySelector('.card__heart').classList.toggle('card__heart_active');
    };
  
    _handleTrashClick() {
      this._element.querySelector('.card__trash').closest('.card').remove();
    };
  
    _handleOpenPopupZoom() {
      popupPhoto.src = this._image;
      popupTitlePhoto.textContent = this._title;
      showPopup(popupZoom);
    };
  
  };

  export { Card };
