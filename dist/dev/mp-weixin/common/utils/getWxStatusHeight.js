"use strict";
const common_vendor = require("../vendor.js");
function getWXStatusHeight() {
  const barTop = common_vendor.w.getSystemInfoSync().statusBarHeight;
  const menuButtonInfo = common_vendor.w.getMenuButtonBoundingClientRect();
  const barHeight = menuButtonInfo.height + (menuButtonInfo.top - barTop) * 2;
  let barWidth = menuButtonInfo.width;
  return {
    barHeight,
    barTop,
    barWidth,
    menuButtonInfo
  };
}
exports.g = getWXStatusHeight;
