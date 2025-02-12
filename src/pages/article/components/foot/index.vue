<template>
    <view class="container">
        <view class="content">点赞</view>
        <view class="content">收藏</view>
        <view class="comment" @click="showPopup = true">
            <image mode="scaleToFill" src="http://117.72.78.239:9000/zjyminio/comment.png" lazy-load></image>
        </view>

        <view v-if="showPopup" class="popup sliding" @click="closePopup">
            <view class="popup-content" @click.stop>
                <view class="close">
                    <text class="close-text" @click="closePopup">关闭</text>
                </view>
                <comment ref="hbComment" @add="add" :articleId="props.articleId"></comment>
            </view>
        </view>
    </view>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import comment from '@/common/components/comment/index.vue'
let showPopup = ref(false);

// 接收prop
const props = defineProps({
  articleId: {
    type: String,
    default: ''
  }
})

onMounted(() => {
    console.log("foot",props.articleId);
    
})

const closePopup = () => {
    showPopup.value = false;
}

const add = () => {
    console.log("添加评论");
}
</script>

<style scoped lang="scss">
.container {
    display: inline-flex;
    justify-content: space-around;
    align-items: center;
    padding: 0rpx 20rpx;
    background-color: #ededed;
    position: fixed;
    bottom: 0rpx;
    width: 100vw;
    height: 100rpx;

    .comment {
        width: 50rpx;
        height: 50rpx;
    }

    .popup {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: flex-end; /* Align to the bottom */
        transform: translateY(100%); /* Start off-screen */
        transition: transform 2s ease; /* Transition effect */
    }

    .popup.sliding {
        transform: translateY(0); /* Slide up */
    }

    .close {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .popup-content {
        background-color: white;
        width: 100vw;
        height: 90vh;
        border-radius: 10px;
        padding: 20rpx;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }
}
</style>