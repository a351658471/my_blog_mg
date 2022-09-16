import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/index.vue'
const Dashboard = ()=> import('@/views/dashboard')
const NoteManage = ()=> import('@/views/noteManage')
const Profile = ()=> import('@/views/profile')
const Item1 = ()=> import('@/views/group/item1')
const Item2 = ()=> import('@/views/group/item2')
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
				path:'/group',
				meta: { title: 'Menu1', icon: 'List' },
				children:[
					{
						path:'item1',
						component:Item1,
						meta: { title: 'Item1', icon: 'Memo' }
					},
					{
						path:'item2',
						component:Item2,
						meta: { title: 'Item2', icon: 'Memo' }
					},
				],
			},
		],
	},
]
store.commit('routes/SET_MENUROUTES', routes[0])
const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
