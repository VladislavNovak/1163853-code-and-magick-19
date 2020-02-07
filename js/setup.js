'use strict';
// -------------объявления/переменные-----------------------//
var TOTAL_WIZARDS = 4;

var getRandomHSL = function () {
  var h = Math.floor(Math.random() * 360);
  var s = 50;
  var l = 50;
  return ('hsl(' + h + ',' + s + '%,' + l + '%)');
};

var pickColors = function (arrSize) {
  var arr = [];
  var color;
  for (var i = 0; i < arrSize; i++) {
    color = getRandomHSL();
    arr.push(color);
  }
  return arr;
};

var getRandomName = function (arr) {
  var name = Math.floor(Math.random() * (arr.length - 1));
  arr.splice(name, 1);
  return name;
};

var WIZARD_NAMES = ['Rabbit Helpless', 'Dreaded Foal', 'Desire Kit', 'Angel Dusty', 'Sweety Frozen', 'Heavy Wombat', 'Lost Puma', 'Vital Panda', 'Rolling Sun', 'Steel Runny', 'Young Fox', 'Needless Volunteer', 'Chipmunk Cult', 'Indigo Puppy'];
var wizardCoatColors = pickColors(TOTAL_WIZARDS);
var wizardEyesColors = pickColors(TOTAL_WIZARDS);
var wizardHandsColors = pickColors(TOTAL_WIZARDS);

var wizards = [
  {
    name: WIZARD_NAMES[getRandomName(WIZARD_NAMES)],
    coatColor: wizardCoatColors[0],
    eyesColor: wizardEyesColors[0],
    handsColor: wizardHandsColors[0]
  },
  {
    name: WIZARD_NAMES[getRandomName(WIZARD_NAMES)],
    coatColor: wizardCoatColors[1],
    eyesColor: wizardEyesColors[1],
    handsColor: wizardHandsColors[1]
  },
  {
    name: WIZARD_NAMES[getRandomName(WIZARD_NAMES)],
    coatColor: wizardCoatColors[2],
    eyesColor: wizardEyesColors[2],
    handsColor: wizardHandsColors[2]
  },
  {
    name: WIZARD_NAMES[getRandomName(WIZARD_NAMES)],
    coatColor: wizardCoatColors[3],
    eyesColor: wizardEyesColors[3],
    handsColor: wizardHandsColors[3]
  }
];

var fragment = document.createDocumentFragment();
// диалоговое окно:
var userDialog = document.querySelector('.overlay');
// нижняя часть диалогового окна, где будут размещены персонажи:
var footerData = document.querySelector('.setup-similar');
// здесь будем размещать похожих персонажей:
var elementList = userDialog.querySelector('.setup-similar-list');
// находим шаблон и из него находим div с 'волшебниками', который будем копировать:
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// -------------основная часть-----------------------//

// добавляем свойства конкретной единице 'волшебника':
var renderWizard = function (wizard) {
  var item = wizardTemplate.cloneNode(true);
  item.querySelector('.setup-similar-label').textContent = wizard.name;
  item.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  item.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  item.querySelector('.wizard-hands').style.fill = wizard.handsColor;

  return item;
};

// создаём 'волшебников' по количеству массива wizards и...
// добавляем в фрагмент (чтобы не возникло ненужных перерисовок):
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

elementList.appendChild(fragment);

// теперь можно показать окно с персонажами:
userDialog.classList.remove('hidden');
footerData.classList.remove('hidden');
