"use strict";
const common_vendor = require("../../../common/vendor.js"), api_article = require("../../../api/article.js");
if (!Math) {
  WaterFallListItem();
}
const WaterFallListItem = () => "./WaterFallListItem.js";
const _sfc_main = /* @__PURE__ */ common_vendor.b({
  __name: "WaterFallList",
  props: {
    categoryId: {}
  },
  setup(__props) {
    common_vendor.i.getSystemInfoSync().windowHeight;
    const flowData = common_vendor.g({
      list: [],
      column: 2,
      // 默认两列
      columnSpace: 2
    });
    const props = __props;
    common_vendor.z(
      () => props.categoryId,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          console.log("categoryId changed:", newVal);
          getList(newVal);
        }
      }
    );
    common_vendor.o(() => {
      getList(props.categoryId);
    });
    common_vendor.y(() => {
      console.log("下拉刷新");
      setTimeout(() => {
        getList(props.categoryId);
        common_vendor.i.stopPullDownRefresh();
      }, 1e3);
    });
    const getList = async (categoryId) => {
      try {
        console.log("Fetching article list...", categoryId);
        const res = await api_article.g(categoryId);
        flowData.list = res.data || [];
        console.log("Article List:", flowData.list);
        initData();
      } catch (error) {
        console.error("Failed to fetch article list:", error);
      }
    };
    for (let i = 1; i <= flowData.column; i++) {
      flowData[`column_${i}`] = [];
    }
    const initData = () => {
      const groupList = dynamicGrouping(flowData.list, flowData.column);
      groupList.forEach((item, i) => {
        flowData[`column_${i + 1}`] = item;
      });
    };
    const dynamicGrouping = (data, columnCount) => {
      if (columnCount <= 0)
        return [];
      const groups = Array.from({ length: columnCount }, () => []);
      data.forEach((item, index) => {
        groups[index % columnCount].push(item);
      });
      return groups;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.j(flowData.column, (index, k0, i0) => {
          return {
            a: common_vendor.j(flowData[`column_${index}`], (item, j, i1) => {
              return {
                a: "639a0875-0-" + i0 + "-" + i1,
                b: common_vendor.p({
                  item
                }),
                c: `column-${index}-item-${j}`
              };
            }),
            b: `column-${index}`
          };
        }),
        b: 100 / flowData.column - flowData.columnSpace + "%"
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._(_sfc_main, [["__scopeId", "data-v-639a0875"]]);
wx.createComponent(Component);
