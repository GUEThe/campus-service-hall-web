<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>我的咨询</span>
      <el-tag style="float: right" type="text">共{{total}}条咨询</el-tag>
    </div>
    <el-table :data="questionViewList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" label-width="100px" inline class="demo-table-expand">
            <el-row>
              <el-col :span="12">
                <el-form-item class="elFormItem" label="回复人">
                  <span>{{ props.row.userNickname }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="elFormItem" label="回复时间">
                  <span>{{ props.row.relpyTime|TimeFilter }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item class="elFormItem" label="回复内容">
              <span>{{ props.row.replyContent }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="内容" prop="content"></el-table-column>
      <el-table-column label="提问时间">
        <template slot-scope="scope">
          <span>{{scope.row.time|TimeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column label="回复状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status===0?'info':''">{{scope.row.status|QuestionStatusFilter}}</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :page-size="questionViewListQuery.pageSize"
      background
      layout="prev, pager, next"
      :total="total"
      hide-on-single-page
      @current-change="changePage"
      @prev-click="changePage"
      @next-click="changePage"
    ></el-pagination>
  </el-card>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Service, ProcessView, QuestionView } from "@/api/models";
import { GetService, GetProcessList, GetQuestionList } from "@/api";
@Component({})
export default class UserService extends Vue {
  total = 4;
  questionViewList: QuestionView[] | null = null;
  questionViewListQuery = {
    page: 1,
    pageZise: 20,
    serviceId: 0,
    status: 2
  };
  changePage(curPage: number) {
    console.log(curPage);
    this.questionViewListQuery.page = curPage;
    this.getQuestionList();
  }
  mounted() {
    this.getQuestionList();
  }
  getQuestionList() {
    GetQuestionList(this.questionViewListQuery).then(resp => {
      this.questionViewList = resp.data!;
      this.total = resp.total;
    });
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