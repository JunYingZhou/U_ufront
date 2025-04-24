<!--
 * @Author: zjy 3497577844@qq.com
 * @Date: 2025-01-22 00:16:55
 * @LastEditors: zjy 3497577844@qq.com
 * @LastEditTime: 2025-03-29 23:32:46
 * @FilePath: \u_uf\src\pages\article\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="container" v-if="loading">
    <!-- 文章封面图片 -->
    <!-- <image class="cover-image" :src="articleObj.articleCoverUrl" mode="widthFix" lazy-load /> -->
    <!-- 图片轮播 -->
    <view class="swiper-container" v-if="contentImageUrl.length > 0">
      <swiper
        class="swiper"
        :indicator-dots="true"
        :autoplay="true"
        :circular="true"
        :interval="5000"
        :duration="500"
      >
        <swiper-item v-for="(item, index) in contentImageUrl" :key="index">
          <image :src="item.artFileUrl" mode="aspectFill" lazy-load class="swiper-image" />
        </swiper-item>
      </swiper>
    </view>
    <view class="article-content">
      <!-- 文章标题 -->
      <view class="title">{{ articleObj.articleTitle }}</view>
      <!-- 文章摘要 -->
      <view class="abstract">{{ articleObj.articleAbstract }}</view>
      <!-- 文章内容，使用 v-html 指令渲染分段后的内容 -->
      <view class="content" v-html="formatArticleContent(articleObj.articleMain)"></view>
      <view class="comment">
        <image mode="scaleToFill" src="http://117.72.78.239:9000/zjyminio/foot.png" lazy-load></image>
      </view>
    </view>

  </view>
  <view v-else class="container-loading">
    <!-- <view class="loading">加载中...</view> -->
    <view class="boxes">
      <view class="box">
        <view></view>
        <view></view>
        <view></view>
        <view></view>
      </view>
      <view class="box">
        <view></view>
        <view></view>
        <view></view>
        <view></view>
      </view>
      <view class="box">
        <view></view>
        <view></view>
        <view></view>
        <view></view>
      </view>
      <view class="box">
        <view></view>
        <view></view>
        <view></view>
        <view></view>
      </view>
    </view>
  </view>
  <!-- 底部组件 -->
  <foot :articleId="articleObj.id" v-if="loading" ref="footRef" @click="toggleOverlay" />
  <!-- 蒙层 -->
  <view class="overlay" v-if="showOverlay" @click="toggleOverlay"></view>
</template>

<script setup lang='ts'>
import { onLoad } from "@dcloudio/uni-app";
import { reactive, ref, onMounted, onUnmounted } from "vue";
import foot from "./components/foot/index.vue";
import { getArticleById, getArticleFileByArticleId } from "@/api/article";
import { getArticleLikeStarStatus } from "@/api/article";
// 新增：控制蒙层显示的状态变量
const showOverlay = ref(false);

// 新增：切换蒙层显示状态的函数
const toggleOverlay = () => {
  showOverlay.value = !showOverlay.value;
  // 控制 body 的滚动
  document.body.style.overflow = showOverlay.value ? 'hidden' : 'auto';
};
const { safeAreaInsets } = uni.getSystemInfoSync();
let footRef = ref<any>(null);
let articleObj = reactive<any>({});
let contentImageUrl = reactive<any>([]);
let loading = ref<Boolean>(false);
// 新增：用于存储 foot 组件的高度
let footHeight = ref<number>(0);

// 定义一个函数，将文章内容中的换行符转换为 <br> 标签
const formatArticleContent = (content: string) => {
  return content.replace(/\n/g, "<br>");
};

const parseArticleData = async (articleStr: string) => {
  try {
    return JSON.parse(articleStr);
  } catch (error) {
    console.error("解析 JSON 时出错:", error);
    return null;
  }
};

const fetchArticleUrl = async (articleId: number) => {
  return await getArticleById(articleId);
};

const fetchArticleFile = async (articleId: number) => {
  return await getArticleFileByArticleId(articleId);
};

onLoad(async (options: any) => {
  try {
     // if (options.articleId && typeof options.articleId === "number") {
      console.log("原始的文章数据:", options.articleId);
    // const obj = await parseArticleData(options.article);
    const obj: any = await getArticleById(options.articleId || 1);
    console.log("解析后的文章数据123:", obj, obj.data.id);
    if (obj) {
      Object.assign(articleObj, obj.data[0]);
      console.log("解析后的文章数据123123:", articleObj);
      let promiseList = [
        fetchArticleUrl(obj.data[0].id),
        fetchArticleFile(obj.data[0].id),
      ];
      let res: any[] = await Promise.all(promiseList);
      if (res) {
        articleObj.articleCoverUrl = res[0].data.articleCoverUrl;
        console.log("获取内容", res[1].data);
        contentImageUrl = res[1].data;
        loading.value = true;
      }
      console.log("获取图片", articleObj);
    }
  // } else {
  //   console.error("无效的文章数据:", options.article);
  // }
  } catch (error) {
    console.error("11111 时出错:", error);
  }
 
});

// 新增：在组件挂载后获取 foot 组件的高度
onMounted(() => {
  if (footRef.value) {
    console.log("footRef 已获取到组件实例:", footRef.value);
    uni
      .createSelectorQuery()
      .in(footRef.value)
      .select(".foot") // 假设 foot 组件有一个类名为 foot 的根元素
      .boundingClientRect((rect: any) => {
        if (rect) {
          footHeight.value = rect.height;
          console.log("foot 组件的高度:", footHeight.value);
        } else {
          console.log("未找到 .foot 元素");
        }
      })
      .exec();
  } else {
    console.log("footRef 未获取到组件实例");
  }
});

