<!--
 * @Author: zjy 3497577844@qq.com
 * @Date: 2025-01-22 00:16:55
 * @LastEditors: zjy 3497577844@qq.com
 * @LastEditTime: 2025-03-20 22:40:16
 * @FilePath: \u_uf\src\pages\article\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="container" v-if="loading">
    <!-- 文章封面图片 -->
    <!-- <image class="cover-image" :src="articleObj.articleCoverUrl" mode="widthFix" lazy-load /> -->
    <!-- 图片轮播 -->
    <view class="swiper-container" v-if="contentImageUrl.length > 0">
      <swiper class="swiper" indicator-dots autoplay circular>
        <swiper-item v-for="(item, index) in contentImageUrl" :key="index">
          <image :src="item.artFileUrl" mode="widthFix" lazy-load />
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
  <view v-else>
    <view class="loading">加载中...</view>
  </view>
  <!-- 底部组件 -->
  <foot :articleId="articleObj.id" v-if="loading" ref="footRef" />
</template>

<script setup lang='ts'>
import { onLoad } from "@dcloudio/uni-app";
import { reactive, ref, onMounted } from "vue";
import foot from "./components/foot/index.vue";
import { getArticleById, getArticleFileByArticleId } from "@/api/article";
import { getArticleLikeStarStatus } from "@/api/article"; 
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
  if (options.article && typeof options.article === "string") {
    const obj = await parseArticleData(options.article);
    if (obj) {
      Object.assign(articleObj, obj);
      console.log("解析后的文章数据:", articleObj);
      let promiseList = [
        fetchArticleUrl(articleObj.id),
        fetchArticleFile(articleObj.id),
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
  } else {
    console.error("无效的文章数据:", options.article);
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
</script>

<style scoped lang="scss">
.container {
  // 背景渐变效果
  background: linear-gradient(to bottom, #f9f9f9, #e9e9e9);
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
  font-size: 44rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  // 标题阴影效果
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
}

.abstract {
  font-size: 32rpx;
  color: #777;
  margin-bottom: 30rpx;
}

.article-content {
  font-size: 30rpx;
  line-height: 1.6;
  color: #444;
}

.swiper-container {
  width: 100%;
  height: 500rpx;
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
</style>