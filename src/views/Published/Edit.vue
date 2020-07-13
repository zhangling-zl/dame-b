<template>
  <div>
    <div class="box">
      <div class="p20">
        <div class="flex j-a plr20">
          <el-button type="danger" size="small" >返回</el-button>
          <el-button type="primary" size="small" >发布</el-button>
        </div>
        <div class="form mt20">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="文章标题" prop="title">
              <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="文章摘要" prop="abstract">
              <el-input v-model="ruleForm.abstract"></el-input>
            </el-form-item>
            <div class="flex a-c">
              <el-form-item label="作者" prop="author">
                <el-input v-model="ruleForm.author"></el-input>
              </el-form-item>
              <el-form-item label="类目" prop="category" label-width="70px">
                <el-select v-model="ruleForm.category" placeholder="请选择">
                  <el-option label="Vue" value="Vue"></el-option>
                  <el-option label="React" value="React"></el-option>
                  <el-option label="Node.js" value="Node.js"></el-option>
                  <el-option label="性能优化" value="性能优化"></el-option>
                  <el-option label="JavaScript" value="JavaScript"></el-option>
                  <el-option label="小程序" value="小程序"></el-option>
                  <el-option label="工具类" value="工具类"></el-option>
                  <el-option label="其他" value="其他"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="来源" prop="source" label-width="70px">
                <el-select v-model="ruleForm.source" placeholder="请选择">
                  <el-option label="原创" value="原创"></el-option>
                  <el-option label="转载" value="转载"></el-option>
                  <el-option label="与他人合作" value="与他人合作"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="重要性" prop="star">
                <el-select v-model="ruleForm.star" placeholder="请选择">
                  <el-option label="1" value="1"></el-option>
                  <el-option label="2" value="2"></el-option>
                  <el-option label="3" value="3"></el-option>
                  <el-option label="4" value="4"></el-option>
                  <el-option label="5" value="5"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="发布时间" prop="date">
                <el-date-picker v-model="ruleForm.date" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </div>
            <el-form-item prop="text">
              <mavon-editor v-model="ruleForm.text" />
            </el-form-item>
          </el-form>
        </div>
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
      id: "",
      value: "",
      ruleForm:{},
      rules: {
        title: [
          { required: true, message: "文章标题不能为空", trigger: "blur" }
        ],
        abstract: [
          { required: true, message: "文章摘要不能为空", trigger: "blur" }
        ],
        author: [
          { required: true, message: "作者名不能为空", trigger: "blur" }
        ],

        category: [{ required: true, message: "不能为空", trigger: "blur" }],
        source: [{ required: true, message: "不能为空", trigger: "blur" }],
        star: [{ required: true, message: "不能为空", trigger: "blur" }],
        date: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {

  },
  mounted() {
    //接收已发布页面传过来的id值
    this.id = this.$route.query.id;
    console.log(this.$route);
    //查看单个文章
    axios
      .post("/api/article/article", {
        _id: this.id
      })
      .then(res => {
        console.log(res);
        this.ruleForm = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.box {
  width: calc(100wh-200px);
  height: 100%;
  background-color: rgb(239, 241, 249);
}
</style>