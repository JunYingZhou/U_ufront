<template>
    <view class="qa-container">
        <!-- 问题标题区域 -->
        <view class="question-card">
            <view class="title-wrapper">
                <image class="title-icon" src="http://117.72.78.239:9000/zjyminio/qa_icon.png"/>
                <text class="title-text">{{ question.questionsTitle }}</text>
            </view>
            <view class="meta-info">
                <text class="author">作者：{{ question.username || '匿名用户' }}</text>
                <text class="time">发布时间：{{ question.createTime }}</text>
            </view>
        </view>

        <!-- 评论区域 -->
        <view class="comment-section">
            <comment ref="hbComment" @like="commentLike" @add="add" :articleId="question.id"></comment>
        </view>
    </view>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import comment from '@/common/components/comment/index.vue'


const question = ref<any>(null); // 问题

onLoad((options: any) => {
    // 页面加载时执行的逻辑
    console.log('页面加载时执行的逻辑', options.question);
    console.log('页面加载时执行的逻辑', parseArticleData(options.question));
    if (options.question) {
        question.value = parseArticleData(options.question);
    }
});

const commentLike = (data: any) => {
    console.log('commentLike', data);
}

const add = (data: any) => {
    console.log('add', data); 
}


const parseArticleData = (articleStr: string) => {
    try {
        return JSON.parse(articleStr);
    } catch (error) {
        console.error("解析 JSON 时出错:", error);
        return null;
    }
};

</script>

<style scoped lang="scss">
.qa-container {
    padding: 20rpx;
    background-color: #f5f7fa;
    min-height: 100vh;
}

.question-card {
    background: #ffffff;
    border-radius: 16rpx;
    width: 95vw;
    margin-bottom: 32rpx;
    box-shadow: 0 4rpx 24rpx rgba(0,0,0,0.04);
    
    .title-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 24rpx;
        
        .title-icon {
            width: 48rpx;
            height: 48rpx;
            margin-right: 16rpx;
        }
        
        .title-text {
            font-size: 34rpx;
            font-weight: 600;
            color: #2c3e50;
            line-height: 1.4;
        }
    }
    
    .meta-info {
        display: flex;
        justify-content: space-around;
        font-size: 24rpx;
        color: #7f8c8d;
        
        .author {
            &::before {
                content: '👤 ';
            }
        }
        
        .time {
            &::before {
                content: '🕒 ';
            }
        }
    }
}

.comment-section {
    background: #ffffff;
    border-radius: 16rpx;
    padding: 32rpx;
    box-shadow: 0 4rpx 24rpx rgba(0,0,0,0.04);
}
</style>