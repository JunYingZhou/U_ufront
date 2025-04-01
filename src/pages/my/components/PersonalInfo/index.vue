<template>
    <view class="personal-info">
        <!-- 头像部分 -->
        <view class="avatar-wrapper">
            <view class="avatar" @click="uploadAvatar">
                <image :src="userInfo.avatar ? userInfo.avatar : 'http://117.72.78.239:9000/zjyminio/defaultAvatar.webp'" mode="scaleToFill" webp="true" />
                <!-- 鼠标悬停提示 -->
                <view class="avatar-hover-tip" v-if="isAvatarHovered">点击上传头像</view>
            </view>
        </view>
        <view class="info">
            <view class="info-item">
                <text class="info-label">用户名:</text>
                <text class="info-value">{{ userInfo.nickname }}</text>
            </view>
            <view class="info-item">
                <text class="info-label">邮箱:</text>
                <text class="info-value">{{ userInfo.email }}</text>
            </view>
            <view class="info-item">
                <text class="info-label">手机号:</text>
                <text class="info-value">{{ userInfo.phone }}</text>
            </view>
            <view class="info-item">
                <text class="info-label">性别:</text>
                <text class="info-value">{{ userInfo.gender? '男':'女' }}</text>
            </view>
        </view>
        <view class="logout-button" @click="goToEdit">
            编辑个人信息
        </view>
    </view>
</template>

<script setup lang='ts'>
import { onMounted, reactive, toRefs, watch, onUnmounted } from 'vue';
import { useUserStore } from "@/stores";
import { getUserInfo } from '@/api/user';
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

            // 读取文件数据
            uni.getFileSystemManager().readFile({
                filePath: filePath,
                success: (fileRes) => {
                    const boundary = "----WebKitFormBoundary" + new Date().getTime();
                    const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
                    
                    // 构造 multipart/form-data 体
                    let body = `--${boundary}\r\n`;
                    body += `Content-Disposition: form-data; name="avatarFile"; filename="${fileName}"\r\n`;
                    body += `Content-Type: image/jpeg\r\n\r\n`; // 根据图片类型调整
                    const bodyBuffer = new Uint8Array([...new TextEncoder().encode(body), ...new Uint8Array(fileRes.data), ...new TextEncoder().encode(`\r\n--${boundary}--\r\n`)]);

                    // 发送请求
                    uni.request({
                        url: 'http://localhost:8000/system/user/avatar', // 替换为你的 API
                        method: 'POST',
                        header: {
                            'Content-Type': `multipart/form-data; boundary=${boundary}`,
                            'Authorization': `Bearer ${uni.getStorageSync('token')}`, // 如果需要鉴权
                        },
                        data: bodyBuffer.buffer,
                        responseType: 'text',
                        success(uploadRes) {
                            console.log('上传成功:', uploadRes.data);
                            // 更新用户信息
                            getUserInfoF();                            
                            uni.showToast({
                                title: '头像更新成功',
                                duration: 2000,
                            });
                        },
                        fail(err) {
                            console.error('上传失败:', err);
                            uni.showToast({
                                icon: 'none',
                                title: '上传失败',
                                duration: 2000,
                            });
                        }
                    });
                },
                fail(err) {
                    console.error('读取文件失败:', err);
                }
            });

        },
        fail(err) {
            console.error('选择媒体失败', err);
            uni.showToast({
                icon: 'none',
                title: '选择媒体失败',
                duration: 2000,
            })
        }
    })
}

const goToEdit = () => {
    uni.navigateTo({ url: '/pages/my/components/PersonalInfo/components/edit/index' })
}

onMounted(() => {
    // 获取UserInfo并保持响应式
    Object.assign(userInfo, userStore.getUserInfo);
    console.log('子组件获取到的数据', userInfo);
    uni.$on('refreshPersonalInfo', (data: any) => {
        console.log('子组件接收到的事件', data);
        getUserInfoF();
    })
})

onUnmounted(() => {
    uni.$off('refreshPersonalInfo')
})

const getUserInfoF = async() => {
  // 获取我的信息
  console.log('userId Personal -->',userInfo.id);
  const user: any = await getUserInfo(userInfo.id)
  userInfo = user?.data
  userStore.saveUserInfo(userInfo)
  console.log('userInfo -->',userStore.getUserInfo)
}


</script>

<style scoped>
.personal-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    height: 90vh;
    padding: 30px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: auto;
}

.avatar-wrapper {
    margin-bottom: 32px;
    display: flex;
    justify-content: center;
}

.avatar {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
}

.avatar:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.avatar-hover-tip {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.75);
    color: #fff;
    padding: 6px;
    font-size: 12px;
    transform: translateY(100%);
    transition: all 0.3s ease;
}

.avatar:hover .avatar-hover-tip {
    transform: translateY(0);
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
    margin-top: 200rpx;
  bottom: 3rem;
  display: flex;
  left: 50%;
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