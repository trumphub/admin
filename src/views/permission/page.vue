<template>
    <div>
        <el-radio-group v-model="role">
            <el-radio-button label="editor"></el-radio-button>
            <el-radio-button label="admin"></el-radio-button>
        </el-radio-group>
    </div>
</template>

<script>
    export default {
        name: "Page",
        computed: {
            role: {
                get() {
                    return this.$store.getters.info.roles[0]
                },
                set(role) {
                    this.$store.dispatch('user/changeRoles', role).then(() => {
                        this.$router.push({path: '/'})
                    })
                }
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
