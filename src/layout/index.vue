<template>
    <div class="main-container">
        <Sidebar/>
        <div class="main">

        </div>
    </div>
</template>

<script>
    import Sidebar from './Sidebar'

    export default {
        name: "Layout",
        components: {
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
            background-color: rebeccapurple;
        }
    }
</style>
