import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('@views/Index')
const Root = () => import('@views/Root')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/root',
      name: 'Root',
      component: Root
    }
  ]
})
