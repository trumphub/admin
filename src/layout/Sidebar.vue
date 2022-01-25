<template>
    <el-scrollbar>
        <el-menu
                :collapse="collapse"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
        >
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"/>
                    <span slot="title">导航一</span>
                </template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
            </el-submenu>
            <el-menu-item index="2">
                <i class="el-icon-menu"/>
                <span slot="title">导航二</span>
            </el-menu-item>
        </el-menu>
    </el-scrollbar>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "Sidebar",
        computed: {
            ...mapGetters(['collapse'])
        }
    }
</script>

<style scoped>

</style>
