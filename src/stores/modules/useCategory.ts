import { defineStore } from 'pinia'
import { computed, ref } from 'vue';
import type { userInfoResult } from "@/types/LoginResult";

interface CategoryState {
  name: string;
  id: string;
  // auth: boolean;
}

export const useCategoryStore = defineStore('useCategory', () => {

  // 定义用户状态
  const useCategory = ref<CategoryState>()

  const categoryInfo =ref<any>();

  // 设置用户信息
  const saveCategoryInfo = (val: any) => {
    categoryInfo.value = val
  }


  const getCategoryInfo = computed(() => {
    if (categoryInfo.value) {
      return categoryInfo.value;
    } else {
      return '';
    }
  })



  return {
    saveCategoryInfo,
    getCategoryInfo
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
