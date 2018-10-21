import * as types from './mutation-types'

const mutations = {
  [types.SET_USERS] (state, users) {
    state.users = users
  },
  [types.SET_USER] (state, user) {
    state.user = user
  },
  [types.SET_CURRENT_USER] (state, user) {
    state.currentUser = user
  },
  [types.SET_USER_OPTIONS] (state, options) {
    state.userOptions = options
  },
  [types.UPDATE_CURRENT_USER] (state, data) {
    const {profile, ...user} = data
    if (!global._.isEmpty(user)) {
      state.currentUser = Object.assign({}, state.currentUser, user)
    }
    if (!global._.isEmpty(profile)) {
      state.currentUser.profile = Object.assign({}, state.currentUser.profile, profile)
    }
  }
}

export default mutations
