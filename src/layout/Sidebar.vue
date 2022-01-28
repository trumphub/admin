<template>
    <div class="side-bar-container" :class="{close:collapse}">
        <el-scrollbar>
            <el-menu
                    :default-active="$route.path"
                    :collapse="collapse"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :collapse-transition="false"
            >
                <template v-for="route in permission_routes">
                    <div v-if="!route.hidden" :key="route.path">
                        <el-submenu
                                :index="route.path"
                                v-if="route.children&&route.children.length>1">
                            <template slot="title">
                                <i v-if="route.meta.icon.includes('el-icon')" :class="route.meta.icon"/>
                                <svg-icon v-else :icon-class="route.meta.icon"/>
                                <span slot="title" v-show="!collapse">{{route.meta.title}}</span>
                            </template>
                            <router-link
                                    v-for="child in route.children"
                                    :key="child.path"
                                    :to="route.path+'/'+child.path">
                                <el-menu-item :index="route.path+'/'+child.path">
                                    {{child.meta.title}}
                                </el-menu-item>
                            </router-link>
                        </el-submenu>
                        <router-link
                                :to="route.path"
                                v-else-if="route.children&&route.children.length===1">
                            <el-menu-item :index="route.redirect">
                                <i
                                        v-if="route.children[0].meta.icon.includes('el-icon')"
                                        :class="route.children[0].meta.icon"/>
                                <svg-icon v-else :icon-class="route.children[0].meta.icon"/>
                                <span slot="title">{{route.children[0].meta.title}}</span>
                            </el-menu-item>
                        </router-link>
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
        transition: width .3s;

        &.close {
            width: 64px;
        }

        a {
            display: block;
            text-decoration: none;
        }

        li.is-active {
            background-color: #000 !important;
        }

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
