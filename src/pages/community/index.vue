<template>

    <view class="community-container">
        <template v-if="loading">
            <!-- 顶部导航 -->
            <view class="nav-bar">
                <text class="title">社区列表</text>
            </view>
            <!-- 社区列表 -->
            <view class="community-list">
                <view class="community-item" v-for="community in communities" :key="community.id">
                    <image class="community-icon" :src="community.communityCoverUrl" />
                    <view class="community-info">
                        <text class="community-name">{{ community.communityName }}</text>
                        <text class="community-desc">{{ community.communityDesc }}</text>
                        <text class="community-members">👥 {{ community.communityPeoples }} 人</text>
                    </view>
                    <view class="join-btn" @click="joinCommunity(community.id)">加入</view>
                </view>
            </view>
        </template>
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
    </view>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { queryAllCommunity } from "@/api/community";


// 假数据
// const communities = ref([
//     {
//         id: 1,
//         name: "网络刷单社区",
//         description: "讨论各种电信刷单诈骗案例、经验交流，发现最新的刷单诈骗。",
//         members: 8523,
//         icon: "http://117.72.78.239:9000/zjyminio/OIP.jpg"
//     },
//     {
//         id: 2,
//         name: "海外消费社区",
//         description: "分享海外购物陷阱。",
//         members: 4321,
//         icon: "http://117.72.78.239:9000/zjyminio/OIP (1).jpg"
//     },
//     {
//         id: 3,
//         name: "网络情感社区",
//         description: "交流情感话题，解决恋爱、婚姻、交友的新型电信诈骗案例。",
//         members: 10234,
//         icon: "http://117.72.78.239:9000/zjyminio/OIP (2).jpg"
//     },
//     {
//         id: 4,
//         name: "亲子借贷社区",
//         description: "讨论家庭经济、育儿资金规划，分享借贷经验的网络诈骗。",
//         members: 5678,
//         icon: "http://117.72.78.239:9000/zjyminio/OIP (3).jpg"
//     }
// ]);

let communities = reactive<any>([]);
let loading = ref(false);
onMounted(async () => {
    // TODO: 调用接口获取社区列表
    let res: any = await queryAllCommunity();
    loading.value = true;
    console.log('res', res.data.list);
    communities = res.data.list;
})


const joinCommunity = (communityId: number) => {
    // TODO: 加入社区
    uni.navigateTo({ url: `/pages/communityDetail/index` });
}

</script>

<style scoped>
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

.container-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

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
