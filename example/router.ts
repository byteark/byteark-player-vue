import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import {
  SampleBlogPage,
  SampleFluidPage,
  SampleFillPage,
  SampleFullPage,
  SampleAutoplayPage,
  SampleAdsPage,
  SampleLazyLoadPage,
} from './pages';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Blog', component: SampleBlogPage },
  { path: '/fluid', name: 'Fluid', component: SampleFluidPage },
  { path: '/fill', name: 'Fill', component: SampleFillPage },
  { path: '/full', name: 'Full', component: SampleFullPage },
  { path: '/autoplay', name: 'Autoplay', component: SampleAutoplayPage },
  { path: '/ads', name: 'Ads', component: SampleAdsPage },
  { path: '/lazyload', name: 'LazyLoad', component: SampleLazyLoadPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
