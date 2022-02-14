<template>
    <div class="container">
        <split-pane split="vertical">
            <template slot="paneL">
                <div class="left"></div>
            </template>
            <template slot="paneR">
                <split-pane split="horizontal">
                    <template slot="paneL">
                        <div class="top"/>
                    </template>
                    <template slot="paneR">
                        <div class="bottom"/>
                    </template>
                </split-pane>
            </template>
        </split-pane>
    </div>
</template>

<script>
    import SplitPane from 'vue-splitpane'

    export default {
        name: "Splitpane",
        components: {
            SplitPane
        }
    }
</script>

<style scoped lang="scss">
    .container {
        height: 500px;

        .left {
            height: 100%;
            background-color: #F38181;
        }

        .top {
            height: 100%;
            background-color: #FCE38A;
        }

        .bottom {
            height: 100%;
            background-color: #95E1D3;
        }
    }
</style>
