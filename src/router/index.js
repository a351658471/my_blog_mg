import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/index.vue'
const files = require.context('../views',true,/.vue/)
const layoutObj = {
	path: '/Layout',
	component: Layout,
	children: [],
}
const routes = [layoutObj]
files.keys().forEach(key => {
	if (key.indexOf('components') != -1) return //排除views中的components
	let _key = key.split('.')
	if (key.indexOf('index') != -1) {
		let path = _key[1].split('/index')
		let childrenRoute = {
			path: path[0],
			component: files(key).default,
		}
		layoutObj.children.push(childrenRoute)
	} else {
		if (_key[1] != '/Layout') {
			routes.push({
				path: _key[1],
				component: files(key).default,
			})
		}
	}
})
console.log(files.keys());
console.log(routes);
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
