import { boot } from 'quasar/wrappers';
import { RouteLocationNormalized } from 'vue-router';

function isAuthenticated(to: RouteLocationNormalized) {
  if (to.path.startsWith('/store')) {
    if (to.params.storeId) {
      localStorage.setItem('store_id', to.params.storeId as string);
      if (to.query.token) {
        localStorage.setItem('token', to.query.token as string);
      }
    }
  } else if (to.path.startsWith('/cart')) {
    if (to.query.token && to.query.order_id) {
      localStorage.setItem('order_id', to.query.order_id as string);
      localStorage.setItem('token', to.query.token as string);
    }
  } else if (to.path.startsWith('/myaccount')) {
    if (to.query.token) {
      localStorage.setItem('token', to.query.token as string);
    }
  }
  return localStorage.getItem('token');
}

export default boot(async ({ router }) => {
  router.beforeEach((to, from, next) => {
    console.log('to: ', to);
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!(localStorage.getItem('token') || isAuthenticated(to))) {
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    } else {
      next(); // make sure to always call next()!
    }
  });
});
