/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: '登录',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/home',
    name: '主页',
    component: () => import('../components/Home.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const tokenStr = window.sessionStorage.getItem('access_token')
  if (!tokenStr) {
    return next('/login')
  }
  next()
})

export default router
