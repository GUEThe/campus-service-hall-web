import Vue from "vue";

import { DeptModule } from "@/store/modules/dept";

Vue.filter("ServiceTypeFilter", (value: number) => {
  switch (value) {
    case 1:
      return "教师办事";
    case 2:
      return "学生学生";
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
