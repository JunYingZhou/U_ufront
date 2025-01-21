<template>
    <view class="personal-info">
        <view class="avatar" @click="uploadAvatar">
            <image :src="userInfo.avatar ? userInfo.avatar : 'http://117.72.78.239:9000/zjyminio/defaultAvatar.webp'" mode="scaleToFill" webp="true" />
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
                <text class="info-value">{{ userInfo.gender? '男':'女' }}</text>
            </view>
        </view>
        <view class="logout-button" @click="logout">
            编辑个人信息
        </view>
    </view>
</template>

<script setup lang='ts'>
import { onMounted, reactive, toRefs, watch } from 'vue';
import { useUserStore } from "@/stores";
// import minioClient from "@/utils/minio";
const userStore = useUserStore()

let userInfo = reactive<any>({})

watch(() => userInfo.avatar, (newValue) => {
    console.log('子组件获取到的头像数据', newValue);
    userInfo.avatar = newValue ? newValue : 'http://117.72.78.239:9000/zjyminio/defaultAvatar.webp';
}, { immediate: true });

const uploadAvatar = () => {
    console.log('上传头像');
    uni.chooseMedia({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
            const filePath = res.tempFiles[0].tempFilePath;
            console.log('选择的媒体文件路径:', filePath);
            const bucketName = 'zjyminio';
            const objectName = 'avatar/' + Date.now() + '.webp';

            // 更新头像
            uni.showToast({
                title: '等待审核中',
                duration: 2000,
            })
        },
        fail(err) {
            console.error('选择媒体失败', err);
            uni.showToast({
                title: '选择媒体失败',
                duration: 2000,
            })
        }
    })
}

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
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    text-align: center;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: auto;
}

.avatar {
    display: flex; /* Use flexbox for centering */
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    margin-bottom: 20px;
    border-radius: 50%;
    overflow: hidden;
    width: 7rem; /* 设置头像宽度 */
    height: 7rem; /* 设置头像高度 */
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
    width: 100%;
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

.logout-button {
  position: fixed;
  bottom: 3rem;
  display: flex;
  left: 50%;
  transform: translateX(-50%);
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 3rem;
  background-color: white;
  border-radius: 1.5rem;
  border: 1px solid #b6b4b4;
  color: black;
  font-size: 16px
}

.logout-button:active {
  background-color: #eb872a;
  color: white;
  border: 1px solid #eb872a;
}
</style>