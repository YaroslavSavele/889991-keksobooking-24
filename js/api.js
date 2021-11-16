import {showAlert} from './util.js';
import {makesFiltersInactive} from './forms.js';
/**
 * Получает данные с сервера о похожих объявлениях,
 * в случае ошибки соединения с сервером, показывает
 * сообщение об ошибке
 */
const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        showAlert('Не удалось получить данные с сервера');
        makesFiltersInactive();
      }
    })
    .then((advertisements) => {
      onSuccess(advertisements);
    })
    .catch(() => {
      showAlert('Не удалось получить данные с сервера');
    });
};

/**
 * Отправляет на сервер данные формы, если данные отправленны успешно -
 * показывает сообщение об успешной отправке,
 * если отправить не удалось - показывает сообщение об этом
 * @param {*} onSuccess Функция, показывающее сообщение в случае успешной отправки формы
 * @param {*} onFail Функция, показывающая сообщение в случае ошибки отправки формы
 * @param {*} body Данные формы в виде FormData
 */
const setData = (onSuccess, onFail, body) => {
  fetch('https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if(response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  })
    .catch(() => {
      onFail();
    });
};
export {getData, setData};
