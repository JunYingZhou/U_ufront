<template>
    <view class="container">
        <view v-if="loading">
            <view class="form-group">
                <label for="title">标题</label>
                <input type="text" id="title" v-model="article.articleTitle" placeholder="请输入文章标题" />
            </view>

            <view class="form-group">
                <label for="brief">摘要</label>
                <textarea id="brief" v-model="article.articleAbstract" placeholder="请输入文章摘要"></textarea>
            </view>

            <view class="form-group">
                <label for="content">内容</label>
                <textarea id="content" v-model="article.articleMain" placeholder="请输入文章内容"></textarea>
            </view>

            <view class="form-group-image">
                <label for="coverImage">封面图片</label>
                <view class="image-wrapper" v-if="coverImage">
                    <image class="cover-image-url" :src="coverImage" mode="aspectFill" />
                    <view class="delete-btn" @click="removeCoverImage">×</view>
                </view>
                <view class="cover-image" @click="handleCoverImageUpload" v-else>
                    <image class="cover-image-url" src="http://117.72.78.239:9000/zjyminio/upload.png" mode="aspectFill" />
                </view>
            </view>

            <view class="form-group-image">
                <label for="contentImages">内容图片</label>
                <view class="image-list">
                    <view class="image-wrapper" v-for="(image, index) in contentImages" :key="image">
                        <image class="cover-image-url" :src="image" mode="aspectFill" />
                        <view class="delete-btn" @click.stop="removeContentImage(index)">×</view>
                    </view>
                    <view class="cover-image" @click="handleContentImagesUpload" v-if="contentImages.length < 3">
                        <image class="cover-image-url" src="http://117.72.78.239:9000/zjyminio/upload.png" mode="aspectFill" />
                    </view>
                </view>
                <view class="image-limit-tip" v-if="contentImages.length >= 3">最多上传3张图片</view>
            </view>

            <view class="form-group">
                <label for="category">文章分类</label>
                <picker mode="selector" :range="categoryNameList" @change="handleCategoryChange">
                    <view class="picker">
                        {{ article.categoryId === 0 || article.categoryId ? categoryName : "请选择分类" }}
                    </view>
                </picker>
            </view>

            <button class="submit-btn" @click="submitArticle">发布文章</button>
        </view>
        <view v-else class="loading">加载中...</view>
    </view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { getCategoryList } from '@/api/category';
import { onLoad } from '@dcloudio/uni-app';
import { updateArticle, getArticleById, getArticleContentImages } from '@/api/article';
import { useUserStore } from "@/stores";

const userStore = useUserStore();
let article = reactive({
    articleTitle: "",
    articleAbstract: "",
    articleMain: "",
    articleCoverUrl: '',
    categoryId: null,
    coverImage: '',
    isOfficial: 0,
    userId: uni.getStorageSync('userId')
});
let coverImage = ref<string | null>(null);
let contentImages = ref<any[]>([]);
let categoryList = ref<any[]>([]);
let categoryNameList = ref<string[]>([]);
let categoryName = ref('');
let loading = ref(false);
let articleId = ref<number>(0);
const isCommunity = ref<any>(0);
const communityId = ref<any>(-1);

onLoad(async (options: any) => {
    console.log('options', options);
    if (options.communityId) {
        communityId.value = options.communityId;
    }

    // Load category list
    let res: any = await getCategoryList();
    console.log('分类类别', res);
    if (res.msg === "ok") {
        categoryList.value = res.data;
        categoryNameList.value = res.data.map((item: any) => item.categoryName);
        categoryNameList.value.unshift('请选择分类'); // 添加默认选项

    }

    // Load article details
    if (options.articleId) {
        await getArticleById(options.articleId).then((res: any) => {
            console.log('文章详情', res);
            if (res.data) {
                Object.assign(article, res.data[0]);
                if (article?.articleCoverUrl) {
                    coverImage.value = article.articleCoverUrl;
                }
                const matchedCategory = categoryList.value.find((item: any) => item.categoryId === article.categoryId);
                if (matchedCategory) {
                    categoryName.value = matchedCategory.categoryName;
                }
            }
        });

        await getArticleContentImages(options.articleId).then((res: any) => {
            console.log('文章内容图片', res);
            contentImages.value = res.data.map((item: any) => item.artFileUrl);
        });
        console.log('article ---->', article);
    }

    loading.value = true;
});

