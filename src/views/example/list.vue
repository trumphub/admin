<template>
    <div>
        <el-table v-loading="listLoading" :data="list" border>
            <el-table-column align="center" label="ID" width="80">
                <template slot-scope="scope">
                    <span>{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column width="180px" align="center" label="Date">
                <template slot-scope="scope">
                    <span>{{ scope.row.timestamp | _parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="Author">
                <template slot-scope="scope">
                    <span>{{ scope.row.author }}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" label="Importance">
                <template slot-scope="scope">
                    <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon"/>
                </template>
            </el-table-column>

            <el-table-column class-name="status-col" label="Status" width="110">
                <template slot-scope="{row}">
                    <el-tag :type="row.status | statusFilter">
                        {{ row.status }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column min-width="300px" label="Title">
                <template slot-scope="{row}">
                    <span @click="toEditPage(row.id)">{{ row.title }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="Actions" width="120">
                <template slot-scope="scope">
                    <el-button @click="toEditPage(scope.row.id)" type="primary" size="small" icon="el-icon-edit">
                        Edit
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination
                v-show="total>0"
                :total="total"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                @pagination="getList"
        />
    </div>
</template>

<script>
    import {parseTime} from '@/utils'
    import Pagination from '@/components/Pagination'
    import {getArticleList} from '@/api/article'

    export default {
        name: "List",
        components: {Pagination},
        filters: {
            _parseTime: function (value, format) {
                return parseTime(value, format);
            },
            statusFilter(status) {
                const statusMap = {
                    published: 'success',
                    draft: 'info',
                    deleted: 'danger'
                }
                return statusMap[status]
            }
        },
        data() {
            return {
                listLoading: false,
                list: [],
                total: 0,
                listQuery: {
                    page: 1,
                    limit: 20
                }
            }
        },
        methods: {
            async getList() {
                this.listLoading = true
                const {items, total} = await getArticleList(this.listQuery)
                this.list = items
                this.total = total
                this.listLoading = false
            },
            toEditPage(id) {
                this.$router.push({name: 'EditArticle', params: {id}})
            }
        },
        mounted() {
            this.getList()
        }
    }
</script>

<style scoped lang="scss">
    a {
        text-decoration: none;
    }
</style>
