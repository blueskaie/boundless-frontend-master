import axios from 'axios'
import * as types from './mutation-types'

const API_URL = process.env.API_URL

export const inviteUser = ({ commit, dispatch, state }, data) => {
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/invite/`, data).then(response => {
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

export const fetchUsers = ({ commit, dispatch, state }, filters) => {
  return new Promise((resolve, reject) => {
    axios.get(`${API_URL}/user/`, { params: filters }).then(response => {
      commit(types.SET_USERS, response.data.data.results)
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

export const fetchUser = ({ commit, dispatch, state }, userId) => {
  return new Promise((resolve, reject) => {
    axios.get(`${API_URL}/user/${userId}/`).then(response => {
      commit(types.SET_USER, response.data.data)
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

export const fetchCurrentUser = ({ commit, dispatch, state }) => {
  return new Promise((resolve, reject) => {
    axios.get(`${API_URL}/me/`).then(response => {
      commit(types.SET_CURRENT_USER, response.data.data)
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

export const updateUser = ({ commit, dispatch, state }, data) => {
  let userId = state.currentUser.id
  if (data.id) {
    userId = data.id
  }

  return new Promise((resolve, reject) => {
    axios.patch(`${API_URL}/user/${userId}/`, data).then(response => {
      commit(types.SET_CURRENT_USER, response.data.data)
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

export const fetchUserOptions = ({ commit, dispatch, state }) => {
  return new Promise((resolve, reject) => {
    const userId = state.currentUser.id
    axios.options(`${API_URL}/user/${userId}/`).then(response => {
      commit(types.SET_USER_OPTIONS, response.data)
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

export const updateUserEmail = ({ commit, dispatch, state }, data) => {
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/me/email/`, data).then(response => {
      commit(types.UPDATE_CURRENT_USER, data)
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

export const changePassword = ({ commit, dispatch, state }, data) => {
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/me/password/`, data).then(response => {
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

export const generateBoundlessKey = ({ commit, dispatch, state }, data) => {
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/me/apikey/generate/`).then(response => {
      const data = {
        profile: {
          boundless_api_key: response.data.data
        }
      }
      commit(types.UPDATE_CURRENT_USER, data)
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

export const deleteBoundlessKey = ({ commit, dispatch, state }, data) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${API_URL}/me/apikey/delete/`).then(response => {
      const data = {
        profile: {
          boundless_api_key: ''
        }
      }
      commit(types.UPDATE_CURRENT_USER, data)
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}
