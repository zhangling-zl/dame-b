<template>
  <div class="left">
    <div v-for="(item,index) in list" :key="index">
      <el-menu
      router
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item :index="item.path">
          <i :class="item.icon"></i>
          <span >{{item.name}}</span>
        </el-menu-item>
      </el-menu>
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
      list: [
        {
          name: "首页",
          icon: "el-icon-location",
          path: "/"
        },
        {
          name: "分页表格",
          icon: "el-icon-menu",
          path: "/pagination"
        },
        {
          name: "已发布",
          icon: "el-icon-s-claim",
          path: "/published"
        },
        {
          name: "统计",
          icon: "el-icon-s-data",
          path: "/statistics"
        },
        {
          name: "发表文章",
          icon: "el-icon-sort-down",
          path: "/publish"
        },
        {
          name: "标签页",
          icon: "el-icon-setting",
          path: "/bookmark"
        },
        {
          name: "导出excl",
          icon: "el-icon-setting",
          path: "/exportexcl"
        },
        {
          name: "图片上传",
          icon: "el-icon-edit-outline",
          path: "/uploadpicture"
        },
        {
          name: "退出系统",
          icon: "el-icon-delete",
          path: "/exitsystem"
        }
      ]
    };
  },
  methods: {
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.left {
  width: 200px;
  height: 100%;
  position: fixed;
  background-color: #545c64;
  color: #fff;
}
.el-menu {
  width: 200px;
}
</style>