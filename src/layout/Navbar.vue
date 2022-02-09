<template>
    <div class="nav" :class="{withAnimation}" :style="{width:_width}">
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
        <el-dropdown @command="handleCommand">
            <img :src="info.avatar" alt="avatar">
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">
                    注销
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    import Hamburger from '../components/Hamburger'
    import {mapGetters} from 'vuex'

    export default {
        name: "Navbar",
        data() {
            return {
                levelList: [],
                withAnimation: true
            }
        },
        components: {
            Hamburger
        },
        computed: {
            ...mapGetters(['collapse', 'info']),
            _width() {
                return `calc(100vw - ${this.collapse ? 64 : 210}px)`
            }
        },
        methods: {
            toggleClick() {
                this.withAnimation = true
                this.$store.dispatch('app/toggleSideBar')
            },
            resize() {
                this.withAnimation = false
            },
            async handleCommand(command) {
                if (command === 'logout') {
                    await this.$store.dispatch('user/logout')
                    await this.$router.push({
                        path: '/login', query: {
                            redirect: this.$route.fullPath
                        }
                    })
                }
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
                    if (pathArr.length === 1 || pathArr[1] === 'index') {
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
        },
        mounted() {
            window.addEventListener('resize', this.resize)
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.resize)
        }
    }
</script>

<style scoped lang="scss">
    .nav {
        position: fixed;
        z-index: 9;
        display: flex;
        top: 0;
        right: 0;
        height: 50px;
        border-bottom: 1px solid #d8dce5;
        @include theme(border-color);
        @include theme(background-color);
        @include theme(color);

        &.withAnimation {
            transition: width .3s;
        }

        .el-breadcrumb {
            flex: 1;
            line-height: 50px;
        }

        img {
            cursor: pointer;
            width: 50px;
            height: 50px;
        }
    }
</style>
