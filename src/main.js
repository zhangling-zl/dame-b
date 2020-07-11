import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//v-charts图图表库
import VCharts from 'v-charts'
Vue.use(VCharts)

Vue.config.productionTip = false

//element组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//vue-json-excel导出组件
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
