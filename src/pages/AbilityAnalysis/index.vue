<template>
    <view class="container">
        <!-- 面积图 -->
        <!-- <view class="chart-title">能力趋势分析 - 题目表现</view>
        <qiun-data-charts type="area" :chartData="areaOpts" /> -->
        <!-- 饼图 -->
        <view class="chart-title">答题分布 - 正确率统计</view>
        <qiun-data-charts type="pie" :chartData="pieOpts" />
        <rich-text :nodes="data"></rich-text>
    </view>
</template>


<script setup lang="ts">
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app';
import { onMounted, ref, onUnmounted } from 'vue';
import { marked } from "marked";

// 文章列表和图表数据
const socket = ref<any>(null);
// 文章列表和图表数据
let data = ref<any>(null);
const isConnected = ref(false);
const AdviseData = ref<any>(null);
const areaOpts = ref<any>({  // 改为面积图配置
categories: [],
series: [],
});
const lineOpts = ref<any>({  // 修改为lineOpts
    categories: [],
    series: [],
});
const pieOpts = ref<any>({
    series: [],
});

// 从 Markdown 中提取 JSON 的函数
function extractChartOption(markdown: string) {
  // 匹配 ```json ... ``` 或 markdown 中标记为 json 的多行代码块
  const jsonMatch = markdown.match(/```json\s*([\s\S]*?)\s*```/);

  if (jsonMatch && jsonMatch[1]) {
    try {
      const jsonStr = jsonMatch[1].trim();
      console.log("提取的 JSON 字符串111:", jsonStr);
      console.log("提取的 JSON 字符串111:", JSON.parse(jsonStr));
      return JSON.parse(jsonStr);
    } catch (e) {
      console.error("JSON 解析错误:", e);
      return {};
    }
  }

  return {};
}

// 新增折线图转换函数
function convertEChartsToLineData(echartsOption: any) {
    console.log('输入的 ECharts 配置:', echartsOption);
    const categories = echartsOption.xAxis?.data?.map((item: string) => item.slice(0, 5)) || [];
    return {
        categories,
        series: echartsOption.series?.map((item: any) => ({
            name: item.name,
            data: item.data,
            lineType: 'curve',
            pointShape: 'solid'
        })) || [],
        extra: {
            line: {
                width: 2,
                activeType: 'none',
                divideLine: { show: true }
            },
            legend: { 
                show: true,
                position: 'top'
            },
            tooltip: { 
                show: true
            },
            mark: { 
                show: true 
            }
        },
        title: {
            name: echartsOption.title?.text || '',
            fontSize: 16,
            color: '#333',
        },
        yAxis: {
            min: 0,
            max: 5,
            splitNumber: 5,
            gridType: 'dash'
        }
    };
}

// 保留饼图转换函数
function convertEChartsToPieData(echartsOption: any) {
    const series = echartsOption.series?.[0];
    if (series && series.type === 'pie') {
        return {
            series: [{
                name: series.name,
                data: series.data.map((item: any) => ({
                    name: item.name,
                    value: item.value,
                    color: item.name === '优点' ? '#67C23A' : '#F56C6C',
                })),
            }],
            extra: {
                pie: {
                    labelShow: true,
                    labelWidth: 20,
                    activeRadius: 10,
                    labelType: 'circle'
                },
                legend: {
                    show: true,
                    position: 'bottom',
                    fontSize: 14
                },
                tooltip: {
                    show: true,
                    format: '{b} : {d}%'
                },
            },
            title: {
                name: '能力分布比例',
                fontSize: 18,
                color: '#2c3e50',
            },
            animation: true
        };
    }
    return { series: [] };
}
function convertToAreaData(echartsOption: any) {
    console.log('输入的 ECharts 配置:', echartsOption);
    const categories = echartsOption.xAxis?.data?.map((item: string) => item.slice(0, 5)) || [];
    return {
        categories,
        series: echartsOption.series?.map((item: any) => ({
            name: item.name,
            data: item.data,
            color: item.name === '正确' ? '#67C23A' : '#F56C6C',
            areaStyle: {
                color: {
                    linearGradient: { x: 0, y: 0, x2: 0, y2: 1 },
                    stops: [[0, '#67C23A80'], [1, '#FFFFFF00']]
                }
            },
            lineType: 'curve',
            pointShape: 'solid',
            enableScroll: true
        })) || [],
        extra: {
            area: {
                type: 'straight',
                opacity: 0.4,
                addLine: true,
                width: 3,
                activeType: 'none'
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: 14
            },
            tooltip: {
                show: true,
                bgColor: '#FFFFFF',
                gridColor: '#EEEEEE'
            },
            yAxis: {
                min: 0,
                max: 5,
                splitNumber: 5,
                gridType: 'dash',
                title: '题数',
                titleFontSize: 12
            },
            xAxis: {
                scrollShow: true,
                itemCount: 5
            }
        },
        title: {
            name: echartsOption.title?.text || '能力趋势分析',
            fontSize: 18,
            color: '#2c3e50',
            subtext: echartsOption.title?.subtext || '',
            subtextFontSize: 12
        }
    };
}

