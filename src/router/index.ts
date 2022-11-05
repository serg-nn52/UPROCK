import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import Page404View from '../views/Page404View.vue';

export enum paths {
  HOME = '/',
  LOGIN = '/login',
  PAGE404 = '/:pathMatch(.*)*',
}

const routes: Array<RouteRecordRaw> = [
  {
    path: paths.HOME,
    name: 'home',
    component: HomeView,
  },
  {
    path: paths.LOGIN,
    name: 'login',
    component: LoginView,
  },
  { path: paths.PAGE404, name: 'not-found', component: Page404View },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
