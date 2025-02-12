"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.b({
  __name: "index",
  setup(__props) {
    const items = common_vendor.g([
      { id: 1, icon: "http://117.72.78.239:9000/zjyminio/establish.png", url: "/pages/establish/index", name: "发布文章" },
      { id: 2, icon: "http://117.72.78.239:9000/zjyminio/community.png", url: "", name: "我的社区" },
      { id: 3, icon: "http://117.72.78.239:9000/zjyminio/star.png", url: "/pages/star/index", name: "我的收藏" }
    ]);
    const toUrl = (url) => {
      common_vendor.i.navigateTo({ url });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.j(items, (item, k0, i0) => {
          return common_vendor.k({
            a: item.icon
          }, item.icon ? {
            b: item.icon
          } : {}, {
            c: common_vendor.t(item.name),
            d: item.id,
            e: common_vendor.f(($event) => toUrl(item.url), item.id)
          });
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._(_sfc_main, [["__scopeId", "data-v-89c4bbe9"]]);
wx.createComponent(Component);
