// -------------backend.js-----------------------//
// аспекты внешнего вида "волшебников":
'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200,
  };
  // ------------Отправляет данные на сервер-----------------------------------------------------
  // функция отправляет данные игрока на сервер, обрабатывает ошибки и скрывает форму редактирования персонажа:
  var load = function (onSuccess, onError) {
    // адрес сервера, на который должны отправиться данные:
    var URLToLoad = 'https://js.dump.academy/code-and-magick/data';

    var httpRequest = new XMLHttpRequest();
    httpRequest.responseType = 'json';

    httpRequest.addEventListener('load', function () {
      if (httpRequest === StatusCode.OK) {
        onSuccess(httpRequest.response);
      } else {
        // onError — функция обратного вызова, которая срабатывает при неуспешном выполнении запроса.
        // При вызове функции onError в её единственный параметр передаётся сообщение об ошибке;
        // onError('Статус ответа: ' + httpRequest.status + ' ' + httpRequest.statusText);
        onError('Статус ответа: ' + httpRequest.status + ' ' + httpRequest.statusText);
      }
    });

    httpRequest.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    httpRequest.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + httpRequest.timeout + 'мс');
    });

    httpRequest.timeout = TIMEOUT_IN_MS; // 10s
    httpRequest.open('GET', URLToLoad);
    httpRequest.send();
  };

  // -------Загрузка данных на сервер (сохранение данных формы)----------------------------------------------------
  var save = function (data, onSuccess, onError) {
    var URLToSave = 'https://js.dump.academy/code-and-magick';

    var httpRequest = new XMLHttpRequest();
    httpRequest.responseType = 'json';

    // onLoad — функция обратного вызова, которая срабатывает при успешном выполнении запроса
    // При вызове функции onLoad в её единственный параметр передаётся набор полученных данных:
    httpRequest.addEventListener('load', function () {
      if (httpRequest === StatusCode.OK) {
        onSuccess(httpRequest.response);
      } else {
        // onError — функция обратного вызова, которая срабатывает при неуспешном выполнении запроса.
        // При вызове функции onError в её единственный параметр передаётся сообщение об ошибке;
        onError('Статус ответа: ' + httpRequest.status + ' ' + httpRequest.statusText);
      }
    });

    httpRequest.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    httpRequest.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + httpRequest.timeout + 'мс');
    });

    httpRequest.open('POST', URLToSave);
    // data — объект FormData, который содержит данные формы, которые будут отправлены на сервер:
    httpRequest.send(data);
  };

  window.backend = {
    load: load,
    save: save,
  };
})();
