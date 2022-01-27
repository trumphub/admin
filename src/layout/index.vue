<template>
    <div class="main-container">
        <Sidebar/>
        <div class="main">
            <Navbar/>
            <div class="main-body">
                <router-view/>
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
            overflow: auto;

            .main-body {
                padding: 70px 20px 20px;
            }
        }
    }
</style>
