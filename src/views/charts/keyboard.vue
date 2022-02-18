<template>
    <div class="container"></div>
</template>

<script>
    import * as echarts from "echarts";
    import resize from "../../mixins/resize";

    export default {
        name: "KeyboardChart",
        mixins: [resize],
        mounted() {
            this.initChart()
        },
        methods: {
            initChart() {
                this.chart = echarts.init(this.$el)
                const xAxisData = [];
                const data1 = [];
                const data2 = [];
                for (let i = 0; i < 100; i++) {
                    xAxisData.push('A' + i);
                    data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
                    data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
                }
                this.chart.setOption({
                    tooltip: {},
                    xAxis: {
                        data: xAxisData,
                        show: false
                    },
                    yAxis: {
                        splitLine: {
                            show: false
                        }
                    },
                    series: [
                        {
                            name: 'bar',
                            type: 'bar',
                            data: data1,
                            emphasis: {
                                focus: 'series'
                            },
                            animationDelay: function (idx) {
                                return idx * 10;
                            }
                        },
                        {
                            name: 'bar2',
                            type: 'bar',
                            data: data2,
                            emphasis: {
                                focus: 'series'
                            },
                            animationDelay: function (idx) {
                                return idx * 10 + 100;
                            }
                        }
                    ],
                    animationEasing: 'elasticOut',
                    animationDelayUpdate: function (idx) {
                        return idx * 5;
                    },
                    backgroundColor: '#08263a'
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        height: calc(100vh - 90px);
    }
</style>
