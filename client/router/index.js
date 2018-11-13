import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import idList from '../views/idLIst'
import Search from '../views/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/idlist',
      name: 'idList',
      component: idList
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
  ]



})
