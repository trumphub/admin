<template>
    <switch-roles @change="handleRolesChange"/>
</template>

<script>
    import SwitchRoles from "./SwitchRoles";

    export default {
        name: "Page",
        components: {SwitchRoles},
        methods: {
            handleRolesChange() {
                this.$router.push({path: '/'})
            }
        }
    }
</script>
