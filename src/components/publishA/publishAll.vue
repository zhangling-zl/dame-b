<template>
  <div>
    <div class="box">
      <div class="p20">
        <div class="flex j-b plr20" style="background-color: rgb(89,165,134)">
          <div></div>
          <div class="mtb5">
            <el-button type="danger" size="small" @click="view">查看</el-button>
            <el-button type="primary" size="small" @click="release">发布</el-button>
          </div>
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
            <div class="w100% flex j-c">
              <el-form-item>
                <el-button type="primary" @click="release">发布</el-button>
              </el-form-item>
            </div>
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
      ruleForm: {
        title: "",
        abstract: "",
        author: "",
        category: "",
        source: "",
        star: "",
        date: "",
        text: ""
      },
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
    //点击发布文章
    release() {
      //拿到对象ruleForm的dome元素
      this.$refs.ruleForm.validate(valid => {
        //如果验证条件都通过的时候，执行下面的操作
        if (valid) {
          //post请求，传两个参数，第一个路径，第二个传一个对象，输入的值
          axios
            .post("/api/article/create", {
              title: this.ruleForm.title,
              abstract: this.ruleForm.abstract,
              author: this.ruleForm.author,
              category: this.ruleForm.category,
              source: this.ruleForm.source,
              star: this.ruleForm.star,
              date: this.ruleForm.date,
              text: this.ruleForm.text
            })
            .then(res => {
              console.log(res.data);
              //这个请求code===200的时候，表示请求成功
              if (res.data.code === 200) {
                //弹框发布成功
                this.$message.success("发布成功"),
                  //将输入的数据存在localStorage里面
                  localStorage.setItem("create", JSON.stringify(this.ruleForm)),
                  //然后清空输入框
                  (this.ruleForm.title = ""),
                  (this.ruleForm.abstract = ""),
                  (this.ruleForm.author = ""),
                  (this.ruleForm.category = ""),
                  (this.ruleForm.source = ""),
                  (this.ruleForm.star = ""),
                  (this.ruleForm.date = "");
                this.ruleForm.text = "";
                //最后跳转到已发布页面
                this.$router.push("/published");
              } else {
                //否则代表请求失败
                this.$message.error(res.data.message),
                  //然后清空输入框
                  (this.ruleForm.title = ""),
                  (this.ruleForm.abstract = ""),
                  (this.ruleForm.author = ""),
                  (this.ruleForm.category = ""),
                  (this.ruleForm.source = ""),
                  (this.ruleForm.star = ""),
                  (this.ruleForm.date = "");
                this.ruleForm.text = "";
              }
            })
            .catch(err => {
              console.log(err);
            });
          //如果验证条件不通过的时候，执行下面的操作
          //清空输入框
          //弹框文章内容填写有误，请检查
        } else {
          (this.ruleForm.title = ""),
            (this.ruleForm.abstract = ""),
            (this.ruleForm.author = ""),
            (this.ruleForm.category = ""),
            (this.ruleForm.source = ""),
            (this.ruleForm.star = ""),
            (this.ruleForm.date = "");
          this.ruleForm.text = "";
          this.$message.error("文章内容填写有误，请检查");
          return false;
        }
      });
    },
    //点击跳转到已发布页面
    view() {
      this.$router.push("/published");
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
  height: 100%;
  background-color: rgb(239, 241, 249);
}
</style>
