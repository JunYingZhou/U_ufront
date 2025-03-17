"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../stores/index.js");
const stores_modules_userStore = require("../../stores/modules/userStore.js");
if (!Math) {
  (CustomNavbar + CategoryTab + WaterFallList)();
}
const CustomNavbar = () => "./components/CustomNavbar.js";
const CategoryTab = () => "./components/CategoryTab.js";
const WaterFallList = () => "./components/WaterFallList.js";
const _sfc_main = /* @__PURE__ */ common_vendor.b({
  __name: "index",
  setup(__props) {
    let categoryId = common_vendor.r(100);
    const { safeAreaInsets } = common_vendor.i.getSystemInfoSync();
    common_vendor.h(() => {
      const userStore = stores_modules_userStore.u();
      console.log(userStore.isLogin);
      if (!userStore.isLogin) {
        console.log("未登录");
        common_vendor.i.showToast({
          icon: "none",
          title: "请先登录"
        });
        common_vendor.i.redirectTo({ url: "/pages/login/index" });
      }
      common_vendor.i.showToast({
        icon: "none",
        title: "欢迎来到Wisson充电机器人"
      });
    });
    const handleUpdateList = (id) => {
      console.log("更新列表", id);
      categoryId.value = id;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(handleUpdateList),
        b: common_vendor.p({
          categoryId: common_vendor.u(categoryId)
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._(_sfc_main, [["__scopeId", "data-v-83a5a03c"]]);
wx.createPage(MiniProgramPage);
