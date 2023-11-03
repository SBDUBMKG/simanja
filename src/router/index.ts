// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

// Import your Vue components here
import HomePage from '@/views/HomePage.vue'; // Adjust the path accordingly
import UserLoginPage from '@/views/UserLoginPage.vue';
import DashBoard from '@/views/DashBoard.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: UserLoginPage,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashBoard,
  },
  
  // Add more routes
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
