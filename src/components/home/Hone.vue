<template>
  <div>
    <div class="one flex">
      <el-card class="box-card flex1 mr10">
        <div class="fram w100 flex j-b a-c">
          <i class="iconfont icon-lianxiren person"></i>
          <div>
            <div class="text1 f14 mb5">New Visits</div>
            <countTo
              :startVal="startVal"
              :endVal="counter.messages"
              :duration="3000"
              class="text2"
            ></countTo>
          </div>
        </div>
      </el-card>
      <el-card class="box-card flex1 mr10">
        <div class="fram w100 flex j-b a-c">
          <i class="iconfont icon-xiaoxi xiaoxi"></i>
          <div>
            <div class="text1 f14 mb5">Messages</div>
            <countTo
              :startVal="startVal"
              :endVal="counter.purchases"
              :duration="3000"
             
              class="text2"
            ></countTo>
          </div>
        </div>
      </el-card>
      <el-card class="box-card flex1 mr10">
        <div class="fram w100 flex j-b a-c">
          <i class="iconfont icon-qian qian"></i>
          <div>
            <div class="text1 f14 mb5">Purchases</div>
            <countTo
              :startVal="startVal"
              :endVal="counter.shopping"
              :duration="3000"
             
              class="text2"
            ></countTo>
          </div>
        </div>
      </el-card>
      <el-card class="box-card flex1">
        <div class="fram w100 flex j-b a-c">
          <i class="iconfont icon-che che"></i>
          <div>
            <div class="text1 f14 mb5">Shoppings</div>
            <countTo
              :startVal="startVal"
              :endVal="counter.visits"
              :duration="3000"
              
              class="text2"
            ></countTo>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to"; //计数器插件
import axios from "axios";
export default {
  name: "",
  props: {},
  components: { countTo },
  data() {
    return {
      startVal: 0,
      counter: {}
    };
  },
  methods: {
    //计数器请求数据
    homeData() {
      axios
        .get("/api/homeData")
        .then(res => {
          if (res.data.code === 0) {
            this.counter = res.data.data;
            // console.log(res.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.homeData();
  },
  watch: {},
  computed: {}
};
</script>
<style scoped lang='scss'>
.person {
  font-size: 38px !important ;
  color: rgb(68, 200, 197);
}
.xiaoxi {
  font-size: 40px !important ;
  color: rgb(59, 162, 224);
}
.qian {
  font-size: 36px !important ;
  color: rgb(243, 99, 122);
}
.che {
  font-size: 38px !important ;
  color: rgb(254, 186, 133);
}

.text1 {
  color: rgb(144, 143, 143);
}
.text2 {
  color: rgb(111, 102, 140);
}
</style>