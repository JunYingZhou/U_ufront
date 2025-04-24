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
            <answers ref="hbComment" @like="commentLike" @del="del" @add="add" :questionId="question.id"></answers>
        </view>
    </view>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
// import comment from '@/common/components/comment/index.vue'
import answers from '@/pages/QA/components/answers/index.vue'
import { addAnswers, addAnswersLike, delAnswers } from "@/api/answers";

let fetchData = ref<number>(0)

const question = ref<any>(null); // 问题

onLoad((options: any) => {
    // 页面加载时执行的逻辑
    console.log('页面加载时执行的逻辑', options.question);
    console.log('页面加载时执行的逻辑', parseArticleData(options.question));
    if (options.question) {
        question.value = parseArticleData(options.question);
    }
});

const commentLike = (e: any) => {
    console.log('评论点赞', e)
    let userId = uni.getStorageSync('userId');
    // request api
    addAnswersLike(e, userId, question.value.id)
        .then((res: any) => {
            console.log('评论点赞结果', res);
            // insert into db
            // fetchData.value = 1;
            uni.$emit('fetchDataAnswersOperation', 1);
            uni.showToast({
                title: "点赞成功",
                duration: 1000,
            })
        })
        .catch((error: any) => {
            console.error('评论点赞失败', error);
        });
}

const del = async(e: any) => {
    console.log('删除评论', e) 
    const res = await delAnswers(e.commentId)
    if (res) {
        console.log('删除评论成功', res);
        uni.showToast({
            title: "删除成功",
            duration: 1000,
        })
        uni.$emit('fetchDataAnswersOperation', 1); 
    }
}

const add = async (e: any) => {
    let data = {
        questionId: question.value.id, // 替换为实际的questionId
        userId: uni.getStorageSync('userId'), // 替换为实际的user,
        commentContent: e.content,
        commentRootId: e.pId || 0,
        commentLikeCount: 0,
        commentType: 0,
        toUserId: e.toUserId || 0,
    }
    console.log("评论数据", data, e);
    // 判断是否有pId, 有pId则是回复
    if (e.pId) {
        // 回复
        let param = Object.assign({}, data);
        param.commentType = 1;
        console.log("回复", param);
        let res = await addAnswers(param);
        console.log("回复结果", res);
        // fetchData.value = 1;
        uni.$emit('fetchDataAnswersOperation', 1);

    } else {
        // 评论
        let param = Object.assign({}, data);
        param.commentType = 0;
        console.log("评论", param);
        let res = await addAnswers(param);
        console.log("评论结果", res);
        // fetchData.value = 1;     
        uni.$emit('fetchDataAnswersOperation', 1);

    }
    // request api
    // insert into db
    fetchData.value = 0;

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
    box-shadow: 0 4rpx 24rpx rgba(0,0,0,0.04);
}
</style>