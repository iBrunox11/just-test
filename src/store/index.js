import Vue from 'vue'
import Vuex from 'vuex'
import * as typeOfMutation from './mutation-state'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// mutations
const mutations = {
}

// initial state
const state = {

}

// getters
const getters = {

}

// actions
const actions = {

}

// one store for entire application
export default new Vuex.Store({
  state,
  strict: debug,
  getters,
  actions,
  mutations
})
