"use strict";
const common_vendor = require("../../common/vendor.js"), common_assets = require("../../common/assets.js"), api_user = require("../../api/user.js");
require("../../stores/index.js");
const api_captcha = require("../../api/captcha.js"), utils_encrypt = require("../../utils/encrypt.js"), stores_modules_userStore = require("../../stores/modules/userStore.js");
const _sfc_main = /* @__PURE__ */ common_vendor.b({
  __name: "index",
  setup(__props) {
    const userStore = stores_modules_userStore.u();
    const formData = common_vendor.r({
      // username: 'tenant@thingsboard.org',
      username: "admin",
      // password: 'WissonRobotics2024',
      password: "admin123",
      uuid: "",
      captcha: "",
      expired: false
      // 验证码是否过期
    });
    const weixinLoginFormData = common_vendor.r({
      code: "",
      errMsg: ""
    });
    const userNameError = common_vendor.r(true);
    let timer;
    const captchaImageBase64 = common_vendor.r("");
    common_vendor.o(async () => {
      await getCaptcha();
    });
    const getCaptcha = async () => {
      console.log("获取验证码");
      try {
        const res = await api_captcha.g();
        const { uuid, img, expireTime } = res.data;
        console.log("验证码数据:", res.data);
        formData.value.uuid = uuid;
        if (res.data && img) {
          captchaImageBase64.value = img;
          formData.value.expired = false;
        } else {
          console.error("验证码图片数据无效");
        }
        startTimer(expireTime);
      } catch (error) {
      }
    };
    const startTimer = (expireTime) => {
      if (timer) {
        clearTimeout(timer);
      }
      const remainingTime = expireTime - Date.now();
      if (remainingTime <= 0) {
        formData.value.expired = true;
        return;
      }
      timer = setTimeout(() => {
        formData.value.expired = true;
      }, remainingTime);
    };
    common_vendor.e(() => {
      if (timer) {
        clearTimeout(timer);
      }
    });
    const login = async () => {
      if (!formData.value.username) {
        userNameError.value = false;
      }
      try {
        const res = await api_user.b({
          username: formData.value.username,
          password: utils_encrypt.e(formData.value.password) || "",
          uuid: formData.value.uuid,
          captcha: formData.value.captcha
        });
        if (res.msg == "ok") {
          common_vendor.i.showToast({
            icon: "none",
            title: "成功登录"
          });
          userStore.setToken(res.data.token);
          userStore.setUserId(res.data.userId);
          console.log("token数据", common_vendor.i.getStorageSync("token"));
          common_vendor.i.switchTab({ url: "/pages/index/index" });
        } else {
          common_vendor.i.showToast({
            icon: "none",
            title: res.msg
          });
          formData.value.captcha = "";
          await getCaptcha();
        }
      } catch (error) {
        console.error("Login error:", error);
        common_vendor.i.showToast({
          icon: "none",
          title: "An error occurred"
        });
      }
    };
    const weixinLogin = () => {
      common_vendor.i.login({
        provider: "weixin",
        success: function(loginRes) {
          weixinLoginFormData.value = loginRes;
          common_vendor.i.getUserInfo({
            provider: "weixin",
            success: function(info) {
              console.log(info, "getUserInfo", weixinLoginFormData.value, "loginRes");
            }
          });
          getOpenId(weixinLoginFormData.value.code);
        },
        fail: function(err) {
          common_vendor.i.showModal({
            title: "登录失败",
            content: err.errMsg,
            showCancel: false
          });
        }
      });
    };
    const getOpenId = (code) => {
      console.log("adsasdasdad", code);
      common_vendor.i.request({
        url: "https://api.weixin.qq.com/sns/jscode2session",
        // 请求微信服务器
        method: "GET",
        data: {
          appid: "wxbd07dfc22497c8a8",
          //你的小程序的APPID
          secret: "0a0c609018dcbb1e8877800fc542b7f6",
          //你的小程序秘钥secret,  
          js_code: code,
          //wx.login 登录成功后的code
          grant_type: "authorization_code"
          //此处为固定值
        },
        success: (res) => {
          console.log("获取openId", res);
          api_user.w({
            openId: res.data.openid,
            sessionKey: res.data.session_key
          }).then((res2) => {
            console.log("获取openId123", res2);
            if (res2.msg === "ok") {
              common_vendor.i.showToast({
                icon: "none",
                title: "成功登录"
              });
              userStore.setUserId(res2.data.userId);
              userStore.setToken(res2.data.token);
              console.log("token数据", common_vendor.i.getStorageSync("token"));
              common_vendor.i.switchTab({ url: "/pages/index/index" });
            } else {
              common_vendor.i.showToast({
                icon: "none",
                title: res2.msg
              });
            }
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.k({
        a: formData.value.username,
        b: common_vendor.f(($event) => formData.value.username = $event.detail.value),
        c: formData.value.password,
        d: common_vendor.f(($event) => formData.value.password = $event.detail.value),
        e: formData.value.captcha,
        f: common_vendor.f(($event) => formData.value.captcha = $event.detail.value),
        g: captchaImageBase64.value,
        h: common_vendor.f(getCaptcha),
        i: formData.value.expired
      }, formData.value.expired ? {} : {}, {
        j: common_vendor.f(login),
        k: common_vendor.f(login),
        l: common_assets.a,
        m: common_vendor.f(weixinLogin)
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._(_sfc_main, [["__scopeId", "data-v-45258083"]]);
wx.createPage(MiniProgramPage);
