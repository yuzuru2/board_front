import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/component/home/index.vue';
import Talks from '@/component/talks/index.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/genre/:id/:num',
      name: 'genre',
      component: Home
    },
    {
      path: '/info/:num',
      name: 'info',
      component: Home
    },
    {
      path: '/search/:str/:num',
      name: 'search',
      component: Home
    },
    {
      path: '/talks/:id/:num',
      name: 'talks',
      component: Talks
    }
  ]
});
