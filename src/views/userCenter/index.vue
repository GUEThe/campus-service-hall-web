<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="dept">
          <img src="../../assets/touxiang.png">
          <span>{{name}},您好！</span>
        </div>
        <el-menu @select="selectItem" :default-active="selectIndex" background-color="#f5f7fa">
          <el-menu-item index="userService">
            <span slot="title">我的办事</span>
          </el-menu-item>
          <el-menu-item index="userQuestion">
            <span slot="title">我的咨询</span>
          </el-menu-item>
          <el-menu-item index="userInfo">
            <span slot="title">个人信息</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <UserService
          @showServiceDetail="showServiceDetail"
          v-if="selectIndex==='userService'&&!showDetail"
        />
        <UserInfo v-if="selectIndex==='userInfo'"/>
        <UserQuestion v-if="selectIndex==='userQuestion'"/>
        <UserServiceDetail @go-back="goBack" :userServiceId="userServiceId" v-if="showDetail"/>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { UserModule } from "@/store/modules/user";
import UserService from "./UserService/index.vue";
import UserInfo from "./UserInfo/index.vue";
import UserQuestion from "./UserQuestion/index.vue";
import UserServiceDetail from "./UserServiceDetail/index.vue";

@Component({
  components: {
    UserService,
    UserInfo,
    UserQuestion,
    UserServiceDetail
  }
})
export default class UserCenter extends Vue {
  selectIndex = "userService";
  showDetail = false;
  userServiceId = 0;
  mounted() {
    console.log(this.$route.params);
    if (this.$route.params["userServiceId"]) {
      this.showDetail = true;
      this.userServiceId = parseInt(this.$route.params["userServiceId"]);
    }
  }
  selectItem(index: string) {
    this.selectIndex = index;
    this.showDetail = false;
  }
  showServiceDetail(id: number) {
    this.userServiceId = id;
    this.showDetail = true;
  }
  goBack() {
    this.showDetail = false;
  }
  get name() {
    return UserModule.name;
  }
}
</script>
<style lang="less" scoped>
.dept {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f5f7fa;
  border-bottom: solid 1px #e6e6e6;
  height: 140px;
  justify-content: space-around;
}
.clearfix {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>