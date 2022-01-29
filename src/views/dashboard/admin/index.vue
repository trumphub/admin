<template>
    <div>
        <panel-group @handleClick="handleClick"/>
        <line-chart :chart-data="chartData"/>
    </div>
</template>

<script>
    import PanelGroup from "../../../components/PanelGroup"
    import LineChart from "../../../components/LineChart"

    const lineChartData = {
        peoples: {
            expectedData: [100, 120, 161, 134, 105, 160, 165],
            actualData: [120, 82, 91, 154, 162, 140, 145]
        },
        message: {
            expectedData: [200, 192, 120, 144, 160, 130, 140],
            actualData: [180, 160, 151, 106, 145, 150, 130]
        },
        money: {
            expectedData: [80, 100, 121, 104, 105, 90, 100],
            actualData: [120, 90, 100, 138, 142, 130, 130]
        },
        shopping: {
            expectedData: [130, 140, 141, 142, 145, 150, 160],
            actualData: [120, 82, 91, 154, 162, 140, 130]
        }
    }

    export default {
        name: "Admin",
        data() {
            return {
                chartData: lineChartData.peoples
            }
        },
        components: {
            LineChart,
            PanelGroup
        },
        methods: {
            handleClick(type) {
                this.chartData = lineChartData[type]
            }
        }
    }
</script>

<style scoped>

</style>
