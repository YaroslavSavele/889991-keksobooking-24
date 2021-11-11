import {makesFormsActive} from './forms.js';
import {renderCard} from './card.js';


const LATITUDE = 35.67476;
const LONGITUDE = 139.74999;
const SCALE = 13;
/**
 * Выводит карту Токио, переводит в формы в активное состояние после инициализации карты.
 *  @returns {Object} Объект карты.
 */
const createMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      makesFormsActive(LATITUDE, LONGITUDE);
    })
    .setView({
      lat: LATITUDE,
      lng: LONGITUDE,
    }, SCALE);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  return map;
};

/**
 * Добавляет на карту специальную, «главную», метку, перемещая эту метку пользователь выбирает адрес
 * своего объявления.
 * @returns {Object} Объект метки
 */
const getMainMarker = () => {
  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
  const mainPinMarker = L.marker(
    {
      lat: LATITUDE,
      lng: LONGITUDE,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );
  return mainPinMarker;
};

/**
 * Показывает в поле адреса координаты метки
 * @param {Object} marker Объект метки
 */
const showAddress = (marker) => {
  const addressField = document.querySelector('#address');
  marker.on('moveend', (evt) => {
    const lat = evt.target.getLatLng().lat.toFixed(5);
    const lng = evt.target.getLatLng().lng.toFixed(5);
    addressField.value = `${lat}, ${lng}`;
  });
};
/**
 * Добавляет на карту метки 10 похожих объявлений. При клике на каждую из них
 * происходит показ балуна с подробной информацией об объявлении.
 * @param {Array} advertisements Массив объектов объявлений
 * @param {Object} map Объект карты
 */
const generatePins = (advertisements, map) => {
  advertisements.forEach((advertisement) => {
    const {location: {lat, lng}} = advertisement;
    const icon = L.icon({
      iconUrl: './img/pin.svg',
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

export {createMap, getMainMarker, showAddress, generatePins, LATITUDE, LONGITUDE, SCALE};
