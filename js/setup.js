'use strict';
// -------------объявления/переменные-----------------------//

var KEY_ESCAPE = 'Escape';
var KEY_ENTER = 'Enter';
var TOTAL_WIZARDS = 4;

var WIZARD_NAMES = ['Rabbit Helpless', 'Dreaded Foal', 'Desire Kit', 'Angel Dusty', 'Sweety Frozen', 'Heavy Wombat', 'Lost Puma', 'Vital Panda', 'Rolling Sun', 'Steel Runny', 'Young Fox', 'Needless Volunteer', 'Chipmunk Cult', 'Indigo Puppy'];
var COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES = ['black', 'red', 'blue', 'yellow', 'green', 'lightblue', 'gray', 'olive', 'teal', 'darkgoldenrod', 'sienna', 'burlywood', 'azure', 'lightyellow'];
var FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

// диалоговое окно и его элементы (кнопка закрытия, поле ввода имени):
var POPUP = document.querySelector('.setup');
var SETUP_CLOSE = POPUP.querySelector('.setup-close');
var SETUP_USER_NAME_INPUT = POPUP.querySelector('.setup-user-name');
// нижняя часть диалогового окна, где будут размещены персонажи:
var POPUP_BOTTOM_VIEW = POPUP.querySelector('.setup-similar');
// здесь будем размещать похожих персонажей:
var SETUP_SIMILAR_LIST = POPUP.querySelector('.setup-similar-list');
// кнопка вызова диалогового окна редактирования персонажа:
var SETUP_OPEN = document.querySelector('.setup-open');

// находим шаблон и из него находим div с 'волшебниками', который будем копировать:
var WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var FRAGMENT = document.createDocumentFragment();

// 'основной' 'волшебник'
var MAIN_WIZARD_COAT = POPUP.querySelector('.setup-player').querySelector('.wizard-coat');
var MAIN_WIZARD_COAT_INPUT = POPUP.querySelector('.setup-player').querySelector('input[name="coat-color"]');
var MAIN_WIZARD_EYES = POPUP.querySelector('.setup-player').querySelector('.wizard-eyes');
var MAIN_WIZARD_EYES_INPUT = POPUP.querySelector('.setup-player').querySelector('input[name="eyes-color"]');
var MAIN_WIZARD_FIREBALL = POPUP.querySelector('.setup-player').querySelector('.setup-fireball');
var MAIN_WIZARD_FIREBALL_INPUT = POPUP.querySelector('.setup-player').querySelector('input[name="fireball-color"]');

// -------------Общие функции обработки-----------------------//

var getRandomHSL = function () {
  var h = Math.floor(Math.random() * 360);
  var s = 50;
  var l = 50;
  return ('hsl(' + h + ',' + s + '%,' + l + '%)');
};

// Находит случайное имя в массиве:
var getRandomInstance = function (array) {
  var randomItem = Math.floor(Math.random() * array.length);
  // этот экземпляр будем возвращать:
  var instance = array[randomItem];
  // но! должен оставаться хотя бы один элемент:
  if (array.length > 1) {
    // Удаляем имя из массива, чтобы оно больше не повторялось:
    array.splice(randomItem, 1);
  }

  return instance;
};

// -------------Кастомизация изображений-----------------------//

// Создаём массив с волшебниками и заполняем соответствующие свойства:
var createWizardDatabase = function (totalWizards) {
  var array = [];
  for (var i = 0; i < totalWizards; i++) {
    array.push({
      name: getRandomInstance(WIZARD_NAMES),
      coatColor: getRandomInstance(COATS),
      eyesColor: getRandomInstance(EYES),
      handsColor: getRandomHSL(),
    });
  }

  return array;
};

// клонируем шаблон из DOM и добавляем свойства конкретной единице 'волшебника':
var setPropertiesToWizard = function (wizard) {
  var item = WIZARD_TEMPLATE.cloneNode(true);
  item.querySelector('.setup-similar-label').textContent = wizard.name;
  item.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  item.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  item.querySelector('.wizard-hands').style.fill = wizard.handsColor;

  return item;
};

