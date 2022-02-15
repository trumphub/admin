<template>
    <div>
        <vue2-dropzone ref="dropzone" id="dropzone" :options="options"/>
        <el-button type="primary" @click="getUploadingFiles">getUploadingFiles</el-button>
    </div>
</template>

<script>
    import Vue2Dropzone from 'vue2-dropzone'
    import 'vue2-dropzone/dist/vue2Dropzone.min.css'

    export default {
        name: "Dropzone",
        data() {
            return {
                options: {
                    url: process.env.VUE_APP_BASE_API + '/upload',
                    dictDefaultMessage: '上传图片',
                    addRemoveLinks: true,
                    dictRemoveFile: '删除图片',
                    dictRemoveFileConfirmation: "确认删除"
                }
            }
        },
        components: {
            Vue2Dropzone
        },
        methods: {
            getUploadingFiles() {
                const files = this.$refs.dropzone.getAcceptedFiles()
                console.log(files)
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-button {
        margin-top: 20px;
    }
</style>
