<template>
    <view class="community-container">
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
                    <image class="user-avatar" :src="post.avatar" />
                    <view class="post-content">
                        <text class="user-name">{{ post.username }}</text>
                        <text class="post-title">{{ post.title }}</text>
                        <text class="post-abstract">{{ post.abstract }}</text>
                        <view class="post-footer">
                            <text class="likes">👍 {{ post.likes }}</text>
                            <text class="comments">💬 {{ post.comments }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <view v-if="activeTab === 'qa'">
            <view class="qa-list">
                <view class="qa-item" v-for="qa in questions" :key="qa.id">
                    <text class="qa-question">Q: {{ qa.question }}</text>
                    <text class="qa-answer">A: {{ qa.answer }}</text>
                </view>
            </view>
        </view>

        <!-- 发布按钮 -->
        <button class="post-btn">+ 发布内容</button>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { queryCommunityList } from '@/api/community'
import { onLoad } from "@dcloudio/uni-app";
// import 
// 当前选项卡
const activeTab = ref<"posts" | "qa">("posts");

// 帖子数据（假数据）
const posts = ref([
    {
        id: 1,
        username: "反诈小警察",
        avatar: "http://117.72.78.239:9000/zjyminio/shuadan1.jpg",
        title: "揭秘刷单骗局，别再上当了！",
        abstract: "最近很多人因为刷单被骗，我来分享一些真实案例，希望大家提高警惕！",
        likes: 128,
        comments: 45
    },
    {
        id: 2,
        username: "被骗的老王",
        avatar: "http://117.72.78.239:9000/zjyminio/shuadan2.jpg",
        title: "我被骗了5000元，如何追回？",
        abstract: "我看到一个兼职刷单的广告，说完成任务能返利，结果转账后就被拉黑了...",
        likes: 256,
        comments: 89
    }
]);

const communityId = ref<any>(0) // 社区详细数据
// 社区问答数据（假数据）
const questions = ref([
    { id: 1, question: "如何分辨刷单骗局？", answer: "高回报低风险的兼职一般都是骗局，谨防被骗。" },
    { id: 2, question: "被骗了该怎么办？", answer: "立即拨打110报警，并联系银行冻结相关资金。" }
]);

onLoad((option: any) => {
    console.log('社区页面加载', option) 
    option && (communityId.value = option.communityId)
})


onMounted(async () => {
   let res = await queryCommunityList(communityId.value)
   console.log('社区详细数据',res) 
})
</script>

<style scoped>
/* 容器 */
.community-container {
    padding: 10px;
    background-color: #f8f8f8;
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
}

.qa-answer {
    font-size: 14px;
    color: #666;
    margin-top: 5px;
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
