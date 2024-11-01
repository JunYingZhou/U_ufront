<!--
 * @Author: zjy 3497577844@qq.com
 * @Date: 2024-08-17 16:21:41
 * @LastEditors: zjy 3497577844@qq.com
 * @LastEditTime: 2024-10-22 01:40:03
 * @FilePath: \uni-preset-vue\src\pages\index\compoents\CustomNavbar.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%A
-->
<script setup lang="ts">

const { safeAreaInsets } = uni.getSystemInfoSync()


</script>

<template>
  <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <view class="logo1">
      <image class="logo-image" src="@/static/images/logo.png"></image>
      <!-- <text class="logo-text"> · 亲民 · 快捷</text> -->
    </view>
    <!-- 搜索条 -->
    <view class="search">
      <text class="icon-search">请输入内容</text>
      <text class="icon-scan"></text>
    </view>
  </view>
</template>

<style lang="scss">
/* 自定义导航条 */
.navbar {
  background-color: #385adf;
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
}
</style>
