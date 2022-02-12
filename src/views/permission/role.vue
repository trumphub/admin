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
                            @click="handleEdit(scope.row)">
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
        <el-dialog @close="handleClose" :title="dialogTitle" :visible.sync="dialogFormVisible">
            <el-form :model="role" label-position="left" label-width="100px">
                <el-form-item label="Name">
                    <el-input v-model="role.name" placeholder="Role Name"/>
                </el-form-item>
                <el-form-item label="Description">
                    <el-input type="textarea" v-model="role.description" placeholder="Role Description"/>
                </el-form-item>
                <el-form-item label="Menus">
                    <el-tree
                            ref="tree"
                            :check-strictly="checkStrictly"
                            :data="routesData"
                            show-checkbox
                            node-key="path"
                            :props="defaultProps">
                    </el-tree>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleConfirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getRoles, getRoutes, addRole, updateRole, deleteRole} from "../../api/role";
    import cloneDeep from 'lodash/cloneDeep'

    export default {
        name: "Role",
        data() {
            return {
                rolesList: [],
                dialogFormVisible: false,
                dialogTitle: 'New Role',
                role: {
                    key: '',
                    name: '',
                    description: '',
                    routes: []
                },
                defaultProps: {
                    children: 'children',
                    label: 'title'
                },
                routesData: [],
                checkStrictly: false
            }
        },
        mounted() {
            this.getRoutes()
            this.getRoles()
        },
        methods: {
            handleAddRole() {
                this.dialogTitle = 'New Role'
                this.dialogFormVisible = true
            },
            handleEdit(role) {
                this.dialogTitle = 'Edit Role'
                this.dialogFormVisible = true
                this.checkStrictly = true
                this.role = cloneDeep(role)
                this.$nextTick(() => {
                    this.$refs.tree.setCheckedNodes(this.generateKeys(this.role.routes))
                    this.checkStrictly = false
                })
            },
            handleDelete(index, role) {
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const message = await deleteRole(role.key)
                    this.$message({
                        message,
                        type: 'success'
                    })
                    this.rolesList.splice(index, 1)
                }).catch(() => {

                })
            },
            async getRoles() {
                this.rolesList = await getRoles()
            },
            async getRoutes() {
                this.routesData = await getRoutes()
            },
            generateRoutes(routes, keys) {
                const res = []
                for (let i = 0; i < routes.length; i++) {
                    const route = cloneDeep(routes[i])
                    if (route.children) {
                        route.children = this.generateRoutes(route.children, keys)
                        if (route.children.length) {
                            res.push(route)
                        }
                    } else {
                        if (keys.includes(route.path)) {
                            res.push(route)
                        }
                    }
                }
                return res
            },
            generateKeys(routes) {
                const keys = []
                for (let i = 0; i < routes.length; i++) {
                    const route = cloneDeep(routes[i])
                    if (route.children) {
                        keys.push(route, ...route.children)
                    } else {
                        keys.push(route)
                    }
                }
                return keys
            },
            handleClose() {
                this.$refs.tree.setCheckedNodes([])
                this.role = {
                    key: '',
                    name: '',
                    description: '',
                    routes: []
                }
            },
            async handleConfirm() {
                let message
                const role = cloneDeep(this.role)
                role.routes = this.generateRoutes(this.routesData, this.$refs.tree.getCheckedKeys())
                if (this.dialogTitle === 'New Role') {
                    role.key = Date.now()
                    message = await addRole(role)
                    this.rolesList.push(role)
                } else {
                    message = await updateRole(role)
                    const index = this.rolesList.findIndex(item => item.key === role.key)
                    this.rolesList.splice(index, 1, role)
                }
                this.$message({
                    message,
                    type: 'success'
                })
                this.dialogFormVisible = false
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-table {
        margin-top: 20px;
    }
</style>
