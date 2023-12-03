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
      path: '/pokemon/:http',
      // path: '/pokemon',
      name: 'pokemon',
      http: 'http',
      component: () => import('../views/PokemonsView.vue')
    },
    {
      path: '/pokemons/:poke/:http',
      // path: '/pokemons/:poke',
      name: 'poke',
      http: 'http',
      component: () => import('../views/PokeView.vue'),
      // props: true
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
});

export default router