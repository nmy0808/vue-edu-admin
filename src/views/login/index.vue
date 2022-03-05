<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          autocomplete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <el-form-item v-if="inputType === 'reg'" prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="repasswordType"
          ref="repassword"
          v-model="loginForm.repassword"
          :type="repasswordType"
          placeholder="确认密码"
          name="password"
          tabindex="2"
          autocomplete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showRePwd">
          <svg-icon
            :icon-class="repasswordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
      >{{ inputType === 'reg' ? '注册':'登录' }}</el-button>

      <div style="position: relative">
        <div class="tips">
          <span>Username : admin</span>
          <span>Password : 111111</span>
        </div>
        <div class="tips">
          <span style="margin-right: 18px">Username : editor</span>
          <span>Password : any</span>
        </div>
        <el-button
          class="thirdparty-button"
          type=""
          @click="handleToggleInputType"
        >切换为{{ inputType === 'login'?'注册':'登录' }}</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { reg } from '@/api/user'

export default {
  name: 'Login',
  components: { },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('密码不能小于3位'))
      } else {
        callback()
      }
    }
    return {
      inputType: 'login',
      loginForm: {
        username: '',
        password: '',
        repassword: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '用户名不能为空' }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        repassword: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      passwordType: 'password',
      repasswordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    handleToggleInputType() {
      if (this.inputType === 'reg') {
        this.inputType = 'login'
      } else {
        this.inputType = 'reg'
      }
      this.$refs['loginForm'].resetFields()
      Object.assign(this.$data.loginForm, this.$options.data().loginForm)
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    showRePwd() {
      if (this.repasswordType === 'password') {
        this.repasswordType = ''
      } else {
        this.repasswordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.repassword.focus()
      })
    },
    handleLogin() {
      if (this.inputType === 'reg' && this.loginForm.password !== this.loginForm.repassword) {
        this.$message({
          message: '两次密码不相同',
          type: 'error'
        })
        return
      }
      this.$refs.loginForm.validate(async(valid) => {
        if (valid) {
          this.loading = true
          // 判断: 注册
          if (this.inputType === 'reg') {
            const params = {}
            params.username = this.loginForm.username
            params.password = this.loginForm.password
            params.repassword = this.loginForm.repassword
            await reg(params)
            this.loading = false
            this.handleToggleInputType()
            this.$message({
              message: '注册成功',
              type: 'success'
            })
          } else {
            this.$store
              .dispatch('user/login', this.loginForm)
              .then(() => {
                this.$router.push({
                  path: '/school_select'
                })
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          }
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
