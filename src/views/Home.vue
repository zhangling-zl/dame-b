<template>
  <div>
    <div class="box">
      <div class="p20 ">
        <Hone></Hone>
      </div>
      <div class="plr20">
        <Htow></Htow>
      </div>
      <div class="p20">
        <Hthere></Hthere>
      </div>
       <div class="plr20 pb20">
        <Hfour></Hfour>
      </div>
    </div>
  </div>
</template>

<script>
import Hone from "../components/home/Hone";
import Htow from '../components/home/Htow'
import Hthere from '../components/home/Hthere'
import Hfour from '../components/home/Hfour'

export default {
  name: "",
  props: {},
  components: {
    Hone,
    Htow,
    Hthere,
    Hfour,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.box {
  width: 100%;
  height: calc(100vh-60px);
  background-color: rgb(239, 241, 249);
}
</style>
