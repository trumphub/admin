<template>
    <div>
        <div>
            <label>
                <textarea ref="textarea"></textarea>
            </label>
        </div>
        <div class="content" v-show="!!content">
            <pre>{{content}}</pre>
        </div>
    </div>
</template>

<script>
    import CodeMirror from 'codemirror'
    import 'codemirror/addon/lint/lint.css'
    import 'codemirror/lib/codemirror.css'
    import 'codemirror/theme/rubyblue.css'

    require('script-loader!jsonlint')
    import 'codemirror/mode/javascript/javascript'
    import 'codemirror/addon/lint/lint'
    import 'codemirror/addon/lint/json-lint'

    export default {
        name: "JsonEditor",
        data() {
            return {
                content: ""
            }
        },
        mounted() {
            this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
                lineNumbers: true,
                mode: 'application/json',
                theme: 'rubyblue',
                lint: true
            })
            this.jsonEditor.on('change', cm => {
                this.content = cm.getValue()
            })
        }
    }
</script>

<style scoped lang="scss">
    .content {
        background-color: #fff;
        padding: 20px;
        margin-top: 20px;

        pre {
            font-family: "Courier New", serif;
            color: #F08047;
        }
    }
</style>
