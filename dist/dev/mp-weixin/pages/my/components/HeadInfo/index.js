"use strict";
const common_vendor = require("../../../../common/vendor.js"), common_assets = require("../../../../common/assets.js"), common_utils_getWxStatusHeight = require("../../../../common/utils/getWxStatusHeight.js");
require("../../../../stores/index.js");
const stores_modules_userStore = require("../../../../stores/modules/userStore.js");
const _sfc_main = /* @__PURE__ */ common_vendor.b({
  __name: "index",
  props: {
    userName: {
      type: String,
      default: "用户"
    },
    nickname: {
      type: String,
      default: "用户"
    }
  },
  setup(__props) {
    const userStore = stores_modules_userStore.u();
    let userInfo = common_vendor.r({});
    let wxStatus = common_vendor.g({
      barHeight: 0,
      barTop: 0,
      barWidth: 0,
      menuButtonInfo: {}
    });
    wxStatus = common_utils_getWxStatusHeight.g();
    const props = __props;
    common_vendor.y(() => {
      console.log("下拉刷新");
      setTimeout(() => {
        userInfo.value = userStore.getUserInfo;
        common_vendor.i.stopPullDownRefresh();
      }, 1e3);
    });
    common_vendor.o(() => {
      userInfo.value = userStore.getUserInfo;
      console.log(wxStatus);
      console.log("子组件获取到的数据123231231231231231", userStore.getUserInfo);
    });
    const toUserInfo = () => {
      console.log("test");
      common_vendor.i.navigateTo({
        url: "/pages/my/components/PersonalInfo/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._,
        b: common_vendor.u(wxStatus).menuButtonInfo.height + "px",
        c: common_vendor.u(wxStatus).menuButtonInfo.height + "px",
        d: common_vendor.u(userInfo).avatar ? common_vendor.u(userInfo).avatar : "http://117.72.78.239:9000/zjyminio/defaultAvatar.webp",
        e: common_vendor.f(toUserInfo),
        f: common_vendor.t(props.nickname),
        g: common_vendor.u(wxStatus).menuButtonInfo.top + "px"
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._(_sfc_main, [["__scopeId", "data-v-9cfb5073"]]);
wx.createComponent(Component);
