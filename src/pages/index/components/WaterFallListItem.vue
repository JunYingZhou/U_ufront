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
  console.log('Item clicked:', item);
  uni.navigateTo({
    url: `/pages/article/index?article=${JSON.stringify(item)}`,     
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