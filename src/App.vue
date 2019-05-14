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

