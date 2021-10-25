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
makesFormsActive();

export {makesFormsInactive, makesFormsActive};

