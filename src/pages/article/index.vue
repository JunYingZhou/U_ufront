<template>
    <view class="container">
        <image class="cover-image" :src="articleObj.articleCoverUrl" mode="widthFix" lazy-load />
        <view class="title">{{ articleObj.articleTitle }}</view>
        <view class="abstract">{{ articleObj.articleAbstract }}</view>
        <view class="content">{{ articleObj.articleMain }}</view>
    </view>
    <foot :articleId="articleObj.id"/>
</template>

<script setup lang='ts'>
import { onLoad } from '@dcloudio/uni-app';
import { reactive } from 'vue';
import foot from './components/foot/index.vue'
let articleObj = reactive<any>({});

onLoad((options: any) => {
    const obj = JSON.parse(options.article);
    Object.assign(articleObj, obj);
    console.log('获取到的options', articleObj.id);
});
</script>

<style scoped lang="scss">
.container {
    // height: 100vh;
    padding: 20rpx 20rpx 100rpx 20rpx;
    background-color: #ededed;
}

.cover-image {
    width: 100%;
    height: auto;
    border-radius: 8rpx;
    margin-bottom: 20rpx;
}

.title {
    font-size: 36rpx;
    font-weight: bold;
    margin-bottom: 10rpx;
}

.abstract {
    font-size: 28rpx;
    color: #666;
    margin-bottom: 20rpx;
}

.content {
    font-size: 26rpx;
    line-height: 1.5;
    color: #333;
}
</style>