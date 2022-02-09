<template>
    <div>
        <panel-group @handleClick="handleClick"/>
        <line-chart :chart-data="chartData"/>
        <el-row :gutter="32">
            <el-col :xs="24" :sm="24" :lg="8">
                <raddar-chart/>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="8">
                <pie-chart/>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="8">
                <bar-chart/>
            </el-col>
        </el-row>
        <el-row :gutter="8">
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <transaction-table/>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6">
                <todo-list/>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6">
                <box-card/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import PanelGroup from "../../../components/PanelGroup"
    import LineChart from "../../../components/LineChart"
    import RaddarChart from "../../../components/RaddarChart"
    import PieChart from "../../../components/PieChart"
    import BarChart from "../../../components/BarChart"
    import TransactionTable from "../../../components/TransactionTable";
    import TodoList from "../../../components/TodoList";
    import BoxCard from "../../../components/BoxCard/index";

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
            BoxCard,
            TodoList,
            TransactionTable,
            BarChart,
            PieChart,
            RaddarChart,
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
