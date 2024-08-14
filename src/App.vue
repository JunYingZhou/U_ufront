<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import {useUserStore} from "@/stores";
onLaunch(() => {
  console.log("App Launch");
  // 进行路由拦截
  const userStore = useUserStore();

  // uni.addInterceptor("navigateTo", {
  //   invoke(e) {
  //     console.log("拦截器拦截到路由跳转请求APP: " + e.url)
  //     // 获取用户的token
  //     const token = uni.getStorageSync('token');
  //     // 获取当前页面路径（即url去掉"?"和"?"后的参数）
  //     const url = e.url.split('?')[0];
  //
  //     if (needLogin.includes(url) && !token) {
  //       uni.showToast({
  //         title: '请先登录',
  //         icon: 'none'
  //       });
  //       uni.navigateTo({
  //         url: "/pages/login/index"
  //       });
  //       // Prevent navigation to the restricted page
  //       return false;
  //     }
  //
  //     return true;
  //   },
  //   fail(err) {
  //     console.log(err);
  //   },
  // });
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style></style>
