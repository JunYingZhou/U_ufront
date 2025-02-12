"use strict";
const utils_http = require("../utils/http.js");
const getCategoryList = () => {
  return utils_http.r({
    url: "/anti/category/list",
    method: "get"
  });
};
exports.g = getCategoryList;
