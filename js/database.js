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

  var setPropertiesToWizard = function (wizard) {
    var item = wizardTemplate.cloneNode(true);
    item.querySelector('.setup-similar-label').textContent = wizard.name;
    item.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    item.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return item;
  };

  var successHandler = function (wizards) {
    for (var i = 0; i < TOTAL_WIZARDS; i++) {
      var wizard = setPropertiesToWizard(wizards[i]);
      fragment.appendChild(wizard);
    }

    setupSimilarList.appendChild(fragment);
    popupBottomView.classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var messageBlock = document.createElement('div');
    // добавить стили для блока (размеры, позицию, оформление типа размера и цвета текста)
    messageBlock.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', messageBlock);
  };

  window.backend.load(successHandler, errorHandler);

})();
