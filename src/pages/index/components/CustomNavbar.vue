<!--
 * @Author: zjy 3497577844@qq.com
 * @Date: 2024-08-17 16:21:41
 * @LastEditors: zjy 3497577844@qq.com
 * @LastEditTime: 2024-10-22 01:40:03
 * @FilePath: \uni-preset-vue\src\pages\index\compoents\CustomNavbar.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%A
-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, defineEmits} from 'vue'
import { getArticleListByTitle } from '@/api/article'
const { safeAreaInsets } = uni.getSystemInfoSync()

const textList = ['提高反诈意识，铸就安全生活','构建反诈社会，守卫安全生活', '全民反诈，从你我开始']
const currentIndex = ref(0)
let timer: number | null = null
const debounceTimer = ref<any | null>(null)

const startRotation = () => {
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % textList.length
  }, 3000)
}


const emits = defineEmits<{
  (event: "updateLIstByTitle", title: string): void;
}>();


onMounted(() => {
  startRotation()
})

const handleInput = (e: any) => {
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
  }
  
  debounceTimer.value = setTimeout(() => {
    // 实际要执行的逻辑，例如搜索请求
    console.log('防抖后的输入内容:', e.detail.value)
    // getArticleListByTitle(e.detail.value).then((res: any) => {
      // c?onsole.log(res)
      emits("updateLIstByTitle", e.detail.value)
    // })
    // 这里可以添加搜索接口调用
  }, 700)
}

const handleConfirm = () => {
  console.log('点击了确认')
}

const handleFocus = () => {
  console.log('输入框获得焦点')
}

const handleBlur = () => {
  console.log('输入框失去焦点')
}

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})

</script>

<template>
  <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <view class="logo1">
      <!-- <image class="logo-image" src="@/static/images/logo.png"></image> -->
      <text class="logo-text fade-up"> · {{ textList[currentIndex] }}</text>
    </view>
    <!-- 搜索条 -->
    <view class="search">
      <input
      class="search-input"
      type="text"
      placeholder="请输入内容"
      placeholder-style="color: #fff;"
      @input="handleInput"  
      @confirm="handleConfirm"  
      @focus="handleFocus"   
      @blur="handleBlur" 
    />
    </view>
  </view>
</template>

<style lang="scss">
/* 自定义导航条 */
.navbar {
  background-color: #eb872a;
  background-size: cover;
  position: relative;
  display: flex;
  flex-direction: column;

  .logo1 {
    height: 64rpx;
    display: flex;

    .logo-image {
      margin: 15px;
      width: 155rpx;
      height: 39rpx;
    }

    .logo-text {
      flex: 1;
      line-height: 28rpx;
      color: #fff;
      margin-top: 15px;
      padding-left: 20rpx;
      border-left: 1rpx solid #fff;
      font-size: 26rpx;
      transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
      opacity: 0;
    }

    .fade-up {
      animation: fadeUp 1s ease-in-out forwards;
    }
  }

  .logo {
    display: flex;
    align-items: start;
    height: 64rpx;

    .logo-image {
      width: 100rpx;
      height: 39rpx;
    }

    .logo-text {
      flex: 1;
      line-height: 28rpx;
      color: #fff;
      margin: 2rpx 0 0 20rpx;
      padding-left: 20rpx;
      border-left: 1rpx solid #fff;
      font-size: 26rpx;
      transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;;
    }

    .fade-up {
      animation: fadeUp 1s ease-in-out forwards;
    }
  }

  .search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10rpx 0 26rpx;
    height: 64rpx;
    margin: 16rpx 20rpx;
    color: #fff;
    font-size: 28rpx;
    border-radius: 32rpx;
    background-color: rgba(255, 255, 255, 0.5);
  }

  .icon-search {
    &::before {
      margin-right: 10rpx;
    }
  }

  .icon-scan {
    font-size: 30rpx;
    padding: 15rpx;
  }

  @keyframes fadeUp {
    0% {
      transform: translateY(10px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
}
</style>
