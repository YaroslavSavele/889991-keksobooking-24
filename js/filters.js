import {convertsNumberToValue} from './util.js';

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingFeatures = document.querySelector('#housing-features');
const features = housingFeatures.querySelectorAll('input');

/**
 * Возвращает массив отмеченных дополнительных удобств
 * @returns {Array} Массив значений
 */
const getFeatures = () => {
  const array = [];
  features.forEach((feature) => {
    if (feature.checked) {
      array.push(feature.value);
    }

  });
  return array;
};

/**
 * Функция-колбэк для фильтрации похожих объявлений по типу жилья
 * возвращает true если тип жилья в объявлении совпадает с выбранным в форме,
 * а также если не выбирается определенный тип жилья
 * @param {Object} offer - деструктурированный объект из данных полученных от сервера
 * @returns {boolean}
 */
const filtersByType =({offer}) => {
  if (housingType.value === 'any') {
    return true;
  }
  if (offer.type === housingType.value) {
    return true;
  }
};

/**
 * Функция-колбэк для фильтрации похожих объявлений по цене
 * возвращает true если цена в объявлении совпадает с выбранной в форме,
 * а также если цена не выбирается
 * @param {Object} offer - деструктурированный объект из данных полученных от сервера
 * @returns {boolean}
 */
const filtersByPrice =({offer}) => {
  if (housingPrice.value === 'any') {
    return true;
  }
  if (convertsNumberToValue(offer.price) === housingPrice.value) {
    return true;
  }
};

/**
 * Функция-колбэк для фильтрации похожих объявлений по количеству комнат
 * возвращает true если количество комнат в объявлении совпадает с выбранным в форме,
 * а также если количество комнат не выбирается
 * @param {Object} offer - деструктурированный объект из данных полученных от сервера
 * @returns {boolean}
 */
const filtersByRooms =({offer}) => {
  if (housingRooms.value === 'any') {
    return true;
  }
  if (offer.rooms === Number(housingRooms.value)) {
    return true;
  }
};

/**
 * Функция-колбэк для фильтрации похожих объявлений по количеству гостей
 * возвращает true если количество гостей в объявлении совпадает с выбранным в форме,
 * а также если количество гостей не выбирается
 * @param {Object} offer - деструктурированный объект из данных полученных от сервера
 * @returns {boolean}
 */
const filtersByGuests =({offer}) => {
  if (housingGuests.value === 'any') {
    return true;
  }
  if (offer.guests === Number(housingGuests.value)) {
    return true;
  }
};

/**
 * Функция-колбэк для фильтрации похожих объявлений по дополнительным удобствам
 * возвращает true если дополнительные удобства в объявлении совпадают с выбранными в форме,
 * а также если дополнительные удобства не выбираются
 * @param {Object} offer - деструктурированный объект из данных полученных от сервера
 * @returns {boolean}
 */
const filtersByFeatures =({offer}) => {
  const checkListElements = getFeatures();
  if (checkListElements.length === 0) {
    return true;
  }
  if (checkListElements.length) {
    checkListElements.forEach((feature) => {
      if (offer.features.includes(feature)) {
        return true;
      }
    });
  }
};


/**
 * Передает колбэк при изменении значения
 * поля выбора типа жилья в форме фильтрации
 * @param {myCallback} cb - Функция отрисовки пинов
 */
const setTypeSelect = (cb) => {
  housingType.addEventListener('input', () => {
    cb();
  });
};

/**
 * Передает колбэк при изменении значения
 * поля выбора цены в форме фильтрации
 * @param {myCallback} cb - Функция отрисовки пинов
 */
const setPriceSelect = (cb) => {
  housingPrice.addEventListener('input', () => {
    cb();
  });
};

/**
 * Передает колбэк при изменении значения
 * поля выбора количества комнат в форме фильтрации
 * @param {myCallback} cb - Функция отрисовки пинов
 */
const setRoomsSelect = (cb) => {
  housingRooms.addEventListener('input', () => {
    cb();
  });
};

/**
 * Передает колбэк при изменении значения
 * поля выбора количества гостей в форме фильтрации
 * @param {myCallback} cb - Функция отрисовки пинов
 */
const setGuestsSelect = (cb) => {
  housingGuests.addEventListener('input', () => {
    cb();
  });
};

/**
 * Передает колбэк при выборе дополнительных удобств
 * в форме фильтрации
 * @param {myCallback} cb - Функция отрисовки пинов
 */
const setFeaturessSelect = (cb) => {
  housingFeatures.addEventListener('input', () => {
    cb();
  });
};


export {
  setTypeSelect,
  setPriceSelect,
  setRoomsSelect,
  setGuestsSelect,
  setFeaturessSelect,
  filtersByType,
  filtersByPrice,
  filtersByRooms,
  filtersByGuests,
  filtersByFeatures
};
