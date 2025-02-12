"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.b({
  __name: "CustomNavbar",
  setup(__props) {
    const { safeAreaInsets } = common_vendor.i.getSystemInfoSync();
    const textList = ["提高反诈意识，铸就安全生活", "构建反诈社会，守卫安全生活", "全民反诈，从你我开始"];
    const currentIndex = common_vendor.r(0);
    let timer = null;
    const startRotation = () => {
      timer = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % textList.length;
      }, 3e3);
    };
    common_vendor.o(() => {
      startRotation();
    });
    common_vendor.e(() => {
      if (timer) {
        clearInterval(timer);
      }
    });
    return (_ctx, _cache) => {
      var _a;
      return {
        a: common_vendor.t(textList[currentIndex.value]),
        b: ((_a = common_vendor.u(safeAreaInsets)) == null ? void 0 : _a.top) + "px"
      };
    };
  }
});
wx.createComponent(_sfc_main);
