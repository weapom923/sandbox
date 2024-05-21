import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);


export default new Vuetify({
  theme: {
    themes: {
      light: {
        background: '#ffffff',
        surface: '#ffffff',
        primary: '#ffca28',
        secondary: '#5156e2',
        error: '#db3748',
      },
    },
  },
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
});