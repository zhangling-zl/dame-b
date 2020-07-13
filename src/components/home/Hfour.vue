<template>
  <div>
    <div class="four flex">
      <el-card class="box-card flex2 mr10">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="num" label="Order_No" width="300" align="center"></el-table-column>
          <el-table-column prop="price" label="Price" width="180" align="center">
            <template slot-scope="scope">
              <span class="text">￥:{{ scope.row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="Status" align="center">
            <!-- 表格里面如果要加什么东西，就用template插槽 scope.row代表这个数据的这一行 -->
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.status===0">pending</el-tag>
              <el-tag type="success" v-if="scope.row.status===1">success</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-card class="box-card flex1 mr10">
        <div slot="header" class="clearfix">
          <!--<i class="el-icon-arrow-up"></i>-->
          <i class="el-icon-arrow-down"></i>
          <div style="float: right; padding: 3px 0" type="text">Todo list</div>
        </div>
        <div class="from" v-if="todolist.length>0">
          <div v-for="(item,indenx) in todolist" :key="indenx">
            <div class="flex a-c mb25 w100 j-b from-x">
              <div class="flex a-c">
                <input type="checkbox" v-model="item.checked" @change="Radio"/>
                <div class="text2 ml10">{{item.name}}</div>
              </div>
              <i class="el-icon-circle-close icon" @click="dli(index)"></i>
            </div>
          </div>
        </div>
        <div v-else>暂无数据</div>
        <div class="flex a-c mt20">
          <div class="text2 f14">{{}}items left</div>
          <div class="text3 f14 flex j-c a-c mlr5">All</div>
          <div class="text2 f14 mr10">Active</div>
          <div class="text2 f14">Completed</div>
        </div>
      </el-card>

      <el-card class="box-card flex1">
        <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png" alt />
        <div v-for="(item,index) in title" :key="index">
          <div class="mtb10">
            <div class="text1 mb5">{{item.name}}</div>
            <el-progress :percentage="item.progress*100" v-if="item.progress*100!==100"></el-progress>
            <el-progress
              :percentage="item.progress*100"
              status="success"
              v-if="item.progress*100===100"
            ></el-progress>
          </div>
        </div>
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
    return {
      tableData: [],
      title: [],
      todolist: [],
      sun: false,
      flge: false
    };
  },
  methods: {
    //订单请求
    getorderData() {
      axios
        .get("/api/orderData")
        .then(res => {
          if (res.data.code === 0) {
            this.tableData = res.data.data;
          }
          //   console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //进度条
    getproGress() {
      axios
        .get("/api/progress")
        .then(res => {
          if (res.data.code === 0) {
            // console.log(res.data);
            this.title = res.data.data;
          }
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //todolist请求
    gettodoList() {
      axios
        .get("/api/todoList")
        .then(res => {
          // console.log(res.data);
          if (res.data.code === 0) {
            // console.log(res.data);
            this.todolist = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //鼠标移入事件
    enter() {
      this.sun = index;
      this.flge = true;
    },
    //鼠标移出事件
    leave() {
      this.sun = index;
      this.flge = false;
    },
    //点击删除
    dli(index){
     
    },
    //单选
    Radio(){
      
    }
  },
  mounted() {
    this.getorderData();
    this.getproGress();
    this.gettodoList();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
img {
  width: 100%;
  height: 100%;
}

.from {
  border-bottom: 1px solid #ccc;
}
.from-x {
  &:hover {
    .icon {
      display: block;
    }
  }
}
.text3 {
  width: 40px;
  height: 24px;
  border: 1px solid rgb(241, 219, 219);
  
}
.icon {
  display: none;
}
</style>