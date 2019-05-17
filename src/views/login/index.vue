<template>
  <div class="app-container">
    <div class="loginForm">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>用户登录</span>
          <el-button style="float: right; padding: 3px 0" @click="navTo('/register')" type="text">注册</el-button>
        </div>
        <div>
          <el-form :model="signinForm" :rules="rules" ref="signinForm">
            <el-form-item prop="username">
              <el-input
                prefix-icon="el-icon-user-solid"
                v-model="signinForm.username"
                placeholder="请输入用户名"
                autocomplete="off"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="signinForm.password"
                prefix-icon="el-icon-lock"
                type="password"
                placeholder="请输入密码"
                clearable
                autocomplete="off"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                style="width:100%"
                :loading="loading"
                @click="userSignin"
                type="primary"
              >登 录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Signin } from "@/api";
import { SigninForm, TokenObj } from "../../api/models";
import { Form } from "element-ui";
import { UserModule } from "@/store/modules/user";

@Component({})
export default class Index extends Vue {
  signinForm: SigninForm = {
    password: "",
    username: ""
  };
  rules = {
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [
      {
        required: true,
        message: "请输入密码",
        trigger: "blur"
      },
      { min: 6, message: "密码长度6位以上", trigger: "change" }
    ]
  };
  loading = false;
  mounted() {}
  navTo(path: string) {
    this.$router.push(path);
  }
  userSignin() {
    (this.$refs.signinForm as Form).validate((valid: boolean) => {
      if (valid) {
        this.loading = true;
        UserModule.Login(this.signinForm)
          .then(() => {
            this.loading = false;
            this.$message("登录成功！");
            this.$router.push({ path: "/" });
          })
          .catch(() => {
            this.loading = true;
          });
        // Signin({ signinForm: this.signinForm })
        //   .then(resp => {
        //     if (resp.code === 0) {
        //       this.loading = false;
        //       const tokenObj: TokenObj = resp.data!;
        //       localStorage.setItem("token", tokenObj.token);
        //       this.$message("登录成功！");
        //     }
        //   })
        //   .catch(error => {
        //     this.loading = false;
        //   });
      }
    });
  }
}
</script>
<style lang="less" scoped>
.loginForm {
  width: 350px;
  margin: 100px auto;
}
</style>