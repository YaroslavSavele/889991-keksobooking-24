function getRandomInteger(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function getRandomDecimal(min, max, count) {
  const rand = min + Math.random() * (max - min);
  return Number(rand.toFixed(count));
}

getRandomInteger(1, 5);
getRandomDecimal(1, 5, 4);

const PICTURE_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
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

const getArrayRandomLength = (array) => {
  const resultArray = [];
  for (let i = 0; i <= getRandomInteger(0, array.length - 1); i++) {
    resultArray.push(array[i]);
  }
  return resultArray;
};

const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
};

function createObject() {
  return {
    author: {
      avatar : '',
    },
    location : {
      lat : 0,
      lng : 0,
    },
    offer : {
      title : getRandomArrayElement(TITLES),
      address : '',
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

const advertisements = [];
for (let i = 0; i < PICTURE_NUMBERS.length; i++) {
  const lat = getRandomDecimal(35.65000, 35.70000, 5);
  const lng = getRandomDecimal(139.70000, 139.80000, 5);
  const object = createObject();
  object['author']['avatar'] = `url(img/avatars/user${PICTURE_NUMBERS[i]}.png)`;
  object['offer']['address'] = `${lat}, ${lng}`;
  object['location']['lat'] = lat;
  object['location']['lng'] = lng;
  advertisements.push(object);
}

