<template>
  <view class="container">
    <form class="form" @submit.prevent="login">
      <view class="input-span">
        <text class="label">Email</text>
        <input v-model="formData.username" type="email" name="username" id="email" placeholder="Enter your email" />
      </view>
      <view class="input-span">
        <text class="label">Password</text>
        <input v-model="formData.password" type="password" name="password" id="password"
          placeholder="Enter your password" />
      </view>
      <view class="span">
        <navigator url="/pages/forgot-password/index">Forgot password?</navigator>
      </view>
      <button class="submit" @click="login()">Log in</button>
      <view class="span">Don't have an account? <navigator url="/pages/sign-up/index">Sign up</navigator>
      </view>
    </form>
    <!--    <text>Login</text>-->
  </view>
</template>

<script setup lang="ts">
import { userLogin1 } from '@/api/user'
import { useUserStore } from "@/stores";
import { ref } from 'vue'

const userStore = useUserStore()
const formData = ref({
  username: 'tenant@thingsboard.org',
  password: 'WissonRobotics2024'
})

const login = async () => {
  try {
    uni.showToast({
      icon: 'none',
      title: 'Logging in...',
    });

    const res: any = await userLogin1(formData.value);

    console.log(res);

    uni.showToast({
      icon: 'none',
      title: 'Login successful',
    });
    uni.setStorageSync('token', res.token)
    userStore.setToken();
    uni.switchTab({ url: '/pages/index/index' })

  } catch (error) {
    console.error('Login error:', error);
    uni.showToast({
      icon: 'none',
      title: 'An error occurred',
    });
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(@/static/images/backImage.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.form {
  --bg-light: #efefef;
  --bg-dark: #707070;
  --clr: #eca011;
  --clr-alpha: #9c9c9c60;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
}

.input-span {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

input[type="email"],
input[type="password"] {
  border-radius: 0.5rem;
  padding: 1rem 0.75rem;
  width: 100%;
  border: none;
  background-color: var(--clr-alpha);
  outline: 2px solid var(--bg-dark);
}

input[type="email"]:focus,
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
  color: var(--bg-dark);
}

.span navigator {
  color: var(--clr);
}
</style>
