/**
 *Возвращает строку с правильным склонением слов в предложении
 *Например "1 комната для 1 гостя" или "2 комнаты для трех гостей"
 * @param {number} countRooms - Количество комнат
 * @param {number} countGuests - Количество гостей
 * @returns {string} - Корректно сформулированное предложение
 */
const getStringTrueDeclension = (countRooms, countGuests) => {
  let room = 'комнат';
  switch (countRooms) {
    case 1:
      room = 'комната';
      break;

    case 2:
    case 3:
    case 4:
      room = 'комнаты';
      break;
  }
  const guest = (countGuests === 1) ? 'гостя' : 'гостей';

  return `${countRooms} ${room} для ${countGuests} ${guest}`;
};
/**
 *Показывает сообщение об ошибке, выводит его на верх страницы
 * @param {String} message Строка сообщения об ошибке
 */
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);
};

const convertsNumberToValue = (number) => {
  let result ;
  if (number < 10000) {
    result = 'low';
  } else if (number >= 10000 && number <= 50000) {
    result = 'middle';
  } else if ( number > 50000) {
    result = 'high';
  }
  return result;
};

/**
 *Задерживает выполнение функции на определенное время
 * @param {myCallback} callback - Функция, выполнение которой нужно задержать
 * @param {number} timeoutDelay - Время задержки в миллисекундах
 * @returns
 */
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  getStringTrueDeclension,
  showAlert,
  convertsNumberToValue,
  debounce
};
