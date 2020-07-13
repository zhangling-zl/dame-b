<template>
  <div>
    <div class="there flex">
      <el-card class="box-card flex1 mr10">
        <div class="w100 h100">
          <ve-radar :data="chartData1"></ve-radar>
        </div>
      </el-card>
      <el-card class="box-card flex1 mr10">
        <ve-ring :data="chartData2" :settings="chartSettings"></ve-ring>
      </el-card>
      <el-card class="box-card flex1">
        <ve-histogram :data="chartData3"></ve-histogram>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  components: {},
  data() {
    this.chartSettings = {
      roseType: "radius"
    };
    return {
      chartData1: {
        columns: [],
        rows: []
      },
      chartData2: {
        columns: [],
        rows: []
      },
      chartData3: {
        columns: [],
        rows: []
      }
    };
  },
  methods: {
    //雷达图请求
    getradarChat() {
      axios
        .get("/api/radarChat")
        .then(res => {
          //   console.log(res.data);
          if (res.data.code === 0) {
            // console.log(res.data);
            this.chartData1.columns = Object.keys(res.data.data[0]); //Object.keys代表对象的title（名字）
            this.chartData1.rows = res.data.data; //给chartData里面的rows赋值等于这个数据
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //饼图请求
    getringChat() {
      axios
        .get("/api/ringChat")
        .then(res => {
          //   console.log(res.data);
          if (res.data.code === 0) {
            console.log(res.data);
            this.chartData2.columns = Object.keys(res.data.data[0]); //Object.keys代表对象的title（名字）
            this.chartData2.rows = res.data.data; //给chartData里面的rows赋值等于这个数据
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //柱状图请求
    gethomeChat() {
      axios
        .get("/api/homeChat")
        .then(res => {
          console.log(res.data);
          this.chartData3.columns = Object.keys(res.data.data[0]); //Object.keys代表对象的title（名字）
          this.chartData3.rows = res.data.data; //给chartData里面的rows赋值等于这个数据
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getradarChat();
    this.getringChat();
    this.gethomeChat();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>