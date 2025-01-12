<!--
 * @Author: zjy 3497577844@qq.com
 * @Date: 2024-08-15 02:07:10
 * @LastEditors: zjy 3497577844@qq.com
 * @LastEditTime: 2024-11-16 19:20:31
 * @FilePath: \uni-preset-vue\src\pages\index\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="header">
    <CustomNavbar></CustomNavbar>
  </view>

  <view class="category">
    <CategoryTab></CategoryTab>
  </view>

  <!-- <view class="content" :style="{ paddingTop: safeAreaInsets?.top + 'px' }"> -->
  <view class="content">
    <!-- 设置瀑布流屏幕列表 -->
     <WaterFallList></WaterFallList>
    <button class="navigate-button" @click="goToLogin">Go to charging</button>

  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue'
import { useUserStore } from "@/stores";
import CustomNavbar from '@/pages/index/components/CustomNavbar.vue';
import CategoryTab from '@/pages/index/components/CategoryTab.vue';
import WaterFallList from '@/pages/index/components/WaterFallList.vue';
// import { useRouter } from 'vue-router'

// const router = useRouter()

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

onLoad(() => {

  // 进行路由拦截
  const userStore = useUserStore();

  console.log(userStore.isLogin);
  // 判断是否登录
  if (!userStore.isLogin) {
    // 未登录，跳转到登录页面
    console.log("未登录")
    uni.showToast({
      icon: 'none',
      title: '请先登录',
    });
    uni.redirectTo({ url: "/pages/login/index" });
  }
  uni.showToast({
    icon: 'none',
    title: '欢迎来到Wisson充电机器人',
  });
})

const goToLogin = () => {
  console.log('跳转到我的'); // 确认函数被调用
  uni.switchTab({
    url: '/pages/my/index'
  });
}

</script>

<style scoped>

.header {
  position: sticky;
  top: 0;
}

.content {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  flex: 1;
  z-index: -1;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
