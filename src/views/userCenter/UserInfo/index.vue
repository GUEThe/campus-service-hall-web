<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>个人信息</span>
      <el-button type="primary">修改密码</el-button>
    </div>
    <el-form v-if="user" :model="user" :rules="rules" label-width="80px" ref="user">
      <el-form-item label="用户名" prop="username">
        <el-input
          disabled
          prefix-icon="el-icon-user-solid"
          v-model="user.username"
          placeholder="请输入用户名"
          autocomplete="off"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="name">
        <el-input
          prefix-icon="el-icon-s-custom"
          v-model="user.name"
          placeholder="请输入真实姓名"
          autocomplete="off"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="身份" prop="role">
        <el-radio disabled v-model="user.role" label="teacher">教师</el-radio>
        <el-radio disabled v-model="user.role" label="student">学生</el-radio>
      </el-form-item>
      <el-form-item disabled :label="strIdentify" prop="identify">
        <el-input
          prefix-icon="el-icon-bank-card"
          v-model="user.identify"
          autocomplete="off"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          prefix-icon="el-icon-phone"
          v-model="user.phone"
          placeholder="请输入手机号"
          autocomplete="off"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="mail">
        <el-input
          prefix-icon="el-icon-message"
          v-model="user.mail"
          placeholder="请输入邮箱"
          autocomplete="off"
          type="mail"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width:100%" :loading="loading" @click="putUserInfo" type="primary">更 新</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GetUser, PutUser } from "@/api";
import { User } from "@/api/models";
import { validateMail } from "@/utils";

@Component({})
export default class UserService extends Vue {
  user: User | null = null;
  loading = false;
  rules = {
    name: [
      { required: true, message: "请输入姓名", trigger: ["blur", "change"] }
    ],
    mail: [{ validator: validateMail, trigger: ["blur", "change"] }],
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
  mounted() {
    GetUser({ id: 0 }).then(resp => {
      this.user = resp.data!;
    });
  }
  putUserInfo() {}

  get strIdentify() {
    if ((this.user as User).role === "student") {
      return "学号";
    } else {
      return "学工号";
    }
  }
}
</script>
<style lang="less" scoped>
.clearfix {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>