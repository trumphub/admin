<template>
    <div class="bar"></div>
</template>

<script>
    import * as echarts from "echarts";
    import resize from "../../mixins/resize";

    export default {
        mixins: [resize],
        name: "BarChart",
        mounted() {
            this.$nextTick(this.initChart)
        },
        methods: {
            initChart() {
                this.chart = echarts.init(this.$el)
                this.chart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '10%',
                        right: '10%',
                        top: '10%',
                        bottom: '10%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }],
                    yAxis: [{
                        type: 'value',
                        axisTick: {
                            show: false
                        }
                    }],
                    series: [{
                        name: 'pageA',
                        type: 'bar',
                        stack: 'vistors',
                        data: [79, 52, 200, 334, 390, 330, 220],
                    }, {
                        name: 'pageB',
                        type: 'bar',
                        stack: 'vistors',
                        data: [80, 52, 200, 334, 390, 330, 220],
                    }, {
                        name: 'pageC',
                        type: 'bar',
                        stack: 'vistors',
                        data: [30, 52, 200, 334, 390, 330, 220],
                    }]
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .bar {
        width: 100%;
        height: 350px;
        background-color: #fff;
        margin-top: 20px;
    }
</style>
