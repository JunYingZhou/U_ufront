"use strict";
const common_vendor = require("../../common/vendor.js"), common_utils_showToast = require("../../common/utils/showToast.js"), api_user = require("../../api/user.js");
require("../../stores/index.js");
const utils_encrypt = require("../../utils/encrypt.js"), stores_modules_userStore = require("../../stores/modules/userStore.js");
const _sfc_main = /* @__PURE__ */ common_vendor.b({
  __name: "index",
  setup(__props) {
    const userStore = stores_modules_userStore.u();
    const formData = common_vendor.r({
      nickname: "",
      username: "",
      rawPassword: "admin123",
      password: "",
      confirmPassword: "admin123",
      roleIds: ["547888897925840928"],
      deptId: "547888556819873814",
      gender: 2
    });
    const signUp = async () => {
      const { nickname, username, rawPassword, roleIds, deptId, confirmPassword } = formData.value;
      if (!nickname || !username || !rawPassword || !confirmPassword) {
        common_utils_showToast.s("请填写完整");
        return;
      }
      if (rawPassword !== confirmPassword) {
        common_utils_showToast.s("两次密码不一致");
        return;
      }
      console.log("发起注册");
      formData.value.password = utils_encrypt.e(formData.value.rawPassword);
      const res = await api_user.a(formData.value);
      console.log(res);
      if (res.msg === "ok") {
        common_utils_showToast.s("注册成功");
        userStore.setToken(res.data.token);
        userStore.setUserId(res.data.userId);
        console.log("token数据", common_vendor.i.getStorageSync("token"));
        common_vendor.i.switchTab({ url: "/pages/index/index" });
        common_vendor.i.redirectTo({
          url: "/pages/index/index"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: formData.value.username,
        b: common_vendor.f(($event) => formData.value.username = $event.detail.value),
        c: formData.value.nickname,
        d: common_vendor.f(($event) => formData.value.nickname = $event.detail.value),
        e: formData.value.rawPassword,
        f: common_vendor.f(($event) => formData.value.rawPassword = $event.detail.value),
        g: formData.value.confirmPassword,
        h: common_vendor.f(($event) => formData.value.confirmPassword = $event.detail.value),
        i: common_vendor.f(signUp),
        j: common_vendor.f(
          //@ts-ignore
          (...args) => _ctx.login && _ctx.login(...args)
        )
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._(_sfc_main, [["__scopeId", "data-v-d0463838"]]);
wx.createPage(MiniProgramPage);
