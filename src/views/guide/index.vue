<template>
    <div>
        <el-button icon="el-icon-question" type="primary" @click.prevent.stop="guide">
            Show Guide
        </el-button>
    </div>
</template>

<script>
    import Driver from 'driver.js'
    import 'driver.js/dist/driver.min.css'
    import steps from './steps'

    export default {
        name: "Guide",
        data() {
            return {
                driver: null
            }
        },
        methods: {
            guide() {
                this.driver.defineSteps(steps)
                this.driver.start()
            }
        },
        mounted() {
            this.driver = new Driver()
        }
    }
</script>

<style scoped lang="scss">

</style>
