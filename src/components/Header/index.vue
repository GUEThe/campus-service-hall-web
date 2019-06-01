<template>
  <div class="header">
    <el-row type="flex" justify="center">
      <el-col :span="7">
        <img :style="{'width': '85%',height:'100%'}" src="../../assets/logo.png" alt>
      </el-col>
      <el-col :span="6">
        <div class="serach">
          <el-input placeholder="请输入搜索内容" v-model="keyword" suffix-icon="el-icon-search"></el-input>
          <el-button @click="search">搜索</el-button>
        </div>
        <div class="userCenter">
          用户中心：
          <div v-if="!name">
            <el-link :underline="false" @click="navTo('/login')">登录</el-link>&nbsp;|&nbsp;
            <el-link :underline="false" @click="navTo('/register')">注册</el-link>
          </div>
          <div v-if="name">
            <el-link :underline="false" @click="navTo('/userCenter')">{{name}}</el-link>&nbsp;|&nbsp;
            <el-link :underline="false" @click="logout">退出登录</el-link>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="menuRow" type="flex" justify="center">
      <el-menu
        :default-active="indexPath"
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

        <el-menu-item index="/guide">办事指南</el-menu-item>
        <el-menu-item index="/phoneList">咨询电话</el-menu-item>
      </el-menu>
    </el-row>
    <!-- <el-row v-if="routeList.indexOf(indexPath.path)===-1">
      <el-breadcrumb class="elBread" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="indexPath.path">{{indexPath.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>-->
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { UserModule } from "@/store/modules/user";
import { EventBus } from "@/utils/eventBus";
@Component({})
export default class Header extends Vue {
  activeIndex = "1";
  keyword = "";
  routeList = ["/index", "/teacher", "/student", "/phoneList", "/guide"];
  indexPath = "";
  mounted() {
    this.indexPath = this.$route.path;
    EventBus.$on("changePassword", this.logout);
  }
  navTo(path: string) {
    this.$router.push(path);
  }
  @Watch("$route")
  getindexPath() {
    if (this.routeList.indexOf(this.$route.path) >= 0) {
      this.indexPath = this.$route.path;
      if (this.$route.path === "/serviceList") {
        if (this.$route.query["type"] === "teacher") {
          this.indexPath = "/teacher";
        } else {
          this.indexPath = "/student";
        }
      }
    }
  }
  destroyed() {
    EventBus.$off("changePassword", this.logout);
  }
  get name() {
    return UserModule.name;
  }

  logout() {
    UserModule.Logout().then(() => {
      this.$message("退出登录成功！");
      this.$router.push("/index");
    });
  }

  search() {
    this.$router.push({
      path: "/searchList",
      query: { keyword: this.keyword }
    });
    EventBus.$emit("g-search", this.keyword);
    this.keyword = "";
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
.el-link {
  vertical-align: unset !important;
}
</style>
