"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../stores/index.js");
const api_user = require("../../api/user.js"), stores_modules_userStore = require("../../stores/modules/userStore.js");
if (!Math) {
  (HeadInfo + UserItem)();
}
const HeadInfo = () => "./components/HeadInfo/index.js";
const UserItem = () => "./components/UserItem/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.b({
  __name: "index",
  setup(__props) {
    const userStore = stores_modules_userStore.u();
    let userId = common_vendor.r("");
    let userInfo = common_vendor.g({});
    let dataLoading = common_vendor.r(false);
    common_vendor.y(() => {
      console.log("下拉刷新");
      getUserInfoF();
      setTimeout(() => {
        common_vendor.i.stopPullDownRefresh();
      }, 500);
    });
    common_vendor.h(() => {
      userId.value = userStore.getUserId;
      getUserInfoF();
    });
    const getUserInfoF = async () => {
      console.log("userId -->", userId.value);
      const user = await api_user.g(userId.value);
      userInfo = user == null ? void 0 : user.data;
      userStore.saveUserInfo(userInfo);
      dataLoading.value = true;
      console.log("userInfo -->", userStore.getUserInfo);
    };
    const logout = () => {
      userStore.logout();
      console.log("退出登录");
      common_vendor.i.redirectTo({ url: "/pages/login/index" });
    };
    return (_ctx, _cache) => {
      return common_vendor.k({
        a: common_vendor.u(dataLoading)
      }, common_vendor.u(dataLoading) ? {
        b: common_vendor.p({
          nickname: common_vendor.u(userInfo).nickname
        })
      } : {}, {
        c: common_vendor.f(logout)
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._(_sfc_main, [["__scopeId", "data-v-276ac604"]]);
wx.createPage(MiniProgramPage);
