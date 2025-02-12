"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.b({
  __name: "index",
  setup(__props) {
    const communities = common_vendor.r([
      {
        id: 1,
        name: "网络刷单社区",
        description: "讨论各种电信刷单诈骗案例、经验交流，发现最新的刷单诈骗。",
        members: 8523,
        icon: "http://117.72.78.239:9000/zjyminio/OIP.jpg"
      },
      {
        id: 2,
        name: "海外消费社区",
        description: "分享海外购物陷阱。",
        members: 4321,
        icon: "http://117.72.78.239:9000/zjyminio/OIP (1).jpg"
      },
      {
        id: 3,
        name: "网络情感社区",
        description: "交流情感话题，解决恋爱、婚姻、交友的新型电信诈骗案例。",
        members: 10234,
        icon: "http://117.72.78.239:9000/zjyminio/OIP (2).jpg"
      },
      {
        id: 4,
        name: "亲子借贷社区",
        description: "讨论家庭经济、育儿资金规划，分享借贷经验的网络诈骗。",
        members: 5678,
        icon: "http://117.72.78.239:9000/zjyminio/OIP (3).jpg"
      }
    ]);
    const joinCommunity = (communityId) => {
      common_vendor.i.navigateTo({ url: `/pages/communityDetail/index` });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.j(communities.value, (community, k0, i0) => {
          return {
            a: community.icon,
            b: common_vendor.t(community.name),
            c: common_vendor.t(community.description),
            d: common_vendor.t(community.members),
            e: common_vendor.f(($event) => joinCommunity(community.id), community.id),
            f: community.id
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._(_sfc_main, [["__scopeId", "data-v-485a05f3"]]);
wx.createPage(MiniProgramPage);