// 修改初始化逻辑
function initializeChart() {
    if (!AdviseData.value) return;
    const markdownContent = AdviseData.value;
    const analysisSection = markdownContent.split('---')[0];
    data.value = marked.parse(analysisSection);
    const echartsOption = extractChartOption(markdownContent);
    
    // 调试输出
    console.log('处理后的饼图配置:', JSON.stringify(echartsOption));
    pieOpts.value = convertEChartsToPieData(echartsOption);
    console.log('最终饼图选项:', JSON.stringify(pieOpts.value));
}
const initWS1 = () => {
    // 初始化 WebSocket 连接
    socket.value = new WebSocket('ws://localhost/chat');

    // 监听 WebSocket 连接成功事件
    socket.value.onopen = () => {
        console.log('WebSocket 连接成功');
    };

    // 监听 WebSocket 接收到消息事件
    socket.value.onmessage = (event: any) => {
        console.log('收到消息:', event.data);
        const message = {
            text: event.data,
            isUser: false
        };
        // messages.value.push(message);
    };

    // 监听 WebSocket 连接关闭事件
    socket.value.onclose = () => {
        console.log('WebSocket 连接关闭');
    };

    // 监听 WebSocket 错误事件
    socket.value.onerror = (error: any) => {
        console.error('WebSocket 发生错误:', error);
    };
}

onLoad((options: any) => {
    // 初始化 WebSocket 连接
    // initWS1();
    console.log('!!!!!!', options);
    try {
        const item = JSON.parse(decodeURIComponent(options.advise));
        console.log('解析后的 options.advise:', item);
        AdviseData.value = item;
    } catch (error) {
        console.error('解析 options.advise 出错:', error);
    }
});

const initWS = () => {
  if (isConnected.value) return;

  // 创建WebSocket连接
  socket.value = uni.connectSocket({
    url: 'ws://localhost/chat',
    complete: () => {}
  });

  // 监听WebSocket打开事件
  socket.value.onOpen(() => {
    console.log('WebSocket连接成功');
    isConnected.value = true;
  });

  // 监听WebSocket消息事件
  socket.value.onMessage((event: any) => {
    console.log('收到消息:', event.data);
    try {
      const message = JSON.parse(event.data);
      // 处理不同类型的消息
      // handleWebSocketMessage(message);
    } catch (e) {
      console.error('消息解析错误:', e);
    }
  });

  // 监听WebSocket关闭事件
  socket.value.onClose(() => {
    console.log('WebSocket连接关闭');
    isConnected.value = false;
  });

  // 监听WebSocket错误事件
  socket.value.onError((error: any) => {
    console.error('WebSocket发生错误:', error);
    isConnected.value = false;
  });
};
// 初始化加载
onMounted(() => {
    initializeChart();
    // initWS();
    uni.connectSocket({
        url: 'ws://localhost:8000/ws/anti/analysis'
    });
    uni.onSocketOpen(function (res) {
        console.log('WebSocket连接已打开！');
    });
    uni.sendSocketMessage({
      data: 'Hello, Server!'
    });
    uni.onSocketMessage(function (res) {
      console.log('收到服务器内容：' + res.data); 
    })
});

// 下拉刷新
onPullDownRefresh(() => {
    // 可在此添加刷新逻辑
});

// 添加组件卸载时的清理
onUnmounted(() => {
  if (socket.value) {
    socket.value.close();
  }
  areaOpts.value = {  // 重置为默认值
    categories: [],
    series: [],
  };
  pieOpts.value = {
    series: [], 
  }

});

</script>

<style scoped>
.container {
    padding: 15px;
    background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
}

.chart-title {
    font-size: 18px;
    font-weight: 600;
    color: #2c3e50;
    text-align: center;
    margin: 15px 0;
    padding: 8px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
</style>