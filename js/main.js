function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const rand = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(rand);
}

function getRandomDecimal(min, max, count) {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const rand = Math.random() * (upper - lower) + lower;
  return Number(rand.toFixed(count));
}

function createGenerator () {
  let lastNumber = 0;

  return function () {
    lastNumber += 1;
    let authorId = '';
    if (lastNumber < 10) {
      authorId = `0${lastNumber}`;
    } else {
      authorId = lastNumber;
    }
    return `url(img/avatars/user${authorId}.png)`;
  };
}
const generateAvatar = createGenerator();


const TITLES = [
  'Хорошее жилье',
  'Прекрасный вариант',
  'Лучше не найдешь',
  'Так себе жилье',
  'За то не дорого',
  'Милая маленькая квартирка',
  'Шикарный вариант',
  'Красиво жить не запретишь',
  'Один раз живем',
];
const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const TIMES = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESTCRIPTIONS = [
  'Просторная светлая квартира, укоплектованна мебелью',
  'Квартира расположенна на верхнем этаже, роскошный вид на город',
  'Уютная квартира с необходимым комлектом мебели, с оборудованной кухней',
  'Просторная квартира с панорамными окнами и чудесным видом из окна',
  'Малогабаритная квартира для маленькой компании',
  'Удобная квартира, укомлектованная всем необходимым для путешественников',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getArrayRandomLength = (sourceArray) => sourceArray.slice(0, getRandomInteger(1, sourceArray.length));

const getRandomArrayElement = (arr) => arr[getRandomInteger(0, arr.length - 1)];


function createAdvertisement() {
  const latitude = getRandomDecimal(35.65000, 35.70000, 5);
  const longitude = getRandomDecimal(139.70000, 139.80000, 5);
  return {
    author: {
      avatar : generateAvatar(),
    },
    location : {
      lat : latitude,
      lng : longitude,
    },
    offer : {
      title : getRandomArrayElement(TITLES),
      address : `${latitude}, ${longitude}`,
      price : getRandomInteger(1, 10) * 1000,
      type : getRandomArrayElement(TYPE),
      rooms : getRandomInteger(1, 10),
      guests : getRandomInteger(1, 10),
      checkin : getRandomArrayElement(TIMES),
      checkout : getRandomArrayElement(TIMES),
      features : getArrayRandomLength(FEATURES),
      description : getRandomArrayElement(DESTCRIPTIONS),
      photos : getArrayRandomLength(PHOTOS),
    },

  };
}

const ADVERTISEMENTS_COUNT = 10;

const advertisements = (count) => Array(count).fill(null).map(createAdvertisement);

advertisements(ADVERTISEMENTS_COUNT);
