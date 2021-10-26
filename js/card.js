import {getStringTrueDeclension} from './util.js';


const poputTemplate = document.querySelector('#card').content.querySelector('.popup');

const housing = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

/**
 *Заполнение шаблона похожего объявления, в параметрах -
 * деструктурируются нужные объекты сгенерированного объявления
 * @param {Object} author - Объект с аватаром автора объявления
 * @param {Object} offer - Объект с описанием предложений объявления
 * @returns {Object} - DOM-элемент
 */
const renderCard = ({author, offer}) => {
  const advertisementItem = poputTemplate.cloneNode(true);
  advertisementItem.querySelector('.popup__title').textContent = offer.title;
  advertisementItem.querySelector('.popup__text--address').textContent = offer.address;

  const price = advertisementItem.querySelector('.popup__text--price');
  price.textContent = (offer.price) ? `${offer.price} ₽/ночь` : '';

  advertisementItem.querySelector('.popup__type').textContent = housing[offer.type];

  const capacity = advertisementItem.querySelector('.popup__text--capacity');
  capacity.textContent = (offer.rooms && offer.guests) ? getStringTrueDeclension(offer.rooms, offer.guests) : '';

  const time = advertisementItem.querySelector('.popup__text--time');
  time.textContent = (offer.checkin && offer.checkout) ? `Заезд после ${offer.checkin}, выезд до ${offer.checkout}` : '';

  const listFeatures = advertisementItem.querySelector('.popup__features');
  const features = listFeatures.querySelectorAll('.popup__feature');

  if (offer.features) {
    features.forEach((feature) => {
      const isNecessary = offer.features.some(
        (element) => feature.classList.contains(`popup__feature--${element}`),
      );
      if (!isNecessary) {
        feature.remove();
      }
    });
  } else {
    listFeatures.remove();
  }

  advertisementItem.querySelector('.popup__description').textContent = offer.description;

  const photosContainer = advertisementItem.querySelector('.popup__photos');
  const photoTemplate = photosContainer.querySelector('.popup__photo');
  photoTemplate.remove();
  if (offer.photos) {
    offer.photos.forEach((photo) => {
      const photosItem = photoTemplate.cloneNode(true);
      photosItem.src = photo;
      photosContainer.appendChild(photosItem);
    });
  }
  advertisementItem.querySelector('.popup__avatar').src = author.avatar;

  return advertisementItem;
};


export {renderCard};

