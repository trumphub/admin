<template>
    <div class="nav">
        <Hamburger :active="!collapse" @toggleClick="toggleClick"/>
        <el-breadcrumb separator="/">
            <template v-for="(item,index) in levelList">
                <el-breadcrumb-item v-if="index+1===levelList.length" :key="item.id">
                    {{item.title}}
                </el-breadcrumb-item>
                <el-breadcrumb-item v-else :key="item.id" :to="{ path: item.path }">
                    {{item.title}}
                </el-breadcrumb-item>
            </template>
        </el-breadcrumb>
        <div></div>
    </div>
</template>

<script>
    import Hamburger from '../components/Hamburger'
    import {mapGetters} from 'vuex'

    export default {
        name: "Navbar",
        data() {
            return {
                levelList: []
            }
        },
        components: {
            Hamburger
        },
        computed: {
            ...mapGetters(['collapse'])
        },
        methods: {
            toggleClick() {
                this.$store.dispatch('app/toggleSideBar')
            }
        },
        watch: {
            $route: {
                immediate: true,
                deep: true,
                handler(route) {
                    let levelList = null
                    const pathArr = route.path.split('/')
                    pathArr.shift()
                    if (pathArr.length === 1) {
                        levelList = [{
                            title: route.meta.title,
                            id: 0
                        }]
                    } else {
                        levelList = route.matched.map((item, index) => {
                            const res = {}
                            res.title = item.meta.title
                            res.id = index
                            if (index + 1 !== pathArr.length) {
                                res.path = item.path
                            }
                            return res
                        })
                    }
                    this.levelList = levelList
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .nav {
        position: fixed;
        display: flex;
        height: 50px;
        width: 100%;
        border-bottom: 1px solid #d8dce5;
        background-color: #ffffff;

        .el-breadcrumb {
            line-height: 50px;
        }
    }
</style>
