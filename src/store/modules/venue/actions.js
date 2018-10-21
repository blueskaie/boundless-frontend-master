import * as types from './mutation-types'
import axios from 'axios'
import router from '@/router'

const API_URL = process.env.API_URL

export const fetchCurrentOrgTree = ({ commit, dispatch, state }, filters) => {
  let currentOrg = router.currentRoute.params.orgId

  if (!filters) {
    filters = {
      types: 'organization,group,site'
    }
  }

  return new Promise((resolve, reject) => {
    axios.get(`${API_URL}/node/${currentOrg}/tree/`, { params: filters }).then((response) => {
      resolve(response)
      commit(types.UPDATE_TREE, response.data.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const addGroup = ({ commit, dispatch, state }, group) => {
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/group/`, group).then((response) => {
      return dispatch('fetchCurrentOrgTree')
    }).then((response) => {
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

export const addSite = ({ commit, dispatch, state }, group) => {
  // commit(types.ADD_GROUP, group)
}

export const updateSelectedItems = ({ commit, dispatch, state }, items) => {
  commit(types.UPDATE_SELECTED_ITEMS, items)
}

export const selectAll = ({ commit, dispatch, getters }) => {
  commit(types.UPDATE_SELECTED_ITEMS, getters.flatList)
}

export const deselectAll = ({ commit, dispatch, getters }) => {
  commit(types.UPDATE_SELECTED_ITEMS, [])
}

export const moveSelectedItems = ({ commit, getters, dispatch }, targetNode) => {
  let itemIds = getters.selectedItems.map(item => item.id).toString()

  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/node/bulk-move/`, { target: targetNode }, { params: { ids: itemIds } }).then((response) => {
      console.log(response)
      return dispatch('fetchCurrentOrgTree')
    }).then((response) => {
      dispatch('deselectAll')
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

export const deleteSelectedSites = ({ commit, getters, dispatch }) => {
  let siteIds = getters.selectedItems.map(item => item.id).toString()

  console.log(siteIds)
  return new Promise((resolve, reject) => {
    axios.delete(`${API_URL}/site/bulk-delete/`, { params: {ids: siteIds} }).then((response) => {
      return dispatch('fetchCurrentOrgTree')
    }).then((response) => {
      dispatch('deselectAll')
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

export const deleteSelectedGroups = ({ commit, getters, dispatch }) => {
  let groupIds = getters.selectedItems.map(item => item.id).toString()

  return new Promise((resolve, reject) => {
    axios.delete(`${API_URL}/group/bulk-delete/`, { params: {ids: groupIds} }).then((response) => {
      return dispatch('fetchCurrentOrgTree')
    }).then((response) => {
      dispatch('deselectAll')
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

export const deleteSelectedDevices = ({ commit, getters, dispatch }) => {
  let deviceIds = getters.selectedItems.map(item => item.id).toString()

  return new Promise((resolve, reject) => {
    axios.delete(`${API_URL}/device/bulk-delete/`, { params: {ids: deviceIds} }).then((response) => {
      return dispatch('fetchCurrentOrgTree')
    }).then((response) => {
      dispatch('deselectAll')
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

export const deleteSelectedFloors = ({ commit, getters, dispatch }) => {
  let floorIds = getters.selectedItems.map(item => item.id).toString()

  return new Promise((resolve, reject) => {
    axios.delete(`${API_URL}/floor/bulk-delete/`, { params: {ids: floorIds} }).then((response) => {
      return dispatch('fetchCurrentOrgTree')
    }).then((response) => {
      dispatch('deselectAll')
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

export const toggleDeleteDialog = ({ commit, getters }) => {
  commit(types.TOGGLE_DELETE_DIALOG)
}

export const toggleMoveDialog = ({ commit, getters }) => {
  commit(types.TOGGLE_MOVE_DIALOG)
}

export const setTreeLoading = ({ commit, getters }, loading) => {
  commit(types.UPDATE_TREE_LOADING, loading)
}

export const setAddUserDialog = ({ commit, getters }, modalState) => {
  commit(types.UPDATE_ADD_USER_DIALOG, modalState)
}

export const setAddGroupDialog = ({ commit, getters }, modalState) => {
  commit(types.UPDATE_ADD_GROUP_DIALOG, modalState)
}

export const updateSelectedNode = ({ commit, getters }, node) => {
  commit(types.UPDATE_SELECTED_NODE, node)
}
