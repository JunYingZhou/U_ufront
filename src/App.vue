<script setup lang="ts">
import { onLaunch, onShow, onHide, onLoad } from "@dcloudio/uni-app";
import { useUserStore } from "@/stores";
onLaunch(() => {
  console.log("App Launch");
  // 进行路由拦截
  const userStore = useUserStore();
  // 监听中间按钮
  // uni.onTabBarMidButtonTap(()=>{
	// 			console.log('中间按钮的逻辑操作');
  //     })
});
onLoad(() => {
  uni.onTabBarMidButtonTap(() => {
    console.log("监听中间按钮")
  })
})
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});

</script>


<style lang="scss">
// 字体图标
@use '@/styles/fonts.scss';

view,
navigator,
input,
scroll-view {
  box-sizing: border-box;
}

button::after {
  border: none;
}

swiper,
scroll-view {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

// 两行省略
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
