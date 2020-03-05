// -------------validation.js-----------------------//
// Проверка валидности поля ввода имени пользователя:
'use strict';

(function () {
  // 'use strict';
  var setupUserNameInput = document.querySelector('.setup').querySelector('.setup-user-name');

  setupUserNameInput.addEventListener('invalid', function () {
    if (setupUserNameInput.validity.toShort) {
      setupUserNameInput.setCustomValidity('Введите не менее 2х символов');
    } else if (setupUserNameInput.validity.tooLong) {
      setupUserNameInput.setCustomValidity('Введите не более 25и символов');
    } else if (setupUserNameInput.validity.valueMissing) {
      setupUserNameInput.setCustomValidity('Необходимо ввести не менее 2х и не более 25и символов');
    } else {
      // сбрасываем сообщение об ошибке, если значение стало корректно:
      setupUserNameInput.setCustomValidity('');
    }
  });
})();
