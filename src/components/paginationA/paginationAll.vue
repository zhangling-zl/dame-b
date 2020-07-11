<template>
  <div class="box">
    <div class="p20">
      <!-- 搜索框 -->
      <input type="text" v-model="keyword" placeholder="请输入你想要搜索的商品名称" class="input" />
      <el-card>
        <el-table
          :data="arr.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          style="width: 100%"
        >
          <el-table-column prop="NAME" label="名称" width="400" align="center"></el-table-column>
          <el-table-column prop="GOODS_SERIAL_NUMBER" label="商品编号" width="250" align="center"></el-table-column>
          <el-table-column prop="ORI_PRICE" label="原价" align="center" width="100"></el-table-column>
          <el-table-column prop="PRESENT_PRICE" label="现价" align="center" width="100"></el-table-column>
          <el-table-column prop label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="medium" @click="modify(scope.$index, scope.row)">
                <i class="el-icon-edit mr5"></i>修改
              </el-button>
              <el-button type="danger" size="medium" @click="dli(scope.$index, scope.row)">
                <i class="el-icon-delete mr5"></i>删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 编辑的弹框 -->
      <el-dialog title :visible.sync="dialogFormVisible" width="50%">
        <el-form>
          <el-form-item label="名称">
            <el-input v-model="obj.NAME"></el-input>
          </el-form-item>
          <el-form-item label="单价">
            <el-input v-model="obj.ORI_PRICE"></el-input>
          </el-form-item>
          <el-form-item label="现价">
            <el-input v-model="obj.PRESENT_PRICE"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 分页 -->
      <div class="mt10">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="arr.length"
        ></el-pagination>
      </div>
      <div class="mt10 flex a-c">
        <download-excel
          :data="arr.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          :fields="json_fields"
          name="导出xls.xls"
          class="mr20"
        >
          <el-button type="primary" @click="Exportxls">导出xls</el-button>
        </download-excel>
        <download-excel
          :data="arr.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          :fields="json_fields"
          name="导出xls.csv"
        >
          <el-button type="danger" @click="Exportcsv">导出csv</el-button>
        </download-excel>
      
      </div>
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
      tableData: [], //原数组
      arr: [], //新数组，用来接收原数组中过滤出来的数据
      currentPage: 1, //表示当前页数
      pagesize: 7, //表示每一页的条数
      flge: false,
      dialogFormVisible: false, //编辑弹框，默认不显示
      obj: {}, //定义一个空对象，用这个空对象赋值给原数组每一项的一行
      keyword: "", //绑定的input框，双向数据绑定，给一个初始值为空
      value: "",
      //您要导出的Json Object内的字段。 如果未给出，则将导出Json中的所有属性
      json_fields: {
        名称: "NAME",
        商品编号: "GOODS_SERIAL_NUMBER",
        原价: "ORI_PRICE",
        现价: "PRESENT_PRICE"
      },
      //要导出的数据
      json_data: [],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8"
          }
        ]
      ]
    };
  },
  methods: {
    //表格数据
    gettableData() {
      axios
        .get("/api/tableData")
        .then(res => {
          if (res.data.code === 0) {
            console.log(res.data);
            this.tableData = res.data.data;
            this.arr = this.tableData;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //分页每页的条数
    handleSizeChange(val) {
      this.pagesize = val;
      console.log(`每页 ${val} 条`);
    },
    //分页当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    //点击删除 row表示当前一行
    dli(index, row) {
      this.flge = true;
      this.$confirm("此操作将删除该订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.flge === true) {
            this.tableData.splice(index, 1);
          }
        })
        .catch(() => {});
    },
    //点击修改
    modify(index, row) {
      //定义一个空对象obj,给当前每一行赋值给这个对象
      this.obj = row;
      //默认弹框是不显示的，点击编辑按钮的时候，显示编辑弹框
      this.dialogFormVisible = true;
    },
    //导出Exportxls
    Exportxls() {
      //json_data表示要导出的数据
      //要导出的数据=数组中AMOUNT===10000的每一项
      this.json_data = arr.map(item => {
        if (item.AMOUNT === 10000) {
          return item;
        }
      });
    },
    //导出Exportcsv
    Exportcsv() {
      //json_data表示要导出的数据
      //要导出的数据=数组中AMOUNT===10000的每一项
      this.json_data = arr.map(item => {
        if (item.AMOUNT === 10000) {
          return item;
        }
      });
    }
  },
  mounted() {
    this.gettableData();

    this.arr = this.tableData; //给原数组赋值
  },
  watch: {
    //监听输入框里面的内容
    keyword(val) {
      //定义一个空数组arr接收原数组中过滤出来的数据
      this.arr = this.tableData.filter(item => {
        //把每一项转换一下
        return JSON.stringify(item).includes(val);
      });
    }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
.box {
 width: calc(100wh-200px);
  height:100%;
  background-color: rgb(239, 241, 249);
}
.input {
  width: 300px;
  height: 26px;
  outline: none;
  border: none;
  border: 1px solid rgb(221, 224, 231);
  padding: 5px 10px;
  color: rgb(192, 196, 204);
  margin-bottom: 10px;
}
</style>