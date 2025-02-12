<template>
    <view class="community-container">
        <!-- 顶部导航 -->
        <view class="nav-bar">
            <text class="title">社区列表</text>
        </view>

        <!-- 社区列表 -->
        <view class="community-list">
            <view class="community-item" v-for="community in communities" :key="community.id">
                <image class="community-icon" :src="community.icon" />
                <view class="community-info">
                    <text class="community-name">{{ community.name }}</text>
                    <text class="community-desc">{{ community.description }}</text>
                    <text class="community-members">👥 {{ community.members }} 人</text>
                </view>
                <view class="join-btn" @click="joinCommunity(community.id)">加入</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 假数据
const communities = ref([
    {
        id: 1,
        name: "网络刷单社区",
        description: "讨论各种电信刷单诈骗案例、经验交流，发现最新的刷单诈骗。",
        members: 8523,
        icon: "http://117.72.78.239:9000/zjyminio/OIP.jpg"
    },
    {
        id: 2,
        name: "海外消费社区",
        description: "分享海外购物陷阱。",
        members: 4321,
        icon: "http://117.72.78.239:9000/zjyminio/OIP (1).jpg"
    },
    {
        id: 3,
        name: "网络情感社区",
        description: "交流情感话题，解决恋爱、婚姻、交友的新型电信诈骗案例。",
        members: 10234,
        icon: "http://117.72.78.239:9000/zjyminio/OIP (2).jpg"
    },
    {
        id: 4,
        name: "亲子借贷社区",
        description: "讨论家庭经济、育儿资金规划，分享借贷经验的网络诈骗。",
        members: 5678,
        icon: "http://117.72.78.239:9000/zjyminio/OIP (3).jpg"
    }
]);

const joinCommunity = (communityId: number) => {
    // TODO: 加入社区
    uni.navigateTo({ url: `/pages/communityDetail/index` });
}

</script>

<style scoped>
/* 容器 */
.community-container {
    padding: 10px;
    background-color: #f5f5f5;
}

/* 顶部导航 */
.nav-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    background-color: #eb872a;
    color: white;
    font-size: 18px;
    font-weight: bold;
}

/* 社区列表 */
.community-list {
    margin-top: 10px;
}

/* 每个社区 */
.community-item {
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 社区图标 */
.community-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
}

/* 社区信息 */
.community-info {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.community-name {
    font-size: 16px;
    font-weight: bold;
}

.community-desc {
    font-size: 12px;
    color: gray;
    margin: 5px 0;
}

/* 成员数量 */
.community-members {
    font-size: 12px;
    color: #eb872a;
}

/* 加入按钮 */
.join-btn {
    background-color: #eb872a;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
}
</style>
