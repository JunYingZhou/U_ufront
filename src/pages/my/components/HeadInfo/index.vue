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
            <!-- <view class="head-user-info-avatar"> -->
                <image src="../../../../static/images/default_avatar.png"
                webp="true" mode="scaleToFill"
                />
            <!-- </view> -->
                <view class="head-user-info-name">
                    <view class="head-user-info-name-text">
                        用户昵称
                    </view>
                </view>
        </view>
    </view>
</template>

<script setup lang='ts'>
import getWXStatusHeight from '@/common/utils/getWxStatusHeight';
import { onMounted, reactive } from 'vue';

interface WxStatus {
  barHeight: number;
  barTop: number;
  barWidth: number;
  menuButtonInfo: any;
}

let wxStatus = reactive<WxStatus>({
    barHeight: 0,
    barTop: 0,
    barWidth: 0,
    menuButtonInfo: {}
})
wxStatus = getWXStatusHeight();

onMounted(() => {

    console.log(wxStatus);
})

</script>
<style scoped lang='scss'>
.head-info {
    background-image: url(https://pic5.40017.cn/i/ori/1xyQQgwU5vG.png);
    background-size: 100% 100%;
    height: 16.5rem;
    width: 100%;
    .head-info-setting {
        // padding-top: 40px;
        // background-color: rgba(0, 0, 0, 0.6);
        width: 100%;
        margin: 0 0 10px 10px;
        background-color: red;
        .head-top {
            width: 1.5rem;
            height: 1.5rem;
        }
    }
    .head-user-info {
        background-color: aquamarine;
        display: flex;
        height: 4rem;
        line-height: 4rem;
        .head-user-info-avatar {
            margin: 10px;
            width: 4rem;
            height: 4rem;
        }
    }
}
</style>