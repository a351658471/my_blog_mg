import router from '@/router'

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !localStorage.token) {
    return next('/login')
  }
   next()
})