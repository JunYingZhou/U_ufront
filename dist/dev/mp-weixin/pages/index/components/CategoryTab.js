"use strict";
const common_vendor = require("../../../common/vendor.js"), api_category = require("../../../api/category.js");
const _sfc_main = /* @__PURE__ */ common_vendor.b({
  __name: "CategoryTab",
  emits: ["updateList"],
  setup(__props, { emit: __emit }) {
    common_vendor.i.getSystemInfoSync().windowHeight;
    const lists = common_vendor.r([{
      categoryId: 100,
      categoryName: "全部",
      createTime: "",
      modifyTime: ""
    }]);
    const catgoryIndex = common_vendor.r(100);
    common_vendor.o(() => {
      getList();
    });
    const emits = __emit;
    common_vendor.y(() => {
      console.log("下拉刷新");
      setTimeout(() => {
        getList();
        common_vendor.i.stopPullDownRefresh();
      }, 1e3);
    });
    const getList = async () => {
      const res = await api_category.g();
      lists.value.push(...res.data);
      console.log("种类", lists.value);
    };
    const onUpdateList = (id) => {
      console.log("点击的是：", id);
      catgoryIndex.value = id;
      emits("updateList", id);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.j(lists.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.categoryName),
            b: catgoryIndex.value === item.categoryId ? 1 : "",
            c: item.categoryId,
            d: common_vendor.f(($event) => onUpdateList(item.categoryId), item.categoryId)
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._(_sfc_main, [["__scopeId", "data-v-2c8bfe96"]]);
wx.createComponent(Component);
