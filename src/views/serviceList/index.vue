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
            <el-table-column label="名称">
              <template slot-scope="scope">
                <el-button type="text" @click="navTo(scope.row.id)">{{scope.row.title}}</el-button>
              </template>
            </el-table-column>
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
            <el-table-column width="200px">
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
                <el-button type="text" @click="askQ(scope.row.id)">在线咨询</el-button>

                <el-button type="text" @click="application(scope.row)" class="button">在线办理</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :page-size="queryStr.pageSize"
            background
            layout="prev, pager, next"
            :total="total"
            hide-on-single-page
            @current-change="changePage"
            @prev-click="changePage"
            @next-click="changePage"
          ></el-pagination>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog width="30%" :visible.sync="show">
      <ApplicationService @appliSuccess="show=false" :service="applService"/>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { GetDepartmentList, GetSearchServiceList } from "@/api";
import { Service, Department } from "@/api/models";
import ApplicationService from "@/components/Application/index.vue";
@Component({
  components: {
    ApplicationService
  }
})
export default class ServiceList extends Vue {
  title = "";
  serviceList: Service[] | null = null;
  total = 0;
  queryStr = {
    page: 1,
    pageSize: 20,
    keyword: "",
    type: 0,
    deptment: 0
  };

  departments: Department[] | null = null;
  show = false;
  applService: Service | null = null;
  beforeMount() {
    this.title =
      this.$route.query["type"] === "teacher" ? "教师办事" : "学生办事";
    this.queryStr.type = this.$route.query["type"] === "teacher" ? 2 : 1;
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
      pageSize: 20,
      keyword: "",
      type: this.$route.query["type"] === "teacher" ? 2 : 1,
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

  navTo(id: any) {
    this.$router.push({ path: "/serviceDetail", query: { serviceId: id } });
  }

  changePage(curPage: number) {
    console.log(curPage);
    this.queryStr.page = curPage;
    this.getServiceList();
  }

  application(service: Service) {
    this.applService = service;
    this.show = true;
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