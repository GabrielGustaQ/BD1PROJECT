import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/UserPage',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/User.vue') }],
  },
  {
    path: '/AgendaPage',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Agenda.vue') }],
  },
  {
    path: '/PromocoesPage',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Promocoes.vue') }],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
