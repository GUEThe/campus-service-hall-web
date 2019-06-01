<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>个人信息</span>
      <el-button @click="dialogFormVisible=true" type="primary">修改密码</el-button>
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
    <el-dialog
      width="30%"
      :before-close="()=> false"
      :show-close="false"
      title="修改密码"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" ref="changePasswordForm" :rules="rule">
        <el-form-item required label="旧密码" prop="oldPassword">
          <el-input v-model="form.oldPassword" show-password autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item required label="新密码" prop="newPassword">
          <el-input v-model="form.newPassword" show-password autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item required label="确认新密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" show-password autocomplete="off"></el-input>
        </el-form-item>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePassword">确 定</el-button>
      </el-form>
    </el-dialog>
  </el-card>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GetUser, PutUser } from "@/api";
import { User } from "@/api/models";
import { validateMail } from "@/utils";
import { Form } from "element-ui";
import { EventBus } from "@/utils/eventBus";

@Component({})
export default class UserService extends Vue {
  user: User | null = null;
  loading = false;
  dialogFormVisible = false;
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

  validatePass: any = null;
  validatePass2: any = null;

  form = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  };
  rule = {};
  mounted() {
    GetUser({ id: 0 }).then(resp => {
      this.user = resp.data!;
      this.validatePass = (rule: any, value: any, callback: any) => {
        if (value === "") {
          callback(new Error("请输入旧密码"));
        } else {
          if (this.form.oldPassword !== this.user!.password) {
            callback(new Error("旧密码不正确"));
          }
          callback();
        }
      };
      this.validatePass2 = (rule: any, value: any, callback: any) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.form.newPassword) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      this.rule = {
        oldPassword: [{ validator: this.validatePass, trigger: "blur" }],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ],
        confirmPassword: [{ validator: this.validatePass2, trigger: "blur" }]
      };
    });
  }
  putUserInfo(cP: boolean) {
    PutUser({ value: this.user as User, id: this.user!.id.toString() }).then(
      resp => {
        this.$message({ type: "success", message: "更新成功！" });
        if (cP) {
          EventBus.$emit("changePassword");
        }
      }
    );
  }
  changePassword() {
    (this.$refs.changePasswordForm as Form).validate(val => {
      if (val) {
        this.user!.password = this.form.newPassword;
        this.putUserInfo(true);
      }
    });
  }
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