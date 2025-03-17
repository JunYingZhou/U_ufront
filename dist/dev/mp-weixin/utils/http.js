"use strict";
const common_vendor = require("../common/vendor.js");
const base_url = "http://192.168.1.199:8000";
const timeout = 5e3;
const request = (params) => {
  console.log(params);
  let url = params.url;
  let method = params.method || "get";
  let data = params.data || {};
  let header = {
    // 'Blade-Auth': uni.getStorageSync('token') || '',
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: `Bearer ${common_vendor.i.getStorageSync("token")}`,
    // 'X-Authorization': 'Bearer ' + uni.getStorageSync('token'),
    // 'Authorization': 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
    // 'Tenant-Id': uni.getStorageSync('tenantId') || 'xxx', // avue配置相关
    ...params.header
  };
  if (method == "post") {
    header = {
      "Content-Type": "application/json"
    };
  }
  return new Promise((resolve, reject) => {
    common_vendor.i.request({
      url: base_url + url,
      method,
      header,
      data,
      timeout,
      success(response) {
        const res = response;
        if (res.statusCode == 200) {
          if (res.data.code == 200 || res.data.code == 0) {
            resolve(res.data);
          } else {
            const code = Number(res.data.code);
            common_vendor.i.clearStorageSync();
            switch (code) {
              case 401:
                common_vendor.i.showModal({
                  title: "提示",
                  content: "请登录",
                  showCancel: false,
                  success() {
                    common_vendor.i.reLaunch({
                      url: "/pages/login/index"
                    });
                  }
                });
                break;
              case 404:
                console.log("请求地址不存在");
                common_vendor.i.showToast({
                  title: res.data.msg,
                  duration: 2e3
                });
                resolve(res.data);
                break;
              case 400:
                console.log("请求参数错误");
                common_vendor.i.showToast({
                  title: res.data.msg,
                  duration: 2e3
                });
                resolve(res.data);
                break;
              default:
                console.log("其他错误");
                common_vendor.i.showModal({
                  title: res.data.msg,
                  duration: 2e3
                });
                resolve(res.data);
                break;
            }
          }
        }
      },
      fail(err) {
        if (err.errMsg.indexOf("request:fail") !== -1) {
          common_vendor.i.showToast({
            title: "网络异常",
            icon: "error",
            duration: 2e3
          });
        } else {
          common_vendor.i.showToast({
            title: "未知异常",
            duration: 2e3
          });
        }
        reject(err);
      },
      complete() {
        common_vendor.i.hideLoading();
        common_vendor.i.hideToast();
      }
    });
  }).catch(() => {
  });
};
exports.r = request;
