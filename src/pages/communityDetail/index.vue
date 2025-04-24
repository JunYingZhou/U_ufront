<template>
    <view class="community-container" v-if="!loading">
        <!-- 社区信息 -->
        <view class="community-header">
            <image class="community-image" src="http://117.72.78.239:9000/zjyminio/OIP.jpg" />
            <view class="community-info">
                <text class="community-name">网络刷单反诈社区</text>
                <text class="community-desc">揭露刷单骗局，分享防骗经验，提高安全意识。</text>
            </view>
        </view>

        <!-- 选项卡（帖子列表 / 社区问答） -->
        <view class="tab-bar">
            <text 
                class="tab-item" 
                :class="{ active: activeTab === 'posts' }" 
                @click="activeTab = 'posts'">
                帖子列表
            </text>
            <text 
                class="tab-item" 
                :class="{ active: activeTab === 'qa' }" 
                @click="activeTab = 'qa'">
                社区问答
            </text>
        </view>

        <!-- 内容展示 -->
        <view v-if="activeTab === 'posts'">
            <view class="post-list">
                <view class="post-item" v-for="post in posts" :key="post.id">
                    <image class="user-avatar" :src="post.articleCoverUrl" />
                    <view class="post-content" @click="toDetail(post)">
                        <text class="user-name">{{ post.username }}</text>
                        <text class="post-title">{{ post.articleTitle }}</text>
                        <text class="post-abstract">{{ post.articleAbstract }}</text>
                        <view class="post-footer">
                            <text class="likes">👍 {{ post.articleLikeCount }}</text>
                            <text class="comments">💬 {{ post.comments }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <view v-if="activeTab === 'qa'">
            <view class="qa-list">
                <view class="qa-item" v-for="qa in questions" :key="qa.id">
                    <text class="qa-question" @click="toQDetail(qa)">Q: {{ qa.questionsTitle }}</text>
                    <text class="qa-answer">A: {{ "进入查看" }}</text>
                </view>
            </view>
        </view>

        <!-- 发布按钮 -->
        <button class="post-btn" @click="postArticle">{{ activeTab == "posts" ? "+ 发布内容" : "+ 发布问题" }}</button>
    </view>
    <template v-else>
        <view class="container-loading">
            <!-- <view class="loading">加载中...</view> -->
            <view class="boxes">
                <view class="box">
                    <view></view>
                    <view></view>
                    <view></view>
                    <view></view>
                </view>
                <view class="box">
                    <view></view>
                    <view></view>
                    <view></view>
                    <view></view>
                </view>
                <view class="box">
                    <view></view>
                    <view></view>
                    <view></view>
                    <view></view>
                </view>
                <view class="box">
                    <view></view>
                    <view></view>
                    <view></view>
                    <view></view>
                </view>
            </view>
        </view>
    </template>
    <view v-if="isShowQuestionModal" class="modal-mask">
        <view class="question-modal">
            <view class="modal-header">
                <text class="modal-title">发布新问题</text>
            </view>
            <view class="modal-body">
                <textarea 
                    v-model="questionInput" 
                    placeholder="请输入您的问题（至少10个字）" 
                    class="question-input"
                    maxlength="200"
                    auto-height
                />
            </view>
            <view class="modal-footer">
                <button class="btn cancel" @click="cancelQuestion">取消</button>
                <button class="btn confirm" @click="submitQuestion">提交问题</button>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { queryCommunityList } from '@/api/community'
import { addQuestion } from '@/api/questions'
import { getArticleLikeCount, getArticleCommentCount } from '@/api/article'
import { onLoad } from "@dcloudio/uni-app";
// import 
// 当前选项卡
const activeTab = ref<"posts" | "qa">("posts");

// 帖子数据（假数据）
const posts = ref<any>([
]);

const communityId = ref<any>(0) // 社区详细数据
// 社区问答数据（假数据）
const questions = ref<any>([
    // { id: 1, question: "如何分辨刷单骗局？", answer: "高回报低风险的兼职一般都是骗局，谨防被骗。" },
    // { id: 2, question: "被骗了该怎么办？", answer: "立即拨打110报警，并联系银行冻结相关资金。" }
]);

const loading = ref<boolean>(false) // 加载状态

const isShowQuestionModal = ref<boolean>(false) // 是否显示问题模态框
const questionInput = ref(''); // 新增问题输入绑定


onLoad((option: any) => {
    console.log('社区页面加载', option) 
    option && (communityId.value = option.communityId)
})


onMounted(async () => {
    await init()
})

const init = async() => {
    loading.value = true
   let res: any = await queryCommunityList(communityId.value)
   console.log('社区详细数据',res) 
   if(res.msg == 'ok') {
    for (const element of res.data.articleList) {
        const res: any = await Promise.all([getArticleLikeCount(element.id), getArticleCommentCount(element.id)])
        console.log('文章', res)
        element.articleLikeCount = res[0].data
        element.comments = res[1].data
    }
    questions.value = res.data.questionsRespList.reverse() || []
    posts.value = res.data.articleList.reverse() || []
    loading.value = false 
   }
}

const toDetail = (item: any) => {
    console.log('文章详情', item)
    // uni.navigateTo({ url: `/pages/article/index?article=${JSON.stringify(item)}` })
    uni.navigateTo({ url: `/pages/article/index?articleId=${item.id}` })
}

const toQDetail = (item: any) => {
    console.log('文章详情', item)
    uni.navigateTo({ url: `/pages/QA/index?question=${JSON.stringify(item)}` })
}

const submitQuestion = async() => {
    if (questionInput.value.length < 10) {
        uni.showToast({ title: '问题至少需要10个字', icon: 'none' });
        return;
    }
    // 这里添加实际提交逻辑
    console.log('提交问题:', questionInput.value);

    let res: any = await addQuestion({
        communityId: communityId.value,
        questionsContent: questionInput.value,
        questionsTitle: questionInput.value,
        questionsState: 0,
        questionsLikeCount: 0,
        userId: uni.getStorageSync('userId'),
        isDel: 0,
    })

    console.log('提交问题', res)

    await init()

    isShowQuestionModal.value = false;
    questionInput.value = '';
    
};

const cancelQuestion = () => {
    isShowQuestionModal.value = false;
    questionInput.value = '';
};

const postArticle = () => {
    if(activeTab.value == 'posts') {
        uni.redirectTo({ url: `/pages/establish/index?from=${1}&communityId=${communityId.value}` })
    }else {
        isShowQuestionModal.value = true
    }
    // pages/establish/index
}
</script>

<style scoped>
/* 容器 */
.community-container {
    padding: 10px;
    background-color: #f8f8f8;
}

.modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.question-modal {
    background: white;
    width: 80%;
    border-radius: 12px;
    padding: 20px;
}

.modal-header {
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
}

.modal-title {
    font-size: 18px;
    font-weight: bold;
}

.modal-body {
    padding: 15px 0;
}

.question-input {
    width: 92%;
    min-height: 120px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 15px;
}

.btn {
    padding: 8px 20px;
    border-radius: 6px;
    font-size: 14px;
}

.cancel {
    background: #f0f0f0;
    color: #666;
}

.confirm {
    background: #eb872a;
    color: white;
}

.container-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.boxes {
    --size: 32px;
    --duration: 800ms;
    height: calc(var(--size) * 2);
    width: calc(var(--size) * 3);
    position: relative;
    transform-style: preserve-3d;
    transform-origin: 50% 50%;
    margin-top: calc(var(--size) * 1.5 * -1);
    transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
}

.boxes .box {
    width: var(--size);
    height: var(--size);
    top: 0;
    left: 0;
    position: absolute;
    transform-style: preserve-3d;
}

.boxes .box:nth-child(1) {
    transform: translate(100%, 0);
    -webkit-animation: box1 var(--duration) linear infinite;
    animation: box1 var(--duration) linear infinite;
}

.boxes .box:nth-child(2) {
    transform: translate(0, 100%);
    -webkit-animation: box2 var(--duration) linear infinite;
    animation: box2 var(--duration) linear infinite;
}

.boxes .box:nth-child(3) {
    transform: translate(100%, 100%);
    -webkit-animation: box3 var(--duration) linear infinite;
    animation: box3 var(--duration) linear infinite;
}

.boxes .box:nth-child(4) {
    transform: translate(200%, 0);
    -webkit-animation: box4 var(--duration) linear infinite;
    animation: box4 var(--duration) linear infinite;
}

.boxes .box>view {
    --background: #ec7d0f;
    --top: auto;
    --right: auto;
    --bottom: auto;
    --left: auto;
    --translateZ: calc(var(--size) / 2);
    --rotateY: 0deg;
    --rotateX: 0deg;
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--background);
    top: var(--top);
    right: var(--right);
    bottom: var(--bottom);
    left: var(--left);
    transform: rotateY(var(--rotateY)) rotateX(var(--rotateX)) translateZ(var(--translateZ));
}

