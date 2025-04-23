<template>
    <view class="container">
        <view class="comment" @click="likeStar('like')">
            <image mode="scaleToFill"
                :src='!like ? "http://117.72.78.239:9000/zjyminio/like.png" : "http://117.72.78.239:9000/zjyminio/likeActive.png"'
                lazy-load></image>
        </view>
        <view class="comment" @click="likeStar('star')">
            <image mode="scaleToFill"
                :src='!star ? "http://117.72.78.239:9000/zjyminio/star.png" : "http://117.72.78.239:9000/zjyminio/starActive.png"'
                lazy-load></image>
        </view>
        <view class="comment" @click="showPopup = true">
            <image mode="scaleToFill" src="http://117.72.78.239:9000/zjyminio/comment.png" lazy-load></image>
        </view>

        <view v-if="showPopup" class="popup sliding" @click="closePopup">
            <view class="popup-content" @click.stop>
                <view class="close">
                    <text class="close-text" @click="closePopup">关闭</text>
                </view>
                <comment ref="hbComment" @like="commentLike" @add="add" :articleId="props.articleId"></comment>
            </view>
        </view>
    </view>
</template>

<script setup lang='ts'>
import { ref, onMounted, watch } from 'vue';
import comment from '@/common/components/comment/index.vue'
import { getArticleLikeStarStatus, insertArticleLikeStarStatus, delArticleLikeStarStatus } from "@/api/article";
import { addComment, addCommentLike } from "@/api/comment";
let showPopup = ref(false);
import { useUserStore } from "@/stores";

const userStore = useUserStore();
let star = ref(false)
let like = ref(false)
let fetchData = ref<number>(0)
// 接收prop
const props = defineProps({
    articleId: {
        type: String,
        default: ''
    },
    like: {
        type: Boolean,
        default: false
    },
    star: {
        type: Boolean,
        default: false
    }
})


// watch(
//     () => fetchData.value,
//     (newVal, oldVal) => {
//         console.log('watch: newVal', newVal);
//         console.log('watch: oldVal', oldVal);
//         if(newVal === 1){
//             console.log('fetchData value is 1, emitting event');
//             uni.$emit('fetchDataOperation', newVal);
//         }
//     }
// )

onMounted(() => {
    console.log("foot", props.articleId);
    initLikeStar();
})

const closePopup = () => {
    showPopup.value = false;
}

const commentLike = (e: any) => {
    console.log('评论点赞', e)
    let userId = uni.getStorageSync('userId');
    // request api
    addCommentLike(e, userId, props.articleId)
        .then((res: any) => {
            console.log('评论点赞结果', res);
            // insert into db
            // fetchData.value = 1;
            uni.$emit('fetchDataOperation', 1);
            uni.showToast({
                title: "点赞成功",
                duration: 1000,
            })
        })
        .catch((error: any) => {
            console.error('评论点赞失败', error);
        });
}

const add = async (e: any) => {
    let data = {
        articleId: props.articleId,
        userId: uni.getStorageSync('userId'),
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
        let res = await addComment(param);
        console.log("回复结果", res);
        // fetchData.value = 1;
        uni.$emit('fetchDataOperation', 1);

    } else {
        // 评论
        let param = Object.assign({}, data);
        param.commentType = 0;
        console.log("评论", param);
        let res = await addComment(param);
        console.log("评论结果", res);
        // fetchData.value = 1;     
        uni.$emit('fetchDataOperation', 1);

    }
    // request api
    // insert into db
    fetchData.value = 0;

}

const fetchDataOperation = (data: any) => {
    if (data) {
        // uni.$emit('fetchDataOperation', data);
        fetchData.value = 1;
    } else {
        fetchData.value = 0;
    }
}

const initLikeStar = async () => {
    let res: any = await getArticleLikeStarStatus(`${props.articleId},${uni.getStorageSync('userId')}`, 'like');
    let res1: any = await getArticleLikeStarStatus(`${props.articleId},${uni.getStorageSync('userId')}`, 'star');

    console.log('init', res, res1);
    if (res.data && res) {
        like.value = true
        // like.value = res.data.like;
    }
    if (res1.data && res1) {
        star.value = true
        // like.value = res.data.like;
    }
}

const likeStar = async (type: string) => {
    console.log("点赞article", props.articleId);

    // request api    
    let res: any = await getArticleLikeStarStatus(`${props.articleId},${uni.getStorageSync('userId')}`, type);
    console.log('@@@', res);
    // judge is liked?
    if (res.data && res) {

        // type === 'like' ?
        // uni.showToast({
        //     title: "提示",
        //     content: "你已点赞了该文章",
        //     // showCancel: false
        // }) :
        // uni.showToast({
        //     title: "提示",
        //     content: "你已收藏了该文章",
        //     // showCancel: false
        // })
        let res: any = await delArticleLikeStarStatus(`${props.articleId},${uni.getStorageSync('userId')}`, type);
        console.log('@@@', res);
        // 刷新页面
        if (type === 'like') {
            uni.showToast({
                icon: "success",
                title: "已经取消点赞",
                // showCancel: false，
                
            })
            like.value = false
            // delArticleLikeStarStatus(`${props.articleId},${userStore.getUserId}`, type);
        } else {
            uni.showToast({
                icon: "success",
                title: "已经取消收藏",
                // showCancel: false
            })
            star.value = false
        }
        return;
    }
    // insert into db
    let insertStatus = type === 'like' ?
        await insertArticleLikeStarStatus(`${props.articleId},${uni.getStorageSync('userId')}`, type) : await insertArticleLikeStarStatus(`${props.articleId},${uni.getStorageSync('userId')}`, type);
    if (insertStatus && type) {
        type === 'like' ?
            like.value = true :
            star.value = true
    }
    uni.showModal({
        title: "提示",
        content: type === 'like' ? "点赞成功" : "收藏成功",
        showCancel: false
    })
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
        align-items: flex-end;
        /* Align to the bottom */
        transform: translateY(100%);
        /* Start off-screen */
        transition: transform 2s ease;
        /* Transition effect */
    }

    .popup.sliding {
        transform: translateY(0);
        /* Slide up */
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