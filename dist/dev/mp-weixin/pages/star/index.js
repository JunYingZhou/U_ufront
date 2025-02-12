"use strict";
const common_vendor = require("../../common/vendor.js"), api_article = require("../../api/article.js");
const pageSize = 5;
const _sfc_main = /* @__PURE__ */ common_vendor.b({
  __name: "index",
  setup(__props) {
    const list = common_vendor.g([]);
    const page = common_vendor.r(1);
    const loading = common_vendor.r(false);
    const noMore = common_vendor.r(false);
    common_vendor.o(() => {
      getList();
    });
    common_vendor.y(() => {
      console.log("下拉刷新");
      page.value = 1;
      noMore.value = false;
      getList(true);
      setTimeout(() => {
        common_vendor.i.stopPullDownRefresh();
      }, 1e3);
    });
    const getList = async (refresh = false) => {
      try {
        loading.value = true;
        const res = await api_article.g(page.value, pageSize);
        const newData = res.data || [];
        if (refresh) {
          list.length = 0;
        }
        if (newData.length < pageSize) {
          noMore.value = true;
        } else {
          page.value++;
        }
        list.push(...newData);
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    };
    const loadMore = () => {
      if (!loading.value && !noMore.value) {
        getList();
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.k({
        a: common_vendor.j(list, (article, k0, i0) => {
          return {
            a: article.articleCoverUrl,
            b: common_vendor.t(article.articleTitle),
            c: common_vendor.t(article.articleAbstract),
            d: article.id
          };
        }),
        b: loading.value
      }, loading.value ? {} : noMore.value ? {} : {}, {
        c: noMore.value,
        d: common_vendor.f(loadMore)
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._(_sfc_main, [["__scopeId", "data-v-daea8ab6"]]);
wx.createPage(MiniProgramPage);
