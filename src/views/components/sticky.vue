<template>
    <div>
        <my-sticky :sticky-top="50">
            <div class="sub-nav">
                <el-dropdown trigger="click">
                    <el-button plain>
                        Platform<i class="el-icon-caret-bottom  el-icon--right"/>
                    </el-button>
                    <el-dropdown-menu class="my-checkbox-group" slot="dropdown">
                        <el-checkbox-group v-model="platforms">
                            <el-checkbox
                                    v-for="item in platformsOptions"
                                    :key="item.key"
                                    :label="item.key"
                            >
                                {{item.name}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown trigger="click">
                    <el-button plain>
                        Link<i class="el-icon-caret-bottom  el-icon--right"/>
                    </el-button>
                    <el-dropdown-menu class="my-input-url" slot="dropdown">
                        <el-input v-model="url" placeholder="Please enter the content">
                            <template slot="prepend">
                                Url
                            </template>
                        </el-input>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-date-picker
                        v-model="time"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="Release time"/>
                <el-button type="success">
                    publish
                </el-button>
            </div>
        </my-sticky>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <my-sticky :sticky-top="200">
            <el-button type="primary"> placeholder</el-button>
        </my-sticky>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
    </div>
</template>

<script>
    import MySticky from '../../components/Sticky'

    export default {
        name: "StickyDemo",
        data() {
            return {
                platforms: ['a-platform'],
                platformsOptions: [
                    {key: 'a-platform', name: 'platformA'},
                    {key: 'b-platform', name: 'platformB'},
                    {key: 'c-platform', name: 'platformC'}
                ],
                time: '',
                url: ''
            }
        },
        components: {MySticky}
    }
</script>

<style scoped lang="scss">
    .sub-nav {
        display: flex;
        justify-content: flex-end;
        background-color: aquamarine;
    }

    .my-checkbox-group {
        padding: 10px 20px;
    }

    .my-input-url {
        padding: 0;
    }
</style>
