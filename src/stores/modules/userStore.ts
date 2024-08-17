/*
 * @Author: zjy 3497577844@qq.com
 * @Date: 2024-08-14 01:04:40
 * @LastEditors: zjy 3497577844@qq.com
 * @LastEditTime: 2024-08-17 16:04:42
 * @FilePath: \uni-preset-vue\src\stores\modules\userStore.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue';
import type { userInfoResult } from "@/types/LoginResult";

interface UserState {
  username: string;
  password: string;
  auth: boolean;
}

export const useUserStore = defineStore('userStore', () => {

  // 定义用户状态
  const userState = ref<userInfoResult>()

  const token = ref<string>();

  // 保存会员信息，登录时使用
  const setUserProfile = (val: userInfoResult) => {
    userState.value = val;
  }

  // 清楚会员信息，登出时使用
  const clearUserProfile = () => {
    userState.value = undefined;
  }

  // 设置token
  const setToken = () => {
    token.value = uni.getStorageSync('token');
  }

  // 计算属性，判断用户是否登录
  const isLogin = computed(() => {
    if (token.value) {
      return true;
    } else {
      return false;
    }
  })



  return {
    userState,
    token,
    setToken,
    setUserProfile,
    clearUserProfile,
    isLogin,
  };
}, {
  persist: {
    // 调整为兼容多端的API
    storage: {
      setItem(key, value) {
        uni.setStorageSync(key, value);
      },
      getItem(key) {
        return uni.getStorageSync(key);
      },
    },
  }
});
