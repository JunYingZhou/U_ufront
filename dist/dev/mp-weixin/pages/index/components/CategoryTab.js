"use strict";
const common_vendor = require("../../../common/vendor.js"), api_category = require("../../../api/category.js");
const _sfc_main = /* @__PURE__ */ common_vendor.b({
  __name: "CategoryTab",
  setup(__props) {
    common_vendor.i.getSystemInfoSync().windowHeight;
    const lists = common_vendor.r([{
      categoryId: 0,
      categoryName: "全部",
      createTime: "",
      modifyTime: ""
    }]);
    const catgoryIndex = common_vendor.r(0);
    common_vendor.o(() => {
      getList();
    });
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
    const clickThisCategory = (id) => {
      console.log(id);
      catgoryIndex.value = id;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.j(lists.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.categoryName),
            b: catgoryIndex.value === item.categoryId ? 1 : "",
            c: item.categoryId,
            d: common_vendor.f(($event) => clickThisCategory(item.categoryId), item.categoryId)
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._(_sfc_main, [["__scopeId", "data-v-2c8bfe96"]]);
wx.createComponent(Component);
