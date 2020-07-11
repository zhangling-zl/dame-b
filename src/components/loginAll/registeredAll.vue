<template>
  <div>
    <div class="login j-c a-c flex">
      <div class="box">
        <div class="box-card">
          <div class="text5 mb20 j-c a-c flex">欢迎来到小爱后台管理系统</div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="80px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
            <!-- <el-form-item label="验证码" prop="code">
            <el-input v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
            </el-form-item>-->
            <div class="from a-c flex">
              <el-form-item>
                <el-button type="primary" @click="login">立即登录</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="registered">立即注册</el-button>
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
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 2, max: 10, message: "长度在2到10个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 15, message: "长度在6 到15个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //点击跳转到登录页面
    login() {
      this.$router.push("/login");
    },
    //点击注册
    registered() {
      //表单验证成功的方法，valid代表验证成功的时候，else代表验证不成功的时候
      this.$refs.ruleForm.validate(valid => {
        //valid是一个布尔值，如果为true，就代表验证通过，如果为false,则为验证不通过
        // this.$message.success("登录注册成功");
        // this.$router.push("/");
        //post请求传两个参数，第一个传路径，第二个传一个对象，输入的值：v-model绑定的值
        if (valid) {
          axios
            .post("/api/user/register", {
              username: this.ruleForm.username,
              password: this.ruleForm.password
              // code: this.ruleForm.code
            })
            .then(res => {
              console.log(res.data);
              if (res.data.code === 200) {
                this.$message.success(res.data.message);
                this.$router.push("/login"); //注册成功之后跳转到登录页
              } else {
                this.$message.error(res.data.message);
                (this.ruleForm.username = ""), (this.ruleForm.password = "");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
            (this.ruleForm.username = ""),
            (this.ruleForm.password = ""),
            this.$message.error("输入有误，请检查");
            return false;
        }
      });
    }
    //二维码请求
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.login {
  width: 100wh;
  height: 100vh;
  background: url("../../assets/imgs/timg (5).jpg") no-repeat;
  background-size: cover;
}
.box-card {
  width: 400px;
}
.text5 {
  width: 430px;
  height: 66px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgb(245, 245, 245);
  font-size: 18px;
}
.box {
  width: 430px;
  height: 360px;
  background-color: rgba(255, 255, 255, 0.82);
  border-radius: 5px;
}
</style>
