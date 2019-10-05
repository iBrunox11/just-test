import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// start state
const state = {
  products: [],
  cart: [],
  cartMetrics: { productsLength: 0, totalCart: 0 }
}

/**
 * responsible to update 'realTime' the final values of our shopping
 */
function calcValuesOfCart() {
  let length = 0
  let total = 0
  state.cart.forEach(product => {
    if (product.lockedQuantity) {
      length += product.lockedQuantity
      total += product.lockedQuantity * product.price
    }
  });

  state.cartMetrics.productsLength = length
  state.cartMetrics.totalCart = total
}

// mutations
const mutations = {
  /**
   * Return the products to view, checking if they exist or not inside the current state
   * 
   * @param {Object} state the current state of mutation
   * @param {Object} product the current product to update the state
   */
  upsertToProducts(state, product) {
    let found = false
    state.products.map(q => {
      if (q.id === product.id) {
        found = true
        return Object.assign({}, q, product)
      }
    })
    if (!found) {
      state.products.push(product)
    }
  },
  /**
   * This function can be some complex to read at the first time
   * basically his primor intention is update/create an item inside the cart if not exist
   * with this function i could save a lot of time not coding many other functions that can do the same thing
   * 
   * @param {Object} state the current state of mutation
   * @param {Object} body technically the body to update inside state
   */
  upsertToCart(state, body) {
    let found = false
    state.cart.map(q => {
      // use the product id to validade if item exist inside cart
      if (body.product && q.id === body.product.id) {
        found = true
        // action to update the product inside cart with +1 item
        if (body.action === 'increase') {
          if (q.lockedQuantity < body.product.quantity) {
            // lock some quantity of the cart product
            q.lockedQuantity++
          }
        }
        // action decrease to update the product inside cart with -1 item
        if (body.action === 'decrease') {
          if (q.lockedQuantity > 1) {
            // unlock some quantity of the cart product
            q.lockedQuantity--
          }
        }
        // update the quantity locked of the product
        body.product.lockedQuantity = q.lockedQuantity
        return Object.assign({}, q, body.product)
      }
    })
    // when not found, we need to insert inside cart
    if (!found) {
      body.product.lockedQuantity = 1;
      state.cart.push(body.product)
    }
    calcValuesOfCart()
  },
  /**
   * Remove an item of our Cart
   * 
   * @param {Object} state the current state of mutation
   * @param {Object} body contains the current product to check and there index inside Cart
   */
  removeToCart(state, body) {
    if (state.cart[body.index].id === body.product.id) {
      state.cart[body.index].lockedQuantity = 0
      state.cart.splice(body.index, 1)
    }
    calcValuesOfCart()
  },
  /**
   * Remove all items inside the Cart
   * 
   * @param {Object} state the current state of mutation
   */
  clearCart(state) {
    state.cart = []
    calcValuesOfCart()
  }

}

// getters
const getters = {
  getAllProducts: state => state.products,
  getCart: state => state.cart,
  getCartMetrics: state => state.cartMetrics
}

// one store for entire application
export default new Vuex.Store({
  state,
  strict: debug,
  getters,
  mutations
})
