const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const form = document.querySelector('.ad-form');
const formHeader = document.querySelector('.ad-form-header');
const formElements = document.querySelectorAll('.ad-form__element');
const mapFilter = document.querySelector('.map__filters');
const filters = document.querySelectorAll('.map__filter');
const mapFeatures = document.querySelector('.map__features');

/**
 * Делает форму и фильтр неактивными, блокирует доступ и изменение полей форм
 */
const makesFormsInactive = () => {
  form.classList.add('ad-form--disabled');
  formElements.forEach((formElement) => {
    formElement.disabled = true;
  });
  formHeader.disabled = true;

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
export const validateTitle = () => {
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
export const validateCountGuest = () => {
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
export const validatePrice = () => {
  housingType.addEventListener ('input', () => {
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
export const synchronizesTime = () => {
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

export {makesFormsInactive, makesFormsActive, validateForm};

