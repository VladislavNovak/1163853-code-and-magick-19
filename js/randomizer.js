// ------------randomizer.js--------------------
// модуль позволяет получить новое случайное число:
'use strict';

(function () {

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

  window.randomizer = {
    getRandomHSL: getRandomHSL,
    getRandomInstance: getRandomInstance,
  };

})();


