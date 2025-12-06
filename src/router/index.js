import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'


const routes = [{
  path: '/home',
  name: 'Home',
  component: () => import('@/components/views/Home.vue'),
  meta: {
    auth: true
  }

},
{
  path: '/',
  name: 'Auth',
  component: () => import('@/components/views/Auth.vue'),
  meta: {
    auth: false
  }
 
},
{
path: '/nav',
name: 'TheNavbar',
component: () => import('@/components/TheNavbar.vue'),
meta: {
  auth: true
}
}
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const requireAuth = to.meta.auth
  const isAuthenticated = authStore.isAuthenticated

if (requireAuth && !isAuthenticated) {
  next('/?message=auth')
  } else {
    next()
  }
})



export default router
