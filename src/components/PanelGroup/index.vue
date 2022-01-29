<template>
    <el-row :gutter="40">
        <el-col :xs="12" :sm="12" :md="12" :lg="6">
            <div class="grid-content" @click="handleClick('peoples')">
                <div class="left">
                    <svg-icon icon-class="peoples"/>
                </div>
                <div class="right">
                    <span class="title">New Visits</span>
                    <countTo
                            class="count"
                            :startVal='0'
                            :endVal='1000'
                            :duration='3000'
                    />
                </div>
            </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="6">
            <div class="grid-content" @click="handleClick('message')">
                <div class="left">
                    <svg-icon icon-class="message"/>
                </div>
                <div class="right">
                    <span class="title">Messages</span>
                    <countTo
                            class="count"
                            :startVal='0'
                            :endVal='1000'
                            :duration='3000'
                    />
                </div>
            </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="6">
            <div class="grid-content m-top" @click="handleClick('money')">
                <div class="left">
                    <svg-icon icon-class="money"/>
                </div>
                <div class="right">
                    <span class="title">Purchases</span>
                    <countTo
                            class="count"
                            :startVal='0'
                            :endVal='1000'
                            :duration='3000'
                    />
                </div>
            </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="6">
            <div class="grid-content m-top" @click="handleClick('shopping')">
                <div class="left">
                    <svg-icon icon-class="shopping"/>
                </div>
                <div class="right">
                    <span class="title">Shoppings</span>
                    <countTo
                            class="count"
                            :startVal='0'
                            :endVal='1000'
                            :duration='3000'
                    />
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import countTo from 'vue-count-to'

    export default {
        name: "PanelGroup",
        components: {countTo},
        methods: {
            handleClick(type) {
                this.$emit('handleClick', type)
            }
        }
    }
</script>

<style scoped lang="scss">
    .grid-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 108px;
        cursor: pointer;
        background-color: #fff;
        box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);

        .left {
            width: 80px;
            height: 80px;
            margin-left: 14px;
            display: flex;
            transition: background-color .3s;

            .svg-icon-container {
                font-size: 48px;
                height: 48px;
                margin: auto;
                color: teal;
            }

            &:hover {
                background-color: teal;

                .svg-icon-container {
                    color: #fff;
                }
            }
        }

        .right {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 108px;
            padding-right: 26px;
            font-weight: bold;
            line-height: 30px;

            .title {
                font-size: 16px;
                color: rgba(0, 0, 0, 0.45);
            }

            .count {
                font-size: 20px;
                color: rgb(102, 102, 102);
            }
        }
    }

    @media screen and (max-width: 1200px) {
        .m-top {
            margin-top: 20px;
        }
    }

    @media screen and (max-width: 768px) {
        .grid-content {
            justify-content: center;

            .left {
                margin-left: 0;
                width: 100%;
                height: 100%;
            }

            .right {
                display: none;
            }
        }
    }
</style>
