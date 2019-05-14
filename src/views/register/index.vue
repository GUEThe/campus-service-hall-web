<template>
  <div class="app-container">
    <div class="loginForm">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>用户注册</span>
          <el-button style="float: right; padding: 3px 0" @click="navTo('/login')" type="text">返回登录</el-button>
        </div>
        <div>
          <el-form :model="signupForm" :rules="rules" ref="signupForm">
            <el-form-item prop="username">
              <el-input
                prefix-icon="el-icon-user-solid"
                v-model="signupForm.username"
                placeholder="请输入用户名"
                autocomplete="off"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="name">
              <el-input
                prefix-icon="el-icon-s-custom"
                v-model="signupForm.name"
                placeholder="请输入真实姓名"
                autocomplete="off"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="role">
              <el-radio v-model="signupForm.role" label="teacher">教师</el-radio>
              <el-radio v-model="signupForm.role" label="student">学生</el-radio>
            </el-form-item>
            <el-form-item prop="identify">
              <el-input
                prefix-icon="el-icon-bank-card"
                v-model="signupForm.identify"
                :placeholder="strIdentify"
                autocomplete="off"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="phone">
              <el-input
                prefix-icon="el-icon-phone"
                v-model="signupForm.phone"
                placeholder="请输入手机号"
                autocomplete="off"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="mail">
              <el-input
                prefix-icon="el-icon-message"
                v-model="signupForm.mail"
                placeholder="请输入邮箱"
                autocomplete="off"
                type="mail"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="signupForm.password"
                prefix-icon="el-icon-lock"
                type="password"
                placeholder="请输入登录密码"
                clearable
                autocomplete="off"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="width:100%" :loading="loading" @click="userSigin" type="primary">注 册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { PostUser, GetUserName } from "@/api";
import { User } from "../../api/models";
import { Form } from "element-ui";

@Component({})
export default class Index extends Vue {
  signupForm = {
    name: "",
    username: "",
    password: "",
    identify: "",
    mail: "",
    phone: "",
    role: "student"
  };
  validateUsername(rule: any, value: string, callback: any) {
    if (value === "") {
      callback(new Error("请输入用户名"));
    } else {
      GetUserName({ username: value }).then(resp => {
        if (resp.message === null) {
          callback();
        } else {
          callback(new Error(resp.message));
        }
      });
    }
  }
  validateMail(rule: any, value: string, callback: any) {
    let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (value === "") {
      callback(new Error("请输入邮箱"));
    } else if (!pattern.test(value)) {
      callback(new Error("邮箱格式错误"));
    } else {
      callback();
    }
  }
  rules = {
    username: [
      { validator: this.validateUsername, trigger: ["blur", "change"] }
    ],
    name: [
      { required: true, message: "请输入姓名", trigger: ["blur", "change"] }
    ],
    identify: [
      { required: true, message: this.strIdentify, trigger: ["blur", "change"] }
    ],
    mail: [{ validator: this.validateMail, trigger: ["blur", "change"] }],
    phone: [
      { required: true, message: "请输入手机号", trigger: ["blur", "change"] }
    ],
    password: [
      {
        required: true,
        message: "请输入登录密码",
        trigger: ["blur", "change"]
      },
      { min: 6, message: "密码长度6位以上", trigger: ["blur", "change"] }
    ]
  };
  loading = false;
  mounted() {}
  navTo(path: string) {
    this.$router.push(path);
  }
  userSigin() {
    (this.$refs.signupForm as Form).validate((valid: boolean) => {
      if (valid) {
        this.loading = true;
        PostUser({ value: this.signupForm as User }).then(resp => {
          if (resp.code === 0) {
            this.$message({
              type: "success",
              message: "注册成功！"
            });
            (this.$refs.signupForm as Form).resetFields();
          } else {
            this.$message({
              type: "error",
              message: resp.message
            });
          }
        });
      }
    });
  }
  get strIdentify() {
    if (this.signupForm.role === "student") {
      return "请输入学号";
    } else {
      return "请输入学工号";
    }
  }

  //   @Watch("signupForm")
  //   strIdentify(newV: any) {
  //     if (newV.role === "student") {
  //       return "请输入学号";
  //     } else {
  //       return "请输入学工号";
  //     }
  //   }
}
</script>
<style lang="less" scoped>
.loginForm {
  width: 350px;
  margin: 10px auto 0;
}
</style>