// router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// Import your Vue components here
import HomePage from '@/views/HomePage.vue'; // Adjust the path accordingly
import UserLoginPage from '@/views/UserLoginPage.vue';
import DashBoard from '@/views/DashBoard.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    components: HomePage,
  },
  {
    path: '/login',
    name: 'UserLogin',
    components: UserLoginPage,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    components: DashBoard,
  },
  
  // Add more routes
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
