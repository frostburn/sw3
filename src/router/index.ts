import { createRouter, createWebHistory } from 'vue-router'
import ScaleView from '../views/ScaleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'scale',
      component: ScaleView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/synth',
      name: 'synth',
      component: () => import('../views/SynthView.vue')
    }
  ]
})

export default router
