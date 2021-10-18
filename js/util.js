/**
 * Генерирует случайное целое число из заданного интервала чисел
 * включая начальное число и конечное число
 * @param {number} min - Начало диапазона
 * @param {number} max - Конец диапазона
 * @returns {number} - Целое число
 */
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const rand = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(rand);
};

/**
 * Генерирует случайное дробное число с указанным количеством знаков
 * после запятой из заданного интервала чисел
 * включая начальное число и конечное число
 * @param {number} min - Начало диапазона
 * @param {number} max - Конец диапазона
 * @param {number} count - Количество знаков после запятой
 * @returns {number} - Десятичная дробь
 */
const getRandomDecimal = (min, max, count = 1) => {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const rand = Math.random() * (upper - lower) + lower;
  return Number(rand.toFixed(count));
};

/**
 *Генерирует адрес изображения
 * @returns {string} - URL изображения
 */
const createGenerator = () => {
  let lastNumber = 0;

  return  () => {
    lastNumber += 1;
    let authorId = '';
    (lastNumber < 10) ? authorId = `0${lastNumber}` : authorId = lastNumber;
    return `img/avatars/user${authorId}.png`;
  };
};


/**
 * Генерирует новый массив случайной длины,
 * используя элементы заданного массива
 * @param {Array} sourceArray - Заданный массив
 * @returns {Array} - Новый массив
 */
const getArrayRandomLength = (sourceArray) => sourceArray.slice(0, getRandomInteger(1, sourceArray.length));

/**
 * Возвращает один случайный элемент заданного массива
 * @param {Array} sourceArray - Заданный массив
 * @returns {(string|number)} - Элемент массива
 */
const getRandomArrayElement = (arr) => arr[getRandomInteger(0, arr.length - 1)];

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

export {
  getRandomInteger,
  getRandomDecimal,
  createGenerator,
  getArrayRandomLength,
  getRandomArrayElement,
  getStringTrueDeclension
};
