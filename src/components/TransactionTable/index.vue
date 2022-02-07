<template>
    <el-table :data="tableData">
        <el-table-column
                align="center"
                label="Order_No">
            <template slot-scope="scope">
                {{ scope.row.order_no | orderNoFilter }}
            </template>
        </el-table-column>
        <el-table-column
                width="100"
                align="center"
                label="Price">
            <template slot-scope="scope">
                ¥{{ scope.row.price | toThousandFilter }}
            </template>
        </el-table-column>
        <el-table-column
                align="center"
                width="100"
                label="Status">
            <template slot-scope="{row}">
                <el-tag :type="row.status | statusFilter">
                    {{ row.status }}
                </el-tag>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import {getTransactionList} from '../../api/dashboard'

    export default {
        name: "TransactionTable",
        filters: {
            statusFilter(status) {
                const statusMap = {
                    success: 'success',
                    pending: 'danger'
                }
                return statusMap[status]
            },
            orderNoFilter(str) {
                return str.substring(0, 30)
            },
            toThousandFilter(num) {
                return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
            }
        },
        data() {
            return {
                tableData: []
            }
        },
        mounted() {
            getTransactionList().then(data => {
                this.tableData = data.slice(0, 8)
            })
        }
    }
</script>

<style scoped lang="scss">
    .el-table {
        margin-top: 20px;
    }
</style>
