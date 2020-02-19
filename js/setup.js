'use strict';
// -------------объявления/переменные-----------------------//

var KEY_ESCAPE = 'Escape';
var KEY_ENTER = 'Enter';
var TOTAL_WIZARDS = 4;

var WIZARD_NAMES = ['Rabbit Helpless', 'Dreaded Foal', 'Desire Kit', 'Angel Dusty', 'Sweety Frozen', 'Heavy Wombat', 'Lost Puma', 'Vital Panda', 'Rolling Sun', 'Steel Runny', 'Young Fox', 'Needless Volunteer', 'Chipmunk Cult', 'Indigo Puppy'];
var COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)',];
var EYES = ['black', 'red', 'blue', 'yellow', 'green','lightblue', 'gray', 'olive', 'teal', 'darkgoldenrod', 'sienna', 'burlywood', 'azure', 'lightyellow',];
var SKIN = ['saddlebrown', 'brown', 'chocolate', 'darkgoldenrod', 'tan', 'burlywood', 'wheat', 'cornsilk', 'indianred',];
var wizards = [];

var fragment = document.createDocumentFragment();
// диалоговое окно:
var userDialog = document.querySelector('.setup');
// нижняя часть диалогового окна, где будут размещены персонажи:
var footerData = document.querySelector('.setup-similar');
// здесь будем размещать похожих персонажей:
var setupSimilarList = userDialog.querySelector('.setup-similar-list');
// находим шаблон и из него находим div с 'волшебниками', который будем копировать:
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
// кнопка вызова диалогового окна редактирования персонажа:
var setupOpen = document.querySelector('.setup-open');
// кнопка закрытия диалогового окна редактирования персонажа:
var setupClose = userDialog.querySelector('.setup-close');
// поле ввода имени пользователя:
var setupUserName = userDialog.querySelector('.setup-user-name');

// -------------Обработка нажатия клавиатуры-----------------------//

var buttonEscapeClosePopupHandler = function (evt) {
  if (evt.key === KEY_ESCAPE) {
    closePopup();
  }
};

// скрывает окно диалога
var openPopup = function () {
  userDialog.classList.remove('hidden');

  // Когда окно настройки персонажа открыто, нажатие на клавишу ESC закрывает диалог:
  document.addEventListener('keydown', buttonEscapeClosePopupHandler);
};

// открывает окно диалога
var closePopup = function () {
  userDialog.classList.add('hidden');
};

// Окно диалога открыватеся по нажатию на блок .setup-open (удаляем класс hidden):
setupOpen.addEventListener('click', function () {
  openPopup();
});

// Когда в фокусе .setup-open-icon (иконка пользователя), то окно настройки персонажа открывается по нажатию ENTER:
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === KEY_ENTER) {
    openPopup();
  }
});

// Окно .setup закрывается по нажатию на элемент .setup-close, расположенный внутри окна
setupClose.addEventListener('click', function () {
  closePopup();
});

// Если окно открыто и фокус находится на кнопке закрытия окна, то нажатие клавиши ENTER должно приводить к закрытию диалога:
setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === KEY_ENTER) {
    closePopup();
  }
});

// -------------DOM - операции-----------------------//

// удаляет класс 'hidden', открывая, таким образом, переданное окно-элемент:
var showWindow = function (item) {
    item.classList.remove('hidden');
};

// -------------Проверка валидности поля ввода имени пользователя-----------------------//

setupUserName.addEventListener('invalid', function (evt) {
  if (setupUserName.validity.toShort) {
    setupUserName.setCustomValidity('Введите не менее 2х символов');
  } else if (setupUserName.validity.tooLong) {
    setupUserName.setCustomValidity('Введите не более 25и символов');
  } else if (setupUserName.validity.valueMissing) {
    setupUserName.setCustomValidity('Необходимо ввести не менее 2х и не более 25и символов');
  } else {
    // сбрасываем сообщение об ошибке, если значение стало корректно:
    setupUserName.setCustomValidity('');
  }
});

// -------------Функции обработки-----------------------//

var getRandomHSL = function () {
  var h = Math.floor(Math.random() * 360);
  var s = 50;
  var l = 50;
  return ('hsl(' + h + ',' + s + '%,' + l + '%)');
};

// Находит случайное имя в массиве:
var getRandomInstance = function (array) {
  var instance = Math.floor(Math.random() * array.length);
  // Удаляем имя из массива, чтобы оно больше не повторялось:
  array.splice(instance, 1);
  return array[instance];
};

// -------------Кастомизация изображений-----------------------//

// Создаём массив с волшебниками и заполняем соответствующие свойства:
var createCollectionOfWizards = function (array, totalWizards) {
  for (var i = 0; i < totalWizards; i++) {
    array.push({
      name: getRandomInstance(WIZARD_NAMES),
      coatColor: getRandomInstance(COATS),
      eyesColor: getRandomInstance(EYES),
      handsColor: getRandomHSL(),
    });
  }

  return  array;
};

// добавляем свойства конкретной единице 'волшебника':
var setPropertiesToWizard = function (wizard) {
  var item = wizardTemplate.cloneNode(true);
  item.querySelector('.setup-similar-label').textContent = wizard.name;
  item.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  item.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  item.querySelector('.wizard-hands').style.fill = wizard.handsColor;

  return item;
};

// создаём 'волшебников' по количеству массива wizards и...
// добавляем в фрагмент (чтобы не возникло ненужных перерисовок):
var addCollectionToDOM = function (arrayOfWizards) {
  for (var i = 0; i < arrayOfWizards.length; i++) {
    var item = setPropertiesToWizard(arrayOfWizards[i]);
    fragment.appendChild(item);
  }

  setupSimilarList.appendChild(fragment);
};

// -------------Исполняемая часть программы-----------------------//

var collectionOfWizards = createCollectionOfWizards(wizards, TOTAL_WIZARDS);
addCollectionToDOM(collectionOfWizards);

showWindow(footerData);
showWindow(userDialog);
