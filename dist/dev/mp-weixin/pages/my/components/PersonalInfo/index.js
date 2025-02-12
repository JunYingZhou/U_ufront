"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../../../../stores/index.js");
const api_user = require("../../../../api/user.js"), stores_modules_userStore = require("../../../../stores/modules/userStore.js");
const _sfc_main = /* @__PURE__ */ common_vendor.b({
  __name: "index",
  setup(__props) {
    const userStore = stores_modules_userStore.u();
    let userInfo = common_vendor.g({});
    common_vendor.z(() => userInfo.avatar, (newValue) => {
      console.log("子组件获取到的头像数据", newValue);
      userInfo.avatar = newValue ? newValue : "http://117.72.78.239:9000/zjyminio/defaultAvatar.webp";
    }, { immediate: true });
    const uploadAvatar = () => {
      console.log("上传头像");
      common_vendor.i.chooseMedia({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          const filePath = res.tempFiles[0].tempFilePath;
          console.log("选择的媒体文件路径:", filePath);
          common_vendor.i.getFileSystemManager().readFile({
            filePath,
            success: (fileRes) => {
              const boundary = "----WebKitFormBoundary" + (/* @__PURE__ */ new Date()).getTime();
              const fileName = filePath.substring(filePath.lastIndexOf("/") + 1);
              let body = `--${boundary}\r
`;
              body += `Content-Disposition: form-data; name="avatarFile"; filename="${fileName}"\r
`;
              body += `Content-Type: image/jpeg\r
\r
`;
              const bodyBuffer = new Uint8Array([...new TextEncoder().encode(body), ...new Uint8Array(fileRes.data), ...new TextEncoder().encode(`\r
--${boundary}--\r
`)]);
              common_vendor.i.request({
                url: "http://localhost:8000/system/user/avatar",
                // 替换为你的 API
                method: "POST",
                header: {
                  "Content-Type": `multipart/form-data; boundary=${boundary}`,
                  "Authorization": `Bearer ${common_vendor.i.getStorageSync("token")}`
                  // 如果需要鉴权
                },
                data: bodyBuffer.buffer,
                responseType: "text",
                success(uploadRes) {
                  console.log("上传成功:", uploadRes.data);
                  getUserInfoF();
                  common_vendor.i.showToast({
                    title: "头像更新成功",
                    duration: 2e3
                  });
                },
                fail(err) {
                  console.error("上传失败:", err);
                  common_vendor.i.showToast({
                    icon: "none",
                    title: "上传失败",
                    duration: 2e3
                  });
                }
              });
            },
            fail(err) {
              console.error("读取文件失败:", err);
            }
          });
        },
        fail(err) {
          console.error("选择媒体失败", err);
          common_vendor.i.showToast({
            icon: "none",
            title: "选择媒体失败",
            duration: 2e3
          });
        }
      });
    };
    common_vendor.o(() => {
      Object.assign(userInfo, userStore.getUserInfo);
      console.log("子组件获取到的数据", userInfo);
    });
    const getUserInfoF = async () => {
      console.log("userId -->", userInfo.id);
      const user = await api_user.g(userInfo.id);
      userInfo = user == null ? void 0 : user.data;
      userStore.saveUserInfo(userInfo);
      console.log("userInfo -->", userStore.getUserInfo);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.u(userInfo).avatar ? common_vendor.u(userInfo).avatar : "http://117.72.78.239:9000/zjyminio/defaultAvatar.webp",
        b: common_vendor.f(uploadAvatar),
        c: common_vendor.t(common_vendor.u(userInfo).nickname),
        d: common_vendor.t(common_vendor.u(userInfo).email),
        e: common_vendor.t(common_vendor.u(userInfo).gender ? "男" : "女"),
        f: common_vendor.f(
          //@ts-ignore
          (...args) => _ctx.logout && _ctx.logout(...args)
        )
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._(_sfc_main, [["__scopeId", "data-v-441e3587"]]);
wx.createPage(MiniProgramPage);
