import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'//首页
import layout from '../views/layout/layout'//公共路由

Vue.use(VueRouter)

  const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  //   meta:{
  //     title:'首页'
  //   }
  // },
  {
    path: '/home',
    redicect:'/'
  },
  {
    path:'/',
    component: layout,
    children:[
      {
        path: '',
        name: 'Home',
        component: Home,
        meta:{
          title:'首页'
        }
      },
      {
        path: 'pagination',
        name: 'Pagination',
        component: () =>import('../views/pagination/Pagination'),
        meta:{
          title:'分页表格'
        }
      },
      {
        path: 'published',
        name: 'Published',
        component: () =>import('../views/Published/Published'),
        meta:{
          title:'已发布'
        }
      },
      {
        path: 'statistics',
        name: 'Statistics',
        component: () =>import('../views/statistics/Statistics'),
        meta:{
          title:'统计'
        }
      },
      {
        path: 'publish',
        name: 'Publish',
        component: () =>import('../views/publish/Publish'),
        meta:{
          title:'发表文章'
        }
      },
      {
        path: 'bookmark',
        name: 'Bookmark',
        component: () =>import('../views/bookmark/Bookmark'),
        meta:{
          title:'标签页'
        }
      },
      {
        path: 'exportexcl',
        name: 'Exportexcl',
        component: () =>import('../views/exportExcl/Exportexcl'),
        meta:{
          title:'导出texcl'
        }
      },
      {
        path: 'uploadpicture',
        name: 'Uploadpicture',
        component: () =>import('../views/uploadpicture/Uploadpicture'),
        meta:{
          title:'图片上传'
        }
      },
      {
        path: 'exitsystem',
        name: 'Exitsystem',
        component: () =>import('../views/exitsystem/Exitsystem.vue'),
        meta:{
          title:'退出系统'
        }
      },
      
      
    ]
  },




  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login'),
    meta:{
      title:'登录'
    }
  },
  {
    path: '/registered',
    name: 'Registered',
    component: () => import('../views/login/Registered'),
    meta:{
      title:'注册'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//路由守卫
router.beforeEach((to,from,next)=>{
   document.title=to.meta.title//路由守卫改变页面的标题
   let user = localStorage.getItem('user')
   if(to.path==='/login' || to.path==='/registered')next()
   else user ? next() : next('login')

})
export default router
