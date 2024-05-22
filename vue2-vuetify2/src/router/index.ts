import Vue from 'vue';
import VueRouter, {NavigationGuardNext} from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/App.vue'),
      children: [
        {
          path: 'hello-world/options-api',
          component: () => import('@/pages/HelloWorld/OptionsApi.vue'),
        },
        {
          path: 'hello-world/class-component',
          component: () => import('@/pages/HelloWorld/ClassComponent.vue'),
        },
        {
          path: 'data-binding',
          component: () => import('@/pages/DataBinding.vue'),
        },
        {
          path: 'wrapper-component',
          component: () => import('@/pages/WrapperComponent.vue'),
        },
        {
          path: 'theme',
          component: () => import('@/pages/Theme.vue'),
        },
        {
          path: 'throw-errors',
          component: () => import('@/pages/ThrowErrors.vue'),
        },
        {
          path: 'cyclic-tree',
          component: () => import('@/pages/CyclicTree.vue'),
        },
      ]
    },
  ],
});

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext<Vue>) => {
  if (to.fullPath === from.fullPath) return;
  next();
})

export default router;
