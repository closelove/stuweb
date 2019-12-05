<template>
    <div class="login">
        <div class="login-box">
            <!-- 通过:rules="loginFormRules"来绑定输入内容的校验规则 -->
            <el-form :rules="loginFormRules" ref="loginForm" :model="loginForm" label-position="right"
                     label-width="auto"
                     show-message>
                <span class="login-title">系统登录</span>
                <el-form-item prop="username" style="margin-top: 10px">
                    <el-input prefix-icon="el-icon-user" placeholder="请输入用户账号" type="text"
                              v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input prefix-icon="el-icon-key" placeholder="请输入登陆密码" type="password"
                              v-model="loginForm.password"></el-input>
                </el-form-item>
                <el-form-item style="width:100%;">
                    <el-button type="primary" style="width:100%;" @click="handleSubmit">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                loading: false,
                pwdType: 'password',
                // 表单验证，需要在 el-form-item 元素中增加 prop 属性
                loginFormRules: {
                    username: [
                        {required: true, message: '账号不可为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不可为空', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            handleSubmit() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                        this.$store.dispatch('user/login', this.loginForm)
                            .then(response => {
                                this.loading = false
                                let code = response.code
                                if (code === 200) {
                                    this.$router.push({path: this.redirect || '/'})
                                    this.loading = false
                                } else {
                                    this.$router.push({
                                        path: '/error',
                                        query: {data: response.message}
                                    })
                                }
                            })
                            .catch(() => {
                                this.loading = false
                            })
                    } else {
                        return false
                    }
                })
            }
        }
    }
</script>

<style scoped>

    .login {
        width: 99%;
        height: 99%;
        background-color: snow;
        position: absolute
    }

    .login-box {
        border: 1px solid #DCDFE6;
        width: 330px;
        margin: 300px auto;
        padding: 35px 35px 15px 35px;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        box-shadow: 0 0 25px #85fbf1;
    }

    .login-title {
        display: block;
        text-align: center;
        margin: 0 auto;
        color: #4fcda9;
        font-size: 30px;
        font-weight: bold;
    }
</style>
