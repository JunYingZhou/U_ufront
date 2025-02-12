"use strict";
const common_vendor = require("../../common/vendor.js"), api_category = require("../../api/category.js"), api_article = require("../../api/article.js");
require("../../stores/index.js");
const stores_modules_userStore = require("../../stores/modules/userStore.js");
const _sfc_main = /* @__PURE__ */ common_vendor.b({
  __name: "index",
  setup(__props) {
    const userStore = stores_modules_userStore.u();
    const article = common_vendor.r({
      articleTitle: "小程序文章1",
      articleAbstract: "小程序文章1",
      articleMain: "小程序文章1",
      categoryId: null,
      isOfficial: 0,
      userId: userStore.getUserId
    });
    let coverImage = common_vendor.r(null);
    let contentImages = common_vendor.g([]);
    let categoryList = common_vendor.r([]);
    let categoryNameList = common_vendor.r([]);
    let categoryName = common_vendor.r("");
    let loading = common_vendor.r(false);
    common_vendor.h(async () => {
      let res = await api_category.g();
      console.log("分类类别", res);
      if (res.msg === "ok") {
        categoryList.value = res.data;
        categoryNameList.value = res.data.map((item) => item.categoryName);
        console.log("分类名称列表", categoryNameList.value);
        loading.value = true;
      }
    });
    const handleCoverImageUpload = (event) => {
      common_vendor.i.chooseMedia({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          const filePath = res.tempFiles[0].tempFilePath;
          console.log("选择的媒体文件路径:", filePath);
          article.value.coverImage = filePath;
          coverImage.value = filePath;
          handleCoverImageUploadF(coverImage.value);
        }
      });
    };
    const handleCoverImageUploadF = (filePath) => {
      common_vendor.i.getFileSystemManager().readFile({
        filePath,
        success: (fileRes) => {
          const boundary = "----WebKitFormBoundary" + (/* @__PURE__ */ new Date()).getTime();
          const fileName = filePath.substring(filePath.lastIndexOf("/") + 1);
          let body = `--${boundary}\r
`;
          body += `Content-Disposition: form-data; name="coverImage"; filename="${fileName}"\r
`;
          body += `Content-Type: image/jpeg\r
\r
`;
          const bodyBuffer = new Uint8Array([...new TextEncoder().encode(body), ...new Uint8Array(fileRes.data), ...new TextEncoder().encode(`\r
--${boundary}--\r
`)]);
          common_vendor.i.request({
            url: "http://localhost:8000/anti/article/coverImageUpload",
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
            },
            fail(err) {
              console.error("上传失败:", err);
            }
          });
        },
        fail(err) {
          console.error("读取文件失败:", err);
        }
      });
    };
    const handleContentImagesUpload = (event) => {
      if (contentImages.length >= 5) {
        common_vendor.i.showModal({
          icon: "none",
          title: "最多上传5张图片"
        });
        return;
      }
      common_vendor.i.chooseMedia({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          const filePath = res.tempFiles[0].tempFilePath;
          contentImages.push(filePath);
          console.log("选择的媒体文件路径:", contentImages);
        }
      });
    };
    const handleCategoryChange = (event) => {
      console.log("adasdasdadasdasd", event);
      const index = event.detail.value;
      article.value.categoryId = event.detail.value;
      categoryName.value = categoryNameList.value[index];
      console.log("选择的分类:", article.value.categoryId);
    };
    const submitArticle = async () => {
      console.log("提交的文章:", article.value);
      if (!(article.value.articleTitle && article.value.articleAbstract && article.value.articleMain && article.value.categoryId)) {
        common_vendor.i.showModal({
          icon: "none",
          title: "请填写完整数据"
        });
        return;
      }
      let res = await api_article.a(article.value);
      console.log("返回数据", res);
      if (res.msg === "ok") {
        common_vendor.i.showToast({
          title: "发布成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.i.switchTab({ url: "/pages/index/index" });
        }, 1e3);
      } else {
        common_vendor.i.showToast({
          title: res.msg,
          icon: "error"
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.k({
        a: common_vendor.u(loading)
      }, common_vendor.u(loading) ? common_vendor.k({
        b: article.value.articleTitle,
        c: common_vendor.f(($event) => article.value.articleTitle = $event.detail.value),
        d: article.value.articleAbstract,
        e: common_vendor.f(($event) => article.value.articleAbstract = $event.detail.value),
        f: article.value.articleMain,
        g: common_vendor.f(($event) => article.value.articleMain = $event.detail.value),
        h: !common_vendor.u(coverImage)
      }, !common_vendor.u(coverImage) ? {} : {
        i: common_vendor.u(coverImage)
      }, {
        j: common_vendor.f(handleCoverImageUpload),
        k: !common_vendor.u(contentImages).length
      }, !common_vendor.u(contentImages).length ? {} : {
        l: common_vendor.j(common_vendor.u(contentImages), (image, k0, i0) => {
          return {
            a: image,
            b: image
          };
        })
      }, {
        m: common_vendor.f(handleContentImagesUpload),
        n: common_vendor.t(article.value.categoryId ? common_vendor.u(categoryName) : "请选择分类"),
        o: common_vendor.u(categoryNameList),
        p: common_vendor.f(handleCategoryChange),
        q: common_vendor.f(submitArticle)
      }) : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._(_sfc_main, [["__scopeId", "data-v-73637980"]]);
wx.createPage(MiniProgramPage);
