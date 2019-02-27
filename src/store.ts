import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

interface State {
  language: string
  token: string
  gameList: number
}

const vuexLocal = new VuexPersistence<State>({
  key: 'pressurizer',
})

export default new Vuex.Store<State>({
  state: {
    language: 'en',
    token: '',
    gameList: 0,
  },
  mutations: {
    SET_LANGUAGE(state, lang) {
      state.language = lang
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_GAMELIST(state, gameList) {
      state.gameList = gameList
    },
  },
  actions: {
    language({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    token({ commit }, token) {
      commit('SET_TOKEN', token)
    },
    gameList({ commit }, gameList) {
      commit('SET_GAMELIST', gameList)
    },
  },
  getters: {
    language: (state) => state.language,
    token: (state) => state.token,
    gameList: (state) => state.gameList,
  },
  plugins: [vuexLocal.plugin],
})
