import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import CustomerRoutes from './CustomerRoutes';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import { useRouter } from 'vue-router';

import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL;

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/views/authentication/Error.vue')
        },
        MainRoutes,
        AuthRoutes,
        CustomerRoutes
    ]
});

// router.beforeEach((to, from, next) => {
//     if (to.matched.some((record) => record.meta.requiresAuth)) {
//       const authToken = localStorage.getItem('authToken');
  
//       if (!authToken) {
//         next('/auth/login/');
//       } else {
//         next();
//       }
//     } else {
//       next();
//     }
//   });


router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const authToken = localStorage.getItem('authToken');
    const formData = {
        token       :   localStorage.getItem('authToken'),
    }

    if (!authToken) return next('/auth/login/');

    try {
      // const { data } = await axios.get('/api/validate_token/', {
      //   headers: { Authorization: `Bearer ${authToken}` },
      // });
      
      const response = await axios.post('/api/validate_token/',formData);
      console.log('check the resoponse _______',response)

      response.data.valid ? next() : (localStorage.removeItem('authToken'), next('/auth/login/'));
    } catch {
      localStorage.removeItem('authToken');
      next('/auth/login/');
    }
  } else {
    next();
  }
});
