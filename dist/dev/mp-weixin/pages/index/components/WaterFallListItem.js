"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.b({
  __name: "WaterFallListItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    common_vendor.o(() => {
      console.log(props.item);
    });
    const handleItemClick = (item) => {
      console.log("Item clicked:", item);
      common_vendor.i.navigateTo({
        url: `/pages/article/index?article=${JSON.stringify(item)}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: __props.item.articleCoverUrl,
        b: common_vendor.t(__props.item.articleTitle),
        c: common_vendor.t(__props.item.articleAbstract),
        d: common_vendor.f(($event) => handleItemClick(__props.item))
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._(_sfc_main, [["__scopeId", "data-v-45a86133"]]);
wx.createComponent(Component);
