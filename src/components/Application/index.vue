<template>
  <el-card v-if="service" class="box-card">
    <div slot="header" class="clearfix">
      <span>{{service.title}}</span>
    </div>

    <el-form :model="form">
      <el-form-item label="办事说明" label-width="70px">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 6}"
          v-model="form.description"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          style="width:100%"
          type="primary"
          @click="postUserService"
        >申请办理</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { UserService, Service } from "@/api/models";
import { PostUserService } from "@/api";
@Component({})
export default class Index extends Vue {
  @Prop({ default: { id: 0 } })
  service: Service;
  form = {
    serviceId: 0,
    description: ""
  };
  loading = false;
  mounted() {}
  postUserService() {
    if (this.service.id === 0) {
      return;
    }
    this.loading = true;
    this.form.serviceId = this.service.id;

    PostUserService({ value: this.form as UserService }).then(resp => {
      if (resp.code === 0) {
        this.loading = false;
        this.$emit("appliSuccess");

        this.$alert("申请办事成功，即将跳转至我的办事详情。", "", {
          confirmButtonText: "确定",
          showClose: false,
          callback: action => {
            this.$router.push({
              name: "userCenter",
              params: { userServiceId: resp.data!.toString() }
            });
          }
        });
      }
      
    }).catch()
    {
 this.loading = false;
    };
  }
}
</script>
<style lang="less" scoped>
</style>