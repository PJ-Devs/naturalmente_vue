import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import UserLayout from '@/layouts/UserLayout.vue'
import AdminCrudProductsView from '@/views/AdminCrudProductsView.vue'
import AdminClientsView from '@/views/AdminClientsView.vue'
import AdminOrdersView from '@/views/AdminOrdersView.vue'
import AdminProductsView from '@/views/AdminProductsView.vue'
import { useAuthUserStore } from '../stores/authUser'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import { isAdmin } from '../API/authUsers'

export function requireUnAuth(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  const authUserStore = useAuthUserStore()
  if (authUserStore.isLoggedIn.value) {
    next({ name: 'Home' })
  } else {
    next()
  }
}

export function requireAuth(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  const authUserStore = useAuthUserStore()
  if (!authUserStore.isLoggedIn.value) {
    next({ name: 'Login' })
  } else {
    next()
  }
}

export function requireAdmin(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  isAdmin().then((response) => {
    if (!response) {
      next({ name: 'Home' })
    } else {
      next()
    }
  })
}

export function requireUnAdmin(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  const authUserStore = useAuthUserStore()
  if (!authUserStore.isLoggedIn.value) {
    next()
  } else {
    isAdmin().then((response) => {
      if (response) {
        next({ name: 'admin' })
      } else {
        next()
      }
    })
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'admin',
      beforeEnter: requireAdmin,
      component: AdminLayout,
      redirect: { name: 'admin-products' },
      children: [
        {
          path: '/admin/products',
          name: 'admin-products',
          component: AdminCrudProductsView
        },
        {
          path: '/admin/products/all',
          name: 'admin-products-all',
          component: AdminProductsView
        },
        {
          path: '/admin/clients',
          name: 'admin-clients',
          component: AdminClientsView
        },
        {
          path: '/admin/orders',
          name: 'admin-orders',
          component: AdminOrdersView
        }
      ]
    },
    {
      path: '/',
      name: 'Main',
      component: UserLayout,
      beforeEnter: requireUnAdmin,
      redirect: { name: 'Home' },
      children: [
        {
          path: '/',
          name: 'Home',
          component: HomeView
        },
        {
          path: '/login',
          name: 'Login',
          beforeEnter: requireUnAuth,
          component: () => import('../views/LoginView.vue')
        },
        {
          path: '/register',
          name: 'Register',
          beforeEnter: requireUnAuth,
          component: () => import('../views/RegisterView.vue')
        },
        {
          path: '/carrito',
          name: 'Carrito',
          beforeEnter: requireAuth,
          component: () => import('../views/ShoppingCartView.vue')
        },
        {
          path: '/productos',
          name: 'Productos',
          component: ProductsView
        },
        {
          path: '/productos/:id',
          name: 'ProductDetails',
          component: () => import('../components/Products/ProductDetails.vue')
        },
        {
          path: '/profile',
          name: 'Profile',
          beforeEnter: requireAuth,
          component: () => import('../views/ProfileView.vue'),
          children: [
            {
              path: 'account',
              name: 'Account',
              component: import('../components/Profile/Personal-information.vue')
            },
            {
              path: 'changePassword',
              name: 'ChangePassword',
              component: import('../components/Profile/SettingMyAccount.vue')
            },
            {
              path: 'buys',
              name: 'Buys',
              component: import('../views/UserBuysView.vue')
            },
            {
              path: '',
              redirect: { name: 'Account' }
            },
          ]
        }
      ]
    }
  ]
})

export default router
