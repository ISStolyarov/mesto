import FormValidation from "./FormValidator.js";
import { initialCards, Card } from './Сards.js';

const cardSection = document.querySelector(".cards");
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
export const popupZoom = document.querySelector(".popup_zoom");
const popupCloseButton = document.querySelector(".popup__close");
const popupCloseButtonAdd = document.querySelector(".popup__close_add");
const popupCloseButtonPhoto = document.querySelector(".popup__close_zoom");
const editButton = document.querySelector(".profile__edit-button");
const plusButton = document.querySelector(".profile__button-plus");
const formEdit = document.querySelector(".popup__form_edit");
const formAddCard = document.querySelector(".popup__form_add");
const formName = document.querySelector(".popup__input_type_name");
const formJob = document.querySelector(".popup__input_type_title");
const nameInput = document.querySelector(".profile__name");
const jobInput = document.querySelector(".profile__work");
export const popupTitlePhoto = document.querySelector(".popup__caption");
export const popupPhoto = document.querySelector(".popup__photo");
const cardTitle = document.querySelector(".popup__input_add_title");
const cardImage = document.querySelector(".popup__input_add_image");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inputInvalidClass: "popup__input_state_invalid",
  buttonInvalidClass: "popup__button_invalid",
};

const formEditValidation = new FormValidation(validationConfig, formEdit);
const formAddValidation = new FormValidation(validationConfig, formAddCard);

formEditValidation.enableValidation();
formAddValidation.enableValidation();

initialCards.forEach(item => addCard(item));

function addCard(item) {
  const card = new Card(item, '.card-template');
  const cardElement = card.generateCard();
  cardSection.prepend(cardElement);
}

export function showPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEscape);
  document.addEventListener("mousedown", closePopupMouse);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEscape);
  document.removeEventListener("mousedown", closePopupMouse);
}

const closePopupEscape = (evt) => {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
};

const closePopupMouse = (evt) => {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
};

function showEditUserPopup() {
  showPopup(popupEdit);
  formName.value = nameInput.textContent;
  formJob.value = jobInput.textContent;
}

function submitEditProfileForm(event) {
  nameInput.textContent = formName.value;
  jobInput.textContent = formJob.value;
  closePopup(popupEdit);
}

formAddCard.addEventListener("submit", (evt) => {
  addCard({
    name: cardTitle.value,
    link: cardImage.value,
  });

  formAddCard.reset();
  closePopup(popupAdd);
});

editButton.addEventListener("click", () => showEditUserPopup());
plusButton.addEventListener("click", () => showPopup(popupAdd));
popupCloseButton.addEventListener("click", () => closePopup(popupEdit));
popupCloseButtonAdd.addEventListener("click", () => closePopup(popupAdd));
formEdit.addEventListener("submit", submitEditProfileForm);
popupCloseButtonPhoto.addEventListener("click", () => closePopup(popupZoom));
