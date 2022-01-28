<template>
    <div id="app" :data-theme="theme">
        <router-view/>
        <ThemePicker/>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import ThemePicker from "./components/ThemePicker"

    export default {
        name: 'App',
        computed: mapGetters(['theme']),
        components: {
            ThemePicker
        }
    }
</script>
