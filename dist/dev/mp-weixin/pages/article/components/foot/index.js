"use strict";
const common_vendor = require("../../../../common/vendor.js");
if (!Math) {
  comment();
}
const comment = () => "../../../../common/components/comment/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.b({
  __name: "index",
  props: {
    articleId: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    let showPopup = common_vendor.r(false);
    const props = __props;
    common_vendor.o(() => {
      console.log("foot", props.articleId);
    });
    const closePopup = () => {
      showPopup.value = false;
    };
    const add = () => {
      console.log("添加评论");
    };
    return (_ctx, _cache) => {
      return common_vendor.k({
        a: common_vendor.f(($event) => common_vendor.x(showPopup) ? showPopup.value = true : showPopup = true),
        b: common_vendor.u(showPopup)
      }, common_vendor.u(showPopup) ? {
        c: common_vendor.f(closePopup),
        d: common_vendor.v("hbComment", "0a89c121-0"),
        e: common_vendor.f(add),
        f: common_vendor.p({
          articleId: props.articleId
        }),
        g: common_vendor.f(() => {
        }),
        h: common_vendor.f(closePopup)
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._(_sfc_main, [["__scopeId", "data-v-0a89c121"]]);
wx.createComponent(Component);
