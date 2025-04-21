<template>
  <view class="container" v-if="!loading">
    <view class="simulation-container" v-if="isStartChat">
      <!-- 切换按钮 -->
      <view class="toggle-btn" @click="toggleSidebar">
        <text>{{ showSidebar ? '◀' : '▶' }}</text>
      </view>

      <!-- 聊天容器 -->
      <view class="chat-container">
        <!-- 左侧聊天列表 -->
        <view class="chat-list" v-show="showSidebar">
          <view class="chat-item" v-for="(item, index) in chatList" :key="index" @click="selectChat(item.chatId)">
            <image class="avatar" :src="item.avatar" mode="aspectFill"></image>
            <view class="info">
              <text class="name">{{ getCategoryName(item.categoryId) }}</text>
              <text class="last-msg">{{ item.chatAdvise.slice(0, 10) }}</text>
            </view>
          </view>
        </view>

        <!-- 右侧聊天内容 -->
        <view class="chat-content" :style="{ width: showSidebar ? '70%' : '100%' }">
          <scroll-view class="message-list" scroll-y :scroll-top="scrollTop">
            <view class="message-item" v-for="(msg, index) in messages" :key="index"
              :class="{ 'right': msg.isMe, 'left': !msg.isMe }">
              <image v-if="!msg.isMe" class="avatar" src="http://117.72.78.239:9000/zjyminio/AI-06.png"
                mode="aspectFill"></image>
              <view class="message-bubble">
                <text>{{ msg.content }}</text>
              </view>
              <image v-if="msg.isMe" class="avatar" src="http://117.72.78.239:9000/zjyminio/AI-06.png"
                mode="aspectFill"></image>
            </view>
          </scroll-view>

          <view class="input-area">
            <input class="input" v-model="inputMsg" placeholder="输入消息..." @confirm="sendMessage" />
            <button @click="sendMessage">发送</button>
          </view>
        </view>
      </view>
    </view>
    <view class="select-category" v-else>
      <text class="title">请选择咨询类别</text>
      <view class="category-grid">
        <view class="category-item" v-for="(item, index) in categoryList" :key="index" @click="selectCategory(item)">
          <view class="icon-container">
            <image class="icon" :src="item.categoryIcon" mode="aspectFill"></image>
          </view>
          <text class="name">{{ item.categoryName }}</text>
        </view>
      </view>
    </view>
  </view>
  <view v-else class="container-loading">
    <!-- <view class="loading">加载中...</view> -->
    <view class="boxes">
      <view class="box">
        <view></view>
        <view></view>
        <view></view>
        <view></view>
      </view>
      <view class="box">
        <view></view>
        <view></view>
        <view></view>
        <view></view>
      </view>
      <view class="box">
        <view></view>
        <view></view>
        <view></view>
        <view></view>
      </view>
      <view class="box">
        <view></view>
        <view></view>
        <view></view>
        <view></view>
      </view>
    </view>
  </view>

</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useCategoryStore } from "@/stores";
import { useUserStore } from '@/stores';
import { getChatInfoByUserId, getAdvise } from "@/api/chat";
const categoryStore = useCategoryStore();
const userStore = useUserStore();
let isStartChat = ref<boolean>(false)


onMounted(() => {
  // 获取文章列表
  console.log('种类数据', categoryStore.getCategoryInfo)
  categoryList.value = categoryStore.getCategoryInfo
  // 1. 查询该用户在改种类下的聊天记录

  // 初始化ws
  initWs();

});

// 控制侧边栏显示
const showSidebar = ref(true);
const scrollTop = ref(0);

// 聊天列表数据
const chatList = ref<any>([]);

// 分类列表数据
const categoryList = ref<any>([])

// 题库
const questionList = ref<any>([])

const QuestionContentMap = reactive(new Map())

const loading = ref(false)


// 当前聊天消息
const messages = ref([
  {
    id: 1,
    content: '您好，请回复立即开始',
    isMe: false,
    avatar: '/static/avatar1.jpg'
  }
]);

const inputMsg = ref('');
const currentChatId = ref(1);


const getCategoryName = (id: any) => {
  return categoryList.value.find((item: any) => item.categoryId === id).categoryName;
}

const initWs = () => {
  uni.connectSocket({
    url: 'ws://localhost:8000/ws/anti/analysis'
  });
  uni.onSocketOpen(function (res) {
    console.log('WebSocket连接已打开！', res);
  });
  uni.onSocketMessage(function (res) {
    console.log('收到服务器内容：' + res.data);
    const data = res.data.split(':');
    questionList.value = parseRepoDO(data[1])
    console.log('问题列表', questionList.value);
  })
}

const parseRepoDO = (raw: string) => {
  const obj: Record<string, any> = {};
  const inner = raw.substring(raw.indexOf('(') + 1, raw.lastIndexOf(')')); // 去掉 RepoDO(...)
  const pairs = inner.split(/,\s*(?=\w+=)/); // 按 key=value 分割（逗号后跟key=）

  pairs.forEach(pair => {
    const [key, ...valueParts] = pair.split('=');
    obj[key] = valueParts.join('=').trim();
  });

  return obj;
};

