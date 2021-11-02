import {makesFormsActive} from './forms.js';
import {createAdvertisements} from './data.js';
import {renderCard} from './card.js';

const ADVERTISEMENTS_COUNT = 10;

/**
 * Выводит карту Токио, переводит в страницу в активное состояние после инициализации карты.
 * Добавляет на карту специальную, «главную», метку, перемещая эту метку пользователь выбирает адрес
 * своего объявления.
 * Добавляет на карту метки 10 похожих объявлений. При клике на каждую из них
 * происходит показ балуна с подробной информацией об объявлении.
 *
 */
const createMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      makesFormsActive();
    })
    .setView({
      lat: 35.67500,
      lng: 139.75000,
    }, 13);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
  const mainPinMarker = L.marker(
    {
      lat: 35.67500,
      lng: 139.75000,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );
  mainPinMarker.addTo(map);
  const addressField = document.querySelector('#address');
  mainPinMarker.on('moveend', (evt) => {
    const lat = evt.target.getLatLng().lat.toFixed(5);
    const lng = evt.target.getLatLng().lng.toFixed(5);
    addressField.value = `${lat}, ${lng}`;
  });

  const advertisements = createAdvertisements(ADVERTISEMENTS_COUNT);
  advertisements.forEach((advertisement) => {
    const {location: {lat, lng}} = advertisement;
    const icon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );

    marker.addTo(map)
      .bindPopup(renderCard(advertisement));
  });
};

export {createMap};
