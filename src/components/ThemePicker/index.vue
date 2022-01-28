<template>
    <div class="color-picker">
        <el-switch
                :value="themeBool" @change="changeTheme">
        </el-switch>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "ThemePicker",
        computed: {
            ...mapGetters(['theme']),
            themeBool() {
                return this.theme === 'light-theme';
            }
        },
        methods: {
            changeTheme(val) {
                const theme = val ? 'light-theme' : 'dark-theme'
                this.$store.commit('app/SET_THEME', theme)
            }
        }
    }
</script>

<style scoped lang="scss">
    .color-picker {
        position: fixed;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
    }
</style>
