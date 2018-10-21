import * as types from './mutation-types'

const mutations = {

  [types.ADD_FILE] (state, file) {
    state.files.push(file)
  },

  [types.UPDATE_FILES] (state, files) {
    state.files = files
  },

  [types.DELETE_FILE] (state, file) {
    let index = state.files.findIndex((f) => f.id === file.id)
    state.files.splice(index, 1)
  }
}

export default mutations
