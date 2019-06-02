<template>
  <div class="app-container">
    <img src="../../assets/guide.png">
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
.app-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>