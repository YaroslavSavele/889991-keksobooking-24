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


/**
 * Делает формы активными
 */
const makesFormsActive = () => {
  form.classList.remove('ad-form--disabled');
  formElements.forEach((formElement) => {
    formElement.disabled = false;
  });
  formHeader.disabled = false;

  mapFilter.classList.remove('map__filters--disabled');
  filters.forEach((filter) => {
    filter.disabled = false;
  });
  mapFeatures.disabled = false;
};

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
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
    if (roomNamber.value === '1') {
      capacity[0].disabled = false;
      capacity[1].disabled = true;
      capacity[2].disabled = true;
      capacity[3].disabled = true;
      capacity[0].selected = true;
    } else if (roomNamber.value === '2') {
      capacity[0].disabled = false;
      capacity[1].disabled = false;
      capacity[2].disabled = true;
      capacity[3].disabled = true;
      capacity[1].selected = true;
    } else if (roomNamber.value === '3') {
      capacity[0].disabled = false;
      capacity[1].disabled = false;
      capacity[2].disabled = false;
      capacity[3].disabled = true;
      capacity[2].selected = true;
    } else if (roomNamber.value === '100') {
      capacity[0].disabled = true;
      capacity[1].disabled = true;
      capacity[2].disabled = true;
      capacity[3].disabled = false;
      capacity[3].selected = true;
    }
  });
};

const housingType = document.querySelector('#type');
const price = document.querySelector('#price');
/**
 * Изменяет минимальное значение поля "Цена за ночь",
 * в зависимости от выбора типа жилья
 */
export const validatePrice = () => {
  housingType.addEventListener ('input', () => {
    if (housingType.value === 'bungalow') {
      price.placeholder = 0;
      price.min = 0;
    } else if (housingType.value === 'flat') {
      price.placeholder = 1000;
      price.min = 1000;
    } else if (housingType.value === 'hotel') {
      price.placeholder = 3000;
      price.min = 3000;
    } else if (housingType.value === 'house') {
      price.placeholder = 5000;
      price.min = 5000;
    } else if (housingType.value === 'palace') {
      price.placeholder = 10000;
      price.min = 10000;
    }
  });
};
export {makesFormsInactive, makesFormsActive};

