'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var SHADDOW_SHIFT_X = CLOUD_X + 10;
var SHADDOW_SHIFT_Y = CLOUD_Y + 10;
var SUBSTRATE_OFFSET = 3;
var OFFSET_X = CLOUD_WIDTH / 20;
var OFFSET_Y = CLOUD_HEIGHT / 5 - 5;
var OFFSET_TEXT = 21;

var PADDING_ON_TOP = 85;
var BAR_HEIGHT = CLOUD_HEIGHT / 1.8;
var BAR_WIDTH = CLOUD_WIDTH / 10.5;
var BAR_GAP = CLOUD_WIDTH / 8.4;

var MAX_BLUE = 260;
var MIN_BLUE = 200;
var MAX_SATURATED = 70;
var MIN_SATURATED = 30;
var PURE_BRIGHT_COLOR = 50;
var SPECIAL_COLOR = 'rgba(255, 0, 0, 1)';

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

var renderHeaderMessage = function (ctx, numString) {
  ctx.fillStyle = '#000000';
  ctx.font = 'PT Mono 16px';
  for (var i = 0; i < numString; i++) {
    ctx.fillText('Ура! Вы победили!', CLOUD_X + OFFSET_X * 3, CLOUD_Y + OFFSET_TEXT);
    ctx.fillText('Список результатов:', CLOUD_X + OFFSET_X * 3, CLOUD_Y + OFFSET_TEXT * 2);
  }
};

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
  var h = Math.floor(Math.random() * (MAX_BLUE - MIN_BLUE)) + MIN_BLUE;
  var s = Math.floor(Math.random() * (MAX_SATURATED - MIN_SATURATED)) + MIN_SATURATED;
  var l = PURE_BRIGHT_COLOR;
  return ('hsl(' + h + ',' + s + '%,' + l + '%)');
};

window.renderStatistics = function (ctx, players, times) {
  var maxTime = getMaxElement(times);

  renderCloud(ctx, SHADDOW_SHIFT_X, SHADDOW_SHIFT_Y, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, getGradient(ctx));
  renderCloud(ctx, CLOUD_X + SUBSTRATE_OFFSET, CLOUD_Y + SUBSTRATE_OFFSET, CLOUD_WIDTH - SUBSTRATE_OFFSET * 2, CLOUD_HEIGHT - SUBSTRATE_OFFSET * 2, '#fff');
  renderLine(ctx, CLOUD_X + OFFSET_X, CLOUD_Y + OFFSET_Y, CLOUD_X + CLOUD_WIDTH - OFFSET_X, CLOUD_Y + OFFSET_Y);
  renderHeaderMessage(ctx, 2);

  for (var i = 0; i < players.length; i++) {
    var currentStartX = CLOUD_X + (BAR_WIDTH + BAR_GAP) * i + BAR_GAP;
    var currentStartY = BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime;

    ctx.fillStyle = '#000000';
    ctx.fillText(players[i], currentStartX, CLOUD_Y + CLOUD_HEIGHT - OFFSET_TEXT);

    ctx.fillText(Math.floor(times[i]), currentStartX, currentStartY + PADDING_ON_TOP);

    ctx.fillStyle = getRandomColor();
    if (players[i] === 'Вы') {
      ctx.fillStyle = SPECIAL_COLOR;
    }
    ctx.fillRect(currentStartX, currentStartY + PADDING_ON_TOP + 3, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
  }
};
