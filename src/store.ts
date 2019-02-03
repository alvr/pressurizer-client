import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

interface State {
  language: string
  token: string
}

const vuexLocal = new VuexPersistence<State>({
  key: 'pressurizer',
})

export default new Vuex.Store<State>({
  state: {
    language: 'en',
    token: '',
  },
  mutations: {
    SET_LANGUAGE(state, lang) {
      state.language = lang
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
  },
  actions: {
    language({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    token({ commit }, token) {
      commit('SET_TOKEN', token)
    },
  },
  getters: {
    language: (state) => {
      return state.language
    },
    token: (state) => {
      return state.token
    },
  },
  plugins: [vuexLocal.plugin],
})
