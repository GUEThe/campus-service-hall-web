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
                  <h6>服务名称</h6>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="elFormItem" label="所属部门">
                  <span>所属部门</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="elFormItem" label="面向用户">
                  <span>面向用户</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item class="elFormItem" label="附件">
              <span>附件</span>
            </el-form-item>

            <el-form-item class="elFormItem" label="详细说明">
              <p>详细说明</p>
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
                    <span>流程名称</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="elFormItem" label="流程附件">
                    <span>流程附件</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item class="elFormItem" label="所属部门">
                <span>所属部门</span>
              </el-form-item>
              <el-form-item class="elFormItem" label="流程详细说明">
                <p>流程详细说明</p>
              </el-form-item>
            </div>
          </el-form>
        </el-collapse-item>

        <el-collapse-item title="咨询列表" name="3">
          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
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
import { Service, ProcessView } from "@/api/models";
import { GetService, GetProcessList } from "@/api";
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
  mounted() {
    this.serviceId = this.$route.query["serviceId"]
      ? parseInt(this.$route.query["serviceId"] as string)
      : null;
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