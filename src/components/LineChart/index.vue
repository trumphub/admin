<template>
    <div class="chart"></div>
</template>

<script>
    import * as echarts from 'echarts'
    import debounce from 'lodash/debounce'

    export default {
        name: "LineChart",
        mounted() {
            this.$nextTick(this.initChart)
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.resizeChart)
            delete this.resizeChart
        },
        props: {
            chartData: {
                type: Object,
                required: true
            }
        },
        watch: {
            chartData: {
                deep: true,
                handler(val) {
                    this.setOption(val)
                }
            }
        },
        methods: {
            initChart() {
                this.chart = echarts.init(this.$el)
                this.setOption(this.chartData)
                this.resizeChart = this.resizeChart || debounce(() => {
                    this.chart.resize({
                        animation: {
                            duration: 100,
                            easing: 'linear'
                        }
                    })
                }, 100)
                window.addEventListener('resize', this.resizeChart)
            },
            setOption({expectedData, actualData}) {
                this.chart.setOption({
                    xAxis: {
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        boundaryGap: false,
                        axisTick: {
                            show: false
                        }
                    },
                    grid: {
                        left: 30,
                        right: 30,
                        bottom: 20,
                        top: 40,
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        },
                        padding: [5, 10]
                    },
                    yAxis: {
                        axisTick: {
                            show: false
                        }
                    },
                    legend: {
                        data: ['expected', 'actual']
                    },
                    series: [
                        {
                            name: 'expected',
                            data: expectedData,
                            type: 'line',
                            smooth: true,
                            animationDuration: 2800,
                            animationEasing: 'cubicInOut'
                        },
                        {
                            name: 'actual',
                            data: actualData,
                            type: 'line',
                            smooth: true,
                            animationDuration: 2800,
                            animationEasing: 'quadraticOut'
                        }
                    ]
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .chart {
        width: 100%;
        height: 350px;
        background-color: #fff;
        margin-top: 20px;
        padding-top: 20px;
    }
</style>
