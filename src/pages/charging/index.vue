<script setup lang="ts">

const backToHome = () => {
  uni.switchTab({
    url: '/pages/index/index'
  })
}

</script>

<template>
<div>充电页面</div>
  <button @click="backToHome">返回首页</button>
</template>

<style scoped>

</style>
