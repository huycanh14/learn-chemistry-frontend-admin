import Vue from 'vue'
import Vuex from 'vuex'
import accounts from '../modules/account.module'
import grades from '../modules/grade.module'
import chapters from '../modules/chapter.module'
import documents from '../modules/document.module'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    accounts,
    grades,
    chapters,
    documents
  }

})
