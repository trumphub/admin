<template>
    <div>
        <my-count-to
                ref="example"
                class="my-count-to"
                :start-val="startVal"
                :end-val="endVal"
                :duration="duration"
                :decimals="decimals"
                :separator="separator"
                :prefix="prefix"
                :suffix="suffix"
                :autoplay="false"
        />
        <div class="operator">
            <label>
                <el-input v-model="setEndVal"/>
            </label>
            <el-button @click="start">Start</el-button>
            <el-button @click="pause">pause</el-button>
        </div>
    </div>
</template>

<script>
    import MyCountTo from 'vue-count-to'

    export default {
        name: "CountTo",
        components: {
            MyCountTo
        },
        data() {
            return {
                startVal: 0,
                setEndVal: 1000,
                duration: 1000,
                decimals: 0,
                separator: ',',
                prefix: '¥ ',
                suffix: ' rmb'
            }
        },
        methods: {
            start() {
                this.$refs.example.start()
            },
            pause() {
                this.$refs.example.pauseResume()
            }
        },
        computed: {
            endVal() {
                if (Number.isNaN(+this.setEndVal)) {
                    alert('Must be a number')
                    return 1000
                }
                return +this.setEndVal
            }
        }
    }
</script>

<style scoped lang="scss">
    .my-count-to {
        color: #F6416C;
        display: block;
        margin: 10px 0;
        text-align: center;
        font-size: 80px;
        font-weight: 500;
    }

    .operator {
        text-align: center;
    }
</style>
