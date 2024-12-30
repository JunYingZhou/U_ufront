<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { getArticleList } from '@/api/article'
import { onPullDownRefresh } from '@dcloudio/uni-app';
const windowHeight = uni.getSystemInfoSync().windowHeight; // 获取屏幕高度

// 定义 flowData 的类型
interface FlowData {
  list: any[];
  column: number;
  columnSpace: number;
  [key: string]: any[] | number; // 动态属性类型
}

// 使用 ref 定义一个字符串数组
const lists = ref([])
const flowData = reactive<FlowData>({
  list: [],
  column: 2,
  columnSpace: 2,
})
// 示例：向数组中添加元素


onMounted(() => {
  // 获取文章列表
  getList();
})

// 下拉刷新
onPullDownRefresh(() => {
  console.log('下拉刷新')
  setTimeout(() => {
    getList();
    uni.stopPullDownRefresh();
  }, 1000)
})


const getList = async() => {
  const res: any = await getArticleList()
  flowData.list = res.data
  console.log('res',flowData.list)
  initData(); // 调用 initData 函数进行数据初始
}


// 初始化每一列的数据
for (let i = 1; i <= flowData.column; i++) {
  flowData[`column_${i}`] = [];
}

const initData = () => {
  const groupList = dynamicGrouping(flowData.list, flowData.column); // 数据动态分组
  groupList.forEach((item: any, i: any) => (flowData[`column_${i + 1}`] = item));
}
/** 数据动态分组
 * @param {Object} data 分组的数据列表
 * @param {Object} i 需要分几组
 * @returns {Array} groups 已分组的数据
 */
const dynamicGrouping = (data: any, i: any) => {
  if (i <= 0) return "分组数必须大于0";
      const groups: any = [];
      for (let j = 0; j < i; j++) {
        groups.push([]);
      }
      for (let k = 0; k < data.length; k++) {
        const groupIndex = k % i;
        groups[groupIndex].push(data[k]);
      }
      return groups;
}




</script>


<template>
  <view class="container">
    <view
      class="cont-box"
      :style="{ '--layout-width': 100 / flowData.column - flowData.columnSpace + '%' }"
      v-for="(numVal, index) in flowData.column"
      :key="numVal"
    >
      <view class="item-box" v-for="(item, j) in flowData[`column_${index + 1}`]" :key="j">
        <image class="img-tip" :src="item.articleCoverUrl" mode="widthFix" lazy-load />
        <view class="tit-tip multi-line-omit">{{ item.articleTitle }}</view>
        <view class="desc-tip multi-line-omit">{{ item.articleAbstract }}</view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
  $borderRadius: 12rpx;
  .cont-box {
    width: var(--layout-width);
    .item-box {
      width: 100%;
      padding-bottom: 20rpx;
      margin-bottom: 30rpx;
      border-radius: $borderRadius;
      box-shadow: 0rpx 3rpx 6rpx rgba(0, 46, 37, 0.08);
      .img-tip {
        width: 100%;
        border-radius: $borderRadius $borderRadius 0 0;
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
  }
}
/* 多行省略 */
.multi-line-omit {
  word-break: break-all; // 允许单词内自动换行，如果一个单词很长的话
  text-overflow: ellipsis; // 溢出用省略号显示
  overflow: hidden; // 超出的文本隐藏
  display: -webkit-box; // 作为弹性伸缩盒子模型显示
  -webkit-line-clamp: 2; // 显示的行
  -webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式--从上到下垂直排列
}
/* 单行省略 */
.one-line-omit {
  width: 100%; // 宽度100%：1vw等于视口宽度的1%；1vh等于视口高度的1%
  white-space: nowrap; // 溢出不换行
  overflow: hidden; // 超出的文本隐藏
  text-overflow: ellipsis; // 溢出用省略号显示
}
</style>