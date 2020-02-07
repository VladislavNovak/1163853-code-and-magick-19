'use strict';
//-------------объявления/переменные-----------------------//
var WIZARD_NAMES = ['Дамблдор', 'Волдеморт', 'Доктор Стрендж', 'Гарри Поттер'];
var wizards = [
  {
    name: WIZARD_NAMES[0],
    coatColor: '#ff6a00',
    eyesColor: '#ff7fb6',
    handsColor: '#ffffff'
  },
  {
    name: WIZARD_NAMES[1],
    coatColor: '#b6ff00',
    eyesColor: '#ff6a00',
    handsColor: '#c0c0c0'
  },
  {
    name: WIZARD_NAMES[2],
    coatColor: '#0094ff',
    eyesColor: '#7fffc5',
    handsColor: '#7f593f'
  },
  {
    name: WIZARD_NAMES[3],
    coatColor: '#ff7fed',
    eyesColor: '#b6ff00',
    handsColor: '#404040'
  }
];

var fragment = document.createDocumentFragment();

//диалоговое окно:
var userDialog = document.querySelector('.overlay');
//нижняя часть диалогового окна, где будут размещены персонажи:
var footerData = document.querySelector('.setup-similar');
//здесь будем размещать похожих персонажей:
var elementList = userDialog.querySelector('.setup-similar-list');
//находим шаблон и из него находим div с 'волшебниками', который будем копировать:
var wizardTmpl = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

//-------------основная часть-----------------------//

//добавляем свойства конкретной единице 'волшебника':
var renderWizard = function (wizard) {
  var item = wizardTmpl.cloneNode(true);
  item.querySelector('.setup-similar-label').textContent = wizard.name;
  item.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  item.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  item.querySelector('.wizard-hands').style.fill = wizard.handsColor;

  return item;
};

//создаём 'волшебников' по количеству массива wizards и...
//добавляем в фрагмент (чтобы не возникло ненужных перерисовок):
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

elementList.appendChild(fragment);

//теперь можно показать окно с персонажами:
userDialog.classList.remove('hidden');
footerData.classList.remove('hidden');