// создаём 'волшебников' по количеству массива wizards и добавляем в фрагмент, а затем и в DOM:
var addCollectionToDOM = function (arrayOfWizards) {
  for (var i = 0; i < arrayOfWizards.length; i++) {
    var item = setPropertiesToWizard(arrayOfWizards[i]);
    FRAGMENT.appendChild(item);
  }

  SETUP_SIMILAR_LIST.appendChild(FRAGMENT);
  POPUP_BOTTOM_VIEW.classList.remove('hidden');
};

// -------------Исполняемая часть программы-----------------------//

// создает базу с данными 'волшебников'
var collectionOfWizards = createWizardDatabase(TOTAL_WIZARDS);
// заполняет DOM-элементы данными из базы с 'волшебниками'
addCollectionToDOM(collectionOfWizards);

// -------------Взаимодействие с окном POPUP-----------------------//

// есть ли на SETUP_USER_NAME_INPUT фокус
var isFocusInput = false;

SETUP_USER_NAME_INPUT.addEventListener('focus', function () {
  isFocusInput = true;
});

SETUP_USER_NAME_INPUT.addEventListener('blur', function () {
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
  POPUP.classList.remove('hidden');
  // Когда окно настройки персонажа открыто, нажатие на клавишу ESC закрывает диалог:
  document.addEventListener('keydown', onPopupPressEscape);
};

// закрывает окно диалога
var closePopup = function () {
  POPUP.classList.add('hidden');
  // Когда окно настройки персонажа открыто, нажатие на клавишу ESC закрывает диалог:
  document.addEventListener('keydown', onPopupPressEscape);
};

// POPUP открыватеся по нажатию на блок .setup-open (удаляем класс hidden):
SETUP_OPEN.addEventListener('click', function () {
  openPopup();
});

// Когда SETUP_OPEN (иконка пользователя) в фокусе, то...
SETUP_OPEN.addEventListener('keydown', function (evt) {
  // окно настройки персонажа открывается по нажатию ENTER:
  if (evt.key === KEY_ENTER) {
    openPopup();
  }
});

// POPUP закрывается по нажатию на элемент .setup-close, расположенный внутри окна
SETUP_CLOSE.addEventListener('click', function () {
  closePopup();
});

// Если POPUP открыт и фокус находится на кнопке закрытия окна, то...
SETUP_CLOSE.addEventListener('keydown', function (evt) {
  // нажатие клавиши ENTER должно приводить к закрытию диалога:
  if (evt.key === KEY_ENTER) {
    closePopup();
  }
});

// -------------Взаимодействие с основным 'волшебником'-----------------------//

// последовательно для coat, eyes, fireball:
// находим один из цветов, закрашиваем div, заполняем input для отправки на сервер:
var setNewCoatColor = function () {
  var color = getRandomInstance(COATS);
  MAIN_WIZARD_COAT.style.fill = color;
  MAIN_WIZARD_COAT_INPUT.value = color;
};

var setNewEyesColor = function () {
  var color = getRandomInstance(EYES);
  MAIN_WIZARD_EYES.style.fill = color;
  MAIN_WIZARD_EYES_INPUT.value = color;
};

var setNewFireballColor = function () {
  var color = getRandomInstance(FIREBALL);
  MAIN_WIZARD_FIREBALL.style.backgroundColor = color;
  MAIN_WIZARD_FIREBALL_INPUT.value = color;
};

MAIN_WIZARD_COAT.addEventListener('click', function () {
  setNewCoatColor();
});

MAIN_WIZARD_EYES.addEventListener('click', function () {
  setNewEyesColor();
});

MAIN_WIZARD_FIREBALL.addEventListener('click', function () {
  setNewFireballColor();
});

// -------------Проверка валидности поля ввода имени пользователя-----------------------//

SETUP_USER_NAME_INPUT.addEventListener('invalid', function () {
  if (SETUP_USER_NAME_INPUT.validity.toShort) {
    SETUP_USER_NAME_INPUT.setCustomValidity('Введите не менее 2х символов');
  } else if (SETUP_USER_NAME_INPUT.validity.tooLong) {
    SETUP_USER_NAME_INPUT.setCustomValidity('Введите не более 25и символов');
  } else if (SETUP_USER_NAME_INPUT.validity.valueMissing) {
    SETUP_USER_NAME_INPUT.setCustomValidity('Необходимо ввести не менее 2х и не более 25и символов');
  } else {
    // сбрасываем сообщение об ошибке, если значение стало корректно:
    SETUP_USER_NAME_INPUT.setCustomValidity('');
  }
});