.boxes .box>view:nth-child(1) {
    --top: 0;
    --left: 0;
}

.boxes .box>view:nth-child(2) {
    --background: #ec7d0f;
    --right: 0;
    --rotateY: 90deg;
}

.boxes .box>view:nth-child(3) {
    --background: #f09840;
    --rotateX: -90deg;
}

.boxes .box>view:nth-child(4) {
    --background: #DBE3F4;
    --top: 0;
    --left: 0;
    --translateZ: calc(var(--size) * 3 * -1);
}

@-webkit-keyframes box1 {

    0%,
    50% {
        transform: translate(100%, 0);
    }

    100% {
        transform: translate(200%, 0);
    }
}

@keyframes box1 {

    0%,
    50% {
        transform: translate(100%, 0);
    }

    100% {
        transform: translate(200%, 0);
    }
}

@-webkit-keyframes box2 {
    0% {
        transform: translate(0, 100%);
    }

    50% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(100%, 0);
    }
}

@keyframes box2 {
    0% {
        transform: translate(0, 100%);
    }

    50% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(100%, 0);
    }
}

@-webkit-keyframes box3 {

    0%,
    50% {
        transform: translate(100%, 100%);
    }

    100% {
        transform: translate(0, 100%);
    }
}

@keyframes box3 {

    0%,
    50% {
        transform: translate(100%, 100%);
    }

    100% {
        transform: translate(0, 100%);
    }
}

