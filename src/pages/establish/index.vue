<template>
    <view class="container" v-if="loading">
        <view class="form-group">
            <label for="title">标题:</label>
            <input type="text" id="title" v-model="article.articleTitle" placeholder="请输入文章标题" />
        </view>

        <view class="form-group">
            <label for="brief">摘要:</label>
            <textarea id="brief" v-model="article.articleAbstract" placeholder="请输入文章摘要"></textarea>
        </view>

        <view class="form-group">
            <label for="content">内容:</label>
            <textarea id="content" v-model="article.articleMain" placeholder="请输入文章内容"></textarea>
        </view>

        <view class="form-group-image">
            <label for="coverImage">封面图片:</label>
            <view class="cover-image" @click="handleCoverImageUpload">
                <image v-if="!coverImage" class="cover-image-url" src="http://117.72.78.239:9000/zjyminio/upload.png"
                    mode="widthFix"></image>
                <image v-else class="cover-image-url" :src="coverImage" mode="widthFix"></image>
            </view>
            <!-- <input type="file" id="coverImage" @change="handleCoverImageUpload" /> -->
            <!-- <p v-if="article.coverImage">已选择: {{ article.coverImage.name }}</p> -->
        </view>

        <view class="form-group-image">
            <label for="coverImage">内容图片:</label>
            <view class="cover-image" @click="handleContentImagesUpload">
                <image v-if="!contentImages.length" class="cover-image-url"
                    src="http://117.72.78.239:9000/zjyminio/upload.png" mode="widthFix"></image>
                <view v-else>
                    <image v-for="image in contentImages" :key="image" class="cover-image-url" :src="image"
                        mode="widthFix"></image>
                    <image class="cover-image-url" src="http://117.72.78.239:9000/zjyminio/upload.png" mode="widthFix">
                    </image>
                </view>
            </view>
            <!-- <input type="file" id="coverImage" @change="handleCoverImageUpload" /> -->
            <!-- <p v-if="article.coverImage">已选择: {{ article.coverImage.name }}</p> -->
        </view>

        <view class="form-group">
            <label for="category">文章分类:</label>
            <picker mode="selector" :range="categoryNameList" @change="handleCategoryChange">
                <view class="picker">
                    {{ article.categoryId ? categoryName : "请选择分类" }}
                </view>
            </picker>
        </view>

        <button @click="submitArticle">发布文章</button>
    </view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { getCategoryList } from '@/api/category'
import { onLoad } from '@dcloudio/uni-app';
import { addArticle } from '@/api/article'
import { useUserStore } from "@/stores";
const userStore = useUserStore()
const article = ref({
    articleTitle: "小程序文章1",
    articleAbstract: "小程序文章1",
    articleMain: "小程序文章1",
    categoryId: null,
    isOfficial: 0,
    userId: userStore.getUserId
});
let coverImage = ref(null);
let contentImages = reactive<any>([]);
let categoryList = ref<any>([]);
let categoryNameList = ref<any>([]);
let categoryName = ref('');
let loading = ref(false);
let articleId = ref<number>(0);


onLoad(async () => {
    // Fetch category list
    let res: any = await getCategoryList();
    console.log('分类类别', res);
    if (res.msg === "ok") {
        categoryList.value = res.data;
        categoryNameList.value = res.data.map((item: any) => item.categoryName);
        console.log('分类名称列表', categoryNameList.value); // Check the output here
        loading.value = true;
    }
});


// 处理封面图片上传
const handleCoverImageUpload = (event: Event) => {
    // const input = event.target as HTMLInputElement;
    // if (input.files && input.files.length > 0) {
    //     article.value.coverImage = input.files[0];
    // }
    uni.chooseMedia({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
            const filePath = res.tempFiles[0].tempFilePath;
            console.log('选择的媒体文件路径:', filePath);
            article.value.coverImage = filePath;
            coverImage.value = filePath;
            // handleCoverImageUploadF(coverImage.value);
        }
    })
};


// 处理内容图片上传（支持多张图片）
const handleContentImagesUpload = (event: Event) => {
    if (contentImages.length >= 5) {
        uni.showModal({
            icon: 'none',
            title: '最多上传5张图片',
        });
        return
    }
    uni.chooseMedia({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
            const filePath = res.tempFiles[0].tempFilePath;
            contentImages.push(filePath);
            // article.value.contentImages = contentImages;
            console.log('选择的媒体文件路径123:', contentImages);
        }
    })
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



// 处理分类选择
const handleCategoryChange = (event: any) => {
    console.log("adasdasdadasdasd", event);

    const index = event.detail.value;
    article.value.categoryId = event.detail.value;
    categoryName.value = categoryNameList.value[index];
    console.log('选择的分类:', article.value.categoryId);
};

// 处理文章提交
const submitArticle = async () => {
    console.log('提交的文章:', article.value);
    if (!(article.value.articleTitle && article.value.articleAbstract && article.value.articleMain && article.value.categoryId)) {
        uni.showModal({
            icon: 'none',
            title: '请填写完整数据',
        });
        return
    }
    let res: any = await addArticle(article.value);
    console.log('返回数据', res.data.split('.')[1]);
    if (res.msg === 'ok') {
        articleId.value = res.data.split('.')[1]
        handleCoverImageUploadF(articleId.value, coverImage.value);
        handleContentImagesUploadF(articleId.value, contentImages);
        uni.showToast({
            title: '发布成功',
            icon: 'success'
        })
        setTimeout(() => {
            uni.switchTab({ url: '/pages/index/index' })
        }, 1000)
    } else {
        uni.showToast({
            title: res.msg,
            icon: 'error'
        })
    }

};
</script>

<style scoped lang="scss">
.container {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group-image {
    margin-bottom: 15px;
    // height: 200rpx;
    width: 100%;

    .cover-image {
        display: flex;
        align-items: center;
        justify-content: center;

        .cover-image-url {
            margin-left: 15rpx;
            width: 150rpx;
            height: 150rpx;
        }
    }
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input[type="text"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 100rpx;
}


textarea,
select {
    width: 95%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 10px 15px;
    background-color: #eb872a;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}



button:hover {
    background-color: #eb872a;
}

ul {
    padding-left: 20px;
    list-style-type: disc;
}

.picker {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    text-align: center;
}
</style>
