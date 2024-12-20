<script setup lang="ts">
import { userLogin1, accountLogin } from '@/api/user'
import { useUserStore } from "@/stores";
import { getImageCaptcha } from '@/api/captcha'
import { onMounted, onUnmounted, ref } from 'vue'
import { encryptByRsa } from '@/utils/encrypt'


const userStore = useUserStore()
const formData = ref({
  // username: 'tenant@thingsboard.org',
  username: 'admin',
  // password: 'WissonRobotics2024',
  password: 'admin123',
  uuid: '',
  captcha: '',
  expired: false // 验证码是否过期
})
const userNameError = ref(true);

let timer: any; // 定时器

const captchaImageBase64 = ref('')


onMounted(async() => {
  await getCaptcha();
})

const getCaptcha = async () => {
  console.log('获取验证码')
  try {
      const res: any = await getImageCaptcha()
      const { uuid, img, expireTime } = res.data
      console.log('验证码数据:', res.data)
      formData.value.uuid = uuid
      if (res.data && img) {
        captchaImageBase64.value = img
        console.log('验证码图片数据有效:', captchaImageBase64.value)
        formData.value.expired = false;
      } else {
        console.error('验证码图片数据无效')
      }
      // 启动定时器，在验证码过期时更新验证码
      startTimer(expireTime)
  } catch (error) { 
  }
}

const startTimer = (expireTime: number) => {
  if (timer) {
    clearTimeout(timer)
  }
  const remainingTime = expireTime - Date.now()
  if (remainingTime <= 0) {
    formData.value.expired = true
    return
  }
  timer = setTimeout(() => {
    formData.value.expired = true
  }, remainingTime)
}


// 组件销毁时清理定时器
onUnmounted(() => {
  if (timer) {
    clearTimeout(timer)
  }
})

onUnmounted


const login = async () => {
  // 校验username
  if(!formData.value.username){
    userNameError.value = false;
  }

  try {
    uni.showToast({
      icon: 'none',
      title: 'Logging in...',
    });
    
    const res: any = await accountLogin({
      username: formData.value.username,
      password: encryptByRsa(formData.value.password) || '',
      uuid: formData.value.uuid,
      captcha: formData.value.captcha
    });

    console.log(res); // 调试信息

    if(res.msg === 'ok'){
      uni.showToast({
        icon: 'none',
        title: '成功登录',
      });
      userStore.setToken(res.data.token);
      console.log('token数据',uni.getStorageSync('token')); // 调试信息
      console.log('跳转到首页'); // 调试信息
      uni.switchTab({ url: '/pages/index/index' });
    } else {
      uni.showToast({
        icon: 'none',
        title: res.msg,
      });
    }

  } catch (error) {
    console.error('Login error:', error);
    uni.showToast({
      icon: 'none',
      title: 'An error occurred',
    });
  }
}


const getUserInfo = () => {
		return new Promise((resolve, reject) => {
			uni.getUserProfile({
				lang: 'zh_CN',
				desc: '用户登录', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，
				success: (res) => {
					console.log(res, 'resss')
					resolve(res.userInfo)
				},
				fail: (err) => {
					reject(err)
				}
			})
		})
	}
			
	const getLogin = () => {
		return new Promise((resolve, reject) => {
			uni.login({
				success(res) {
					console.log(res, 'res')
					resolve(res)
				},
				fail: (err) => {
					console.log(err, 'logoer')
					reject(err)
				}
			})
		})
	}

  const weixinLogin = () => {
    uni.login({
    provider: 'weixin',
    success: function (loginRes) {
        // 登录成功
        uni.getUserInfo({
            provider: 'weixin',
            success: function(info) {
                // 获取用户信息成功, info.authResult保存用户信息
                console.log(info, 'info')
            }
        })
    },
    fail: function (err) {
        // 登录授权失败
        // err.code是错误码
    }
});
  }
 
//    const weixinLogin =() => {
// 		uni.getProvider({
// 			service: 'oauth',
// 			success: function(res) {
// 			   //支持微信、qq和微博等
// 			   if (~res.provider.indexOf('weixin')) {
// 					console.log(res, 'ress')
// 					let userInfo = getUserInfo();
// 					let loginRes = getLogin();
// 					Promise.all([userInfo, loginRes]).then((result) =>{
// 						let userInfo = result[0];
// 						let loginRes = result[1];
// 						let access_token = loginRes.authResult.access_token;
// 						let openid = loginRes.authResult.openid;
// 						let data = Object.assign(loginRes.authResult, userInfo);
// 						that.$store.dispatch('Login', {
// 								type: 'weixin',
// 								url: that.url,
// 								data
// 						}).then(r => {
// 								if (r == 'ok') {
// 									uni.hideLoading()
// 								}
// 								}).catch(err => {
// 									uni.hideLoading();
// 									uni.showToast({
// 									icon: 'none',
// 									title: err
// 								})
// 							})
// 						})
 
// 						}
// 					},
// 		   fail: function(err) {
// 				uni.hideLoading();
// 				uni.showToast({
// 				icon: 'none',
// 				title: err
// 				})
// 			}
// 	})
// }


</script>

<template>
  <view class="container">
    <form class="form" @submit.prevent="login">
      <view class="input-span">
        <text class="label">账号/邮箱</text>
        <input v-model="formData.username" type="email" name="username" id="email" placeholder="Enter your email" />
        <!-- <text class="error" v-if="userNameError">账号/邮箱错误</text> -->
      </view>
      <view class="input-span">
        <text class="label">密码</text>
        <input v-model="formData.password" type="password" name="password" id="password"
          placeholder="Enter your password" />
      </view>
      <view class="input-span">
        <text class="label">验证码</text>
        <view class="captcha-box">
          <input type="text" v-model="formData.captcha" name="captcha" id="captcha" placeholder="请输入验证码" />
          <image class="captcha-img" :src="captchaImageBase64" alt="captcha" @click="getCaptcha" />
          <view class="expired-img" v-if="formData.expired">
            <text>已经过期，请刷新</text>
          </view>
        </view>
      </view>
      <view class="span">
        <navigator url="/pages/forgot-password/index">忘记密码</navigator>
      </view>
      <button class="submit" @click="login">登录</button>
      <view class="span">还没有账号？<navigator url="/pages/sign-up/index">注册</navigator>
      </view>
    </form>
    <!--    <text>Login</text>-->
    <view class="weixin-login-btn">
      <image
        class="weixin-logo"
        src="@/static/images/weiXinLogo.png"
      />
      <text @click="weixinLogin">微信登录</text>
    </view>    
  </view>
</template>

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
  background-size: 100% auto; /* 设置背景图片大小为100%宽度，高度自动适应 */
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
  text-decoration: none;
  display: flex;
  flex-direction: row;
  color: var(--bg-dark);
}

.span navigator {
  color: var(--clr);
}
</style>
