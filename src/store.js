import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const isLogin = 'false'
export const store = new Vuex.Store({
  data () {
    return {
      name: 'DilipSingh'
    }
  },
  state: {

  },
  actions: {
    test () {
      return 'yes'
    }
  },
  mutations: {

  }
})
