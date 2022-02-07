<template>
    <div class="pie"></div>
</template>

<script>
    import * as echarts from "echarts";
    import resize from "../../mixins/resize";

    export default {
        mixins: [resize],
        name: "PieChart",
        mounted() {
            this.$nextTick(this.initChart)
        },
        methods: {
            initChart() {
                this.chart = echarts.init(this.$el)
                this.chart.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        left: 'center',
                        bottom: '10',
                        data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
                    },
                    series: [
                        {
                            name: 'WEEKLY WRITE ARTICLES',
                            type: 'pie',
                            roseType: 'radius',
                            radius: [15, 95],
                            data: [
                                {value: 320, name: 'Industries'},
                                {value: 240, name: 'Technology'},
                                {value: 149, name: 'Forex'},
                                {value: 100, name: 'Gold'},
                                {value: 59, name: 'Forecasts'}
                            ],
                            animationEasing: 'cubicInOut',
                            animationDuration: 2600
                        }
                    ]
                })
            }
        },
    }
</script>

<style scoped lang="scss">
    .pie {
        width: 100%;
        height: 350px;
        background-color: #fff;
        margin-top: 20px;
    }
</style>
