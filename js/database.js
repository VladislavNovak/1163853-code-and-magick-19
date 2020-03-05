// -------------database.js-----------------------//
// создаёт экземпляры "волшебников" и отрисовывает их на основе tamplate:
'use strict';

(function () {
  var TOTAL_WIZARDS = 4;

  // нижняя часть диалогового окна, где будут размещены персонажи:
  var popupBottomView = document.querySelector('.setup').querySelector('.setup-similar');
  // здесь будем размещать похожих персонажей:
  var setupSimilarList = document.querySelector('.setup').querySelector('.setup-similar-list');
  // находим шаблон и из него находим div с 'волшебниками', который будем копировать:
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();

  // Создаём массив с волшебниками и заполняем соответствующие свойства:
  var createWizardDatabase = function (totalWizards) {
    var array = [];
    for (var i = 0; i < totalWizards; i++) {
      array.push({
        name: window.randomizer.getRandomInstance(window.appearance.wizardNames),
        coatColor: window.randomizer.getRandomInstance(window.appearance.coats),
        eyesColor: window.randomizer.getRandomInstance(window.appearance.eyes),
        handsColor: window.randomizer.getRandomHSL(),
      });
    }

    return array;
  };

  // клонируем шаблон из DOM и добавляем свойства конкретной единице 'волшебника':
  var setPropertiesToWizard = function (wizard) {
    var item = wizardTemplate.cloneNode(true);
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
      fragment.appendChild(item);
    }

    setupSimilarList.appendChild(fragment);
    popupBottomView.classList.remove('hidden');
  };

  // -------------Исполняемая часть программы-----------------------//

  // создает базу с данными 'волшебников'
  var collectionOfWizards = createWizardDatabase(TOTAL_WIZARDS);
  // заполняет DOM-элементы данными из базы с 'волшебниками'
  addCollectionToDOM(collectionOfWizards);

})();

