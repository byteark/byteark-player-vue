import { createRouter, createWebHistory } from 'vue-router';

import App from '@/App.vue';
import SampleBlogPage from '@/pages/SampleBlogPage.vue';
import SampleFillApp from '@/pages/SampleFillPage.vue';
import SampleFluidPage from '@/pages/SampleFluidPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      component: App,
      children: [
        {
          path: '/',
          name: 'SampleBlog',
          component: SampleBlogPage,
        },
        {
          path: '/fluid',
          name: 'Fluid',
          component: SampleFluidPage,
        },
        {
          path: '/fill',
          name: 'Fill',
          component: SampleFillApp,
        },
      ],
    },
  ],
});

export default router;
