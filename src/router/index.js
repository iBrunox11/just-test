import Vue from 'vue'
import Router from 'vue-router'
import Products from '../components/Products.vue'
import Cart from '../components/Cart.vue'

Vue.use(Router)

// the cute routes that we use to switch the tabs inside this app
export const router = new Router({
  routes: [
    { path: '/', component: Products },
    { path: '/cart', component: Cart }
  ]
})
