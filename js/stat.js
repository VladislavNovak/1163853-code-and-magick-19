'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 20;
var CLOUD_WIDTH = 500;
var CLOUD_HEIGHT = 260;
var SHADDOW_SHIFT_X = CLOUD_X + 10;
var SHADDOW_SHIFT_Y = CLOUD_Y + 10;
var SUBSTRATE_OFFSET = 5;
var OFFSET_X = CLOUD_WIDTH / 20;
var OFFSET_Y = CLOUD_HEIGHT / 5 - 5;
var OFFSET_TEXT = 20;
var COLUMN_WIDTH = (CLOUD_WIDTH - OFFSET_X * 2) / 4;
var COLUMN_PADDINGS = CLOUD_WIDTH / 10;
var BAR_HEIGHT = CLOUD_HEIGHT / 2;

// отрисовываем окна
var renderCloud = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var renderLine = function (ctx, x, y, endX, endY) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(endX, endY);
  ctx.stroke();
};

var renderMessage = function (ctx) {
  ctx.fillStyle = '#000000';
  ctx.font = 'italic 15px Arial';
  ctx.fillText('Ура! Вы победили!', CLOUD_X + OFFSET_X, CLOUD_Y + OFFSET_TEXT);
  ctx.fillText('Список результатов:', CLOUD_X + OFFSET_X, CLOUD_Y + OFFSET_TEXT * 2);
};

// находим максимальный элемент
var getMaxElement = function (arr) {

  var maxTime = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxTime) {
      maxTime = arr[i];
    }
  }
  return maxTime;
};

var getGradient = function (ctx) {
  var gradient = ctx.createLinearGradient(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
  gradient.addColorStop(0, '#C0C0C0');
  gradient.addColorStop(0.5, '#404040');
  ctx.fillStyle = gradient;
};

var getRandomColor = function () {
  var r = Math.floor(Math.random() * (256));
  var g = Math.floor(Math.random() * (256));
  var b = Math.floor(Math.random() * (256));
  return ('#' + r.toString(16) + g.toString(16) + b.toString(16));
};

// main
window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, SHADDOW_SHIFT_X, SHADDOW_SHIFT_Y, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, getGradient(ctx));
  renderCloud(ctx, CLOUD_X + SUBSTRATE_OFFSET, CLOUD_Y + SUBSTRATE_OFFSET, CLOUD_WIDTH - SUBSTRATE_OFFSET * 2, CLOUD_HEIGHT - SUBSTRATE_OFFSET * 2, '#fff');

  renderLine(ctx, CLOUD_X + OFFSET_X, CLOUD_Y + OFFSET_Y, CLOUD_X + CLOUD_WIDTH - OFFSET_X, CLOUD_Y + OFFSET_Y);
  renderLine(ctx, CLOUD_X + OFFSET_X, CLOUD_Y + CLOUD_HEIGHT - OFFSET_Y, CLOUD_X + CLOUD_WIDTH - OFFSET_X, CLOUD_Y + CLOUD_HEIGHT - OFFSET_Y);

  var maxTime = getMaxElement(times);

  renderMessage(ctx);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000000';
    ctx.fillText(players[i], CLOUD_X + COLUMN_PADDINGS + COLUMN_WIDTH * i + 12, CLOUD_Y + CLOUD_HEIGHT - 25);
    ctx.fillText(Math.floor(times[i]), CLOUD_X + COLUMN_PADDINGS + COLUMN_WIDTH * i + 12, BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime + 85);

    ctx.fillStyle = getRandomColor();
    ctx.fillRect(CLOUD_X + COLUMN_PADDINGS + COLUMN_WIDTH * i, BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime + 88, COLUMN_WIDTH - COLUMN_PADDINGS, (BAR_HEIGHT * times[i]) / maxTime);
  }
};
