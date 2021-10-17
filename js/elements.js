import {createAdvertisements} from './data.js';
import {getStringTrueDeclension} from './util.js';

const ADVERTISEMENTS_COUNT = 10;
const elementTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarAdvertisements = createAdvertisements(ADVERTISEMENTS_COUNT);
const canvas = document.querySelector('#map-canvas');
const fragment = document.createDocumentFragment();
const HOUSINGS = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

similarAdvertisements.forEach((advertisement) => {
  const advertisementItem = elementTemplate.cloneNode(true);
  advertisementItem.querySelector('.popup__title').textContent = advertisement.offer.title;
  advertisementItem.querySelector('.popup__text--address').textContent = advertisement.offer.address;

  const price = advertisementItem.querySelector('.popup__text--price');
  price.textContent = (advertisement.offer.price) ? `${advertisement.offer.price} ₽/ночь` : '';

  advertisementItem.querySelector('.popup__type').textContent = HOUSINGS[advertisement.offer.type];

  const capacity = advertisementItem.querySelector('.popup__text--capacity');
  capacity.textContent = (advertisement.offer.rooms && advertisement.offer.guests) ? getStringTrueDeclension(advertisement.offer.rooms, advertisement.offer.guests) : '';

  const time = advertisementItem.querySelector('.popup__text--time');
  time.textContent = (advertisement.offer.checkin && advertisement.offer.checkout) ? `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}` : '';

  const listFeatures = advertisementItem.querySelector('.popup__features');
  const features = listFeatures.querySelectorAll('.popup__feature');

  if (advertisement.offer.features) {
    features.forEach((feature) => {
      const isNecessary = advertisement.offer.features.some(
        (element) => feature.classList.contains(`popup__feature--${element}`),
      );
      if (!isNecessary) {
        feature.remove();
      }
    });
  } else {
    listFeatures.remove();
  }

  advertisementItem.querySelector('.popup__description').textContent = advertisement.offer.description;

  const photosContainer = advertisementItem.querySelector('.popup__photos');
  const photoTemplate = photosContainer.querySelector('.popup__photo');
  photoTemplate.remove();
  if (advertisement.offer.photos) {
    advertisement.offer.photos.forEach((photo) => {
      const photosItem = photoTemplate.cloneNode(true);
      photosItem.src = photo;
      photosContainer.appendChild(photosItem);
    });
  }
  advertisementItem.querySelector('.popup__avatar').src = advertisement.author.avatar;

  fragment.appendChild(advertisementItem);
});

canvas.appendChild(fragment.firstChild);


