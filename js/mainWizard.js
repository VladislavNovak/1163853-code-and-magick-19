// -------------mainWizard.js-----------------------//
// Взаимодействие с основным 'волшебником':
'use strict';

(function () {
  // 'основной' 'волшебник'
  var popup = document.querySelector('.setup');
  var mainWizardCoat = popup.querySelector('.setup-player').querySelector('.wizard-coat');
  var mainWizardCoatInput = popup.querySelector('.setup-player').querySelector('input[name="coat-color"]');
  var mainWizardEyes = popup.querySelector('.setup-player').querySelector('.wizard-eyes');
  var mainWizardEyesInput = popup.querySelector('.setup-player').querySelector('input[name="eyes-color"]');
  var mainWizardFireball = popup.querySelector('.setup-player').querySelector('.setup-fireball');
  var mainWizardFireballInput = popup.querySelector('.setup-player').querySelector('input[name="fireball-color"]');

  // последовательно для coat, eyes, fireball:
  // находим один из цветов, закрашиваем div, заполняем input для отправки на сервер:
  var setNewCoatColor = function () {
    var color = window.randomizer.getRandomInstance(window.appearance.coats);
    mainWizardCoat.style.fill = color;
    mainWizardCoatInput.value = color;
  };

  var setNewEyesColor = function () {
    var color = window.randomizer.getRandomInstance(window.appearance.eyes);
    mainWizardEyes.style.fill = color;
    mainWizardEyesInput.value = color;
  };

  var setNewFireballColor = function () {
    var color = window.randomizer.getRandomInstance(window.appearance.fireball);
    mainWizardFireball.style.backgroundColor = color;
    mainWizardFireballInput.value = color;
  };

  mainWizardCoat.addEventListener('click', function () {
    setNewCoatColor();
  });

  mainWizardEyes.addEventListener('click', function () {
    setNewEyesColor();
  });

  mainWizardFireball.addEventListener('click', function () {
    setNewFireballColor();
  });

})();

