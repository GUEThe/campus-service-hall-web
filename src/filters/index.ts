import Vue from "vue";

import moment from "moment";

import { DeptModule } from "@/store/modules/dept";

Vue.filter("ServiceTypeFilter", (value: number) => {
  switch (value) {
    case 1:
      return "教师办事";
    case 2:
      return "学生办事";
    default:
      return "普通办事";
  }
});

Vue.filter("DeptFilter", (value: number) => {
  const deptList = DeptModule.getDept;
  let str = "未知";
  deptList.forEach(item => {
    if (item.id === value) {
      str = item.name;
    }
  });
  return str;
});

Vue.filter("TimeFilter", (value: any) => {
  if (!value) {
    return "";
  }
  return moment(value - 8 * 3600 * 1000).format("YYYY-MM-DD HH:mm");
});

Vue.filter("QuestionStatusFilter", (value: number) => {
  switch (value) {
    case 1:
      return "已回复";
    case 0:
      return "未回复";
    default:
      return "";
  }
});

Vue.filter("UserServiceStatusFilter", (value: number) => {
  switch (value) {
    case 1:
      return "已完成";
    case 0:
      return "办理中";
    default:
      return "";
  }
});

Vue.filter("UserProcessStatusFilter", (value: number) => {
  switch (value) {
    case -1:
      return "办理中";
    case 1:
      return "已完成";
    default:
      return "";
  }
});
