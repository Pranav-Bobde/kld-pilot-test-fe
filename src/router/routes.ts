import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/login', component: () => import('pages/LoginPage.vue') },
      {
        path: '/store/:storeId',
        component: () => import('pages/StorePage.vue'),
        children: [
          {
            path: 'pickup',
            component: () => import('pages/DashCoinsPage.vue'),
            meta: { requiresAuth: true },
          },
        ],
      },
      {
        path: '/cart',
        component: () => import('pages/CartPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/myaccount',
        component: () => import('pages/MyAccountPage.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
