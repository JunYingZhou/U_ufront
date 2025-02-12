"use strict";
const utils_http = require("../utils/http.js");
const accountSignUp = (params) => {
  return utils_http.r({
    url: "/auth/signUp",
    method: "post",
    data: params
  });
};
const accountLogin = (params) => {
  return utils_http.r({
    url: "/auth/account",
    method: "post",
    data: params
  });
};
const weiXinLogin = (params) => {
  return utils_http.r({
    url: "/auth/openId",
    method: "post",
    data: params
  });
};
const getUserInfo = (params) => {
  return utils_http.r({
    url: `/system/user/${params}`,
    method: "get"
  });
};
exports.a = accountSignUp;
exports.b = accountLogin;
exports.g = getUserInfo;
exports.w = weiXinLogin;
