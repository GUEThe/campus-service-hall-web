<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <span>办事详情</span>
        <el-button style="float: right; padding: 3px 0" type="text">在线办理</el-button>
        <el-button
          @click="dialogTableVisible=true"
          style="float: right; padding: 3px 0"
          type="text"
        >在线咨询</el-button>
      </div>
      <el-collapse value="1">
        <el-collapse-item title="基本信息" name="1">
          <el-form label-position="left" class="demo-table-expand">
            <el-row>
              <el-col :span="24">
                <el-form-item class="elFormItem">
                  <h6>申请打印成绩单</h6>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="elFormItem" label="所属部门">
                  <span>教务处</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="elFormItem" label="面向用户">
                  <span>学生</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item class="elFormItem" label="附件">
              <span>暂无附件</span>
            </el-form-item>

            <el-form-item class="elFormItem" label="详细说明">
              <p>请登录并在线申请办事,当在个人中心中查询到申请事项完结时说明事项已经处理完成。请于上班时间到办公楼405领取打印出来的成绩单。</p>
            </el-form-item>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="办理流程" name="2">
          <el-form label-position="left" class="demo-table-expand">
            <div class="processCont">
              <el-row>
                <el-col :span="24">
                  <el-form-item class="elFormItem">
                    <h6>流程1</h6>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item class="elFormItem" label="流程名称">
                    <span>在线申请打印成绩单</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="elFormItem" label="流程附件">
                    <span>暂无附件</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item class="elFormItem" label="所属部门">
                <span>教务处</span>
              </el-form-item>
              <el-form-item class="elFormItem" label="流程详细说明">
                <p>申请，办结后于办公楼405领取成绩单。</p>
              </el-form-item>
            </div>
          </el-form>
        </el-collapse-item>

        <el-collapse-item title="咨询列表" name="3">
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
                <el-tag
                  :type="scope.row.status===0?'info':''"
                >{{scope.row.status|QuestionStatusFilter}}</el-tag>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            :page-size="questionViewListQuery.pageSize"
            background
            layout="prev, pager, next"
            :total="totalservice"
            hide-on-single-page
            @current-change="changePage"
            @prev-click="changePage"
            @next-click="changePage"
          ></el-pagination>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <el-dialog width="30%" :visible.sync="dialogTableVisible">
      <AskQuestion @askQusetionUuccess="dialogTableVisible=false" :serviceId="serviceId"/>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Service, ProcessView, QuestionView } from "@/api/models";
import { GetService, GetProcessList, GetQuestionList } from "@/api";
import AskQuestion from "@/components/Question/index.vue";
@Component({
  components: {
    AskQuestion
  }
})
export default class ServiceDeatil extends Vue {
  dialogTableVisible = false;
  serviceId: number | null = null;
  service: Service | null = null;
  processViewList: ProcessView[] | null = null;
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
    if (!this.$route.query["serviceId"]) {
      this.$router.go(-1);
    }
    this.serviceId = this.$route.query["serviceId"]
      ? parseInt(this.$route.query["serviceId"] as string)
      : null;
    this.questionViewListQuery.serviceId = this.$route.query["serviceId"]
      ? parseInt(this.$route.query["serviceId"] as string)
      : 0;
    console.log(this.$route.query, this.serviceId);
    if (this.$route.query["ask"]) {
      this.dialogTableVisible = true;
    }
    GetService({ id: this.serviceId as number }).then(resp => {
      this.service = resp.data!;
    });
    GetProcessList({ serviceId: this.serviceId as number }).then(resp => {
      this.processViewList = resp.data!;
    });
    this.getQuestionList();
  }
  getQuestionList() {
    GetQuestionList(this.questionViewListQuery).then(resp => {
      this.questionViewList = resp.data!;
    });
  }
}
</script>
<style lang="less" scoped>
.processCont {
  padding: 10px;
  border: 1px solid #ebeef5;
}
h6 {
  padding: 0;
  margin: 0;
}
</style>

<style lang="less">
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 100px;
  color: #99a9bf;
}
.elFormItem {
  margin: 0px;
}
</style>