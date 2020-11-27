const popup = document.querySelector('.popup');
const cardSection = document.querySelector('.cards');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupZoom = document.querySelector('.popup_zoom');
const popupCloseButton = document.querySelector('.popup__close');
const popupCloseButtonAdd = document.querySelector('.popup__close_add')
const popupCloseButtonPhoto = document.querySelector('.popup__close_zoom')
const editButton = document.querySelector('.profile__edit-button');
const plusButton = document.querySelector('.profile__button-plus');
const formEdit = document.querySelector('.popup__form_edit');
const formAddCard = document.querySelector('.popup__form_add');
const formName = document.querySelector('.popup__input_type_name');
const formJob = document.querySelector('.popup__input_type_title'); 
const nameInput = document.querySelector('.profile__name');
const jobInput = document.querySelector('.profile__work');
const popupTitlePhoto = document.querySelector('.popup__caption');
const popupPhoto = document.querySelector('.popup__photo');
const cardTitle = document.querySelector('.popup__input_add_title');
const cardImage = document.querySelector('.popup__input_add_image');

function showPopup(popup) {
    popup.classList.add('popup_opened');

};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

function createCard (card) {
    const initCard = document.querySelector('#card-template').content.cloneNode(true); 
    const image = initCard.querySelector('.card__image');
    const title = initCard.querySelector('.card__title');
    const heartActive = initCard.querySelector('.card__heart').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__heart_active');
      }); 

      image.addEventListener('click', event => {
        popupPhoto.src = card.link;
        popupTitlePhoto.textContent = card.name;
        popupTitlePhoto.alt = card.name;
        showPopup(popupZoom)
    })

        initCard.querySelector('.card__trash').addEventListener('click', event => {
        const delCard = event.target.closest('.card');

        delCard.remove()
    })
    
    image.src = card.link;
    image.alt = card.name;
    title.textContent = card.name;
    
    return initCard;
};

function addCard (card) {
    cardSection.prepend(createCard(card));
};

initialCards.forEach(card => addCard(card, cardSection));

function showEditUserPopup() {
    showPopup(popupEdit)
    formName.value = nameInput.textContent; 
    formJob.value = jobInput.textContent; 
};

function submitEditProfileForm(event) {
    event.preventDefault();
    nameInput.textContent = formName.value;
    jobInput.textContent = formJob.value;
    closePopup(popupEdit);
};

formAddCard.addEventListener('submit', event => {
    event.preventDefault()
    addCard({
        name: cardTitle.value,
        link: cardImage.value
     });

    formAddCard.reset()
    closePopup(popupAdd);
})

editButton.addEventListener('click', () => showEditUserPopup());
plusButton.addEventListener('click', () => showPopup(popupAdd));
popupCloseButton.addEventListener('click', () => closePopup(popupEdit));
popupCloseButtonAdd.addEventListener('click', () => closePopup(popupAdd));
formEdit.addEventListener('submit', submitEditProfileForm); 
popupCloseButtonPhoto.addEventListener('click', () => closePopup(popupZoom));

document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape'){
        closePopup(popupZoom) || closePopup(popupEdit) || closePopup(popupAdd) }
  }); 

document.addEventListener('mouseup', function(evt) {
    if (evt.target.classList.contains('popup')){
        closePopup(popupZoom) || closePopup(popupEdit) || closePopup(popupAdd) }
});