"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.b({
  __name: "index",
  setup(__props) {
    const activeTab = common_vendor.r("posts");
    const posts = common_vendor.r([
      {
        id: 1,
        username: "反诈小警察",
        avatar: "http://117.72.78.239:9000/zjyminio/shuadan1.jpg",
        title: "揭秘刷单骗局，别再上当了！",
        abstract: "最近很多人因为刷单被骗，我来分享一些真实案例，希望大家提高警惕！",
        likes: 128,
        comments: 45
      },
      {
        id: 2,
        username: "被骗的老王",
        avatar: "http://117.72.78.239:9000/zjyminio/shuadan2.jpg",
        title: "我被骗了5000元，如何追回？",
        abstract: "我看到一个兼职刷单的广告，说完成任务能返利，结果转账后就被拉黑了...",
        likes: 256,
        comments: 89
      }
    ]);
    const questions = common_vendor.r([
      { id: 1, question: "如何分辨刷单骗局？", answer: "高回报低风险的兼职一般都是骗局，谨防被骗。" },
      { id: 2, question: "被骗了该怎么办？", answer: "立即拨打110报警，并联系银行冻结相关资金。" }
    ]);
    return (_ctx, _cache) => {
      return common_vendor.k({
        a: activeTab.value === "posts" ? 1 : "",
        b: common_vendor.f(($event) => activeTab.value = "posts"),
        c: activeTab.value === "qa" ? 1 : "",
        d: common_vendor.f(($event) => activeTab.value = "qa"),
        e: activeTab.value === "posts"
      }, activeTab.value === "posts" ? {
        f: common_vendor.j(posts.value, (post, k0, i0) => {
          return {
            a: post.avatar,
            b: common_vendor.t(post.username),
            c: common_vendor.t(post.title),
            d: common_vendor.t(post.abstract),
            e: common_vendor.t(post.likes),
            f: common_vendor.t(post.comments),
            g: post.id
          };
        })
      } : {}, {
        g: activeTab.value === "qa"
      }, activeTab.value === "qa" ? {
        h: common_vendor.j(questions.value, (qa, k0, i0) => {
          return {
            a: common_vendor.t(qa.question),
            b: common_vendor.t(qa.answer),
            c: qa.id
          };
        })
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._(_sfc_main, [["__scopeId", "data-v-a58190ec"]]);
wx.createPage(MiniProgramPage);
