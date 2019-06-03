<template>
  <el-card>
    <div slot="header">
      <span>我的办事详情</span>
      <el-button @click="back" style="float: right; padding: 3px 0" type="text">返回</el-button>
    </div>
    <el-collapse v-if="service" v-model="activeName">
      <el-collapse-item title="基本信息" name="1">
        <el-form label-position="left">
          <el-row>
            <el-col :span="24">
              <el-form-item class="elFormItem">
                <h6>{{service.serviceName}}</h6>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item class="elFormItem" label="所属部门">
                <span>{{service.servcieDepartmentId|DeptFilter}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="elFormItem" label="面向用户">
                <span>{{service.type|ServiceTypeFilter}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item class="elFormItem" label="标签分类">
            <span>{{service.tags}}</span>
          </el-form-item>

          <el-form-item v-if="service.fileGUID" class="elFormItem" label="附件">
            <el-link :href="`/v1/api/Files/${service.fileGUID}`" target="_blank">点击下载</el-link>
          </el-form-item>

          <el-form-item class="elFormItem" label="详细说明">
            <p v-html="service.description"></p>
          </el-form-item>
        </el-form>
      </el-collapse-item>

      <el-collapse-item title="办理流程" name="2">
        <el-form label-position="left">
          <div v-for="(item,index) in processViewList" :key="item.id" class="processCont">
            <el-row>
              <el-col style="display: flex;align-items: center;position: unset;" class="elFormItem">
                <span>流程{{index+1}}</span>
                <el-tag
                  v-if="item.status==0"
                  style="position: absolute;right: 0;"
                >{{item.status|UserProcessStatusFilter}}</el-tag>

                <el-tag
                  v-if="item.status==-1"
                  type="info"
                  style="position: absolute;right: 0;"
                >{{item.status|UserProcessStatusFilter}}</el-tag>
                <el-tag
                  v-if="item.status==1"
                  type="success"
                  style="position: absolute;right: 0;"
                >{{item.status|UserProcessStatusFilter}}</el-tag>
                <el-tag
                  v-if="item.status==2"
                  type="danger"
                  style="position: absolute;right: 0;"
                >{{item.status|UserProcessStatusFilter}}</el-tag>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="elFormItem" label="流程名称">
                  <span>{{item.name}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item v-if="item.processFileGUID" class="elFormItem" label="相关附件">
                  <el-link :href="`/v1/api/Files/${item.processFileGUID}`" target="_blank">点击下载</el-link>
                </el-form-item>
                <el-form-item v-if="!item.processFileGUID" class="elFormItem" label="相关附件">
                  <span>暂无附件</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="elFormItem" label="所属部门">
                  <span>{{item.departmentName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item v-if="item.processFileGUID" label="我的附件" class="elFormItem">
                  <el-upload
                    :action="`/v1/api/Files/UserProcess/UploadFile/${item.id}`"
                    :headers="{Authorization:`Bearer ${token}`}"
                    :on-success="(resp)=>uploadSuccess(resp,index)"
                    :before-remove="beforeRemove"
                    :on-preview="handlePreview"
                    :file-list="item.userFileGUID?[{name: '我的附件', url: `${item.userFileGUID}`}]:[]"
                  >
                    <el-button size="small" type="primary">上传</el-button>
                  </el-upload>
                </el-form-item>
                <el-form-item v-if="!item.processFileGUID" class="elFormItem" label="我的附件">
                  <span>无需上传</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item class="elFormItem" label="详细说明">
              <p v-html="item.description"></p>
            </el-form-item>
          </div>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { UserServiceView, UserProcessView } from "@/api/models";
import { GetUserProcessList, GetUserServiceView } from "@/api";
import { UserModule } from "@/store/modules/user";

interface PFlieList {
  processFile: string;
  userFile: string;
}

@Component({})
export default class ServiceDeatil extends Vue {
  @Prop({ default: null })
  userServiceId: number;
  service: UserServiceView | null = null;
  processViewList: UserProcessView[] | null = null;
  activeName = ["1", "2"];

  processFile: PFlieList[] = [];

  mounted() {
    GetUserServiceView({ id: this.userServiceId as number }).then(resp => {
      this.service = resp.data!;
      console.log(this.service);
    });
    GetUserProcessList({ userServiceId: this.userServiceId as number }).then(
      resp => {
        this.processViewList = resp.data!;
        this.processViewList.forEach(item => {
          if (item.processFileGUID) {
            this.processFile.push({
              processFile: item.processFileGUID,
              userFile: item.userFileGUID
            });
          }
        });
      }
    );
  }
  back() {
    this.$emit("go-back");
  }

  get token() {
    return UserModule.getToken;
  }
  uploadSuccess(resp: any, index: number) {
    this.processViewList![index].userFileGUID = resp.data as string;
    this.$message({ type: "success", message: "上传成功,可重新上传覆盖！" });
  }
  beforeRemove() {
    this.$message({ type: "warning", message: "不可删除,可重新上传覆盖！" });
    return false;
  }
  handlePreview(file: any) {
    // const HTTP = new XMLHttpRequest();
    // HTTP.open("get", `/v1/api/Files/${file.url}`);
    // HTTP.send();
    let a = document.createElement("a");
    let filename = "what-you-want.txt";
    a.href = `/v1/api/Files/${file.url}`;
    a.download = filename;
    a.click();
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