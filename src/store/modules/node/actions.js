import axios from 'axios'

import * as types from './mutation-types'

const API_URL = process.env.API_URL

export const fetchManageableNodes = ({ commit, state }, { orgId, filters }) => {
  /*
    Fetches Nodes that can be managed by the current user.
    You can change the filters by passing filters in the payload.
  */
  let params = filters
  if (!params) {
    params = {
      role: 'manage',
      layout: 'flat',
      types: 'organization,group,site,floor'
    }
  }

  const url = `${API_URL}/node/${orgId}/tree/`
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params }).then((response) => {
      commit(types.SET_MANAGEABLE_NODES, response.data.data)
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const updateNode = ({ commit, state }, { nodeId, ...payload }) => {
  return new Promise((resolve, reject) => {
    axios.patch(`${API_URL}/node/${nodeId}/`, payload).then(response => {
      console.log(response.data)
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}
