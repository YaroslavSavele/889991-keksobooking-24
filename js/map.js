import { makesFormsActive } from './forms.js';
import { renderCard } from './card.js';
import { filterRules } from './filters.js';

const LATITUDE = 35.67476;
const LONGITUDE = 139.74999;
const SCALE = 13;
const ADVERTISEMENTS_COUNT = 10;

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

const filterForm = document.querySelector('.map__filters');
const filters = Array.from(filterForm.children);


/**
 * Генерирует метки похожих объявлей, фильтрует их по форме фильтрации
 * и добавляет на карту. При клике на каждую метку
 * показывается балун с подробной информацией об объявлении.
 * @param {Array} advertisements Массив объектов объявлений
 * @param {Object} map Объект карты
 * @param {Object} markersGroup Объект слоя карты с маркерами похожих обхъявлений
 */
const generatePins = (advertisements, markersGroup) => {
  markersGroup.clearLayers();
  const pins = advertisements.slice();
  const filterPins = () => {
    const filtredPins = [];
    let result;
    for (let i = 0; i < pins.length && filtredPins.length < ADVERTISEMENTS_COUNT; i++) {
      result = filters.every((filter) => filterRules[filter.id](pins[i], filter));
      if (result) {
        filtredPins.push(pins[i]);
      }
    }
    return filtredPins;
  };
  filterPins().forEach((advertisement) => {
    const { location: { lat, lng } } = advertisement;
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

    marker.addTo(markersGroup)
      .bindPopup(renderCard(advertisement));
  });
};

/**
 * Передает колбэк при изменении значений в форме фильтров
 * @param {myCallback} cb - Функция отрисовки пинов
 */
const setFilterFormChange = (cb) => {
  filterForm.addEventListener('change', () => {
    cb();
  });
};

export {
  createMap,
  getMainMarker,
  showAddress,
  generatePins,
  setFilterFormChange,
  LATITUDE,
  LONGITUDE,
  SCALE
};
