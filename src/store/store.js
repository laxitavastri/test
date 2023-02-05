import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    config: {}

  },
  mutations: {
    getConfig (state, config) {
      state.config = config
    }

  },
  gatters: {
    config: state => state.config

  }
})
