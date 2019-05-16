<template>
  <div class="header">
    <el-row type="flex" justify="center">
      <el-col :span="7">
        <img :style="{'width': '85%',height:'100%'}" src="../../assets/logo.png" alt>
      </el-col>
      <el-col :span="6">
        <div class="serach">
          <el-input placeholder="请输入搜索内容" v-model="keyword" suffix-icon="el-icon-search"></el-input>
          <el-button>搜索</el-button>
        </div>
        <div class="userCenter">
          用户中心：
          <el-link :underline="false" @click="navTo('/login')">登录</el-link>&nbsp;|&nbsp;
          <el-link :underline="false" @click="navTo('/register')">注册</el-link>
        </div>
      </el-col>
    </el-row>
    <el-row class="menuRow" type="flex" justify="center">
      <el-menu
        :default-active="curPath.path"
        background-color="#006699"
        text-color="#FFFFFF"
        active-text-color="#ccffff"
        mode="horizontal"
        class="elMenu"
        :router="true"
      >
        <el-menu-item index="/index" route="/index">首页</el-menu-item>
        <el-menu-item index="/teacher" route="/serviceList?type=teacher">教师办事</el-menu-item>
        <el-menu-item index="/student" route="/serviceList?type=student">学生办事</el-menu-item>
        <el-menu-item index="4">结果公开</el-menu-item>
        <el-menu-item index="5">办事咨询</el-menu-item>
      </el-menu>
    </el-row>
    <el-row v-if="routeList.indexOf(curPath.path)===-1">
      <el-breadcrumb class="elBread" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="curPath.path">{{curPath.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({})
export default class Header extends Vue {
  activeIndex = "1";
  keyword = "";
  routeList = ["/index", "/teacher", "/student"];
  curPath = {
    path: "",
    title: ""
  };
  mounted() {
    this.curPath.path = this.$route.path;
    this.curPath.title = this.$route.meta;
  }
  navTo(path: string) {
    this.$router.push(path);
  }
  @Watch("$route")
  getCurPath() {
    this.curPath.path = this.$route.path;
    if (this.$route.path === "/serviceList") {
      if (this.$route.query["type"] === "teacher") {
        this.curPath.path = "/teacher";
      } else {
        this.curPath.path = "/student";
      }
    }
    this.curPath.title = this.$route.meta;
  }
}
</script>
<style lang="less" scoped>
.serach {
  display: flex;
}
.elMenu {
  width: 100%;
  display: flex;
  justify-content: center;
}
.userCenter {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  font-size: 17px;
  color: #d9d9d9;
}
.menuRow {
  margin-top: 10px;
}
.elBread {
  margin-left: 23%;
  margin-top: 50px;
}
</style>
<style lang="less">
.el-link--inner {
  font-size: 16px;
}
</style>
