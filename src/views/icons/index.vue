<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane label="Icons">
                <div class="grid">
                    <div v-for="item in svgIcons" :key="item.id" @click="handleClipboard(item.tooltip,$event)">
                        <el-tooltip effect="dark" :content="item.tooltip" placement="top">
                            <div class="icon-item">
                                <svg-icon :icon-class="item.iconName"/>
                                <span>{{ item.iconName }}</span>
                            </div>
                        </el-tooltip>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="Element-UI Icons">
                <div class="grid">
                    <div v-for="item in elementIcons" :key="item.id" @click="handleClipboard(item.tooltip,$event)">
                        <el-tooltip effect="dark" :content="item.tooltip" placement="top">
                            <div class="icon-item">
                                <i :class="`el-icon-${item.iconName}`"/>
                                <span>{{ item.iconName }}</span>
                            </div>
                        </el-tooltip>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import svgIcons from './svg-icons'
    import elementIcons from './element-icons'
    import handleClipboard from '@/utils/clipboard'

    export default {
        name: "Icons",
        data() {
            return {
                svgIcons,
                elementIcons
            }
        },
        methods: {
            handleClipboard
        },
    }
</script>

<style scoped lang="scss">
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

        .icon-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 85px;
            font-size: 16px;
            cursor: pointer;

            .svg-icon-container, i {
                margin-bottom: 10px;
            }
        }
    }
</style>
