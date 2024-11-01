<script setup lang="ts">
import { reactive, ref } from 'vue'
const windowHeight = uni.getSystemInfoSync().windowHeight; // 获取屏幕高度

// 使用 ref 定义一个字符串数组
const lists = ref<string[]>([])

// 示例：向数组中添加元素
lists.value.push('item1')
lists.value.push('item2')
lists.value.push('item2')
lists.value.push('item2')
lists.value.push('item2')
lists.value.push('item2')
lists.value.push('item2')
lists.value.push('item2')
lists.value.push('item2')
lists.value.push('item2')
lists.value.push('item2')
lists.value.push('item2')
lists.value.push('item2')
lists.value.push('item2')
lists.value.push('item2')
lists.value.push('item2')


</script>

<template>
  <waterfall column-count="2" column-width="auto">
    <cell v-for="num in lists" >
      <text>{{num}}</text>
    </cell>
  </waterfall>
</template>


<style scoped>
.cell {
    width: 100%;
    height: 200px;
    background-color: #ccc;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>