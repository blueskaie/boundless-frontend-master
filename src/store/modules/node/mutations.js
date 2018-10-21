import * as types from './mutation-types'

const mutations = {
  [types.SET_SELECTED_NODE] (state, selectedNode) {
    state.selectedNode = selectedNode
  },
  [types.SET_MANAGEABLE_NODES] (state, manageableNodes) {
    state.manageableNodes = manageableNodes
  }
}

export default mutations
