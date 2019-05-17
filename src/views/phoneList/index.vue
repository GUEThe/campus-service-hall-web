<template>
  <div class="app-container" v-if="deptList">
    <el-table :data="deptList" border style="width: 100%">
      <el-table-column prop="name" label="部门"></el-table-column>
      <el-table-column prop="phone" label="号码"></el-table-column>
      <el-table-column prop="description" label="备注"></el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { DeptModule } from "@/store/modules/dept";
import { Department } from "@/api/models";
@Component({})
export default class Index extends Vue {
  deptList: Department[] | null = null;
  mounted() {
    this.deptList = DeptModule.getDept;
  }
}
</script>
<style lang="less" scoped>
</style>