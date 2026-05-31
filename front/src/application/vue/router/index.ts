import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '@/application/vue/views/HomeView.vue'

import RoomsListView from '@/application/vue/views/room/RoomsListView.vue'
import RoomView from '@/application/vue/views/room/RoomView.vue'
import RoomAddView from '@/application/vue/views/room/RoomAddView.vue'
import RoomUpdateView from '@/application/vue/views/room/RoomUpdateView.vue'

import BookingView from '@/application/vue/views/booking/BookingView.vue'
import BookingUpdateView from '@/application/vue/views/booking/BookingUpdateView.vue'
import BookingAddView from '@/application/vue/views/booking/BookingAddView.vue'

import LoginView from '@/application/vue/views/user/LoginView.vue'
import RegisterView from '@/application/vue/views/user/RegisterView.vue'
import ProfilView from '@/application/vue/views/user/ProfilView.vue'
import AdminView from '@/application/vue/views/user/AdminView.vue'

import NotFound from '@/application/vue/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'profil',
      // name: 'home',
      // component: HomeView,
    },
    {
      path: '/admin',
      name: 'admin-view',
      component: AdminView,
      meta: { requiresAuth: true, requiresAdmin: true },
    },

    {
      path: '/rooms-list',
      name: 'rooms-list',
      component: RoomsListView,
    },
    {
      path: '/room/',
      redirect: 'rooms-list',
      children: [
        {
          path: ':id',
          name: 'room-view',
          component: RoomView,
        },
        {
          path: ':id/booking',
          name: 'booking-ad',
          component: BookingAddView,
          meta: { requiresAuth: true },
        },
        {
          path: 'add',
          name: 'room-add',
          component: RoomAddView,
          meta: { requiresAuth: true, requiresAdmin: true },
        },
        {
          path: ':id/update',
          name: 'room-update',
          component: RoomUpdateView,
          meta: { requiresAuth: true, requiresAdmin: true },
        },
      ],
    },

    {
      path: '/booking/',
      redirect: 'profil',
      children: [
        {
          path: ':id',
          name: 'booking',
          component: BookingView,
          meta: { requiresAuth: true },
        },
        {
          path: ':id/update',
          name: 'booking-update',
          component: BookingUpdateView,
          meta: { requiresAuth: true },
        },
      ],
    },

    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/profil',
      name: 'profil',
      component: ProfilView,
      meta: { requiresAuth: true },
    },

    { path: '/:pathMatch(.*)*', component: NotFound },
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('jwtToken')
  const isAdmin = localStorage.getItem('isAdmin')

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresAdmin && isAdmin != 'true') {
    next('/login')
  } else {
    next()
  }
})

export default router
