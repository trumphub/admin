<template>
    <div>
        <div style="margin-bottom: 20px">
            <el-input
                    style="width: 200px;"
                    v-model="listQuery.title"
                    placeholder="Title"
                    @keyup.enter.native="handleFilter"/>
            <el-select
                    @change="handleFilter"
                    v-model="listQuery.importance"
                    placeholder="Imp"
                    clearable
                    style="width: 90px">
                <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"/>
            </el-select>
            <el-select
                    @change="handleFilter"
                    v-model="listQuery.type"
                    placeholder="Type"
                    clearable
                    style="width: 130px">
                <el-option v-for="item in calendarTypeOptions" :key="item.key"
                           :label="item.display_name+'('+item.key+')'" :value="item.key"/>
            </el-select>
            <el-select
                    v-model="listQuery.sort"
                    style="width: 140px"
                    @change="handleFilter">
                <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key"/>
            </el-select>
            <el-button v-waves type="primary" icon="el-icon-search" @click="handleFilter">
                Search
            </el-button>
            <el-button v-waves :loading="downloadLoading" type="primary" icon="el-icon-download"
                       @click="handleDownload">
                Export
            </el-button>
            <el-button type="primary" icon="el-icon-edit" @click="handleCreate">
                Add
            </el-button>
            <el-checkbox v-model="showReviewer" style="margin-left:15px;" @change="tableKey=tableKey+1">
                reviewer
            </el-checkbox>
        </div>
        <el-table
                :key="tableKey"
                :data="list"
                v-loading="listLoading"
                border
                @sort-change="sortChange"
        >
            <el-table-column :class-name="getSortClass('id')" sortable="custom" label="ID" prop="id" align="center"
                             width="60"/>
            <el-table-column label="Date" width="130px" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.timestamp | _parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Title" min-width="150px">
                <template slot-scope="{row}">
                    <el-link :underline="false" @click="handleUpdate(row)">{{ row.title }}</el-link>
                    <el-tag>{{ row.type | typeFilter }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="Author" width="100px" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.author }}</span>
                </template>
            </el-table-column>
            <el-table-column v-if="showReviewer" label="Reviewer" width="100px" align="center">
                <template slot-scope="{row}">
                    <span style="color:red;">{{ row.reviewer }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Imp" align="center" width="80px">
                <template slot-scope="{row}">
                    <svg-icon v-for="n in +row.importance" :key="n" icon-class="star" class="meta-item__icon"/>
                </template>
            </el-table-column>
            <el-table-column label="Readings" align="center" width="95">
                <template slot-scope="{row}">
                    <el-link v-if="row.pageviews" :underline="false">
                        {{ row.pageviews }}
                    </el-link>
                    <span v-else>0</span>
                </template>
            </el-table-column>
            <el-table-column label="Status" align="center" width="100">
                <template slot-scope="{row}">
                    <el-tag :type="row.status | statusFilter">
                        {{ row.status }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="Actions" align="center" width="230">
                <template slot-scope="{row,$index}">
                    <el-button type="primary" size="mini" @click="handleUpdate(row)">
                        Edit
                    </el-button>
                    <el-button v-if="row.status!=='published'" size="mini" type="success"
                               @click="handleModifyStatus(row,'published')">
                        Publish
                    </el-button>
                    <el-button v-if="row.status!=='draft'" size="mini" @click="handleModifyStatus(row,'draft')">
                        Draft
                    </el-button>
                    <el-button v-if="row.status!=='deleted'" size="mini" type="danger"
                               @click="handleDelete(row,$index)">
                        Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog @close="handleClose" :title="dialogTitle" :visible.sync="dialogFormVisible">
            <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px">
                <el-form-item label="Type" prop="type">
                    <el-select v-model="temp.type" placeholder="Please select">
                        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name"
                                   :value="item.key"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="Date" prop="timestamp">
                    <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date"/>
                </el-form-item>
                <el-form-item label="Title" prop="title">
                    <el-input v-model="temp.title"/>
                </el-form-item>
                <el-form-item label="Status">
                    <el-select v-model="temp.status" placeholder="Please select">
                        <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="Imp">
                    <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3"
                    />
                </el-form-item>
                <el-form-item label="Remark">
                    <el-input v-model="temp.remark" type="textarea"
                              placeholder="Please input"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">
                    Cancel
                </el-button>
                <el-button type="primary" @click="handleUpdateList">
                    Confirm
                </el-button>
            </div>
        </el-dialog>
        <pagination
                v-show="total>0"
                :total="total"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                @pagination="_getArticleList"
        />
    </div>
</template>

<script>
    import {
        deleteArticleById,
        getArticleList,
        updateArticleStatusById,
        createArticle,
        updateArticle
    } from '@/api/article'
    import {parseTime} from '@/utils'
    import Pagination from '@/components/Pagination'
    import waves from '@/directive/waves'
    import cloneDeep from 'lodash/cloneDeep'

    const calendarTypeOptions = [
        {key: 'CN', display_name: 'China'},
        {key: 'US', display_name: 'USA'},
        {key: 'JP', display_name: 'Japan'},
        {key: 'EU', display_name: 'Eurozone'}
    ]
    const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
        acc[cur.key] = cur.display_name
        return acc
    }, {})

    export default {
        name: "ComplexTable",
        filters: {
            statusFilter(status) {
                const statusMap = {
                    published: 'success',
                    draft: 'info',
                    deleted: 'danger'
                }
                return statusMap[status]
            },
            _parseTime: function (value, format) {
                return parseTime(value, format);
            },
            typeFilter(type) {
                return calendarTypeKeyValue[type]
            }
        },
        data() {
            return {
                list: null,
                total: 0,
                listLoading: true,
                listQuery: {
                    page: 1,
                    limit: 20,
                    importance: undefined,
                    title: undefined,
                    type: undefined,
                    sort: '+id'
                },
                sortOptions: [{label: 'ID Ascending', key: '+id'}, {label: 'ID Descending', key: '-id'}],
                importanceOptions: [1, 2, 3],
                calendarTypeOptions,
                showReviewer: true,
                tableKey: 1,
                statusOptions: ['published', 'draft', 'deleted'],
                dialogTitle: 'create',
                dialogFormVisible: false,
                temp: {
                    id: undefined,
                    importance: 1,
                    remark: '',
                    timestamp: new Date(),
                    title: '',
                    type: '',
                    status: 'published'
                },
                rules: {
                    type: [{required: true, message: 'type is required', trigger: 'change'}],
                    timestamp: [{type: 'date', required: true, message: 'timestamp is required', trigger: 'change'}],
                    title: [{required: true, message: 'title is required', trigger: 'blur'}]
                },
                downloadLoading: false
            }
        },
        methods: {
            async _getArticleList() {
                this.listLoading = true
                const {items, total} = await getArticleList(this.listQuery)
                setTimeout(() => {
                    this.list = items
                    this.total = total
                    this.listLoading = false
                }, 1000)
            },
            sortChange(data) {
                const {prop, order} = data
                if (prop === 'id') {
                    this.sortByID(order)
                }
            },
            sortByID(order) {
                if (order === 'ascending') {
                    this.listQuery.sort = '+id'
                } else {
                    this.listQuery.sort = '-id'
                }
                this.handleFilter()
            },
            handleFilter() {
                this.listQuery.page = 1
                this._getArticleList()
            },
            handleClose() {
                this.temp = {
                    id: undefined,
                    importance: 1,
                    remark: '',
                    timestamp: new Date(),
                    title: '',
                    type: '',
                    status: 'published'
                }
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            handleCreate() {
                this.dialogTitle = 'create'
                this.dialogFormVisible = true
            },
            handleUpdate(row) {
                this.temp = row
                this.temp.timestamp = new Date(this.temp.timestamp)
                this.dialogTitle = 'update'
                this.dialogFormVisible = true
            },
            handleUpdateList() {
                if (this.dialogTitle === 'create') {
                    this.$refs['dataForm'].validate((valid) => {
                        if (valid) {
                            // clone temp
                            const temp = cloneDeep(this.temp)
                            temp.id = Math.ceil(Math.random() * 100) + 1024 // mock a id
                            temp.author = 'vue-element-admin'
                            temp.timestamp = new Date(temp.timestamp).getTime()
                            createArticle(temp).then(message => {
                                this.list.unshift(temp)
                                this.dialogFormVisible = false
                                this.$notify({
                                    title: 'Success',
                                    message,
                                    type: 'success',
                                    duration: 2000
                                })
                            })
                        }
                    })
                } else {
                    this.$refs['dataForm'].validate((valid) => {
                        if (valid) {
                            // clone temp
                            const temp = cloneDeep(this.temp)
                            temp.timestamp = +new Date(temp.timestamp).getTime()
                            const index = this.list.findIndex(v => v.id === temp.id)
                            updateArticle(index, temp).then(message => {
                                this.list.splice(index, 1, temp)
                                this.dialogFormVisible = false
                                this.$notify({
                                    title: 'Success',
                                    message,
                                    type: 'success',
                                    duration: 2000
                                })
                            })
                        }
                    })
                }
            },
            async handleModifyStatus(row, status) {
                const message = await updateArticleStatusById(row.id, status)
                this.$message({
                    message,
                    type: 'success'
                })
                row.status = status
            },
            async handleDelete(row, index) {
                const message = await deleteArticleById(row.id)
                this.$notify({
                    title: 'Success',
                    message,
                    type: 'success',
                    duration: 2000
                })
                this.list.splice(index, 1)
                this.total -= 1
            },
            getSortClass(key) {
                const sort = this.listQuery.sort
                return sort === `+${key}` ? 'ascending' : 'descending'
            },
            formatJson(filterVal) {
                return this.list.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            },
            handleDownload() {
                this.downloadLoading = true
                import('@/utils/Export2Excel').then(excel => {
                    const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
                    const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
                    const data = this.formatJson(filterVal)
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: 'table-list'
                    })
                    this.downloadLoading = false
                })
            }
        },
        mounted() {
            this._getArticleList()
        },
        components: {Pagination},
        directives: {waves}
    }
</script>

<style scoped lang="scss">
    .el-table {
        font-size: 12px;

        .el-button {
            width: 60px;
            padding-left: 0;
            padding-right: 0;
        }
    }

    .el-link {
        font-size: 12px;
    }

    .meta-item__icon {
        display: inline-block;
    }
</style>
