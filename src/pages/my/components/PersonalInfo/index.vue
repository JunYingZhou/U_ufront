<template>
    <view class="personal-info">
        <view class="avatar">
            <image :src="avatar" mode="scaleToFill" />
        </view>
        <view class="info">
            <view class="info-item">
                <text class="info-label">用户名:</text>
                <text class="info-value">{{ userInfo.username }}</text>
            </view>
            <view class="info-item">
                <text class="info-label">邮箱:</text>
                <text class="info-value">{{ userInfo.email }}</text>
            </view>
            <view class="info-item">
                <text class="info-label">性别:</text>
                <text class="info-value">{{ userInfo.gender }}</text>
            </view>
        </view>
    </view>
</template>

<script setup lang='ts'>
import { onMounted, reactive, toRefs } from 'vue';
import { useUserStore } from "@/stores";
const userStore = useUserStore()

let userInfo = reactive<any>({})

onMounted(() => {
    // 获取UserInfo并保持响应式
    Object.assign(userInfo, userStore.getUserInfo);
    console.log('子组件获取到的数据', userInfo);
    // 使用toRefs将userInfo转换为响应式引用
    const { username, email, gender, avatar } = toRefs(userInfo);
    console.log('子组件获取到的数据', username.value, email.value, gender.value, avatar.value);
})


</script>

<style scoped>
.personal-info {
    padding: 30px;
    text-align: center;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: auto;
}

.avatar {
    margin-bottom: 20px;
    border-radius: 50%;
    overflow: hidden;
    width: 100px; /* 设置头像宽度 */
    height: 100px; /* 设置头像高度 */
    border: 3px solid #007bff; /* 边框颜色 */
}

.avatar image {
    width: 100%;
    height: 100%;
}

.info {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
}

.info-item {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
    padding: 10px;
    border-bottom: 1px solid #e9ecef;
}

.info-label {
    font-size: 16px;
    color: #495057;
    font-weight: bold;
}

.info-value {
    font-size: 16px;
    color: #343a40;
}
</style>