@-webkit-keyframes box4 {
    0% {
        transform: translate(200%, 0);
    }

    50% {
        transform: translate(200%, 100%);
    }

    100% {
        transform: translate(100%, 100%);
    }
}

@keyframes box4 {
    0% {
        transform: translate(200%, 0);
    }

    50% {
        transform: translate(200%, 100%);
    }

    100% {
        transform: translate(100%, 100%);
    }
}


/* 社区信息 */
.community-header {
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 社区图片 */
.community-image {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    margin-right: 10px;
}

/* 社区文本信息 */
.community-info {
    flex: 1;
}

.community-name {
    font-size: 16px;
    font-weight: bold;
}

.community-desc {
    display: flex;
    font-size: 12px;
    color: gray;
    margin-top: 5px;
}

/* 选项卡 */
.tab-bar {
    display: flex;
    justify-content: space-around;
    background: white;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tab-item {
    font-size: 14px;
    color: gray;
    cursor: pointer;
    padding-bottom: 5px;
}

.tab-item.active {
    color: #eb872a;
    font-weight: bold;
    border-bottom: 2px solid #eb872a;
}

/* 帖子列表 */
.post-list {
    margin-top: 10px;
}

.post-item {
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
}

.post-content {
    flex: 1;
}

.user-name {
    font-size: 14px;
    font-weight: bold;
    color: #333;
}

.post-title {
    font-size: 16px;
    font-weight: bold;
    margin: 5px 0;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    white-space: normal;
}

.post-abstract {
    font-size: 14px;
    color: #666;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    white-space: normal;
}

.post-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    font-size: 12px;
    color: #888;
}

/* 问答列表 */
.qa-list {
    margin-top: 10px;
}

.qa-item {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.qa-question {
    font-size: 16px;
    font-weight: bold;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    white-space: normal;
}

.qa-answer {
    font-size: 14px;
    color: #666;
    margin-top: 5px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    white-space: normal;
}

/* 发布按钮 */
.post-btn {
    width: 90%;
    margin: 20px auto;
    display: block;
    background-color: #eb872a;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    font-size: 16px;
    text-align: center;
}
</style>
