import { setData, getData } from './api.js';
import { generatePins, LATITUDE, LONGITUDE, SCALE } from './map.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const form = document.querySelector('.ad-form');
const formHeader = document.querySelector('.ad-form-header');
const formElements = document.querySelectorAll('.ad-form__element');
const mapFilter = document.querySelector('.map__filters');
const filters = document.querySelectorAll('.map__filter');
const mapFeatures = document.querySelector('.map__features');

/**
 * Делает форму отправки объявления неактивной, блокирует доступ и изменение полей формы
 */
const makesFormsInactive = () => {
  form.classList.add('ad-form--disabled');
  formElements.forEach((formElement) => {
    formElement.disabled = true;
  });
  formHeader.disabled = true;
};

/**
 * Делает фильтр неактивным, блокирует доступ и изменение полей фильтра
 */
const makesFiltersInactive = () => {
  mapFilter.classList.add('map__filters--disabled');
  filters.forEach((filter) => {
    filter.disabled = true;
  });
  mapFeatures.disabled = true;
};

const address = document.querySelector('#address');
/**
 * Делает формы активными
 */
const makesFormsActive = (lat, lng) => {
  form.classList.remove('ad-form--disabled');
  formElements.forEach((formElement) => {
    formElement.disabled = false;
  });
  formHeader.disabled = false;
  address.value = `${lat}, ${lng}`;

  mapFilter.classList.remove('map__filters--disabled');
  filters.forEach((filter) => {
    filter.disabled = false;
  });
  mapFeatures.disabled = false;
};


const titleInput = document.querySelector('#title');
/**
 * Проверяет поле "Заголовок" на заполненность и длину текста
 * если текст короче минимальной длины, подсказывает сколько еще символов небходимо ввести,
 * если длина текста больше максимальной, подсказывет сколько символов нужно удалить
 */
const validateTitle = () => {
  titleInput.addEventListener('input', () => {
    const titleLength = titleInput.value.length;

    if (titleLength === 0) {
      titleInput.setCustomValidity('Это поле необходимо заполнить!');
    } else if (titleLength < MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Нужно ввести еще ${MIN_TITLE_LENGTH - titleLength} симв.`);
    } else if (titleLength > MAX_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Удалите лишние ${titleLength - MAX_TITLE_LENGTH} симв.`);
    } else {
      titleInput.setCustomValidity('');
    }
    titleInput.reportValidity();
  });
};

const roomNamber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const roomsGuests = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};
/**
 * Синхронизирует поле «Количество комнат» с полем «Количество мест»,
 * при выборе количества комнат вводятся ограничения на допустимые
 * варианты выбора количества гостей:
* - 1 комната — «для 1 гостя»;
* - 2 комнаты — «для 2 гостей» или «для 1 гостя»;
* - 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
* - 100 комнат — «не для гостей».
 */
const validateCountGuest = () => {
  roomNamber.addEventListener('input', () => {
    Object.values(capacity).forEach((option) => {
      option.disabled = true;
      if (roomsGuests[roomNamber.value].includes(Number(option.value))) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });
};

const housingType = document.querySelector('#type');
const price = document.querySelector('#price');
const typePrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
/**
 * Изменяет минимальное значение поля "Цена за ночь",
 * в зависимости от выбора типа жилья
 */
const validatePrice = () => {
  housingType.addEventListener('input', () => {
    price.placeholder = typePrice[housingType.value];
    price.min = typePrice[housingType.value];
  });
};

const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');
const filsetTime = document.querySelector('.ad-form__element--time');
/**
 * Синхронизирует поле времени заезда и поле времени выезда
 * изменении значения одного поля во втором
 * автоматически выберается соответствующее ему значение
 */
const synchronizesTime = () => {
  filsetTime.addEventListener('input', (evt) => {
    if (evt.target === timein) {
      timeout.value = evt.target.value;
    } else if (evt.target === timeout) {
      timein.value = evt.target.value;
    }
  });
};

/**
 * Объединяет функции, валидирующие поля формы
 */
const validateForm = () => {
  validateTitle();
  validatePrice();
  validateCountGuest();
  synchronizesTime();
};

/**
 * Очищает поля форм, приводит их в первоначальное состояние,
 * возвращает главный маркер в центр, возвращает карту в центр,
 * созвращает маштаб карты, закрывает открытый балун
 * @param {Object} marker Объект маркера
 * @param {Object} map Объект карты
 */
const onReset = (marker, map) => {
  form.reset();
  mapFilter.reset();
  marker.setLatLng({
    lat: LATITUDE,
    lng: LONGITUDE,
  });
  address.value = `${LATITUDE}, ${LONGITUDE}`;
  map.setView({
    lat: LATITUDE,
    lng: LONGITUDE,
  }, SCALE);
  map.closePopup();
  //layer.clearLayers();
  price.placeholder = typePrice[housingType.value];
  price.min = typePrice[housingType.value];
};

const succesTemplate = document.querySelector('#success').content.querySelector('.success');


/**
 * Показывает сообщение об успешной отправке данных формы на сервер,
 * при клике в любую сообщения или при нажатии клавиши Escape
 * сообщение убирается, поля формы, поля фильтра и карта приходят
 * в первоначальное состояние
 * @param {Object} marker Объект главного маркера
 * @param {Object} map Объект карты
 * @param {Object} layer Объект слоя маркеров похожих объявлений
 */
const onSuccess = (marker, map, layer) => {
  const successMessage = succesTemplate.cloneNode(true);
  document.body.appendChild(successMessage);

  const onSuccesEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      successMessage.remove();
      onReset(marker, map);
      getData((advertisements) => {
        generatePins(advertisements, layer);
      });
      document.removeEventListener('keydown', onSuccesEscKeydown);
    }
  };

  successMessage.addEventListener('click', () => {
    successMessage.remove();
    onReset(marker, map);
    getData((advertisements) => {
      generatePins(advertisements, layer);
    });
  });

  document.addEventListener('keydown', onSuccesEscKeydown);
};

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
/**
 * Показывает сообщение о том что данные формы не отправились,
 * при клике на кнопку "Попрововать снова" или по свободной области, а также
 * при нажатии клавиши Escape сообщение закрывается, поля формы остаются в том же состоянии
 */
const onFail = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  document.body.appendChild(errorMessage);
  const errorButton = errorMessage.querySelector('.error__button');
  const onErrorEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      errorMessage.remove();
      document.removeEventListener('keydown', onErrorEscKeydown);
    }
  };
  errorButton.addEventListener('click', () => {
    errorMessage.remove();
  });
  errorMessage.addEventListener('click', () => {
    errorMessage.remove();
  });
  document.addEventListener('keydown', onErrorEscKeydown);
};

const reset = form.querySelector('.ad-form__reset');
/**
 * При клике по кнопке опубликовать
 * отправляет данные формы на сервер.
 * При клике по кнопке очистить очищает поля форм и возвращает карту
 * в первоначальное состояние.
 * @param {Object} marker Объект главного маркера
 * @param {Object} map Объект карты
 * @param {Object} layer Объект слоя маркеров похожих объявлений
 */
const setUserFormSubmit = (marker, map, layer) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    setData(
      () => onSuccess(marker, map, layer),
      onFail,
      new FormData(evt.target),
    );
  });
  reset.addEventListener('click', (evt) => {
    evt.preventDefault();
    onReset(marker, map);
    getData((advertisements) => {
      generatePins(advertisements, layer);
    });
  });
};


export {
  makesFormsInactive,
  makesFormsActive,
  validateForm,
  setUserFormSubmit,
  makesFiltersInactive
};
