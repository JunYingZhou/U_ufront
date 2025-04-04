<template>
    <view class="container">
        <!-- 分组柱状图 -->
        <view class="chart-title">分组柱状图 - 每题表现</view>
        <qiun-data-charts type="column" :chartData="columnOpts" />
        <!-- 饼图 -->
        <view class="chart-title">饼图 - 总体比例</view>
        <qiun-data-charts type="pie" :chartData="pieOpts" />
        <rich-text :nodes="data"></rich-text>
    </view>
</template>

<script setup lang="ts">
import { onPullDownRefresh } from '@dcloudio/uni-app';
import { onMounted, ref } from 'vue';
import { marked } from "marked";

// 文章列表和图表数据
let data = ref<any>(null);
const columnOpts = ref<any>({
    categories: [],
    series: [],
});
const pieOpts = ref<any>({
    series: [],
});

// 从 Markdown 中提取 JSON 的函数
function extractChartOption(markdown: string) {
    const jsonMatch = markdown.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
        try {
            return JSON.parse(jsonMatch[1]);
        } catch (e) {
            console.error("JSON 解析错误:", e);
            return {};
        }
    }
    return {};
}

// 将 ECharts 配置转换为 qiun-data-charts 分组柱状图格式
function convertEChartsToColumnData(echartsOption: any) {
    const categories = echartsOption.xAxis.data.map((item: string) => item.slice(0, 5));
    return {
        categories,
        series: echartsOption.series.map((item: any) => ({
            name: item.name,
            data: item.data,
            label: {
                show: true,
                position: 'top',
                color: item.name === '正确' ? '#67C23A' : '#F56C6C',
            },
        })),
        extra: {
            column: {
                type: 'group',
                width: 20,
                activeBgColor: '#409EFF',
                seriesGap: 5,
                categoryGap: 10,
            },
            legend: {
                show: true,
                position: 'top',
                float: 'center',
            },
            tooltip: {
                show: true,
            },
        },
        title: {
            name: echartsOption.title.text,
            fontSize: 16,
            color: '#333',
        },
        subtitle: {
            name: echartsOption.title.subtext,
            fontSize: 12,
            color: '#666',
        },
        yAxis: {
            min: 0,
            max: 5, // 调整为 5，因为数据最大值为 4
            splitNumber: 5,
            format: 'value',
        },
    };
}

// 将 ECharts 配置转换为 qiun-data-charts 饼图格式
function convertEChartsToPieData(echartsOption: any) {
    const correctCount = echartsOption.series[0].data.reduce((sum: number, val: number) => sum + val, 0);
    const errorCount = echartsOption.series[1].data.reduce((sum: number, val: number) => sum + val, 0);
    return {
        series: [
            {
                name: '答题结果',
                data: [
                    { name: '正确', value: correctCount, color: '#67C23A' },
                    { name: '错误', value: errorCount, color: '#F56C6C' },
                ],
            },
        ],
        extra: {
            pie: {
                labelShow: true, // 显示标签
                labelWidth: 20,
                activeRadius: 10, // 点击放大效果
            },
            legend: {
                show: true,
                position: 'top',
                float: 'center',
            },
            tooltip: {
                show: true,
            },
        },
        title: {
            name: '总体答题比例',
            fontSize: 16,
            color: '#333',
        },
    };
}

// 初始化加载
onMounted(() => {
    initializeChart();
});

// 初始化图表逻辑
function initializeChart() {
    const markdownContent = "### 用户能力分析\n\n从题目内容和用户答案来看，用户的网络安全意识和反诈能力存在较大问题。以下是详细分析：\n\n1. **缺乏基本的风险识别能力**：  \n   用户在面对常见的诈骗场景时，表现出较高的易受骗倾向。例如，“中奖短信”、“社交平台快速赚钱”等问题中，用户都选择了高风险的行为，完全忽略了潜在的诈骗陷阱。\n\n2. **信任度过高**：  \n   用户对陌生人的信息过于信任，尤其是涉及到金钱或隐私的部分。例如，“自称银行工作人员”的情况下，尽管最终给出了正确答案，但整体表现显示用户对此类事件的认知不够深刻。\n\n3. **应急反应能力不足**：  \n   在需要迅速做出判断的情境下，用户往往选择最简单的做法（如直接转账或加入陌生群组），而不是优先考虑安全性。这种情况反映了用户在危机时刻缺乏冷静思考的能力。\n\n4. **对权威机构的信任过度依赖**：  \n   尽管关于“公检法电话”的题目中用户给出了正确答案，但这更多可能是运气成分所致。整体来看，用户并没有形成良好的安全习惯，难以独立应对复杂局面。\n\n---\n\n### ECharts 数据 JSON 格式\n\n```json\n{\n    \"title\": {\n        \"text\": \"用户能力分析\",\n        \"subtext\": \"基于网络安全反诈测试结果\"\n    },\n    \"tooltip\": {},\n    \"legend\": {\n        \"data\": [\"正确\", \"错误\"]\n    },\n    \"xAxis\": {\n        \"type\": \"category\",\n        \"data\": [\n            \"收到未知号码中奖短信\",\n            \"社交平台快速赚钱\",\n            \"网购第三方链接付款\",\n            \"自称银行工作人员要求卡号验证码\",\n            \"自称公检法电话要求配合调查\"\n        ]\n    },\n    \"yAxis\": {\n        \"type\": \"value\"\n    },\n    \"series\": [\n        {\n            \"name\": \"正确\",\n            \"type\": \"bar\",\n            \"stack\": \"总量\",\n            \"label\": {\n                \"show\": true,\n                \"position\": \"top\"\n            },\n            \"emphasis\": {\n                \"focus\": \"series\"\n            },\n            \"data\": [0, 0, 0, 1, 1]\n        },\n        {\n            \"name\": \"错误\",\n            \"type\": \"bar\",\n            \"stack\": \"总量\",\n            \"label\": {\n                \"show\": true,\n                \"position\": \"top\"\n            },\n            \"emphasis\": {\n                \"focus\": \"series\"\n            },\n            \"data\": [4, 4, 4, 1, 1]\n        }\n    ]\n}\n```\n\n---\n\n### 解释说明\n\n- `xAxis` 列出了五道测试题目。\n- `series` 包括两个子项：\n  - `\"正确\"` 表示用户回答正确的题目数量，总计 3 道。\n  - `\"错误\"` 表示用户回答错误的题目数量，总计 7 道。\n- 柱状图显示用户在大多数情况下无法有效识别骗局，特别是在“中奖短信”、“社交平台快速赚钱”以及“网购第三方链接付款”等高频诈骗场景中表现尤为薄弱。";

    data.value = marked.parse(markdownContent);
    const echartsOption = extractChartOption(markdownContent);
    console.log('ECharts option --->', JSON.stringify(echartsOption));
    
    // 转换为 qiun-data-charts 格式
    columnOpts.value = convertEChartsToColumnData(echartsOption);
    pieOpts.value = convertEChartsToPieData(echartsOption);
    console.log('Column opts --->', JSON.stringify(columnOpts.value));
    console.log('Pie opts --->', JSON.stringify(pieOpts.value));

    // 只取用户能力分析的部分
    const analysisSection = markdownContent.split('---')[0];
    data.value = marked.parse(analysisSection);
}

// 下拉刷新
onPullDownRefresh(() => {
    // 可在此添加刷新逻辑
});

</script>

<style scoped>
.container {
    padding: 15px;
    background-color: #f8f9fa;
}
.chart-title {
    font-size: 16px;
    color: #333;
    text-align: center;
    margin: 10px 0;
}
</style>