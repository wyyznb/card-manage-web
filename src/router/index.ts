
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
		path: '/',
		redirect:'/login',
	},
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '系统首页',
      keepAlive: false,
			requireAuth: true
		},
    component: () => import('@/pages/Home/index.vue')
  },
  {
    path: '/productList',
    name: 'productList',
    meta: {
      title: '商品列表',
      keepAlive: false,
			requireAuth: true
		},
    component: () => import('@/pages/ProductList/index.vue')
  },
  {
    path: '/belongPlat',
    name: 'belongPlat',
    meta: {
      title: '所属平台',
      keepAlive: false,
			requireAuth: true
		},
    component: () => import('@/pages/BelongPlat/index.vue')
  },
  {
    path: '/orderList',
    name: 'orderList',
    meta: {
      title: '订单列表',
      keepAlive: false,
			requireAuth: true
		},
    component: () => import('@/pages/OrderList/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      keepAlive: false,
			requireAuth: false
		},
    component: () => import('@/pages/Login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
