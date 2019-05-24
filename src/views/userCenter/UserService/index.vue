<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>我的办事</span>
      <el-tag style="float: right" type="text">共{{total}}个服务事项</el-tag>
    </div>
    <el-table align="center" :data="userSVL" style="width: 100%">
      <el-table-column
        align="center"
        label="序号"
        type="index"
        :index="index"
        show-overflow-tooltip
        width="50"
      />
      <el-table-column align="center" prop="serviceName" label="办事名称"></el-table-column>
      <el-table-column align="center" prop="time" width="140" label="申报时间">
        <template slot-scope="scope">
          <span>{{scope.row.time|TimeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="status" width="70" label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.status|UserServiceStatusFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { UserServiceView } from "@/api/models";
import { GetMyServiceList } from "@/api";
@Component({})
export default class UserService extends Vue {
  total = 4;
  userSVL: UserServiceView[] | null = null;
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
  query = {
    page: 1,
    pageSize: 20
  };
  mounted() {
    this.getUserServiceViewList();
  }
  getUserServiceViewList() {
    GetMyServiceList(this.query).then(resp => {
      this.userSVL = resp.data!;
      this.total = resp.total;
    });
  }

  index(val: number) {
    return (this.query.page - 1) * this.query.pageSize + val + 1;
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