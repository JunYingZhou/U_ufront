<template>
    <view class="container">
      <form class="form" @submit.prevent="login">
        <view class="input-span">
          <text class="label">用户名</text>
          <input v-model="formData.username" type="text" name="username" id="username" placeholder="请输入用户名" />
          <!-- <text class="error" v-if="userNameError">账号/邮箱错误</text> -->
        </view>
        <view class="input-span">
          <text class="label">昵称</text>
          <input v-model="formData.nickname" type="text" name="nickname" id="nickname" placeholder="请输入昵称" />
          <!-- <text class="error" v-if="userNameError">账号/邮箱错误</text> -->
        </view>
        <view class="input-span">
          <text class="label">密码</text>
          <input v-model="formData.rawPassword" type="password" name="rawPassword" id="rawPassword"
            placeholder="请输入密码" />
        </view>
        <view class="input-span">
          <text class="label">确认密码</text>
          <input v-model="formData.confirmPassword" type="password" name="confirmPassword" id="confirmPassword"
            placeholder="请确认密码" />
        </view>
        <button class="submit" @click="signUp">注册</button>
        <view class="span">已有账号<navigator url="/pages/login/index">登录</navigator>
        </view>
      </form>
    </view>
  </template>

<script setup lang='ts'>
import { showToast } from '@/common/utils/showToast';
import { accountSignUp, addUser } from '@/api/user';
import { useUserStore } from "@/stores";
import { encryptByRsa } from '@/utils/encrypt';
import { ref } from 'vue';
const userStore = useUserStore()
const formData = ref<any>({
  nickname: '',
  username: '',
  rawPassword: 'admin123',
  password: '',
  confirmPassword: 'admin123',
  roleIds: ['547888897925840928'],
  deptId: "547888556819873814",
  gender: 2
})


const signUp = async() => {
    const { nickname, username, rawPassword, roleIds, deptId, confirmPassword } = formData.value;


    if (!nickname || !username || !rawPassword || !confirmPassword) {
        showToast('请填写完整');
        return;
    }

    // 校验account是否符合邮箱格式或者电话号码格式
    // if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(account) && !/^[0-9]{11}$/.test(account)) {
    //     showToast('账号/邮箱格式错误');
    //     return;
    // }

    if (rawPassword !== confirmPassword) {
        showToast('两次密码不一致');
        return;
    }
    console.log('发起注册');

    // if(formData.value.rawPassword){
    formData.value.password = encryptByRsa(formData.value.rawPassword);
    // }
    
    // 发起请求
    const res: any = await accountSignUp(formData.value);
    console.log(res);
    if (res.msg === 'ok') {
        showToast('注册成功');
        userStore.setToken(res.data.token);
        userStore.setUserId(res.data.userId);
        console.log('token数据', uni.getStorageSync('token')); // 调试信息
        uni.switchTab({ url: '/pages/index/index' });
        // 跳转到登录页面
        uni.redirectTo({
            url: '/pages/index/index'
        });
    }
};

</script>


<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  flex-direction: column;

  .weixin-login-btn {
    position: fixed;
    bottom: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .weixin-logo {
      width: 50px;
      height: 50px;
      background-size: 100% 100%;
    }

  }
}

.form {
  --bg-light: #efefef;
  --bg-dark: #707070;
  --clr: #eca011;
  --clr-alpha: #9c9c9c60;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 70%;
}

.input-span {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.captcha-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px
}


.captcha-img {
  background-repeat: no-repeat;
  background-size: 100% auto;
  /* 设置背景图片大小为100%宽度，高度自动适应 */
  width: 50%;
  height: 30px;
  line-height: 30px;
  z-index: 1;
}

.expired-img {
  position: absolute;
  right: 0;
  background: transparent;
  backdrop-filter: blur(10px);
  z-index: 2;
}

input[type="email"],
input[type="password"] {
  padding: 0 0.5rem;
  height: 40px;
  line-height: 40px;
  width: 100%;
  border: none;
  outline: 2px solid var(--bg-dark);
}


input[type="text"] {
  padding: 0 0.5rem;
  border: 2px solid var(--bg-dark);
  height: 40px;
  line-height: 40px;
}


input[type="email"]:focus,
input[type="text"]:focus,
input[type="password"]:focus {
  outline: 2px solid var(--clr);
}

.label {
  align-self: flex-start;
  color: var(--clr);
  font-weight: 600;
}

.submit {
  margin-top: 1rem;
  padding: 1rem 0.75rem;
  width: 100%;
  border-radius: 3rem;
  background-color: var(--bg-dark);
  color: var(--bg-light);
  border: none;
  cursor: pointer;
  transition: background-color 300ms, color 300ms;
  font-weight: 600;
  font-size: 0.9rem;
}

.submit:hover {
  background-color: var(--clr);
  color: var(--bg-dark);
}

.span {
  margin-top: 0.5rem;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  color: var(--bg-dark);
}

.span navigator {
  color: var(--clr);
}
</style>
