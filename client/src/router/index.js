import Vue from 'vue'
import VueRouter from 'vue-router'
import GoodsList from '@/views/GoodsList'

Vue.use(VueRouter)

// client端的路由
export default new VueRouter({
  mode: 'history',
  routes: [
    // /路由显示GoodsList组件,该路由名为GoodsList
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    }
  ]
})
