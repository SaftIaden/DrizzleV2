import { createApp } from 'vue';
import { Quasar } from 'quasar';
import { createPinia } from 'pinia';
import quasarIconSet from 'quasar/icon-set/svg-fontawesome-v6';

import '@quasar/extras/fontawesome-v6/fontawesome-v6.css';
import 'quasar/src/css/index.sass';

import App from './App.vue';
import router from './router/router';

const app = createApp(App);
const pinia = createPinia();

app.use(Quasar, {
  plugins: {},
  iconSet: quasarIconSet,
});
app.use(pinia);
app.use(router);

app.mount('#app');
