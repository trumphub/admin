<template>
    <div>
        <el-checkbox-group v-model="checkboxVal">
            <el-checkbox label="apple">
                apple
            </el-checkbox>
            <el-checkbox label="banana">
                banana
            </el-checkbox>
            <el-checkbox label="orange">
                orange
            </el-checkbox>
        </el-checkbox-group>
        <el-table :data="tableData" border>
            <el-table-column prop="name" label="fruitName"/>
            <el-table-column v-for="fruit in formThead" :key="fruit" :label="fruit">
                <template slot-scope="scope">
                    {{ scope.row[fruit] }}
                </template>
            </el-table-column>
        </el-table>
        <hr>
        <el-table :data="tableData" border ref="dragTable" row-key="id">
            <el-table-column label="fruitName">
                <template slot-scope="{row}">
                    <div class="edit-wrapper" v-if="row.edit">
                        <el-input v-model="item" size="small"/>
                        <el-button
                                size="small"
                                icon="el-icon-refresh"
                                type="warning"
                                @click="cancelEdit(row)"
                        >
                            cancel
                        </el-button>
                    </div>
                    <span v-else>{{ row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column v-for="fruit in checkboxVal" :key="fruit" :label="fruit">
                <template slot-scope="scope">
                    {{ scope.row[fruit] }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="Actions" width="120">
                <template slot-scope="{row}">
                    <el-button
                            v-if="row.edit"
                            type="success"
                            size="small"
                            icon="el-icon-circle-check-outline"
                            @click="confirmEdit(row)"
                    >
                        Ok
                    </el-button>
                    <el-button
                            v-else
                            type="primary"
                            size="small"
                            icon="el-icon-edit"
                            @click="showEdit(row)"
                    >
                        Edit
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import Sortable from 'sortablejs';

    const formTheadOptions = ['apple', 'banana', 'orange']

    export default {
        name: "DynamicTable",
        data() {
            return {
                tableData: [
                    {
                        id: 1,
                        name: 'fruit-1',
                        apple: 'apple-10',
                        banana: 'banana-10',
                        orange: 'orange-10',
                        edit: false
                    },
                    {
                        id: 2,
                        name: 'fruit-2',
                        apple: 'apple-20',
                        banana: 'banana-20',
                        orange: 'orange-20',
                        edit: false
                    }
                ],
                checkboxVal: [],
                item: ''
            }
        },
        mounted() {
            this.$nextTick(() => {
                const el = this.$refs.dragTable.$el
                    .querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
                Sortable.create(el, {
                    setData: function (dataTransfer) {
                        // Detail see : https://github.com/RubaXa/Sortable/issues/1012
                        dataTransfer.setData('Text', '')
                    },
                    onEnd: evt => {
                        const targetRow = this.tableData.splice(evt.oldIndex, 1)[0]
                        this.tableData.splice(evt.newIndex, 0, targetRow)
                    }
                });
            })
        },
        methods: {
            confirmEdit(row) {
                row.edit = !row.edit
                row.name = this.item
                // reset item
                this.item = ''
                this.$message({
                    message: 'The title has been edited',
                    type: 'success'
                })
            },
            cancelEdit(row) {
                row.edit = !row.edit
                // reset item
                this.item = ''
                this.$message({
                    message: 'The title has been restored to the original value',
                    type: 'warning'
                })
            },
            showEdit(row) {
                row.edit = !row.edit
                // copy row
                this.item = row.name
            }
        },
        computed: {
            formThead() {
                return formTheadOptions.filter(item => this.checkboxVal.indexOf(item) !== -1)
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-checkbox-group {
        margin-bottom: 20px;
    }

    hr {
        height: 10px;
        background-color: $--color-primary;
    }

    .edit-wrapper {
        display: flex;
        padding: 0 10px;

        .el-input {
            margin-right: 10px;
        }
    }
</style>
