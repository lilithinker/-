// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
//components
import Layout from './components/layout.vue'
//pages
import IndexPage from './pages/index.vue'
import DetailPage from './pages/detail.vue'
import DetailAnaPage from './pages/detail/analysis.vue'
import DetailPubPage from './pages/detail/publish.vue'
import DetailCouPage from './pages/detail/count.vue'
import DetailForPage from './pages/detail/forecast.vue'
import OrderListPage from './pages/orderList.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)

let router =new VueRouter({
	mode:'history',
	routes:[
		{
			path:'/',
			component:IndexPage
		},
		{
			path:'/orderList',
			component:OrderListPage
		},
		{
			path:'/detail',
			component:DetailPage,
			redirect:'/detail/count',
			children:[
				{
					path:'analysis',
					component:DetailAnaPage
				},
				{
					path:'forecast',
					component:DetailForPage
				},
				{
					path:'count',
					component:DetailCouPage
				},
				{
					path:'publish',
					component:DetailPubPage
				}
			]
		}
	]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<Layout/>',
  components: { Layout }
})
