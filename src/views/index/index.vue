<template>
  <div class="app-container">
    <el-carousel height="150px">
      <el-carousel-item>
        <router-link to="/register">
          <img width="100%" height="100%" src="../../assets/banner1.jpg">
        </router-link>
      </el-carousel-item>
      <el-carousel-item>
        <img width="100%" height="100%" src="../../assets/banner2.jpg">
      </el-carousel-item>
    </el-carousel>
    <el-tabs @tab-click="clickTab" class="serviceTab" value="hot" type="border-card">
      <el-tab-pane label="热门办事" name="hot">
        <el-row v-if="service" :gutter="20">
          <el-col :span="6" v-for="item in service" :key="item.id" style="margin-bottom:30px">
            <el-card :body-style="{ padding: '0px',textAlign:'center' }">
              <div @click="navTo(item.id)" class="imageContainer">
                <el-image class="serviceIcon" fit="contain" :src="item.icon">
                  <i slot="error" class="el-icon-picture-outline"></i>
                </el-image>
              </div>
              <div style="padding: 14px;">
                <span>{{item.title}}</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button">在线办理</el-button>
                  <el-button @click="askQ(item.id)" type="text" class="button">在线咨询</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="按部门办事" name="department">
        <el-row :gutter="20" v-if="departments">
          <el-col :span="6" v-for="item in departments" :key="item.id" style="margin-bottom:30px">
            <el-button @click="navToDept(item.id)">{{item.name}}</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="全部办事" name="all">
        <el-row v-if="service" :gutter="20">
          <el-col :span="6" v-for="item in service" :key="item.id" style="margin-bottom:30px">
            <el-card :body-style="{ padding: '0px',textAlign:'center' }">
              <div @click="navTo(item.id)" class="imageContainer">
                <el-image class="serviceIcon" fit="contain" :src="item.icon">
                  <i slot="error" class="el-icon-picture-outline"></i>
                </el-image>
              </div>
              <div style="padding: 14px;">
                <span>{{item.title}}</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button">在线办理</el-button>
                  <el-button @click="askQ(item.id)" type="text" class="button">在线咨询</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col class="pagination" :span="24">
            <el-pagination
              :page-size="servicePage.pageSize"
              background
              layout="prev, pager, next"
              :total="totalservice"
              hide-on-single-page
              @current-change="changePage"
              @prev-click="changePage"
              @next-click="changePage"
            ></el-pagination>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Tabs } from "element-ui";
import { Department, Service } from "@/api/models";
import { GetDepartmentList, GetServiceList } from "@/api";
@Component({})
export default class Index extends Vue {
  departments: Department[] | null = null;
  service: Service[] | null = null;
  servicePage = {
    page: 1,
    pageSize: 20
  };
  totalservice = 0;
  mounted() {
    this.servicePage.pageSize = 8;
    this.getServiceList();
  }
  clickTab(tab: any) {
    if (tab.name === "department") {
      this.getDepartmentList();
    } else if (tab.name === "all") {
      this.servicePage.pageSize = 20;
      this.getServiceList();
    } else if (tab.name === "hot") {
      this.servicePage.pageSize = 8;
      this.getServiceList();
    }
  }
  getDepartmentList() {
    GetDepartmentList().then(resp => {
      this.departments = resp.data!;
    });
  }
  getServiceList() {
    GetServiceList(this.servicePage).then(resp => {
      this.service = resp.data!;
      this.totalservice = resp.total;
    });
  }
  changePage(curPage: number) {
    console.log(curPage);
    this.servicePage.page = curPage;
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
  navToDept(id: any) {
    this.$router.push({ path: "/searchList", query: { deptId: id } });
  }
}
</script>
<style lang="less" scoped>
.serviceTab {
  margin-top: 10px;
}
.serviceIcon {
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: center;
}

.button {
  padding: 0;
  float: right;
}

.imageContainer {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.imageContainer:hover {
  cursor: pointer;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.pagination {
  text-align: center;
}
</style>
