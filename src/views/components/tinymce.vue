<template>
    <div>
        <editor
                :api-key="key"
                :init="init"
                v-model="content"
        />
    </div>
</template>

<script>
    import tinymce from 'tinymce/tinymce'
    import Editor from '@tinymce/tinymce-vue'

    import 'tinymce/plugins/image'
    import 'tinymce/themes/silver/theme'
    import 'tinymce/icons/default'
    import 'tinymce/skins/ui/oxide/skin.css';

    export default {
        name: "Tinymce",
        data() {
            return {
                init: {
                    height: 500,
                    language: 'zh_CN',
                    plugins: 'image',
                    images_upload_url: process.env.VUE_APP_BASE_API + '/upload'
                },
                key: 'tliupoiax18eh94bmtn1onf82b6cwes3ygkpj0x2ivvrfk4i',
                content: ''
            }
        },
        components: {Editor},
        created() {
            tinymce.init({})
        }
    }
</script>

<style scoped lang="scss">

</style>