// 选择分类
async function selectCategory(item: any) {
  // 这里可以根据分类ID跳转到对应的页面
  console.log('选择分类：', item, '--->', userStore.getUserId);
  // 获取对应分类的聊天数据
  let res: any = await getChatInfoByUserId(uni.getStorageSync("userId"), item.categoryId)
  console.log('聊天数据', res)
  chatList.value = res.data
  res.msg === "ok" ? isStartChat.value = true : "";
  uni.sendSocketMessage({
    data: item.categoryId
  });
}

// 切换侧边栏
function toggleSidebar() {
  showSidebar.value = !showSidebar.value;
}

// 选择聊天
function selectChat(id: number) {
  currentChatId.value = id;
  // 这里可以添加加载对应聊天记录的逻辑
}

// 发送消息
const numberToWordMap = new Map([
  [1, 'One'],
  [2, 'Two'],
  [3, 'Three'],
  [4, 'Four'],
  [5, 'Five'],
  [6, 'Six'],
  [7, 'Seven'],
  [8, 'Eight'],
  [9, 'Nine'],
  [10, 'Ten']
]);

const replyIndex = ref(1);
const isFirst = ref(false);

// 发送消息
const sendMessage = async() => {
  if (!inputMsg.value.trim()) return;


  if(inputMsg.value === '立即开始'){
    isFirst.value = true
  }

  if(!isFirst.value) {
    inputMsg.value = '';
    uni.showToast({
      icon: 'error',
      title: '请输入立即开始',
      duration: 2000,	
    })
    return
  }

  console.log('输入的字符是', inputMsg.value);

  messages.value.push({
    id: Date.now(),
    content: inputMsg.value, 
    isMe: true,
    avatar: ''
  });
  

  if(inputMsg.value === '立即开始'){
    QuestionContentMap.set('您好，请回复立即开始', inputMsg.value);
  }else {
    const key = `repoContent${numberToWordMap.get(replyIndex.value - 1)}`;
    QuestionContentMap.set(questionList.value[key], inputMsg.value);
  }

  inputMsg.value = '';

  console.log('@@@@', questionList.value[`repoContentOne`]);

  // 模拟回复
  setTimeout(() => {
    const key = `repoContent${numberToWordMap.get(replyIndex.value)}`;
    if (questionList.value && questionList.value[key]) {
      messages.value.push({
        id: Date.now(),
        content: questionList.value[key],
        isMe: false,
        avatar: '/static/avatar1.jpg'
      });
      QuestionContentMap.set(questionList.value[key], "");
      replyIndex.value++;
    }
    scrollToBottom();
  }, 1000);

  if(replyIndex.value === 11) {
    loading.value = true;
    // 发送message给后端，并生成回答
    const mapToObject = Object.fromEntries(QuestionContentMap);
    console.log('对话内容', mapToObject)
    const mapData = QuestionContentMap;
    const data = {
      "questionCategory": getCategoryName(currentChatId.value),
      "questionContent": mapToObject
    }
    let res: any = await getAdvise(data)
    loading.value = false;
    console.log('回答', res)
    uni.navigateTo({ url: '/pages/AbilityAnalysis/index?advise='+ encodeURIComponent(JSON.stringify(res.data))})
    inputMsg.value = ''
    return;
  }
}

const fillMessageList = () => {

}

// 滚动到底部
function scrollToBottom() {
  // setTimeout(() => {
    scrollTop.value = 99999;
  // }, 100);
}
</script>

