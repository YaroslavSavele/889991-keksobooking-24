import {getStringTrueDeclension} from './util.js';


const elementTemplate = document.querySelector('#card').content.querySelector('.popup');

const HOUSINGS = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};
/**
 *Возвращает DocumentFragment с DOM-элементами, соответствующими объявлениям
 * @param {Array} arrayAdvertisements - Массив сгенерированных объектов объявлений
 * @returns {DocumentFragment} - DocumentFragment
 */
const generatePins = (arrayAdvertisements) => {
  const fragment = document.createDocumentFragment();

  arrayAdvertisements.forEach(({author, offer}) => {
    const advertisementItem = elementTemplate.cloneNode(true);
    advertisementItem.querySelector('.popup__title').textContent = offer.title;
    advertisementItem.querySelector('.popup__text--address').textContent = offer.address;

    const price = advertisementItem.querySelector('.popup__text--price');
    price.textContent = (offer.price) ? `${offer.price} ₽/ночь` : '';

    advertisementItem.querySelector('.popup__type').textContent = HOUSINGS[offer.type];

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

    fragment.appendChild(advertisementItem);
  });
  return fragment;
};


export {generatePins};

