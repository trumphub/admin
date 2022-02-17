<template>
    <div>
        <el-button type="primary" @click="dialogTableVisible = true">
            open a Drag Dialog
        </el-button>
        <el-dialog @dragDialog="handleDrag" v-drag title="Shipping address" :visible.sync="dialogTableVisible">
            <el-select ref="select" v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
            <el-table :data="gridData">
                <el-table-column property="date" label="Date" width="150"></el-table-column>
                <el-table-column property="name" label="Name" width="200"></el-table-column>
                <el-table-column property="address" label="Address"></el-table-column>
            </el-table>
        </el-dialog>
        <div>
            <el-select class="multiple-selected" v-model="value1" multiple placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-tag v-for="item of value1" :key="item" style="margin-right:15px;">
                {{ item }}
            </el-tag>
        </div>
        <el-row>
            <el-col :md="12" :sm="24" :sx="24">
                <draggable class="list-group" :list="list1" group="people">
                    <div
                            class="list-group-item"
                            v-for="(element, index) in list1"
                            :key="element.name"
                    >
                        {{ element.name }} {{ index }}
                    </div>
                </draggable>
            </el-col>
            <el-col :md="12" :sm="24" :sx="24">
                <draggable class="list-group" :list="list2" group="people">
                    <div
                            class="list-group-item"
                            v-for="(element, index) in list2"
                            :key="element.name"
                    >
                        {{ element.name }} {{ index }}
                    </div>
                </draggable>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import drag from '../../directive/drag'
    import Draggable from "vuedraggable";

    export default {
        name: "DragDialog",
        directives: {drag},
        components: {Draggable},
        methods: {
            handleDrag() {
                this.$refs.select.blur()
            }
        },
        data() {
            return {
                list1: [
                    {name: "John", id: 1},
                    {name: "Joao", id: 2},
                    {name: "Jean", id: 3},
                    {name: "Gerard", id: 4}
                ],
                list2: [
                    {name: "Juan", id: 5},
                    {name: "Edgard", id: 6},
                    {name: "Johnson", id: 7}
                ],
                dialogTableVisible: false,
                value: '选项3',
                value1: [],
                options: [
                    {value: '选项1', label: '黄金糕'},
                    {value: '选项2', label: '双皮奶'},
                    {value: '选项3', label: '蚵仔煎'},
                    {value: '选项4', label: '龙须面'}
                ],
                gridData: [{
                    date: '2016-05-02',
                    name: 'John Smith',
                    address: 'No.1518,  Jinshajiang Road, Putuo District'
                }, {
                    date: '2016-05-04',
                    name: 'John Smith',
                    address: 'No.1518,  Jinshajiang Road, Putuo District'
                }, {
                    date: '2016-05-01',
                    name: 'John Smith',
                    address: 'No.1518,  Jinshajiang Road, Putuo District'
                }, {
                    date: '2016-05-03',
                    name: 'John Smith',
                    address: 'No.1518,  Jinshajiang Road, Putuo District'
                }]
            }
        },
    }
</script>

<style scoped lang="scss">
    .multiple-selected {
        display: block;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .list-group {
        background-color: #fff;
        padding: 10px;

        .list-group-item {
            border: 1px solid #eee;
            padding: 10px;
            margin: 10px 0;
        }
    }
</style>
