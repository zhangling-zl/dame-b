<template>
  <div>
    <div class="box">
      <div class="p20">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="`未读消息(${total1})`" name="first">
            <el-card>
              <el-table :data="str1" style="width: 100%" :show-header="false">
                <el-table-column prop="name" width="960"></el-table-column>
                <el-table-column prop="time" width="180"></el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <el-button size="mini" @click="read(scope.$index, scope.row)">标为已读</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button type="primary" size="mini" @click="readAll()">全部标为已读</el-button>
            </el-card>
          </el-tab-pane>
          <el-tab-pane :label="`已读消息(${total2})`" name="second">
            <el-card>
              <el-table :data="str2" style="width: 100%" :show-header="false">
                <el-table-column prop="name" width="960"></el-table-column>
                <el-table-column prop="time" width="180"></el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <el-button size="mini" type="danger"  @click="dli(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button type="danger" size="mini" @click="dliAll">删除全部</el-button>
            </el-card>
          </el-tab-pane>
          <el-tab-pane :label="`回收站${total3}`" name="third">
            <el-card>
              <el-table :data="str3" style="width: 100%" :show-header="false">
                <el-table-column prop="name" width="960"></el-table-column>
                <el-table-column prop="time" width="180"></el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <el-button type="warning" size="mini" @click="reduction(scope.$index, scope.row)">还原</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button type="info" size="mini" @click="reductionAll">清空回收站</el-button>
            </el-card>
          </el-tab-pane>
        </el-tabs>
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
      activeName: "first",
      str1: [
        {
          name: "【系统通知】该系统将于今晚凌晨2点到5点进行维修",
          time: "2018-04-9 20:00:00",
          Have_read: false
        },
        {
          name: " 今晚12点整点发红包，先到先得",
          time: "2018-04-21 15:00:00",
          Have_read: false
        },
        {
          name: "你的优惠券已过期",
          time: "2018-04-19 20:00:00",
          Have_read: false
        }
      ],
      str2: [],
      str3: []
    };
  },
  methods: {
    //标签页
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //点击标为已读
    read(index, row) {
      this.str1.splice(index, 1), this.str2.push(row);
    },
    //点击标为全部已读
    readAll() {
      //如果数组1的不等于空的时候，执行以下操作
      if (this.str1.length > 0) {
        //定义一个空数组2 数组2=数组2加上数组1  concat数组的合并方法
        //点击一次，数组1全部删除，数组2变成数组1的内容，用concat给数组2赋值
        this.str2 = this.str2.concat(this.str1);
        this.str1.splice(0);
      }
    },
    //点击删除
    dli(index, row) {
      this.str2.splice(index, 1), this.str3.push(row);
    },
    //点击删除全部
    dliAll() {
      if (this.str2.length > 0) {
        //定义一个空数组2 数组2=数组2加上数组1  concat数组的合并方法
        this.str3 = this.str3.concat(this.str2);
        this.str2.splice(0);
      }
    },
    //点击还原
    reduction(index,row){
      this.str3.splice(index, 1), 
      this.str2.push(row);
    },
    reductionAll(){
        this.str3.splice(0);
    }
  },
  mounted() {},
  watch: {},
  computed: {
    total1() {
      return this.str1.length;
    },
    total2() {
      return this.str2.length;
    },
    total3() {
      return this.str3.length;
    }
  }
};
</script>

<style scoped lang='scss'>
.box {
  width: calc(100wh-200px);
  height: calc(100vh - 60px);
  background-color: rgb(239, 241, 249);
}
.el-button--primary {
  margin-top: 10px;
}
.el-button--danger{
    margin-top: 10px;
}
.el-button--info{
    margin-top: 10px;
}
</style>