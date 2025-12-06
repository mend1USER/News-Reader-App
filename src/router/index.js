import Auth from '@/components/views/Auth.vue'
import Home from '@/components/views/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { createPinia } from 'pinia'
import TheNavbar from '@/components/TheNavbar.vue'

const pinia = createPinia()

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,

},
{
  path: '/auth',
  name: 'Auth',
  component: Auth,
 
},
{
path: '/av',
name: 'TheNavbar',
component: TheNavbar
}
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})


// router.beforeEach((to, from, next) =>{
//   const requierAuth = to.meta.auth
//   const authStore = useAuthStore(pinia)
//   const isAuthenticated = authStore.isAuthenticated

//   if(requierAuth && isAuthenticated.isAuthenticated) {
//     next()
//   } else {
//     next()
//   }
// })

export default router
