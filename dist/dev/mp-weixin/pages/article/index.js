"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  foot();
}
const foot = () => "./components/foot/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.b({
  __name: "index",
  setup(__props) {
    let articleObj = common_vendor.g({});
    common_vendor.h((options) => {
      const obj = JSON.parse(options.article);
      Object.assign(articleObj, obj);
      console.log("获取到的options", articleObj.id);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.u(articleObj).articleCoverUrl,
        b: common_vendor.t(common_vendor.u(articleObj).articleTitle),
        c: common_vendor.t(common_vendor.u(articleObj).articleAbstract),
        d: common_vendor.t(common_vendor.u(articleObj).articleMain),
        e: common_vendor.p({
          articleId: common_vendor.u(articleObj).id
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._(_sfc_main, [["__scopeId", "data-v-9b727b43"]]);
wx.createPage(MiniProgramPage);
