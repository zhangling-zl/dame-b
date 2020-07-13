<template>
  <div>
    <div class="box">
      <div class="p20">
        <div class="from">
          <el-table
            :data="create.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            style="width: 100%"
            border
          >
            <el-table-column type="index" label="#" width="50" align="center"></el-table-column>
            <el-table-column prop="title" label="标题" width="200" align="center"></el-table-column>
            <el-table-column prop="author" label="作者" width="100" align="center"></el-table-column>
            <el-table-column prop="category" label="类目" width="120" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.category==='Vue'">
                  <el-tag type="success">Vue</el-tag>
                </div>
                <div v-if="scope.row.category==='React'">
                  <el-tag type="info">React</el-tag>
                </div>
                <div v-if="scope.row.category==='Node.js'">
                  <el-tag type="success">Node.js</el-tag>
                </div>
                <div v-if="scope.row.category==='性能优化'">
                  <el-tag type="warning">性能优化</el-tag>
                </div>
                <div v-if="scope.row.category==='JavaScript'">
                  <el-tag type="warning">JavaScript</el-tag>
                </div>
                <div v-if="scope.row.category==='小程序'">
                  <el-tag>小程序</el-tag>
                </div>
                <div v-if="scope.row.category==='工具类'">
                  <el-tag type="success">工具类</el-tag>
                </div>
                <div v-if="scope.row.category==='其他'">
                  <el-tag>其他</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="source" label="来源" width="120" align="center"></el-table-column>
            <el-table-column prop="star" label="重要性" width="160" align="center">
              <template slot-scope="scope">
                <el-rate v-model="scope.row.star" disabled text-color="#ff9900"></el-rate>
                <!--v-model绑定的是每一行的star这个值-->
              </template>
            </el-table-column>
            <el-table-column prop="date" label="发布时间" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="dli(scope.$index, scope.row)">删除</el-button>
                <el-button type="success" size="mini" @click="view(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="mt20">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="create.length"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      create: [],
      id: "",
      pagesize: 9,
      currentPage: 1,
      id: ""
    };
  },
  methods: {
    //获取所有的文章
    getArticle() {
      axios
        .get("/api//article/allArticle")
        .then(res => {
          if (res.data.code === 200) {
            // console.log(res.data);
            res.data.data.map(item => {
              item.star = item.star * 1;
              item.date = dayjs(item.date).format("YYYY年MM月DD日mm分ss秒");
            });
            (this.create = res.data.data), (this.id = res.data.id);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //  分页 每页有多少条
    handleSizeChange(val) {
      this.pagesize = val;
      console.log(`每页 ${val} 条`);
    },
    //  分页 当前页数
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    //点击删除
    dli(index, row) {
      axios
        .post("/api/article/delete", {
          id: this._id
        })
        .then(res => {
          if (res.data.code === 200) {
            this.create.splice(index, 1);
            // console.log(res.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //点击查看
    view(){
     
    },
    //点击编辑
    edit(row){
      this.$router.push({path:'/edit',puery:{id:row._id}})
    }

  },
  mounted() {
    this.getArticle();
  },
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
.from {
  box-shadow: 1px 1px 5px #ccc;
}
</style>
