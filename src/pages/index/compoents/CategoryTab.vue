<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { getCategoryList } from '@/api/category'
import { onPullDownRefresh } from '@dcloudio/uni-app';
const windowHeight = uni.getSystemInfoSync().windowHeight; // 获取屏幕高度

// 定义 flowData 的类型
interface CategoryListType {
    categoryId: number;
    categoryName: string;
    createTime: string;
    modifyTime: string;
}

// 使用 ref 定义一个字符串数组
const lists = ref<CategoryListType[]>([{
    categoryId: 0,
    categoryName: '全部',
    createTime: '',
    modifyTime: ''
}])
const catgoryIndex = ref(0)

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
  const res: any = await getCategoryList()
  lists.value.push(...res.data)
  console.log('种类',lists.value)
}

const clickThisCategory = (id: number) => {
    console.log(id)
    catgoryIndex.value = id
}

</script>


<template>
  <view class="container">
    <view class="category-list">
      <view class="category-item" :class="{ active: catgoryIndex === item.categoryId }" v-for="item in lists" :key="item.categoryId" @click="clickThisCategory(item.categoryId)">
        <text class="category-name">{{ item.categoryName }}</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.container {



    .category-list {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 30px;
        line-height: 30px;
        overflow-x: scroll;        
        margin: 10px 0;
        padding: 0 10px;   
        &::-webkit-scrollbar {
            display: none;
        }
        .category-item {
            flex-shrink: 0;
            margin-right: 10px;
            padding: 0 10px;
            border: 1px solid #ccc;
            border-radius: 20px;
            color: #333;
        }
        
        .category-item.active {
            background-color: orange;
            color: #fff;
        }
    }
}
</style>