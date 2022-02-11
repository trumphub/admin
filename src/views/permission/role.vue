<template>
    <div>
        <el-button type="primary" @click="handleAddRole">New Role</el-button>
        <el-table
                border
                :data="rolesList"
        >
            <el-table-column
                    width="200"
                    align="center"
                    prop="key"
                    label="Role Key"/>
            <el-table-column
                    width="200"
                    align="center"
                    prop="name"
                    label="Role Name"/>
            <el-table-column
                    prop="description"
                    label="Description"/>
            <el-table-column label="Operations" align="center" width="300">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.$index, scope.row)">
                        编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {getRoles} from "../../api/role";

    export default {
        name: "Role",
        data() {
            return {
                rolesList: []
            }
        },
        mounted() {
            this.getRoles()
        },
        methods: {
            handleAddRole() {
            },
            handleEdit() {
            },
            handleDelete() {
            },
            async getRoles() {
                this.rolesList = await getRoles()
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-table {
        margin-top: 20px;
    }
</style>
