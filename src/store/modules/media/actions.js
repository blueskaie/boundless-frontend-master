import * as types from './mutation-types'
import axios from 'axios'
import router from '@/router'

const API_URL = process.env.API_URL

export const addFile = ({ commit, dispatch, state }, file) => {
  commit(types.ADD_FILE, file)
}

export const fetchFiles = ({ commit, dispatch, state }, orgKey) => {
  let currentOrg = orgKey || router.currentRoute.params.orgId
  return new Promise((resolve, reject) => {
    axios.get(`${API_URL}/organization/${currentOrg}/asset/`).then((response) => {
      resolve(response)
      commit(types.UPDATE_FILES, response.data.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const deleteFile = ({ commit, dispatch, state }, file) => {
  let currentOrg = router.currentRoute.params.orgId
  return new Promise((resolve, reject) => {
    axios.delete(`${API_URL}/organization/${currentOrg}/asset/${file.id}`).then((response) => {
      console.log(response)
      resolve(response)
      commit(types.DELETE_FILE, file)
    }).catch(err => {
      reject(err)
    })
  })
}
