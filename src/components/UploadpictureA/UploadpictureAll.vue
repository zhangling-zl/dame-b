<template>
  <div>
    <div class="box ">
      <div class="p20">
        <el-card class="box-card">
          <div class="Drag f24">支持拖拽</div>
          <div class="Drag1 p20">element UI自带上传功能</div>
          <el-upload class="upload-demo" drag action="/api/upload" multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <div class="Drag f24 mt20">支持剪裁</div>
          <div class="Drag1 p20">vue-image-crop-upload</div>
          <el-button type="primary" @click="toggleShow">上传图片</el-button>
          <my-upload
            @crop-success="cropSuccess"
            @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadFail"
            v-model="show"
            :width="200"
            :height="200"
            img-format="png"
            :size="size"
            langType="zh"
            :noRotate="false"
            field="file"
            url="/api/upload"
          ></my-upload>
           <!-- field="file"向服务器上传的文件名 -->
           <!--url上传接口地址，如果为空，图片不会上传  -->
           <!-- noRotate 关闭 旋转图像功能 -->
           <!--langType 语言类型，默认中文  -->
           <!--img-format="png" 图片格式  -->
          
          <img :src="imgDataUrl" />
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import "babel-polyfill";
import myUpload from "vue-image-crop-upload";
export default {
  name: "",
  props: {},
  components: {
    "my-upload": myUpload
  },
  data() {
    return {
      imgDataUrl: "",
      show: false,
      size: 2.1,
      // Avatar1:''
      
    };
  },
  methods: {
    toggleShow() {//点击上传
      this.show = !this.show;
    },
    //固定写法 图片截取完成事件（上传前), 参数( imageDataUrl, field )
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------", imgDataUrl, field);
    },
    //上传成功回调 参数( jsonData, field )  固定写法   
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      this.imgDataUrl = jsonData.files.Avatar1;
      console.log(jsonData);
      console.log("field: " + field);
    },
    //上传失败回调 参数( status, field ) 固定写法
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log("上传失败状态" + status);
      console.log("field: " + field);
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.box {
  width: 100%;
  height: calc(100vh - 60px);
  background-color: rgb(239, 241, 249);
}
el-card {
  flex: 1;
}
.Drag1 {
  width: 1100px;
  color: rgb(55, 55, 58);
  background-color: rgb(238, 238, 238);
  margin: 20px 0px;
}
</style>