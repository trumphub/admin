<template>
    <div class="side-bar-container">
        <el-scrollbar>
            <el-menu
                    :default-active="$route.path"
                    :collapse="collapse"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
            >
                <template v-for="route in permission_routes">
                    <div v-if="!route.hidden" :key="route.path">
                        <el-submenu
                                :index="route.path"
                                v-if="route.children&&route.children.length>1">
                            <template slot="title">
                                <i v-if="route.meta.icon.includes('el-icon')" :class="route.meta.icon"/>
                                <svg-icon v-else :icon-class="route.meta.icon"/>
                                <span slot="title">{{route.meta.title}}</span>
                            </template>
                            <el-menu-item
                                    v-for="child in route.children"
                                    :key="child.path"
                                    :index='child.path'>
                                {{child.meta.title}}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item
                                :index="route.redirect"
                                v-else-if="route.children&&route.children.length===1">
                            <i
                                    v-if="route.children[0].meta.icon.includes('el-icon')"
                                    :class="route.children[0].meta.icon"/>
                            <svg-icon v-else :icon-class="route.children[0].meta.icon"/>
                            <span slot="title">{{route.children[0].meta.title}}</span>
                        </el-menu-item>
                    </div>
                </template>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "Sidebar",
        computed: {
            ...mapGetters(['collapse', 'permission_routes'])
        }
    }
</script>

<style scoped lang="scss">
    .side-bar-container {
        height: 100%;
        width: 210px;
        background-color: #545c64;

        .el-scrollbar {
            height: 100%;
        }

        .svg-icon-container {
            display: inline-block;
            width: 24px;
            margin-right: 5px;
            text-align: center;
            vertical-align: baseline;
        }
    }
</style>
