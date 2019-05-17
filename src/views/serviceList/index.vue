<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="dept">
          <span>按部门筛选</span>
        </div>
        <el-menu
          :default-active="`${queryStr.deptment}`"
          @select="selectDept"
          v-if="departments"
          background-color="#f5f7fa"
        >
          <el-menu-item index="0">
            <span slot="title">全部</span>
          </el-menu-item>
          <el-menu-item v-for="item in departments" :key="item.id" :index="`${item.id}`">
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <el-card>
          <div slot="header" class="clearfix">
            <span>{{title}}</span>
            <el-tag style="float: right" type="text">共{{total}}个服务事项</el-tag>
          </div>
          <el-table v-if="serviceList" :data="serviceList" style="width: 100%">
            <el-table-column label="名称" prop="title"></el-table-column>
            <el-table-column label="所属部门">
              <template slot-scope="scope">
                <span>{{scope.row.department|DeptFilter}}</span>
              </template>
            </el-table-column>
            <el-table-column label="办事类型">
              <template slot-scope="scope">
                <span>{{scope.row.type|ServiceTypeFilter}}</span>
              </template>
            </el-table-column>
            <el-table-column width="190px">
              <template slot="header" slot-scope="scope">
                <el-input
                  v-model="queryStr.keyword"
                  @change="getServiceList"
                  size="mini"
                  placeholder="输入关键字搜索"
                  :clearable="true"
                />
              </template>
              <template slot-scope="scope">
                <el-button size="mini">在线办理</el-button>
                <el-button size="mini" @click="askQ(scope.row.id)" type="info">在线咨询</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { GetDepartmentList, GetSearchServiceList } from "@/api";
import { Service, Department } from "@/api/models";
@Component({})
export default class ServiceList extends Vue {
  title = "";
  serviceList: Service[] | null = null;
  total = 0;
  queryStr = {
    page: 1,
    pageSize: 2,
    keyword: "",
    type: 0,
    deptment: 0
  };

  departments: Department[] | null = null;
  beforeMount() {
    this.title =
      this.$route.query["type"] === "teacher" ? "教师办事" : "学生办事";
    this.queryStr.type = this.$route.query["type"] === "teacher" ? 1 : 2;
    this.getServiceList();
    this.getDepartmentList();
  }
  getDepartmentList() {
    GetDepartmentList().then(resp => {
      this.departments = resp.data!;
    });
  }
  getServiceList() {
    GetSearchServiceList(this.queryStr).then(resp => {
      this.serviceList = resp.data!;
      this.total = resp.total;
    });
  }
  selectDept(index: any) {
    this.queryStr.deptment = index;
    this.getServiceList();
  }
  @Watch("$route.query")
  changeType() {
    this.title =
      this.$route.query["type"] === "teacher" ? "教师办事" : "学生办事";
    this.queryStr = {
      page: 1,
      pageSize: 2,
      keyword: "",
      type: this.$route.query["type"] === "teacher" ? 1 : 2,
      deptment: 0
    };
    this.getServiceList();
  }
  askQ(serviceId: number) {
    this.$router.push({
      path: "/serviceDetail",
      query: { serviceId: serviceId.toString(), ask: "1" }
    });
  }
}
</script>
<style lang="less" scoped>
.dept {
  height: 56px;
  background-color: #006699;
  color: #fff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.clearfix {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>