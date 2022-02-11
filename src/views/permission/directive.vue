<template>
    <div>
        <switch-roles @change="handleRolesChange"/>
        <div :key="key" class="directives">
            <span v-permission="['admin']">
                Admin 用户可见
            </span>
            <span v-permission="['editor']">
                Editor 用户可见
            </span>
        </div>
        <el-tabs :key="'checkPermission'+key" type="border-card">
            <el-tab-pane v-if="checkPermission(['admin'],this)" label="用户管理">用户管理</el-tab-pane>
            <el-tab-pane v-if="checkPermission(['editor'],this)" label="配置管理">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import SwitchRoles from "./SwitchRoles";
    import {mapGetters} from 'vuex'

    export default {
        name: "Directive",
        components: {SwitchRoles},
        data() {
            return {
                key: 1
            }
        },
        computed: {
            ...mapGetters(['info'])
        },
        directives: {
            permission: {
                inserted(el, {value}, {context}) {
                    if (!context.checkPermission(value, context)) {
                        el.parentNode && el.parentNode.removeChild(el)
                    }
                },
                update(el, {value}, {context}) {
                    if (!context.checkPermission(value, context)) {
                        el.parentNode && el.parentNode.removeChild(el)
                    }
                }
            }
        },
        methods: {
            checkPermission(value, context) {
                return context.info.roles.some(role => {
                    return value.includes(role)
                })
            },
            handleRolesChange() {
                this.key += 1
            }
        }
    }
</script>

<style scoped lang="scss">
    .directives {
        line-height: 60px;
        font-size: 30px;
    }
</style>
