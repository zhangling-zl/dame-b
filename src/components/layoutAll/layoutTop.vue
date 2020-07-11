<template>
  <div>
    <div class="nav flex a-c j-b">
      <div class="left flex a-c ml20">
        <div class="nav-title1">欢迎</div>
        <div class="nav-title2 mlr10">{{user.username}}</div>
        <div class="nav-title1">来到小爱后台管理系列</div>
      </div>
      <div class="rigth flex a-c mr20">
        <div class="nav-title3 cf mr5">{{hello}}!</div>
        <div class="nav-title3 cf">亲爱的</div>
        <div class="nav-title2 mlr10">{{user.username}}</div>
        <div class="nav-title5 cf">上次登录时间为:{{time}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      user: {},
      time: "",
      hello: ""
    };
  },
  methods: {
    getTime() {
      let d = new Date(); //new一个实例
    //   console.log(d);
      let hour = d.getHours(); //获取当前的小时数
    //   console.log(hour);
    //   判断条件
    if(hour>=6 && hour<12){
        return (this.hello='早上好')
    }if(hour>=12&&hour<14){
        return (this.hello='上午好')
    }else if(hour>=14&&hour<18){
        return (this.hello='下午好')
    }
    else if(hour>=18&&hour<24){
        return (this.hello='晚上好')
    }
    else if(hour>=24&&hour<6){
        return (this.hello='该睡觉了')
    }

    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user")); //拿到本地存储的数据
    console.log(this.user);
    this.time = dayjs(this.user.date).format("YYYY年MM月DD日HH时mm分ss秒"); //拿到登录时间
    // console.log(this.time);
    this.getTime()
  },
  watch: {},
  computed: {}
};
</script>
<style scoped lang='scss'>
.nav {
  width: 100%;
  height: 60px;
  background-color: rgb(46, 94, 133);
  position: fixed;
  z-index: 99;
}
.nav-title1 {
  color: rgb(255, 252, 248);
}
.nav-title2 {
  padding: 2px 0px;
  color: rgb(255, 252, 248);
  font-weight: 600;

  &:hover {
    border-bottom: 1px solid rgb(255, 255, 255);
    cursor: pointer;
    transition: all 0.5;
  }
}
</style>