"use strict";
const utils_http = require("../utils/http.js");
const queryAllCommentByArticle = (articleId) => {
  return utils_http.r({
    url: `/anti/comment/queryById/${articleId}`,
    method: "get"
  });
};
exports.q = queryAllCommentByArticle;
