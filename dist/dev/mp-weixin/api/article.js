"use strict";
const utils_http = require("../utils/http.js");
const getArticleList = () => {
  return utils_http.r({
    url: "/anti/article/list",
    method: "get"
  });
};
const addArticle = (params) => {
  return utils_http.r({
    url: "/anti/article/addArticle",
    method: "post",
    data: params
  });
};
exports.a = addArticle;
exports.g = getArticleList;
