<template>
    <component v-if="this.info.roles" :is="currentComponent"/>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Admin from './admin'
    import Editor from './editor'

    export default {
        name: "Dashboard",
        computed: {
            ...mapGetters(['info']),
            currentComponent() {
                return this.info.roles?.includes('admin')
                    ? 'Admin' : 'Editor'
            }
        },
        components: {
            Admin,
            Editor
        }
    }
</script>

<style scoped>

</style>
