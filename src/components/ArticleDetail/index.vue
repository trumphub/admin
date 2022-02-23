<template>
    <div>
        <el-form ref="postForm" :model="postForm" :rules="rules">
            <sticky>
                <div class="sub-nav">
                    <el-dropdown trigger="click">
                        <el-button plain>
                            {{ !postForm.comment_disabled?'Comment: opened':'Comment: closed' }}
                            <i class="el-icon-caret-bottom  el-icon--right"/>
                        </el-button>
                        <el-dropdown-menu class="my-checkbox-group" slot="dropdown">
                            <el-radio-group v-model="postForm.comment_disabled">
                                <el-radio :label="true">
                                    Close comment
                                </el-radio>
                                <el-radio :label="false">
                                    Open comment
                                </el-radio>
                            </el-radio-group>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown trigger="click">
                        <el-button plain>
                            Platform ({{postForm.platforms.length}})
                            <i class="el-icon-caret-bottom  el-icon--right"/>
                        </el-button>
                        <el-dropdown-menu class="my-checkbox-group" slot="dropdown">
                            <el-checkbox-group v-model="postForm.platforms">
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
                            <el-input v-model="postForm.source_uri" placeholder="Please enter the content">
                                <template slot="prepend">
                                    Url
                                </template>
                            </el-input>
                        </el-dropdown-menu>
                    </el-dropdown>

                    <el-button v-loading="loading" type="success" @click="submitForm">
                        Publish
                    </el-button>
                    <el-button v-loading="loading" type="warning" @click="draftForm">
                        Draft
                    </el-button>
                </div>
            </sticky>
            <el-row>
                <el-col :span="24">
                    <el-form-item prop="title">
                        <MaterialInput
                                v-model="postForm.title"
                                required
                        >
                            Title
                        </MaterialInput>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label-width="60px" label="Author:">
                        <el-select
                                v-model="postForm.author"
                                :remote-method="getRemoteUserList"
                                filterable
                                default-first-option
                                remote
                                placeholder="Search user">
                            <el-option
                                    v-for="(item,index) in userListOptions"
                                    :key="item+index"
                                    :label="item"
                                    :value="item"/>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item
                            label-width="120px"
                            label="Publish Time:"
                    >
                        <el-date-picker
                                v-model="postForm.display_time"
                                type="datetime"
                                format="yyyy-MM-dd HH:mm:ss"
                                placeholder="Select date and time"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item
                            label-width="90px"
                            label="Importance:"
                    >
                        <el-rate
                                class="rate"
                                v-model="postForm.importance"
                                :max="3"
                                :colors="['#F00', '#0F0', '#00F']"
                                :low-threshold="1"
                                :high-threshold="3"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label-width="70px" label="Summary:">
                <el-input v-model="postForm.content_short" type="textarea"
                          placeholder="Please enter the content" :rows="1"/>
            </el-form-item>
            <el-form-item prop="content">
                <editor
                        :api-key="key"
                        :init="init"
                        v-model="postForm.content"
                />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {validURL} from '@/utils/validate'
    import Sticky from '@/components/Sticky'
    import MaterialInput from '@/components/MaterialInput'
    import {searchUser} from "@/api/user"

    import tinymce from 'tinymce/tinymce'
    import Editor from '@tinymce/tinymce-vue'

    import 'tinymce/plugins/image'
    import 'tinymce/themes/silver/theme'
    import 'tinymce/icons/default'
    import 'tinymce/skins/ui/oxide/skin.css';

    export default {
        name: "ArticleDetail",
        props: {
            isEdit: {
                type: Boolean,
                default: false
            }
        },
        data() {
            const validateRequire = (rule, value, callback) => {
                if (value === '') {
                    this.$message({
                        message: rule.field + '为必传项',
                        type: 'error'
                    })
                    callback(new Error(rule.field + '为必传项'))
                } else {
                    callback()
                }
            }
            const validateSourceUri = (rule, value, callback) => {
                if (value) {
                    if (validURL(value)) {
                        callback()
                    } else {
                        this.$message({
                            message: '外链url填写不正确',
                            type: 'error'
                        })
                        callback(new Error('外链url填写不正确'))
                    }
                } else {
                    callback()
                }
            }
            return {
                postForm: {
                    status: 'draft',
                    title: '', // 文章题目
                    content: '', // 文章内容
                    content_short: '', // 文章摘要
                    source_uri: '', // 文章外链
                    image_uri: '', // 文章图片
                    display_time: undefined, // 前台展示时间
                    id: undefined,
                    platforms: ['a-platform'],
                    comment_disabled: false,
                    importance: 1
                },
                platformsOptions: [
                    {key: 'a-platform', name: 'a-platform'},
                    {key: 'b-platform', name: 'b-platform'},
                    {key: 'c-platform', name: 'c-platform'}
                ],
                rules: {
                    image_uri: [{validator: validateRequire}],
                    title: [{validator: validateRequire}],
                    content: [{validator: validateRequire}],
                    source_uri: [{validator: validateSourceUri, trigger: 'blur'}]
                },
                userListOptions: [],
                loading: false,
                init: {
                    height: 500,
                    language: 'zh_CN',
                    plugins: 'image',
                    images_upload_url: process.env.VUE_APP_BASE_API + '/upload',
                    images_upload_base_path: "http://localhost:8081"
                },
                key: 'tliupoiax18eh94bmtn1onf82b6cwes3ygkpj0x2ivvrfk4i',
            }
        },
        components: {
            Sticky,
            MaterialInput,
            Editor
        },
        methods: {
            submitForm() {
            },
            draftForm() {
            },
            getRemoteUserList(query) {
                searchUser(query).then(response => {
                    this.userListOptions = response.map(i => i.name)
                })
            }
        },
        mounted() {
            tinymce.init({})
        }
    }
</script>

<style scoped lang="scss">
    .rate {
        margin-top: 10px;
    }

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
