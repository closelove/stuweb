import Vue from 'vue' // 引入 Vue
import VueRouter from 'vue-router' // 引入 Vue 路由
import Layout from '@/layout'

Vue.use(VueRouter) // 安装插件

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login')}, // 配置默认的路径，默认显示登录页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  { path: '/error', component: () => import('@/views/error'), hidden: true } // 配置登录失败页面，使用时需要使用 path 路径来实现跳转
]


const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
