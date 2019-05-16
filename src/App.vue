<template>
  <div id="app">
    <el-container>
      <el-header>
        <Header/>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>
        <Footer/>
      </el-footer>
    </el-container>
    <div class="page-component-up">
      <i class="el-icon-caret-top"></i>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header/index.vue";
import Footer from "@/components/Footer/index.vue";
@Component({
  components: {
    Header,
    Footer
  }
})
export default class Index extends Vue {
  mounted() {}
}
</script>
<style lang="less" scoped>
.page-component-up {
  background-color: #fff;
  position: fixed;
  right: 100px;
  bottom: 150px;
  width: 40px;
  height: 40px;
  size: 40px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  z-index: 5;
}
.page-component-up i {
  color: #409eff;
  display: block;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
}
</style>


