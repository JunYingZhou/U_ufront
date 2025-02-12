"use strict";
const common_vendor = require("../common/vendor.js");
const INTERCEPT_METHODS = ["switchTab", "navigateTo", "redirectTo", "reLaunch", "onLaunch"];
INTERCEPT_METHODS.forEach((method) => {
  console.log(`路由拦截器已启动: ${method}`);
  common_vendor.i.addInterceptor(method, {
    invoke(e) {
      const token = common_vendor.i.getStorageSync("token");
      const url = e.url.split("?")[0];
      console.log(`拦截到路由跳转请求: ${url}`, `token:----->`, token);
      if (url === "/pages/login/index") {
        console.log("目标是登录页面，允许跳转");
        return true;
      }
      if (!token) {
        console.log("需要登录，跳转到登录页面");
        common_vendor.i.showToast({
          title: "请先登录",
          icon: "none"
        });
        common_vendor.i.redirectTo({
          url: "/pages/login/index"
        });
        return false;
      } else {
        console.log("不需要登录，允许跳转");
        console.log("要跳转的页面是：", url);
        return true;
      }
    },
    fail(err) {
      console.error("拦截器失败:", err);
    }
  });
});
