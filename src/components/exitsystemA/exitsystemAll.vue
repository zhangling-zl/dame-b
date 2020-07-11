<template>
  <div>
    <div class="box j-c a-c flex">
      <div class="j-c a-c column flex">
        <h1 class="mb20">期待你的下次光临</h1>
        <el-button type="primary" size="medium" @click="open">确定退出</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      flge: false//定义一个变量,默认它是false
    };
  },
  methods: {
    //点击退出登录
    open() {
        //点击之后变量变成true
      this.flge = true; //定义一个变量
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.flge === true) {
            localStorage.clear(); //清空localStorage的数据
            this.$router.push("/login");
          }
        })
        .catch(() => {});
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.box {
  width: calc(100wh-200px);
  height: calc(100vh - 60px);
  background-color: rgb(239, 241, 249);
}
</style>