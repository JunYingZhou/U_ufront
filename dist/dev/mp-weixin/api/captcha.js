"use strict";
const utils_http = require("../utils/http.js");
const getImageCaptcha = () => {
  return utils_http.r({
    // url: '/api/captcha/image',
    url: "/captcha/image",
    method: "get"
    // responseType: 'blob'
  });
};
exports.g = getImageCaptcha;
