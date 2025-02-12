"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
require("./utils/routeIntercept.js");
const stores_index = require("./stores/index.js"), stores_modules_userStore = require("./stores/modules/userStore.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/my/index.js";
  "./pages/community/index.js";
  "./pages/communityDetail/index.js";
  "./pages/login/index.js";
  "./pages/establish/index.js";
  "./pages/star/index.js";
  "./pages/signUp/index.js";
  "./pages/my/components/PersonalInfo/index.js";
  "./pages/article/index.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.b({
  __name: "App",
  setup(__props) {
    common_vendor.l(() => {
      console.log("App Launch");
      stores_modules_userStore.u();
    });
    common_vendor.h(() => {
      common_vendor.i.onTabBarMidButtonTap(() => {
        console.log("监听中间按钮");
      });
    });
    common_vendor.m(() => {
      console.log("App Show");
    });
    common_vendor.n(() => {
      console.log("App Hide");
    });
    return () => {
    };
  }
});
function createApp() {
  const app = common_vendor.q(_sfc_main);
  app.use(stores_index.p);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
