import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/addNew',
    name: 'Add New',
    component: () => import(/* webpackChunkName: "new" */ '../views/AddNew.vue'),
  },
  {
    path: '/:pokemon',
    name: 'pokemon',
    component: () => import(/* webpackChunkName: "new" */ '../views/Pokemon.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
