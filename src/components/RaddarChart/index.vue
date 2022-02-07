<template>
    <div class="raddar"></div>
</template>

<script>

    import * as echarts from 'echarts'
    import resize from "../../mixins/resize";

    export default {
        mixins: [resize],
        name: "RaddarChart",
        mounted() {
            this.$nextTick(this.initChart)
        },
        methods: {
            initChart() {
                this.chart = echarts.init(this.$el)
                this.chart.setOption({
                    tooltip: {
                        trigger: 'item',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    radar: {
                        radius: '50%',
                        indicator: [
                            {name: "sales", max: 1500},
                            {name: "Administration", max: 1600},
                            {name: "Customer Support", max: 3800},
                            {name: "Development", max: 3200},
                            {name: "Marketing", max: 2500}
                        ]
                    },
                    legend: {
                        left: 'center',
                        bottom: '10',
                        data: ['Allocated Budget', 'Expected Spending', 'Actual Spending']
                    },
                    series: [{
                        type: 'radar',
                        symbolSize: 0,
                        areaStyle: {
                            opacity: 1
                        },
                        data: [
                            {
                                value: [500, 700, 1200, 1100, 1500],
                                name: 'Allocated Budget'
                            },
                            {
                                value: [400, 900, 1500, 1300, 1100],
                                name: 'Expected Spending'
                            },
                            {
                                value: [550, 1100, 1200, 1500, 1200],
                                name: 'Actual Spending'
                            }
                        ],
                        animationDuration: 3000
                    }]
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .raddar {
        width: 100%;
        height: 350px;
        background-color: #fff;
        margin-top: 20px;
    }
</style>
