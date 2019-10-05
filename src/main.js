import "core-js/stable";
import "regenerator-runtime/runtime";
import Vue from 'vue';
import store from './store/index'
import { router } from './router'
import App from './App.vue';
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueMaterial from 'vue-material'


/**
 * Vue Material have a lot of components, can be bad run all of they if you just want to use some part of this components
 * in this case I prefered to use the full version, because was make sense inside this project
 */

Vue.use(VueMaterial)

new Vue({
  el: '#app',
  render: (h) => h(App),
  router,
  store,
});
