<template>
    <div class="main-container">
        <Sidebar/>
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
        height: 100%;
        background-color: aliceblue;
    }
</style>
