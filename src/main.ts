import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as log from 'loglevel';

log.setLevel(log.levels.DEBUG);

require('typeface-oxygen');

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