onUnmounted(() => {
  console.log("组件卸载");
  // articleObj = {};
})
</script>

<style scoped lang="scss">
.container {
  background: linear-gradient(to bottom, #ffffff, #f2f2f2);
  min-height: 100vh;
  padding-bottom: 120rpx; // 避免底部被 foot 遮挡
  font-family: 'PingFang SC', 'Helvetica Neue', sans-serif;
}

.container-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.article-content {
  padding: 30rpx;
}

.cover-image {
  width: 100%;
  height: auto;
  border-radius: 12rpx;
  margin-bottom: 30rpx;
  // 图片阴影效果
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 46rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 16rpx;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.05);
}

.abstract {
  font-size: 30rpx;
  color: #999;
  font-style: italic;
  margin-bottom: 20rpx;
  border-left: 6rpx solid #ec7d0f;
  padding-left: 16rpx;
}

.content {
  font-size: 30rpx;
  line-height: 1.8;
  color: #444;
  letter-spacing: 1rpx;
  padding-bottom: 30rpx;
}

.swiper-container {
  margin: 30rpx;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.1);
  background: #fff;
}

.swiper {
  width: 100%;
  height: 500rpx;
}

.swiper-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

swiper::after {
  content: "";
  position: absolute;
  bottom: 20rpx;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12rpx;
}

swiper .wx-swiper-dot {
  width: 16rpx;
  height: 16rpx;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  transition: all 0.3s ease;
}

swiper .wx-swiper-dot-active {
  width: 24rpx;
  background: #007aff;
  border-radius: 12rpx;
}
.article-content {
  animation: fadeIn 0.6s ease-in-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(100rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.swiper {
  width: 100%;
  height: 500rpx; // 根据实际情况调整高度
}

.comment {
  width: 100%;
  height: 300rpx;
  margin-bottom: 100rpx;
}

.swiper-item {
  width: 100%;
  height: 100%;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // 灰色蒙层
  z-index: 100; // 确保蒙层在最上层
}


.boxes {
  --size: 32px;
  --duration: 800ms;
  height: calc(var(--size) * 2);
  width: calc(var(--size) * 3);
  position: relative;
  transform-style: preserve-3d;
  transform-origin: 50% 50%;
  margin-top: calc(var(--size) * 1.5 * -1);
  transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
}

.boxes .box {
  width: var(--size);
  height: var(--size);
  top: 0;
  left: 0;
  position: absolute;
  transform-style: preserve-3d;
}

.boxes .box:nth-child(1) {
  transform: translate(100%, 0);
  -webkit-animation: box1 var(--duration) linear infinite;
  animation: box1 var(--duration) linear infinite;
}

.boxes .box:nth-child(2) {
  transform: translate(0, 100%);
  -webkit-animation: box2 var(--duration) linear infinite;
  animation: box2 var(--duration) linear infinite;
}

.boxes .box:nth-child(3) {
  transform: translate(100%, 100%);
  -webkit-animation: box3 var(--duration) linear infinite;
  animation: box3 var(--duration) linear infinite;
}

.boxes .box:nth-child(4) {
  transform: translate(200%, 0);
  -webkit-animation: box4 var(--duration) linear infinite;
  animation: box4 var(--duration) linear infinite;
}

.boxes .box>view {
  --background: #ec7d0f;
  --top: auto;
  --right: auto;
  --bottom: auto;
  --left: auto;
  --translateZ: calc(var(--size) / 2);
  --rotateY: 0deg;
  --rotateX: 0deg;
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--background);
  top: var(--top);
  right: var(--right);
  bottom: var(--bottom);
  left: var(--left);
  transform: rotateY(var(--rotateY)) rotateX(var(--rotateX)) translateZ(var(--translateZ));
}

.boxes .box>view:nth-child(1) {
  --top: 0;
  --left: 0;
}

.boxes .box>view:nth-child(2) {
  --background: #ec7d0f;
  --right: 0;
  --rotateY: 90deg;
}

.boxes .box>view:nth-child(3) {
  --background: #f09840;
  --rotateX: -90deg;
}

.boxes .box>view:nth-child(4) {
  --background: #DBE3F4;
  --top: 0;
  --left: 0;
  --translateZ: calc(var(--size) * 3 * -1);
}

@-webkit-keyframes box1 {

  0%,
  50% {
    transform: translate(100%, 0);
  }

  100% {
    transform: translate(200%, 0);
  }
}

@keyframes box1 {

  0%,
  50% {
    transform: translate(100%, 0);
  }

  100% {
    transform: translate(200%, 0);
  }
}

@-webkit-keyframes box2 {
  0% {
    transform: translate(0, 100%);
  }

  50% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(100%, 0);
  }
}

@keyframes box2 {
  0% {
    transform: translate(0, 100%);
  }

  50% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(100%, 0);
  }
}

@-webkit-keyframes box3 {

  0%,
  50% {
    transform: translate(100%, 100%);
  }

  100% {
    transform: translate(0, 100%);
  }
}

@keyframes box3 {

  0%,
  50% {
    transform: translate(100%, 100%);
  }

  100% {
    transform: translate(0, 100%);
  }
}

@-webkit-keyframes box4 {
  0% {
    transform: translate(200%, 0);
  }

  50% {
    transform: translate(200%, 100%);
  }

  100% {
    transform: translate(100%, 100%);
  }
}

@keyframes box4 {
  0% {
    transform: translate(200%, 0);
  }

  50% {
    transform: translate(200%, 100%);
  }

  100% {
    transform: translate(100%, 100%);
  }
}
</style>