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
  path: '/post/:id',
  name: 'post',
  component: () => import('@/components/views/post/_id.vue'),
  meta: {
    auth: true
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

  console.log(`Router Guard: Попытка перейти на ${to.path}. Защищен: ${requireAuth}. Auth статус: ${isAuthenticated}`) // <-- ДОБАВИТЬ ЭТО

if (requireAuth && !isAuthenticated) {
  next('/?message=auth')
  } else {
    next()
  }
})



export default router
