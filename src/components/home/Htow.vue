<template>
  <div>
    <el-card>
      <ve-line :data="chartData"></ve-line>
    </el-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      chat: {},
      chartData: {
        columns: [],
        rows: []
      }
    };
  },
  methods: {
    //折线图
    homeChat() {
      axios
        .get("/api/homeChat")
        .then(res => {
          if (res.data.code === 0) {
            console.log(res.data);
            this.chartData.columns = Object.keys(res.data.data[0]);//Object.keys代表对象的title（名字）
            this.chartData.rows = res.data.data;//给chartData里面的rows赋值等于这个数据
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.homeChat();//调用请求的数据
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>