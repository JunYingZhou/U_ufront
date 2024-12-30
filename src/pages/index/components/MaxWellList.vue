<template>
  <view class="container">
    <h1 class="title">资产列表</h1>
    <view class="station-list-container">
      <view v-for="station in dataList" :key="station.id.id" class="station-item">
        <div class="station-details">
          <p>名称: {{ station.name }}</p>
          <p>类型: {{ station.type }}</p>
          <p>标签: {{ station.label }}</p>
          <p>客户标题: {{ station.customerTitle }}</p>
          <p>是否公开:{{ station.customerIsPublic ? '是' : '否' }}</p>
          <p>资产配置文件名称: {{ station.assetProfileName }}</p>
          <p>描述: {{ station.additionalInfo.description }}</p>
        </div>
      </view>
    </view>
  </view>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import type { MaxwellStation } from "@/types/InterfaceMaxwellStation";
import { onLoad, onUnload } from '@dcloudio/uni-app';
import { getAssetInfo } from '@/api/asset';

const dataList = ref<MaxwellStation[]>([]);
const loading = ref(false);
const finished = ref(false);

onLoad(async () => {
  loading.value = true;
  try {
    const res: any = await getAssetInfo();
    dataList.value = res.data;
  } catch (error) {
    console.error('Failed to fetch asset info:', error);
  } finally {
    finished.value = true;
    loading.value = false;
  }
});

// 跳转到对应的资产设备列表当中


onUnload(() => {
  dataList.value = [];
  loading.value = false;
  finished.value = false;
})

</script>

<style scoped>
:root {
  --primary-color: #333;
  --secondary-color: #f9f9f9;
  --border-color: #eee;
  --shadow-color: rgba(0, 0, 0, 0.1);
  --padding: 16px;
  --margin-bottom: 16px;
  --item-background: #f4f4f4;
  --item-border-radius: 8px;
  --item-padding: 16px;
}

.container {
  padding: var(--padding);
  width: 100%;
  height: 100%;
  background-color: var(--secondary-color);
  display: flex;
  flex-direction: column;
  align-items: start;
}

.title {
  font-size: 32px;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: var(--margin-bottom);
}

.station-list-container {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.station-item {
  width: 400px;
  max-width: 800px;
  background-color: var(--item-background);
  border: 1px solid var(--border-color);
  border-radius: var(--item-border-radius);
  padding: var(--item-padding);
  margin-top: var(--margin-bottom);
  box-shadow: 0 2px 4px var(--shadow-color);
  display: flex;
  flex-direction: column;
}

.station-details {
  line-height: 1.8;
  font-size: 16px;
  color: var(--primary-color);
}

.station-details p {
  margin: 8px 0;
}

.station-details p:last-child {
  margin-bottom: 0;
}
</style>
