import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '@/views/movie/Index'
import Playing from '@/views/movie/Playing'
import Future from '@/views/movie/Future'
import Detail from '@/views/movie/Detail'

import Cinema from '@/views/cinema/Cinema'
import My from '@/views/my/My'
import News from '@/views/news/News'
import City from '@/views/city/Index'

Vue.use(VueRouter)
// 处理路由跳转到当前页报错,改变this.$router.push()
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const routes = [
  {
    path: '/',
    redirect: '/movie/playing',
  },
  {
    path: '/movie',
    component: Index,
    children: [
      {
        path: 'playing',
        component: Playing,
      },
      {
        path: 'future',
        component: Future,
      },
      {
        path: 'detail',
        component: Detail,
      },
    ],
  },
  {
    path: '/cinema',
    component: Cinema,
  },
  {
    path: '/news',
    component: News,
  },
  {
    path: '/my',
    component: My,
  },
  {
    path: '/city',
    component: City,
  },
]

const router = new VueRouter({
  mode: 'history',
  // 前缀暂时可以不用使用
  // base: process.env.BASE_URL,
  routes,
})

export default router
