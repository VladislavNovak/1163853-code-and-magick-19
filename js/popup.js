// -------------popup.js-----------------------//
// Взаимодействие с окном popup:
'use strict';

(function () {
  var KEY_ESCAPE = 'Escape';
  var KEY_ENTER = 'Enter';

  // диалоговое окно и его элементы (кнопка закрытия, поле ввода имени):
  var popup = document.querySelector('.setup');
  var setupClose = popup.querySelector('.setup-close');
  var setupUserNameInput = popup.querySelector('.setup-user-name');
  // кнопка вызова диалогового окна редактирования персонажа:
  var setupOpen = document.querySelector('.setup-open');
  var form = popup.querySelector('.setup-wizard-form');

  // флаг: есть ли на setupUserNameInput фокус:
  var isFocusInput = false;

  setupUserNameInput.addEventListener('focus', function () {
    isFocusInput = true;
  });

  setupUserNameInput.addEventListener('blur', function () {
    isFocusInput = false;
  });

  // если нажата ESC и нет фокуса на инпуте, то окно можно зактыть:
  var onPopupPressEscape = function (evt) {
    if (evt.key === KEY_ESCAPE && !isFocusInput) {
      closePopup();
    }
  };

  // открывает окно диалога
  var openPopup = function () {
    popup.classList.remove('hidden');
    // Когда окно настройки персонажа открыто, нажатие на клавишу ESC закрывает диалог:
    document.addEventListener('keydown', onPopupPressEscape);
  };

  // закрывает окно диалога
  var closePopup = function () {
    popup.classList.add('hidden');

    // при закрытии окна, его положение смещается в первоначальное - нулевое по XY:
    popup.style.top = '';
    popup.style.left = '';

    // Когда окно настройки персонажа открыто, нажатие на клавишу ESC закрывает диалог:
    document.addEventListener('keydown', onPopupPressEscape);
  };

  // popup открыватеся по нажатию на блок .setup-open (удаляем класс hidden):
  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  // Когда setupOpen (иконка пользователя) в фокусе, то...
  setupOpen.addEventListener('keydown', function (evt) {
    // окно настройки персонажа открывается по нажатию ENTER:
    if (evt.key === KEY_ENTER) {
      openPopup();
    }
  });

  // popup закрывается по нажатию на элемент .setup-close, расположенный внутри окна
  setupClose.addEventListener('click', function () {
    closePopup();
  });

  // Если popup открыт и фокус находится на кнопке закрытия окна, то...
  setupClose.addEventListener('keydown', function (evt) {
    // нажатие клавиши ENTER должно приводить к закрытию диалога:
    if (evt.key === KEY_ENTER) {
      closePopup();
    }
  });

  // --------------возможность перемещения диалогового окна----------------
  var upload = popup.querySelector('.upload');

  upload.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var dragged = false;

    var startXY = {
      x: evt.clientX,
      y: evt.clientY,
    };

    // отслеживаем перемещение:
    var onMouseMove = function (eventMove) {
      eventMove.preventDefault();

      dragged = true;

      var shift = {
        x: startXY.x - eventMove.clientX,
        y: startXY.y - eventMove.clientY,
      };

      startXY = {
        x: eventMove.clientX,
        y: eventMove.clientY,
      };

      popup.style.top = (popup.offsetTop - shift.y) + 'px';
      popup.style.left = (popup.offsetLeft - shift.x) + 'px';
    };

    // при отпускании мыши:
    var onMouseUp = function (eventUp) {
      eventUp.preventDefault();

      if (dragged) {
        var onClickPreventDefault = function (eventClick) {
          eventClick.preventDefault();

          upload.removeEventListener('click', onClickPreventDefault);
        };

        upload.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // --------------сохранение формы (и отправка на сервер) при нажатии на submit----------------
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      popup.classList.add('hidden');
    });
    evt.preventDefault();
  });
})();