// Handle cover image upload
const handleCoverImageUpload = () => {
    uni.chooseMedia({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
            const filePath = res.tempFiles[0].tempFilePath;
            console.log('选择的媒体文件路径:', filePath);
            article.coverImage = filePath;
            coverImage.value = filePath;
        }
    });
};

// Handle content images upload
const handleContentImagesUpload = () => {
    if (contentImages.value.length >= 3) {
        uni.showModal({
            icon: 'none',
            title: '最多上传3张图片',
        });
        return;
    }
    uni.chooseMedia({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
            const filePath = res.tempFiles[0].tempFilePath;
            contentImages.value = [...contentImages.value, filePath];
            console.log('选择的媒体文件路径123:', contentImages.value);
        }
    });
};

// 上传封面图片
const handleCoverImageUploadF = (articleId: any, filePath: any) => {
    // 读取文件数据
    uni.getFileSystemManager().readFile({
        filePath: filePath,
        success: (fileRes) => {
            const boundary = "----WebKitFormBoundary" + new Date().getTime();
            const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);

            // 构造 multipart/form-data 体
            let body = `--${boundary}\r\n`;
            body += `Content-Disposition: form-data; name="coverImage"; filename="${fileName}"\r\n`;
            body += `Content-Type: image/jpeg\r\n\r\n`; // 根据图片类型调整
            const bodyBuffer = new Uint8Array([...new TextEncoder().encode(body), ...new Uint8Array(fileRes.data), ...new TextEncoder().encode(`\r\n--${boundary}--\r\n`)]);

            // 发送请求
            uni.request({
                url: `http://localhost:8000/anti/article/coverImageUpload/${articleId}`, // 替换为你的 API
                method: 'POST',
                header: {
                    'Content-Type': `multipart/form-data; boundary=${boundary}`,
                    'Authorization': `Bearer ${uni.getStorageSync('token')}`, // 如果需要鉴权
                },
                data: bodyBuffer.buffer,
                responseType: 'text',
                success(uploadRes) {
                    console.log('上传成功:', uploadRes.data);
                },
                fail(err) {
                    console.error('上传失败:', err);
                }
            });
        },
        fail(err) {
            console.error('读取文件失败12312:', err);
        }
    });
}


// 上传封面图片
const handleContentImagesUploadF = (articleId: any,filePaths: any) => {
    // 读取文件数据
    filePaths.forEach(filePath => {
        console.log('选择的媒体文件路径:', filePath);
        uni.getFileSystemManager().readFile({
            filePath: filePath,
            success: (fileRes) => {
                const boundary = "----WebKitFormBoundary" + new Date().getTime();
                const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);

                // 构造 multipart/form-data 体
                let body = `--${boundary}\r\n`;
                body += `Content-Disposition: form-data; name="contentImage"; filename="${fileName}"\r\n`;
                body += `Content-Type: image/jpeg\r\n\r\n`; // 根据图片类型调整
                const bodyBuffer = new Uint8Array([...new TextEncoder().encode(body), ...new Uint8Array(fileRes.data), ...new TextEncoder().encode(`\r\n--${boundary}--\r\n`)]);

                // 发送请求
                uni.request({
                    url: `http://localhost:8000/anti/article/contentImagesUpload/${articleId}`, // 替换为你的 API
                    method: 'POST',
                    header: {
                        'Content-Type': `multipart/form-data; boundary=${boundary}`,
                        'Authorization': `Bearer ${uni.getStorageSync('token')}`, // 如果需要鉴权
                    },
                    data: bodyBuffer.buffer,
                    responseType: 'text',
                    success(uploadRes) {
                        console.log('上传成功:', uploadRes.data);
                    },
                    fail(err) {
                        console.error('上传失败:', err);
                    }
                });
            },
            fail(err) {
                console.error('读取文件失败:', err);
            }
        });
    })
}

// Remove content image
const removeContentImage = (index: number) => {
    contentImages.value = contentImages.value.filter((_, i) => i !== index);
};

// Remove cover image
const removeCoverImage = () => {
    coverImage.value = '';
    article.coverImage = '';
};

