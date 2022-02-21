<template>
    <div style="margin-top: 20px">
        <el-pagination
                :background="true"
                :current-page.sync="currentPage"
                :page-size.sync="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :page-sizes="[10, 20, 30, 50]"
                :total="total"
                v-bind="$attrs"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
        />
    </div>
</template>

<script>
    import {scrollTo} from "@/utils/scroll-to";

    export default {
        name: "Pagination",
        props: {
            total: {
                required: true,
                type: Number
            },
            page: {
                type: Number,
                default: 1
            },
            limit: {
                type: Number,
                default: 20
            }

        },
        methods: {
            handleSizeChange() {
                this.$emit('pagination')
                scrollTo(0, 800)
            },
            handleCurrentChange() {
                this.$emit('pagination')
                scrollTo(0, 800)
            }
        },
        computed: {
            currentPage: {
                get() {
                    return this.page
                },
                set(val) {
                    this.$emit('update:page', val)
                }
            },
            pageSize: {
                get() {
                    return this.limit
                },
                set(val) {
                    this.$emit('update:limit', val)
                }
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
