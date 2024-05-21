import "reflect-metadata";
import Vue from 'vue';
import Index from '@/Index.vue';
import vuetify from '@/plugins/vuetify';
import router from '@/router';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: (h) => h(Index),
}).$mount('#app');