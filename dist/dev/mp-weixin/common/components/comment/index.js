"use strict";
const common_vendor = require("../../vendor.js"), api_comment = require("../../../api/comment.js");
const _sfc_main = {
  __name: "index",
  props: {
    cmData: {
      type: Object,
      default: null
    },
    deleteTip: {
      type: String,
      default: "操作不可逆，如果评论下有子评论，也将被一并删除，确认？"
    },
    articleId: {
      type: Number,
      default: 0
    }
  },
  emits: ["del", "add", "like", "focusOn"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const emptyAvatar = common_vendor.r("http://117.72.78.239:9000/zjyminio/defaultAvatar.webp");
    const commentData = common_vendor.r(null);
    const placeholder = common_vendor.r("请输入评论");
    const commentReq = common_vendor.r({ pId: null, content: null });
    const pUser = common_vendor.r(null);
    const showTag = common_vendor.r(false);
    const focus = common_vendor.r(false);
    const submit = common_vendor.r(false);
    const KeyboardHeight = common_vendor.r(0);
    let loading = common_vendor.r(false);
    common_vendor.z(
      () => props.cmData,
      (newVal) => {
        init();
      },
      { immediate: true }
    );
    common_vendor.o(() => {
      console.log("文章id", props.articleId);
      common_vendor.i.onKeyboardHeightChange((res) => {
        KeyboardHeight.value = res.height;
      });
    });
    async function init(newVal) {
      let res = await api_comment.q(props.articleId);
      console.log("评论res -->", res);
      if (res.msg == "ok") {
        res.data.comment = getTree(res.data.comment);
        commentData.value = res.data;
        loading.value = true;
      }
    }
    function reply(pUserVal, reUser, pId) {
      pUser.value = pUserVal;
      commentReq.value.pId = pId;
      commentReq.value.content = reUser ? `@${reUser} ` : "";
      showTag.value = true;
      commentInput();
    }
    function getTree(data) {
      let result = [];
      let map = {};
      data.forEach((item) => {
        map[item.commentId] = item;
      });
      data.forEach((item) => {
        let parent = map[item.commentRootId];
        if (parent) {
          (parent.children || (parent.children = [])).push(item);
        } else {
          result.push(item);
        }
      });
      return result;
    }
    function confirmDelete(commentId) {
      common_vendor.i.showModal({
        title: "警告",
        content: props.deleteTip,
        confirmText: "确认删除",
        success: (res) => {
          if (res.confirm) {
            emit("del", commentId);
          }
        }
      });
    }
    function add() {
      if (!commentReq.value.content || commentReq.value.content.length < 2) {
        common_vendor.i.showToast({ title: "评论内容过短", duration: 2e3 });
        return;
      }
      emit("add", commentReq.value);
    }
    function like(commentId) {
      emit("like", commentId);
    }
    function showMore(commentId) {
      commentData.value.comment.forEach((comment) => {
        var _a;
        if (comment.commentId === commentId) {
          comment.hasShowMore = !comment.hasShowMore;
        }
        (_a = comment.children) == null ? void 0 : _a.forEach((child) => {
          if (child.commentId === commentId) {
            child.hasShowMore = !child.hasShowMore;
          }
        });
      });
    }
    function blur() {
      focus.value = false;
    }
    function focusOn() {
      emit("focusOn");
    }
    function tagClose() {
      showTag.value = false;
      pUser.value = null;
      commentReq.value.pId = null;
    }
    function commentInput() {
      console.log("asdadasdasd");
      submit.value = true;
      common_vendor.C(() => {
        focus.value = true;
      });
    }
    function closeInput() {
      focus.value = false;
      submit.value = false;
    }
    return (_ctx, _cache) => {
      return common_vendor.k({
        a: common_vendor.u(loading)
      }, common_vendor.u(loading) ? common_vendor.k({
        b: common_vendor.t(commentData.value.readNumer),
        c: commentData.value.comment.length != 0
      }, commentData.value.comment.length != 0 ? {
        d: common_vendor.t(commentData.value.commentSize),
        e: common_vendor.f(commentInput),
        f: common_vendor.j(commentData.value.comment, (item, index, i0) => {
          return common_vendor.k({
            a: item.avatar || emptyAvatar.value,
            b: index == 0
          }, index == 0 ? {} : {}, {
            c: index == 1
          }, index == 1 ? {} : {}, {
            d: index == 2
          }, index == 2 ? {} : {}, {
            e: index > 2
          }, index > 2 ? {
            f: common_vendor.t(index + 1)
          } : {}, {
            g: common_vendor.t(item.nickname),
            h: common_vendor.t(item.commentLikeCount == 0 ? "抢首赞" : item.commentLikeCount),
            i: common_vendor.B(item.hasLike ? "isLike" : "notLike"),
            j: !item.hasLike
          }, !item.hasLike ? {} : {}, {
            k: common_vendor.f(($event) => like(item.commentId)),
            l: common_vendor.t(item.commentContent.length > 60 ? item.commentContent.slice(0, 59) : item.commentContent),
            m: item.commentContent.length > 60
          }, item.commentContent.length > 60 ? {
            n: common_vendor.t(item.hasShowMore ? item.commentContent.slice(59) : "..."),
            o: common_vendor.t(item.hasShowMore ? "收起" : "展开"),
            p: common_vendor.f(($event) => showMore(item.commentId))
          } : {}, {
            q: common_vendor.t(item.createTime),
            r: common_vendor.f(($event) => reply(item.nickename, item.nickename, item.commentId))
          }, {}, {
            t: common_vendor.j(item.children, (each, k1, i1) => {
              return common_vendor.k({
                a: each.avatar || emptyAvatar.value,
                b: common_vendor.t(each.nickname),
                c: common_vendor.t(each.commentLikeCount == 0 ? "抢首赞" : each.commentLikeCount),
                d: common_vendor.B(each.hasLike ? "isLike" : "notLike"),
                e: !each.false
              }, !each.false ? {} : {}, {
                f: common_vendor.f(($event) => like(each.commentId)),
                g: common_vendor.t(each.commentContent.length > 60 ? each.commentContent.slice(0, 59) : each.commentContent),
                h: each.commentContent.length > 60
              }, each.commentContent.length > 60 ? {
                i: common_vendor.t(each.hasShowMore ? each.commentContent.slice(59) : "..."),
                j: common_vendor.t(each.hasShowMore ? "收起" : "展开"),
                k: common_vendor.f(($event) => showMore(each.id))
              } : {}, {
                l: common_vendor.t(each.createTime),
                m: common_vendor.f(($event) => reply(item.nickname, each.nickname, item.commentId)),
                n: each.owner
              }, each.owner ? {
                o: common_vendor.f(($event) => confirmDelete(each.commentId))
              } : {});
            })
          });
        })
      } : {
        g: common_vendor.f(commentInput)
      }, {
        h: submit.value
      }, submit.value ? {
        i: common_vendor.f(closeInput),
        j: common_vendor.t(pUser.value),
        k: common_vendor.f(tagClose),
        l: showTag.value,
        m: common_vendor.f(add),
        n: placeholder.value,
        o: common_vendor.f(blur),
        p: common_vendor.f(focusOn),
        q: focus.value,
        r: commentReq.value.content,
        s: common_vendor.f(($event) => commentReq.value.content = $event.detail.value),
        t: common_vendor.f((...args) => _ctx.stopPrevent && _ctx.stopPrevent(...args)),
        v: common_vendor.A("bottom:" + KeyboardHeight.value + "px"),
        w: common_vendor.f(closeInput)
      } : {}) : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._(_sfc_main, [["__scopeId", "data-v-e381488a"]]);
wx.createComponent(Component);
