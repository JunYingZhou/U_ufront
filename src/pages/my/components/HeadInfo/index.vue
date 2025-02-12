<template>
    <view class="head-info" :style="{ paddingTop: wxStatus.menuButtonInfo.top + 'px'}">
        <view class="head-info-setting" :style="{height: wxStatus.menuButtonInfo.height + 'px', lineHeight: wxStatus.menuButtonInfo.height + 'px'}">
            <view class="head-top">
                <image src="../../../../static/images/icon_setting.webp"
                webp="true" mode="scaleToFill"
                />
            </view>
        </view>
        <view class="head-user-info">
            <view class="head-user-info-avatar" @click="toUserInfo">
                <image :src="userInfo.avatar ? userInfo.avatar : 'http://117.72.78.239:9000/zjyminio/defaultAvatar.webp'"
                webp="true" mode="scaleToFill" 
                />
            </view>
                <view class="head-user-info-name">
                    <view class="head-user-info-name-text">
                        {{props.nickname}}
                    </view>
                </view>
        </view>
    </view>
</template>

<script setup lang='ts'>
import getWXStatusHeight from '@/common/utils/getWxStatusHeight';
import { onMounted, reactive } from 'vue';
import { onPullDownRefresh } from '@dcloudio/uni-app';
import { useUserStore } from "@/stores";
import { ref } from 'vue';
const userStore = useUserStore()

interface WxStatus {
  barHeight: number;
  barTop: number;
  barWidth: number;
  menuButtonInfo: any;
}

let userInfo = ref<any>({});

let wxStatus = reactive<WxStatus>({
    barHeight: 0,
    barTop: 0,
    barWidth: 0,
    menuButtonInfo: {}
})
wxStatus = getWXStatusHeight();

const props = defineProps({
    userName: {
        type: String,
        default: '用户'
    },
    nickname: {
        type: String,
        default: '用户'  
    }
})

//下拉刷新
// 下拉刷新
onPullDownRefresh(() => {
  console.log('下拉刷新');
  setTimeout(() => {
    userInfo.value = userStore.getUserInfo
    uni.stopPullDownRefresh();
  }, 1000);
});



onMounted(() => {
    userInfo.value = userStore.getUserInfo
    console.log(wxStatus);
    console.log('子组件获取到的数据123231231231231231',userStore.getUserInfo);  
})

const toUserInfo = () => {
    console.log("test");
    
    uni.navigateTo({
        url: '/pages/my/components/PersonalInfo/index'
    })
}

</script>
<style scoped lang='scss'>
.head-info {
    background-image: url(https://pic5.40017.cn/i/ori/1xyQQgwU5vG.png);
    background-size: 100% 100%;
    height: 10.5rem;
    width: 100%;
    border-bottom: 1px solid #b6b4b4;
    .head-info-setting {
        // padding-top: 40px;
        // background-color: rgba(0, 0, 0, 0.6);
        width: 100%;
        margin: 0 0 10px 10px;
        // background-color: red;
        .head-top {
            width: 1.5rem;
            height: 1.5rem;
        }
    }
    .head-user-info {
        // background-color: aquamarine;
        // background-color: white;
        // 设置下方阴影
        // box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
        display: flex;
        // justify-content: space-between;
        padding: 0 0.8rem;
        height: 4rem;
        line-height: 4rem;
        .head-user-info-avatar {
            // margin: 10px;
            width: 3rem;
            height: 3rem;
            image {
             border-radius: 50%;   
            }
        }
        .head-user-info-name {
            margin-left: 0.6rem;
        }
    }
}
</style>