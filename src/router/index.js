import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/contador',
      name: 'contador',
      component: () => import('../views/ContadorView.vue')
    },
    {
      path: '/pokemon',
      name: 'pokemon',
      component: () => import('../views/PokemonsView.vue'),
    },
    {
      path: '/pokemon/:poke/:punto',
      name: 'poke',
      punto: 'punto',
      component: () => import('../views/PokeView.vue')
    },
    {
      path: '/favoritos',
      name: 'favoritos',
      component: () => import('../views/FavoritosView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
});

export default router