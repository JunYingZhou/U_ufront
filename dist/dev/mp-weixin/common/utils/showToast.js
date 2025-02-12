"use strict";
const common_vendor = require("../vendor.js");
const showToast = (title) => {
  common_vendor.i.showToast({
    icon: "none",
    title
  });
};
exports.s = showToast;
