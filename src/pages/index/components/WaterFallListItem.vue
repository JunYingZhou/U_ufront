<!--
 * @Author: zjy 3497577844@qq.com
 * @Date: 2025-01-21 23:38:40
 * @LastEditors: zjy 3497577844@qq.com
 * @LastEditTime: 2025-03-20 00:23:17
 * @FilePath: \u_uf\src\pages\index\components\WaterFallListItem.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="item-box-item" 
        @click="handleItemClick(item)">
        <image class="img-tip" :src="item.articleCoverUrl" mode="widthFix" lazy-load />
        <view class="tit-tip multi-line-omit">{{ item.articleTitle }}</view>
        <view class="desc-tip multi-line-omit">{{ item.articleAbstract }}</view>
    </view>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue';


// 获取prop
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

onMounted(() => {
    console.log(props.item);
    
})

// 点击事件处理
const handleItemClick = (item: any) => {
  // 不传articleCoverUrl
  // delete item.articleCoverUrl;
  const obj = Object.assign({}, item)
  delete obj.articleCoverUrl;
  console.log('Item clicked:', obj);
  uni.navigateTo({
    url: `/pages/article/index?articleId=${obj.id}`,     
  });
  // 可以添加跳转或弹窗逻辑
};

</script>
<style scoped lang="scss">
.item-box-item {
    position: relative;
    background-color: #ffffff;
    // z-index: 1;
    width: 100%;
    padding-bottom: 20rpx;
    margin-bottom: 20rpx;
    border-radius: 12rpx;
    box-shadow: 0rpx 3rpx 6rpx rgba(0, 46, 37, 0.08);

    .img-tip {
    width: 100%;
    border-radius: 12rpx 12rpx 0 0;
    }

    .tit-tip {
    text-align: justify;
    font-size: 30rpx;
    padding: 10rpx 20rpx 0;
    font-weight: 900;
    }

    .desc-tip {
    text-align: justify;
    font-size: 26rpx;
    padding: 5rpx 20rpx 0;
    margin-top: 10rpx;
    }
}
/* 多行省略 */
.multi-line-omit {
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>