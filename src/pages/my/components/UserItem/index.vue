<!--
 * @Author: zjy 3497577844@qq.com
 * @Date: 2025-02-09 17:09:35
 * @LastEditors: zjy 3497577844@qq.com
 * @LastEditTime: 2025-04-05 15:59:22
 * @FilePath: \u_uf\src\pages\my\components\UserItem\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="container">
        <view class="item" v-for="item in items" :key="item.id" @click="toUrl(item.url)">
            <view class="icon">
                <image v-if="item.icon" :src="item.icon" mode="aspectFill" lazy-load></image>
            </view>
            <view class="name">{{ item.name }}</view>
            <view  class="icon">
                <image src="http://117.72.78.239:9000/zjyminio/next.png" mode="aspectFill" lazy-load></image>
            </view>
        </view>
    </view>
</template>
test
<script setup lang='ts'>
import { reactive } from 'vue';

const items = reactive([
    { id: 1, icon: "http://117.72.78.239:9000/zjyminio/establish.png", url: "/pages/establish/index", name: "发布文章" },
    { id: 2, icon: "http://117.72.78.239:9000/zjyminio/community.png", url: "/pages/establish/index      ", name: "我的社区" },
    { id: 3, icon: "http://117.72.78.239:9000/zjyminio/star.png", url: "/pages/star/index", name: "我的收藏" },
    { id: 4, icon: "http://117.72.78.239:9000/zjyminio/test.png", url: "/pages/simulation/index", name: "能力检测" },
    // { id: 4, icon: "http://117.72.78.239:9000/zjyminio/res.png", url: "/pages/simulation/index", name: "检测结果" },

]);


const toUrl = (url: any) => {
    uni.navigateTo({ url: url });
}

</script>

<style scoped lang='scss'>
.container {
    width: 95vw;
    margin: 10rpx;
    background-color: #fff;
    border-radius: 10px; /* Rounded corners */
    overflow: hidden; /* To contain the rounded corners */
}

.item {
    display: flex; /* Use flexbox for better alignment */
    justify-content: flex-start; /* Align items to the start */
    align-items: center;
    width: 100%;
    height: 100rpx; /* Adjust height for better spacing */
    padding: 10rpx; /* Add padding */
    border-bottom: 1px solid #e5e5e5;
    transition: background-color 0.3s; /* Smooth transition for hover effect */

    // &:hover {
    //     background-color: #f0f0f0; /* Hover effect */
    // }

    .icon {
        width: 40rpx; /* Fixed width for icons */
        height: 40rpx; /* Fixed height for icons */
        margin-right: 10rpx; /* Space between icon and name */
    }

    .name {
        flex-grow: 1;
        margin-left: 20rpx; /* Allow name to take remaining space */
        text-align: left; /* Align text to the left */
        font-size: 28rpx; /* Increase font size */
        color: #333; /* Darker text color */
    }
}
</style>