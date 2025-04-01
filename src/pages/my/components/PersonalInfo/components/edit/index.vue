<template>
    <view class="edit-container">
        <!-- 头像部分 -->
        <view class="avatar-wrapper">
            <view class="avatar" @click="uploadAvatar">
                <image :src="userInfo.avatar ? userInfo.avatar : 'http://117.72.78.239:9000/zjyminio/defaultAvatar.webp'" mode="scaleToFill" webp="true" />
                <!-- 鼠标悬停提示 -->
                <view class="avatar-hover-tip" v-if="isAvatarHovered">点击上传头像</view>
            </view>
        </view>
        <!-- 表单部分 -->
        <form @submit="onSubmit" class="form-container">
            <view class="input-group">
                <label>昵称</label>
                <input v-model="userInfo.nickname" placeholder="请输入昵称" class="input-field" />
            </view>
            
            <view class="input-group">
                <label>邮箱</label>
                <input v-model="userInfo.email" placeholder="请输入邮箱" type="email" class="input-field" />
            </view>
            
            <view class="input-group">
                <label>手机号</label>
                <input v-model="userInfo.phone" placeholder="请输入手机号" type="tel" class="input-field" />
            </view>
            
            <view class="input-group">
                <label>性别</label>
                <view @click="showGenderPicker = true" class="input-field select-field">
                    <input class="select-input" readonly :value="userInfo.gender === 1 ? '男' : '女'" placeholder="请选择性别" />
                    <view class="select-arrow">▼</view>
                </view>
                <view v-if="showGenderPicker" class="gender-picker">
                    <view v-for="(option, index) in selectedGender" 
                          :key="index" 
                          @click="onGenderConfirm(option)" 
                          class="gender-option"
                          :class="{ 'selected': userInfo.gender === option }">
                        {{ option === 1 ? "男" : "女" }}
                    </view>
                </view>
            </view>
            
            <button @click="onSubmit">
                <svg viewBox="0 0 16 16" class="bi bi-instagram" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg"> <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path> </svg>
                  <span>保存</span>
            </button>
        </form>
    </view>
</template>

<script setup lang="ts">
// 这里可以添加组件的逻辑代码
import { useUserStore } from "@/stores";
import { getUserInfo, UpdateUser } from '@/api/user';
import { onMounted, reactive, ref } from 'vue';
const userStore = useUserStore();
let userInfo = reactive<any>({});
const showGenderPicker = ref(false);
const genderOptions = ref(['男', '女']);
let genderInput = ref('');
const selectedGender = ref([1, 2]);
const isAvatarHovered = ref(false); // 新增变量用于控制头像悬停提示

onMounted(() => {
    // 获取UserInfo并保持响应式
    Object.assign(userInfo, userStore.getUserInfo);
    console.log('子组件获取到的数据', userInfo);
})

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

const getUserInfoF = async() => {
  // 获取我的信息
  console.log('userId -->',userInfo.id);
  const user: any = await getUserInfo(userInfo.id)
  userInfo = user?.data
  onGenderConfirm(userInfo.gender)
  userStore.saveUserInfo(userInfo)
  console.log('userInfo -->',userStore.getUserInfo)
}

const onSubmit = () => {
    // 这里可以添加保存表单数据的逻辑
    console.log('表单数据:', userInfo);
    // 调用 API 保存数据
    UpdateUser(userInfo.id, userInfo).then(res => {
        console.log('保存成功', res);
        getUserInfoF();
        uni.$emit('refreshPersonalInfo', 1)
    })
    // 示例：await saveUserInfo(userInfo);
    uni.showToast({
        title: '保存成功',
        duration: 2000,
    });
}

const onGenderConfirm = (value: any) => {
    userInfo.gender = value;
    genderInput.value = value === 1 ? "男" : "女";
    showGenderPicker.value = false;
}
</script>

<style scoped lang="scss">
.edit-container {
    padding: 24px;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    max-width: 420px;
    margin: 20px auto;
    overflow-y: auto;
    height: 90vh;
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

.form-container {
    width: 100%;
}

.input-group {
    margin-bottom: 20px;
    text-align: left;
}

.input-group label {
    display: block;
    margin-bottom: 6px;
    font-size: 14px;
    color: #333;
    font-weight: 500;
}

.input-field {
    position: relative;
    width: 100%;
    height: 90rpx;
    padding: 0rpx 30rpx;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 14px;
    background: #fafafa;
    transition: all 0.3s ease;
}

.select-field {
    padding-right: 30px;
    cursor: pointer;

}

.select-input {
    height: 90rpx;
}

.select-arrow {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
    font-size: 12px;
    pointer-events: none;
}

.gender-picker {
    position: absolute;
    width: 100%;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 8px 0;
    z-index: 10;
}

.gender-option {
    padding: 10px 16px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.gender-option:hover {
    background: #f5f5f5;
}

.gender-option.selected {
    background: #e6f7ff;
    color: #409eff;
}

.submit-button {
    width: 100%;
    padding: 12px;
    background: #e48f3a;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.submit-button:hover {
    background: #cea985;
    box-shadow: 0 2px 8px rgba(220, 153, 95, 0.3);
}

.submit-button:active {
    background: #e48f3a;
}

button {
    background: transparent;
    position: relative;
    padding: 5px 15px;
    display: flex;
    align-items: center;
    font-size: 17px;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    border: 1px solid rgb(241, 137, 46);
    border-radius: 25px;
    outline: none;
    overflow: hidden;
    color: rgb(227, 148, 45);
    width: 200rpx;
    display: flex;
    justify-content: center;
    transition: color 0.3s 0.1s ease-out;
}

button span {
    margin: 10px;
}

button::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    content: '';
    border-radius: 50%;
    display: block;
    width: 20em;
    height: 20em;
    left: -5em;
    text-align: center;
    transition: box-shadow 0.5s ease-out;
    z-index: -1;
}

button:active {
    color: #fff;
    border: 1px solid rgb(255,0,0);
}

button:active::before {
    box-shadow: inset 0 0 0 10em rgb(255, 0, 0);
}

</style>