// Handle category change
const handleCategoryChange = (event: any) => {
    const index = event.detail.value;
    console.log('选择的分类索引:', index, categoryList.value, categoryList.value[index - 1].categoryId);
    article.categoryId = categoryList.value[index - 1].categoryId;
    categoryName.value = categoryNameList.value[index];
    console.log('选择的分类:', article.categoryId);
};

// Submit article
const submitArticle = async () => {
    if (!(article.articleTitle && article.articleAbstract && article.articleMain && article.categoryId)) {
        uni.showModal({
            icon: 'none',
            title: '请填写完整数据',
        });
        return;
    }

    const data = {
        ...article,
        isCommunity: isCommunity.value,
        communityId: Number(communityId.value),
    };

    console.log('提交的文章:', data);
    let res: any = await updateArticle(data);
    console.log('返回数据', res.data.split('.')[1]);
    if (res.msg === 'ok') {
        articleId.value = res.data.split('.')[1];
        if (coverImage.value) {
            handleCoverImageUploadF(articleId.value, coverImage.value);
        }
        if (contentImages.value.length > 0) {
            handleContentImagesUploadF(articleId.value, contentImages.value);
        }
        uni.showToast({
            title: '修改成功',
            icon: 'success'
        });
        setTimeout(() => {
            isCommunity.value !== 0
                ? uni.redirectTo({ url: `/pages/communityDetail/index?communityId=${communityId.value}` })
                : uni.switchTab({ url: '/pages/index/index' });
        }, 1000);
    } else {
        uni.showToast({
            title: res.msg,
            icon: 'error'
        });
    }
};
</script>

<style scoped lang="scss">
.container {
    padding: 30rpx;
    background-color: #f5f7fa;
    min-height: 100vh;
    font-family: 'PingFang SC', -apple-system, sans-serif;
}

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 32rpx;
    color: #666;
}

.form-group {
    margin-bottom: 40rpx;
}

.form-group-image {
    margin-bottom: 40rpx;
}

label {
    display: block;
    font-size: 30rpx;
    font-weight: 500;
    color: #333;
    margin-bottom: 15rpx;
}

input[type="text"] {
    width: 100%;
    height: 90rpx;
    border: 2rpx solid #e0e0e0;
    border-radius: 16rpx;
    font-size: 28rpx;
    background-color: #fff;
    transition: border-color 0.3s;

    &:focus {
        border-color: #ce8019;
        outline: none;
    }
}

textarea {
    width: 100%;
    min-height: 200rpx;
    border: 2rpx solid #e0e0e0;
    border-radius: 16rpx;
    font-size: 28rpx;
    background-color: #fff;
    transition: border-color 0.3s;

    &:focus {
        border-color: #ce881f;
        outline: none;
    }
}

.image-wrapper {
    position: relative;
    width: 200rpx;
    height: 200rpx;
    margin-right: 20rpx;
    border-radius: 16rpx;
    overflow: hidden;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
    }

    .cover-image-url {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .delete-btn {
        position: absolute;
        top: 10rpx;
        right: 10rpx;
        width: 40rpx;
        height: 40rpx;
        background: #ff4d4f;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28rpx;
        font-weight: bold;
        box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
    }
}

.cover-image {
    width: 200rpx;
    height: 200rpx;
    border-radius: 16rpx;
    overflow: hidden;
    background-color: #fff;
    border: 2rpx dashed #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: border-color 0.3s;

    &:hover {
        border-color: #cc851a;
    }

    .cover-image-url {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.image-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20rpx;
}

.image-limit-tip {
    font-size: 24rpx;
    color: #ff4d4f;
    margin-top: 10rpx;
}

.picker {
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
    padding: 0 20rpx;
    border: 2rpx solid #e0e0e0;
    border-radius: 16rpx;
    font-size: 28rpx;
    background-color: #fff;
    color: #333;
    text-align: left;
    transition: border-color 0.3s;

    &:hover {
        border-color: #c97720;
    }
}

.submit-btn {
    width: 100%;
    height: 100rpx;
    background: linear-gradient(90deg, #e59217, #d57f38);
    color: white;
    font-size: 32rpx;
    font-weight: 500;
    border: none;
    border-radius: 50rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40rpx;
    cursor: pointer;
    transition: opacity 0.3s;

    &:hover {
        opacity: 0.9;
    }
}
</style>