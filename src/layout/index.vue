<template>
    <div class="main-container">
        <Sidebar/>
        <div class="main">
            <Navbar/>
            <div class="main-body">
                <transition name="fade" mode="out-in">
                    <keep-alive>
                        <router-view/>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import Sidebar from './Sidebar'
    import Navbar from "./Navbar"

    export default {
        name: "Layout",
        components: {
            Navbar,
            Sidebar
        }
    }
</script>

<style lang="scss" scoped>
    .main-container {
        display: flex;
        height: 100%;

        .main {
            flex: 1;
            background-color: #f0f2f5;
            overflow-x: hidden;
            overflow-y: auto;

            .main-body {
                padding: 70px 20px 20px;
            }
        }
    }
</style>
