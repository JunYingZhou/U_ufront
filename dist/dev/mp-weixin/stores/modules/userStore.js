"use strict";
const common_vendor = require("../../common/vendor.js");
const useUserStore = common_vendor.d("userStore", () => {
  const userState = common_vendor.r();
  const token = common_vendor.r();
  const userId = common_vendor.r("");
  const userInfo = common_vendor.r();
  const setUserProfile = (val) => {
    userState.value = val;
  };
  const clearUserProfile = () => {
    userState.value = void 0;
  };
  const saveUserInfo = (val) => {
    userInfo.value = val;
  };
  const setToken = (data) => {
    common_vendor.i.setStorageSync("token", data);
    token.value = common_vendor.i.getStorageSync("token");
  };
  const setUserId = (data) => {
    common_vendor.i.setStorageSync("userId", data);
    userId.value = common_vendor.i.getStorageSync("userId");
  };
  const logout = () => {
    common_vendor.i.removeStorageSync("token");
    token.value = "";
    userState.value = void 0;
    userId.value = "";
    userInfo.value = "";
  };
  const isLogin = common_vendor.a(() => {
    if (token.value) {
      return true;
    } else {
      return false;
    }
  });
  const getUserId = common_vendor.a(() => {
    if (userId.value) {
      return userId.value;
    } else {
      return "";
    }
  });
  const getUserInfo = common_vendor.a(() => {
    if (userInfo.value) {
      return userInfo.value;
    } else {
      return "";
    }
  });
  return {
    userState,
    token,
    setToken,
    setUserProfile,
    clearUserProfile,
    isLogin,
    logout,
    setUserId,
    getUserId,
    saveUserInfo,
    getUserInfo
  };
}, {
  persist: {
    // 调整为兼容多端的API
    storage: {
      setItem(key, value) {
        common_vendor.i.setStorageSync(key, value);
      },
      getItem(key) {
        return common_vendor.i.getStorageSync(key);
      }
    }
  }
});
exports.u = useUserStore;