<style scoped lang="scss">
.container {
  position: relative;
  width: 100%;
  height: 100vh;

  .simulation-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #f5f5f5;

    .toggle-btn {
      position: absolute;
      left: 10px;
      top: 10px;
      z-index: 100;
      width: 30px;
      height: 30px;
      background-color: #fff;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }

    .chat-container {
      display: flex;
      height: 100%;

      .chat-list {
        width: 30%;
        background-color: #fff;
        border-right: 1px solid #eee;
        overflow-y: auto;

        .chat-item {
          display: flex;
          padding: 15px;
          border-bottom: 1px solid #eee;

          .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 10px;
          }

          .info {
            display: flex;
            flex-direction: column;
            justify-content: center;

            .name {
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 5px;
            }

            .last-msg {
              font-size: 12px;
              color: #999;
            }
          }
        }
      }

      .chat-content {
        display: flex;
        flex-direction: column;

        .message-list {
          flex: 1;
          padding: 15px;
          overflow-y: auto;

          .message-item {
            display: flex;
            margin-bottom: 15px;

            &.left {
              justify-content: flex-start;

              .message-bubble {
                background-color: #fff;
                margin-left: 10px;
              }
            }

            &.right {
              justify-content: flex-end;

              .message-bubble {
                background-color: #95ec69;
                margin-right: 10px;
              }
            }

            .avatar {
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }

            .message-bubble {
              max-width: 70%;
              padding: 10px 15px;
              border-radius: 18px;
              word-break: break-word;
            }
          }
        }

        .input-area {
          display: flex;
          padding: 10px;
          border-top: 1px solid #eee;
          background-color: #fff;

          .input {
            flex: 1;
            height: 40px;
            padding: 0 10px;
            border: 1px solid #ddd;
            border-radius: 20px;
            margin-right: 10px;
          }
        }
      }
    }
  }

  .select-category {
    width: 100%;
    height: 100vh;
    padding: 20px;
    background-color: #f8f8f8;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      font-size: 18px;
      font-weight: bold;
      color: #333;
      margin-bottom: 30px;
    }

    .category-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      width: 100%;
      max-width: 600px;
    }

    .category-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 15px;
      background-color: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;

      &:active {
        transform: scale(0.95);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      }
    }

    .icon-container {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      background-color: #f0f7ff;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
    }

    .icon {
      width: 80rpx;
      height: 80rpx;
    }

    .name {
      font-size: 28rpx;
      color: #333;
      text-align: center;
    }
  }
}
.container-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.boxes {
  --size: 32px;
  --duration: 800ms;
  height: calc(var(--size) * 2);
  width: calc(var(--size) * 3);
  position: relative;
  transform-style: preserve-3d;
  transform-origin: 50% 50%;
  margin-top: calc(var(--size) * 1.5 * -1);
  transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
}

.boxes .box {
  width: var(--size);
  height: var(--size);
  top: 0;
  left: 0;
  position: absolute;
  transform-style: preserve-3d;
}

.boxes .box:nth-child(1) {
  transform: translate(100%, 0);
  -webkit-animation: box1 var(--duration) linear infinite;
  animation: box1 var(--duration) linear infinite;
}

.boxes .box:nth-child(2) {
  transform: translate(0, 100%);
  -webkit-animation: box2 var(--duration) linear infinite;
  animation: box2 var(--duration) linear infinite;
}

.boxes .box:nth-child(3) {
  transform: translate(100%, 100%);
  -webkit-animation: box3 var(--duration) linear infinite;
  animation: box3 var(--duration) linear infinite;
}

.boxes .box:nth-child(4) {
  transform: translate(200%, 0);
  -webkit-animation: box4 var(--duration) linear infinite;
  animation: box4 var(--duration) linear infinite;
}

.boxes .box>view {
  --background: #ec7d0f;
  --top: auto;
  --right: auto;
  --bottom: auto;
  --left: auto;
  --translateZ: calc(var(--size) / 2);
  --rotateY: 0deg;
  --rotateX: 0deg;
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--background);
  top: var(--top);
  right: var(--right);
  bottom: var(--bottom);
  left: var(--left);
  transform: rotateY(var(--rotateY)) rotateX(var(--rotateX)) translateZ(var(--translateZ));
}

.boxes .box>view:nth-child(1) {
  --top: 0;
  --left: 0;
}

.boxes .box>view:nth-child(2) {
  --background: #ec7d0f;
  --right: 0;
  --rotateY: 90deg;
}

.boxes .box>view:nth-child(3) {
  --background: #f09840;
  --rotateX: -90deg;
}

.boxes .box>view:nth-child(4) {
  --background: #DBE3F4;
  --top: 0;
  --left: 0;
  --translateZ: calc(var(--size) * 3 * -1);
}

@-webkit-keyframes box1 {

  0%,
  50% {
    transform: translate(100%, 0);
  }

  100% {
    transform: translate(200%, 0);
  }
}

@keyframes box1 {

  0%,
  50% {
    transform: translate(100%, 0);
  }

  100% {
    transform: translate(200%, 0);
  }
}

@-webkit-keyframes box2 {
  0% {
    transform: translate(0, 100%);
  }

  50% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(100%, 0);
  }
}

@keyframes box2 {
  0% {
    transform: translate(0, 100%);
  }

  50% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(100%, 0);
  }
}

@-webkit-keyframes box3 {

  0%,
  50% {
    transform: translate(100%, 100%);
  }

  100% {
    transform: translate(0, 100%);
  }
}

@keyframes box3 {

  0%,
  50% {
    transform: translate(100%, 100%);
  }

  100% {
    transform: translate(0, 100%);
  }
}

@-webkit-keyframes box4 {
  0% {
    transform: translate(200%, 0);
  }

  50% {
    transform: translate(200%, 100%);
  }

  100% {
    transform: translate(100%, 100%);
  }
}

@keyframes box4 {
  0% {
    transform: translate(200%, 0);
  }

  50% {
    transform: translate(200%, 100%);
  }

  100% {
    transform: translate(100%, 100%);
  }
}
</style>