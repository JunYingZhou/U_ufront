<script setup lang="ts">
import HeadInfo from '@/pages/my/components/HeadInfo/index.vue'
import UserItem from '@/pages/my/components/UserItem/index.vue'
import { useUserStore } from "@/stores";
const userStore = useUserStore()
import { onMounted, onUnmounted, reactive, ref} from 'vue'
import { getUserInfo } from '@/api/user'
import { onPullDownRefresh, onLoad } from '@dcloudio/uni-app';


let userId = ref<string>('')

let userInfo = reactive<any>({})

let dataLoading = ref(false)

// 下拉刷新
onPullDownRefresh(() => {
  console.log('下拉刷新')
  getUserInfoF();
  setTimeout(() => {
    uni.stopPullDownRefresh();
  },500)

})


onLoad(() => {
  // 获取我的信息
  userId.value = uni.getStorageSync('userId')
  getUserInfoF();
})

onMounted(() => {
  uni.$on('refreshPersonalInfo', (data: any) => {
        console.log('子组件接收到的事件', data);
        getUserInfoF();
    })})

onUnmounted(() => {
  console.log('解除绑定')
  uni.$off('refreshPersonalInfo')
})

const getUserInfoF = async() => {
  // 获取我的信息
  console.log('userId MY -->',userId.value)
  const user: any = await getUserInfo(userStore.getUserId || uni.getStorageSync('userId'))
  userInfo = user?.data
  userStore.saveUserInfo(userInfo)
  dataLoading.value = true
  console.log('userInfo -->',userStore.getUserInfo)
}

const logout = () => {
  userStore.logout()
  console.log("退出登录")
  uni.redirectTo({ url: "/pages/login/index" });
}
</script>

<template>
  <view class="container" v-if="dataLoading">
  <HeadInfo :nickname="userInfo.nickname"></HeadInfo>
  <UserItem></UserItem>
  <!-- 退出按钮 -->
  </view>
  <view class="logout-button" @click="logout">
    退出登录
   </view>
</template>

<style scoped>
.container {
  width: 100%;
}
.logout-button {
  position: fixed;
  bottom: 2rem;
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
