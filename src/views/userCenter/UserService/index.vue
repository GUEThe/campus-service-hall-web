<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>我的办事</span>
      <el-tag style="float: right" type="text">共{{total}}个服务事项</el-tag>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="办事名称"></el-table-column>
      <el-table-column prop="time" label="申报时间"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class UserService extends Vue {
  total = 4;
  tableData = [
    {
      index: 1,
      name: "申请打印成绩单",
      time: "2019-05-01",
      status: "办理中"
    },
    {
      index: 2,
      name: "外出请假",
      time: "2019-04-02",
      status: "已完成"
    },
    {
      index: 3,
      name: "学分替换申请",
      time: "2019-03-28",
      status: "已完成"
    },
    {
      index: 4,
      name: "学分替换申请",
      time: "2019-03-02",
      status: "已完成"
    }
  ];
  mounted() {}
}
</script>
<style lang="less" scoped>
</style>