<template>
    <div>
        <editor
                class="editor"
                ref="editor"
                @change="onEditorChange"
                :options="editorOptions"
                previewStyle="tab"
        />
        <viewer v-show="showViewer" class="viewer" ref="viewer"/>
    </div>
</template>

<script>
    import '@toast-ui/editor/dist/toastui-editor.css';
    import '@toast-ui/editor/dist/toastui-editor-viewer.css';
    import '@toast-ui/editor/dist/i18n/zh-cn';
    import {Editor, Viewer} from '@toast-ui/vue-editor';

    export default {
        name: "Markdown",
        components: {
            Editor,
            Viewer
        },
        data() {
            return {
                editorOptions: {
                    language: 'zh-CN',
                    usageStatistics: false
                },
                showViewer: false
            }
        },
        methods: {
            onEditorChange() {
                if (`<p><br class="ProseMirror-trailingBreak"></p>` === this.getHTML()) {
                    this.showViewer && (this.showViewer = false)
                } else {
                    !this.showViewer && (this.showViewer = true)
                }
                this.$refs.viewer.invoke('setMarkdown', this.getHTML())
            },
            getHTML() {
                return this.$refs.editor.invoke('getHTML');
            }
        }
    }
</script>

<style scoped lang="scss">
    .editor, .viewer {
        background-color: #fff;
    }

    .viewer {
        margin-top: 20px;
        padding: 20px;
    }
</style>
