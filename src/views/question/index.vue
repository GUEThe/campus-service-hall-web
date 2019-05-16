<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>在线咨询</span>
          </div>
          <div>
            <el-form :model="question" :rules="rules" ref="questionForm">
              <el-form-item prop="name">
                <el-input
                  prefix-icon="el-icon-user-solid"
                  placeholder="请输入您的名字"
                  autocomplete="off"
                  v-model="question.name"
                  clearable
                ></el-input>
              </el-form-item>

              <el-form-item prop="phone">
                <el-input
                  prefix-icon="el-icon-phone"
                  placeholder="请留下您的手机号码"
                  v-model="question.phone"
                  autocomplete="off"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item prop="mail">
                <el-input
                  v-model="question.mail"
                  prefix-icon="el-icon-message"
                  placeholder="请留下您的邮箱"
                  autocomplete="off"
                  type="mail"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item prop="serviceId">
                <el-select
                  v-model="question.serviceId"
                  style="width:100%"
                  clearable
                  placeholder="请选择咨询的服务"
                >
                  <i slot="prefix" class="el-icon-document-copy"></i>

                  <el-option
                    v-for="item in serviceList"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="title">
                <el-input
                  v-model="question.title"
                  prefix-icon="el-icon-warning"
                  placeholder="请输入咨询的标题"
                  clearable
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item prop="content">
                <el-input
                  v-model="question.content"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入咨询的内容"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  style="width:100%"
                  @click="postQuestion"
                  :loading="loading"
                  type="primary"
                >咨 询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="所属店铺">
                  <span>{{ props.row.shop }}</span>
                </el-form-item>
                <el-form-item label="商品 ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="店铺 ID">
                  <span>{{ props.row.shopId }}</span>
                </el-form-item>
                <el-form-item label="商品分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="店铺地址">
                  <span>{{ props.row.address }}</span>
                </el-form-item>
                <el-form-item label="商品描述">
                  <span>{{ props.row.desc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="商品 ID" prop="id"></el-table-column>
          <el-table-column label="商品名称" prop="name"></el-table-column>
          <el-table-column label="描述" prop="desc"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GetServiceList, PostQuestion, GetQuestionList } from "@/api";
import { Service, Question, QuestionView } from "@/api/models";
import { Form } from "element-ui";

interface MyQuestion {
  title: string;
  serviceId: string | number;
  content: string;
  name: string;
  phone: string;
  mail: string;
}

@Component({})
export default class Index extends Vue {
  serviceList: Service[] | null = null;
  questionViewList: QuestionView[] | null = null;
  queryStr = {
    page: 1,
    pageSize: 20,
    name: "",
    status: 0
  };
  loading = false;

  question: MyQuestion = {
    title: "",
    serviceId: "",
    content: "",
    name: "",
    phone: "",
    mail: ""
  };

  validateMail(rule: any, value: string, callback: any) {
    let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (value === "") {
      callback(new Error("请输入邮箱"));
    } else if (!pattern.test(value)) {
      callback(new Error("邮箱格式错误"));
    } else {
      callback();
    }
  }
  rules = {
    title: [
      { required: true, message: "请输入标题", trigger: ["blur", "change"] }
    ],
    name: [
      { required: true, message: "请输入您的姓名", trigger: ["blur", "change"] }
    ],
    serviceId: [
      {
        type: "number",
        required: true,
        message: "请选择咨询的服务",
        trigger: ["blur", "change"]
      }
    ],
    mail: [{ validator: this.validateMail, trigger: ["blur", "change"] }],
    phone: [
      { required: true, message: "请输入手机号", trigger: ["blur", "change"] }
    ],
    content: [
      {
        required: true,
        message: "请输入咨询的内容",
        trigger: ["blur", "change"]
      },
      { min: 10, message: "内容长度10位以上", trigger: ["blur", "change"] }
    ]
  };
  mounted() {
    GetServiceList({ pageSize: 100 }).then(resp => {
      this.serviceList = resp.data!;
    });
  }
  getQuestionViewList() {
    GetQuestionList({}).then(resp => {
      this.questionViewList = resp.data!;
    });
  }
  postQuestion() {
    (this.$refs.questionForm as Form).validate((valid: boolean) => {
      if (valid) {
        this.loading = true;
        PostQuestion({ value: this.question as Question }).then(resp => {
          if (resp.code === 0) {
            this.$message({
              type: "success",
              message: "提问成功！"
            });
            (this.$refs.questionForm as Form).resetFields();
          } else {
            this.$message({
              type: "error",
              message: resp.message
            });
          }
        });
      }
    });
  }
}
</script>
<style lang="less" scoped>
</style>