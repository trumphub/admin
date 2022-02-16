<template>
    <div>
        <el-row>
            <el-card class="box-card top">
                <div slot="header">
                    <span>Buttons</span>
                </div>
                <el-row>
                    <el-col :lg="4" :md="8" :sm="12" :xs="24">
                        <button class="pan-btn">
                            Icons
                        </button>
                    </el-col>
                    <el-col :lg="4" :md="8" :sm="12" :xs="24">
                        <button class="pan-btn">
                            Icons
                        </button>
                    </el-col>
                    <el-col :lg="4" :md="8" :sm="12" :xs="24">
                        <button class="pan-btn">
                            Icons
                        </button>
                    </el-col>
                    <el-col :lg="4" :md="8" :sm="12" :xs="24">
                        <button class="pan-btn">
                            Icons
                        </button>
                    </el-col>
                    <el-col :lg="4" :md="8" :sm="12" :xs="24">
                        <button class="pan-btn">
                            Icons
                        </button>
                    </el-col>
                    <el-col :lg="4" :md="8" :sm="12" :xs="24">
                        <button class="pan-btn">
                            Icons
                        </button>
                    </el-col>
                </el-row>
            </el-card>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px">
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header">
                        <span>Material Design 的input</span>
                    </div>
                    <div>
                        <el-form :model="demo" :rules="demoRules">
                            <el-form-item prop="title">
                                <material-input v-model="demo.title" icon="el-icon-search"
                                                placeholder="输入标题">
                                    标题
                                </material-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header">
                        <span>图片hover效果</span>
                    </div>
                    <div>
                        <div class="avatar-wrapper">
                            <img src="https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191" alt="">
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header">
                        <span>水波纹 waves v-directive</span>
                    </div>
                    <div>
                        <el-button v-waves type="primary">
                            水波纹效果
                        </el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import MaterialInput from '../../components/MaterialInput'
    import waves from '../../directive/waves'

    export default {
        name: "ComponentMixin",
        data() {
            const validate = (rule, value, callback) => {
                if (value.length !== 6) {
                    callback(new Error('请输入六个字符'))
                } else {
                    callback()
                }
            }
            return {
                demo: {title: ''},
                demoRules: {
                    title: [{required: true, trigger: 'change', validator: validate}]
                }
            }
        },
        components: {
            MaterialInput
        },
        directives: {waves}
    }
</script>

<style scoped lang="scss">
    .pan-btn {
        position: relative;
        display: inline-block;
        padding: 14px 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 8px;
        border: none;
        outline: none;
        transition: 600ms ease all;
        cursor: pointer;
        background-color: #3A71A8;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 0;
            opacity: 0;
            height: 2px;
            background-color: #3A71A8;
            transition: 400ms ease all;
        }

        &::after {
            opacity: 0;
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 0;
            height: 2px;
            background-color: #3A71A8;
            transition: 400ms ease all;
        }

        &:hover {
            color: #3A71A8;
            background-color: #fff;

            &::before,
            &::after {
                width: 100%;
                opacity: 1;
                transition: 600ms ease all;
            }
        }
    }

    ::v-deep .top .el-card__body {
        text-align: center;
    }

    .avatar-wrapper {
        position: relative;
        width: 96px;
        height: 96px;
        border: 2px solid #aaa;
        border-radius: 50%;
        margin-top: 20px;

        &:hover img {
            transform: rotate(-90deg);
        }

        img {
            position: absolute;
            width: 100px;
            height: 100px;
            left: -2px;
            top: -2px;
            border-radius: 50%;
            transform-origin: right 25px;
            transition: transform .3s;
        }
    }

    @media screen and (max-width: 1200px) {
        .pan-btn {
            margin-bottom: 20px;
        }
        ::v-deep .top .el-card__body {
            padding: 20px 20px 0;
        }
    }
</style>
