import { createRouter, createWebHistory } from 'vue-router'
import AdminCrudProductsView from '@/views/AdminCrudProductsView.vue'
import AdminProductsView from '@/views/AdminProductsView.vue'
import AdminClientsView from '@/views/AdminClientsView.vue'
import AdminOrdersView from '@/views/AdminOrdersView.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'admin',
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
    }
  ]
})

export default router
