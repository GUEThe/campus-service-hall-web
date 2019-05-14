<template>
  <div class="footer">
    <p>
      网警备案号：45010302XXXXXX&nbsp;&nbsp; 桂ICP备060XXXXX&nbsp;&nbsp;
      Copyright © 2019
      <el-link class="linkTo" :underline="false">XXXXXX高校</el-link>
    </p>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Index extends Vue {
  mounted() {}
}
</script>
<style lang="less" scoped>
.linkTo {
  vertical-align: none !important;
}
</style>