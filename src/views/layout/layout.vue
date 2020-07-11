<template>
  <div>
    <el-container>
      <el-header>
        <layoutTop></layoutTop>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <layoutLeft></layoutLeft>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import layoutTop from "../../components/layoutAll/layoutTop";
import layoutLeft from "../../components/layoutAll/layoutLeft";

export default {
  name: "",
  props: {},
  components: {
    layoutTop, //导航栏
    layoutLeft
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.el-header {
  margin: 0;
  padding: 0;
}
.el-aside {
  margin: 0;
  padding: 0;
}
.el-main {
  margin: 0;
  padding: 0;
}
</style>