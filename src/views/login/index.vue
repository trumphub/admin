<template>
    <div class="login-container">
        <h1>登录页面</h1>
        <el-form
                ref="loginForm"
                :model="loginForm"
                :rules="loginRules"
        >
            <el-form-item prop="username">
                <el-input
                        type="text"
                        v-model="loginForm.username"
                        autocomplete="off"
                >
                    <svg-icon slot="prefix" icon-class="user"/>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                        ref="password"
                        :type="passwordType"
                        v-model="loginForm.password"
                        autocomplete="off"
                >
                    <svg-icon slot="prefix" icon-class="password"/>
                    <svg-icon
                            @click.native="togglePassword"
                            slot="suffix"
                            :icon-class="passwordType==='password'?'eye':'eye-open'"
                    />
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                        :loading="loading"
                        type="primary"
                        @click="handleLogin"
                >
                    登录
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {validUsername} from "../../utils/validate"

    export default {
        name: "Login",
        data() {
            const validateUsername = (rule, value, callback) => {
                if (!validUsername(value)) {
                    callback(new Error('用户名错误'))
                } else {
                    callback()
                }
            }
            const validatePassword = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('密码至少为六位数'))
                } else {
                    callback()
                }
            }
            return {
                loading: false,
                passwordType: 'password',
                loginForm: {
                    username: '',
                    password: ''
                },
                loginRules: {
                    username: [
                        {required: true, validator: validateUsername, trigger: 'blur'}
                    ],
                    password: [
                        {required: true, validator: validatePassword, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            handleLogin() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.loading = true
                        this.$store.dispatch('user/login', this.loginForm)
                            .then(() => {
                                this.loading = false
                                this.$router.push(
                                    this.$route.query.redirect || '/'
                                )
                            })
                            .catch(() => {
                                this.loading = false
                            })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            togglePassword() {
                if (this.passwordType === 'password') {
                    this.passwordType = 'text'
                } else {
                    this.passwordType = 'password'
                }
                this.$nextTick(this.$refs.password.focus)
            }
        }
    }
</script>

<style scoped lang="scss">
    .login-container {
        height: 100%;
        @include theme(background-color);
        @include clear-fix;

        h1 {
            margin: 200px 0 40px;
            font-size: 26px;
            text-align: center;
            @include theme(color);
        }

        .el-form {
            margin: auto;
            width: 450px;
        }

        .el-button {
            width: 100%;
        }

        .svg-icon-container {
            width: 50px;
            font-size: 12px;
            @include theme('color');
        }
    }
</style>
