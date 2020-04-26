import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../components/Login.vue'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
