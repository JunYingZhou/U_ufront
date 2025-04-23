<template>
    <view class="container">
        <scroll-view scroll-y @scrolltolower="loadMore">
            <!-- 文章列表 -->
            <view v-for="article in list" :key="article.id" class="article-card">
                <image class="article-cover" :src="article.articleCoverUrl" mode="aspectFill" />
                <view class="article-content">
                    <text class="article-title">{{ article.articleTitle }}</text>
                    <text class="article-abstract">{{ article.articleAbstract }}</text>
                </view>
            </view>

            <!-- 加载中 -->
            <view v-if="loading" class="loading">加载中...</view>
            <view v-else-if="noMore" class="no-more">没有更多内容了</view>
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import { getArticleStarListByUser } from '@/api/user'; // 你的API请求
import { onPullDownRefresh } from '@dcloudio/uni-app';
import { onMounted, reactive, ref } from 'vue';

// 文章列表
const list = reactive<any[]>([]);
// 分页参数
const page = ref(1);
const pageSize = 5;
const loading = ref(false);
const noMore = ref(false);

// 初始化加载
onMounted(() => {
    getList();
});

// 下拉刷新
onPullDownRefresh(() => {
    console.log('下拉刷新');
    page.value = 1;
    noMore.value = false;
    getList(true);
    setTimeout(() => {
        uni.stopPullDownRefresh();
    }, 1000);
});

// 获取文章列表
const getList = async (refresh = false) => {
    try {
        loading.value = true;
        const res: any = await getArticleStarListByUser(uni.getStorageSync('userId'), 'star'); // 调用API
        const newData = res.data || [];

        if (refresh) {
            list.length = 0;
        }

        if (newData.length < pageSize) {
            noMore.value = true;
        } else {
            page.value++;
        }

        list.push(...newData);
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
};

// 触底加载更多
const loadMore = () => {
    if (!loading.value && !noMore.value) {
        getList();
    }
};
</script>

<style scoped>
/* 页面容器 */
.container {
    padding: 15px;
    background-color: #f8f9fa;
}

/* 文章卡片 */
.article-card {
    display: flex;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.article-card:hover {
    transform: translateY(-3px);
}

/* 文章封面 */
.article-cover {
    width: 100px;
    height: 80px;
    border-radius: 8px 0 0 8px;
    object-fit: cover;
}

/* 文章内容 */
.article-content {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

/* 文章标题 */
.article-title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 限制最大显示 1 行 */
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}

/* 文章摘要 */
.article-abstract {
    font-size: 14px;
    color: #666;
}

/* 加载中提示 */
.loading,
.no-more {
    text-align: center;
    color: #888;
    padding: 15px;
}
.article-abstract {
    font-size: 14px;
    color: #666;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 限制最大显示 2 行 */
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    white-space: normal;
}

</style>
