<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { getArticleList } from '@/api/article';
import { onPullDownRefresh } from '@dcloudio/uni-app';
import WaterFallListItem from './WaterFallListItem.vue';

const windowHeight = uni.getSystemInfoSync().windowHeight; // 获取屏幕高度

// 定义 flowData 的类型
interface FlowData {
  list: any[];
  column: number;
  columnSpace: number;
  [key: string]: any[] | number; // 动态属性类型
}

const flowData = reactive<FlowData>({
  list: [],
  column: 2, // 默认两列
  columnSpace: 2,
});

// 页面挂载时获取数据
onMounted(() => {
  getList();
});

// 下拉刷新
onPullDownRefresh(() => {
  console.log('下拉刷新');
  setTimeout(() => {
    getList();
    uni.stopPullDownRefresh();
  }, 1000);
});

// 获取文章列表
const getList = async () => {
  try {
    const res: any = await getArticleList();
    flowData.list = res.data || [];
    console.log('Article List:', flowData.list);
    initData(); // 调用 initData 函数进行分组初始化
  } catch (error) {
    console.error('Failed to fetch article list:', error);
  }
};

// 初始化每一列的数据
for (let i = 1; i <= flowData.column; i++) {
  flowData[`column_${i}`] = [];
}

// 数据初始化
const initData = () => {
  const groupList = dynamicGrouping(flowData.list, flowData.column); // 数据动态分组
  groupList.forEach((item: any, i: number) => {
    flowData[`column_${i + 1}`] = item;
  });
};

// 数据动态分组
const dynamicGrouping = (data: any[], columnCount: number): any[] => {
  if (columnCount <= 0) return [];
  const groups: any[] = Array.from({ length: columnCount }, () => []);
  data.forEach((item, index) => {
    groups[index % columnCount].push(item);
  });
  return groups;
};

// 点击事件处理
const handleItemClick = (item: any) => {
  console.log('Item clicked:', item);
  // 可以添加跳转或弹窗逻辑
};
</script>

<template>
  <view class="container">
    <view
      class="cont-box"
      :style="{ '--layout-width': 100 / flowData.column - flowData.columnSpace + '%' }"
      v-for="index in flowData.column"
      :key="`column-${index}`"
    >
      <!-- <view
        class="item-box"
        v-for="(item, j) in flowData[`column_${index}`]"
        :key="`column-${index}-item-${j}`"
        @click.native="handleItemClick(item)"
      >
        <image class="img-tip" :src="item.articleCoverUrl" mode="widthFix" lazy-load />
        <view class="tit-tip multi-line-omit">{{ item.articleTitle }}</view>
        <view class="desc-tip multi-line-omit">{{ item.articleAbstract }}</view>
      </view> -->
      <view
        class="item-box"
        v-for="(item, j) in flowData[`column_${index}`]"
        :key="`column-${index}-item-${j}`"
      >
      <WaterFallListItem :item="item" />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-evenly;
  padding: 10rpx;
  $borderRadius: 12rpx;
  background-color: #ededed;

  .cont-box {
    width: var(--layout-width);

    // .item-box {
    //   position: relative;
    //   z-index: 1;
    //   width: 100%;
    //   padding-bottom: 20rpx;
    //   margin-bottom: 30rpx;
    //   border-radius: $borderRadius;
    //   box-shadow: 0rpx 3rpx 6rpx rgba(0, 46, 37, 0.08);

    //   .img-tip {
    //     width: 100%;
    //     border-radius: $borderRadius $borderRadius 0 0;
    //   }

    //   .tit-tip {
    //     text-align: justify;
    //     font-size: 30rpx;
    //     padding: 10rpx 20rpx 0;
    //     font-weight: 900;
    //   }

    //   .desc-tip {
    //     text-align: justify;
    //     font-size: 26rpx;
    //     padding: 5rpx 20rpx 0;
    //     margin-top: 10rpx;
    //   }
    // }
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
