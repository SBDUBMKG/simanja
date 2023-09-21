// router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// Import your Vue components here
import HomePage from '@/views/HomePage.vue'; // Adjust the path accordingly

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  
  // Add more routes
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
