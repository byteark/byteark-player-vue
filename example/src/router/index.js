import Vue from 'vue';
import VueRouter from 'vue-router';

import App from '@/App.vue';
import SampleBlogPage from '@/pages/SampleBlogPage.vue';
import SampleFillApp from '@/pages/SampleFillPage.vue';
import SampleFluidPage from '@/pages/SampleFluidPage.vue';

Vue.use(VueRouter);

const routes = [
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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.NODE_ENV === 'production'
    ? '/byteark-player-vue/'
    : '/',
  routes,
});

export default router;
