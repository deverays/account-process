import { createRouter, createWebHistory } from 'vue-router'
import imports from '@/utils/imports'

const publicRoutes = [
  {
    name: 'home',
    path: '/',
    component: () => import('../views/home')
  },
  {
    name: 'recovery',
    path: '/recovery',
    component: () => import('@/views/recovery')
  },
  {
    name: 'connection',
    path: '/connection',
    component: () => import('@/views/connection')
  }
]

const usersRoutes = [
  {
    path: '/users',
    redirect: '/recovery',
    children: [
      {
        name: 'signin',
        path: 'signin',
        component: () => import('@/views/users/signin')
      },
      {
        name: 'signup',
        path: 'signup',
        component: () => import('@/views/users/signup')
      },
      {
        name: 'forgot-username',
        path: 'forgot-username',
        component: () => import('@/views/users/forgot-username')
      },
      {
        name: 'forgot-password',
        path: 'forgot-password',
        component: () => import('@/views/users/forgot-password')
      },
      {
        name: 'refresh-password',
        path: 'refresh-password/:code',
        component: () => import('@/views/users/refresh-password')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...publicRoutes, ...usersRoutes, { path: '/:pathMatch(.*)', redirect: '/' }]
})

router.beforeEach((to, from, next) => {
  const { store, watch } = imports()
  document.title = import.meta.env.VITE_PROJECT_TITLE

  const authReq = ['signin', 'signup']

  watch(
    () => store._isLogin,
    (value) => {
      if (value && authReq.includes(to.name as string)) router.push('/')
    }
  )

  next()
})

export default router
