import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/index.vue'
const NoteManage = ()=> import('@/views/noteManage')
const Profile = ()=> import('@/views/profile')
const Item1 = ()=> import('@/views/group/item1')
const Item2 = ()=> import('@/views/group/item2')
import store from '../store/index'

const routes = [
	{
		path: '/Layout',
		component: Layout,
		children: [
			{
				path:'/noteManage',
				component:NoteManage,
				meta: { title: '笔记管理', icon: 'dashboard' }
			},
			{
				path:'/profile',
				component:Profile,
				meta: { title: '个人信息', icon: 'dashboard' }
			},
			{
				path:'/group',
				meta: { title: 'Menu1', icon: 'dashboard' },
				children:[
					{
						path:'item1',
						component:Item1,
						meta: { title: 'Item1', icon: 'dashboard' }
					},
					{
						path:'item2',
						component:Item2,
						meta: { title: 'Item2', icon: 'dashboard' }
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
