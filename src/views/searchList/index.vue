<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>搜索列表</span>
        <el-tag style="float: right" type="text">共{{total}}个服务事项</el-tag>
      </div>
      <el-row>
        <el-col :span="8">
          <el-select
            clearable
            v-model="queryStr.deptment"
            @change="getServiceList"
            placeholder="按部门筛选"
          >
            <el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-select clearable v-model="queryStr.type" @change="getServiceList" placeholder="按类型筛选">
            <el-option label="教师办事" :value="1"></el-option>
            <el-option label="学生办事" :value="2"></el-option>
            <el-option label="普通办事" :value="3"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-input
            clearable
            v-model="queryStr.keyword"
            @change="getServiceList"
            placeholder="请输入搜索内容"
          ></el-input>
        </el-col>
      </el-row>
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
        <el-table-column width="200px">
          <template slot="header">
            <span>操作</span>
          </template>
          <template slot-scope="scope">
            <el-button type="text" @click="navTo(scope.row.id)" size="mini">查看详情</el-button>
            <el-button type="text" size="mini" @click="askQ(scope.row.id)">在线咨询</el-button>
            <el-button type="text" size="mini">在线办理</el-button>
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
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GetDepartmentList, GetSearchServiceList } from "@/api";
import { Service, Department } from "@/api/models";
import { DeptModule } from "@/store/modules/dept";

@Component({})
export default class Index extends Vue {
  total = 0;
  serviceList: Service[] | null = null;
  queryStr: any = {
    page: 1,
    pageSize: 20,
    keyword: "",
    type: "",
    deptment: ""
  };
  mounted() {
    this.queryStr.keyword = this.$route.query["keyword"]
      ? this.$route.query["keyword"]
      : "";
    this.queryStr.deptment = this.$route.query["deptId"]
      ? this.$route.query["deptId"]
      : "";
    this.getServiceList();
  }
  getServiceList() {
    GetSearchServiceList(this.queryStr as any).then(resp => {
      this.serviceList = resp.data!;
      this.total = resp.total;
    });
  }
  changePage(curPage: number) {
    console.log(curPage);
    this.queryStr.page = curPage;
    this.getServiceList();
  }
  get deptList(): Department[] {
    return DeptModule.getDept;
  }
}
</script>
<style lang="less" scoped>
</style>