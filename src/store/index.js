import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

import auth from './modules/auth'
import campaign from './modules/campaign'
import device from './modules/device'
import node from './modules/node'
import organization from './modules/organization'
import site from './modules/site'
import splashpage from './modules/splashpage'
import user from './modules/user'
import venue from './modules/venue'
import media from './modules/media'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state,
  getters,
  mutations,
  actions,

  modules: {
    auth,
    campaign,
    device,
    node,
    organization,
    site,
    splashpage,
    venue,
    user,
    media
  }
})
