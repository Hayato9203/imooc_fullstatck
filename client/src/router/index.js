import Vue from 'vue'
import VueRouter from 'vue-router'
import GoodsList from '@/views/GoodsList'

Vue.use(VueRouter)

// client端的路由
export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    }
  ]
})
