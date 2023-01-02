import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/index.vue'
const Dashboard = ()=> import('@/views/dashboard')
const NoteManage = ()=> import('@/views/noteManage')
const Profile = ()=> import('@/views/profile')
const SkillManage = ()=> import('@/views/skillManage')
const Login = ()=> import('@/views/login.vue')
import store from '../store/index'

const routes = [
	{
		path: '/',
    redirect: '/dashboard',
		component: Layout, 
		children: [
      {
				path:'/dashboard',
				component:Dashboard,
				meta: { title: '首页', icon: 'TrendCharts' }
			},
			{
				path:'/noteManage',
				component:NoteManage,
				meta: { title: '笔记管理', icon: 'Document' }
			},
			{
				path:'/profile',
				component:Profile,
				meta: { title: '个人信息', icon: 'UserFilled' }
			},
      {
				path:'/skillManage',
				component:SkillManage,
				meta: { title: '技能管理', icon: 'Flag' }
			},
		],
	},
  {
    path:'/login',
    component:Login
  }
]
store.commit('routes/SET_MENUROUTES', routes[0])
const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
