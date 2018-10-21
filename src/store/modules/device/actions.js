import axios from 'axios'

import * as types from './mutation-types'

const API_URL = process.env.API_URL

export const fetchMerakiOrgs = ({ commit, state }, orgId) => {
  const url = `${API_URL}/organization/${orgId}/import/meraki/organizations/`
  return new Promise((resolve, reject) => {
    axios.get(url).then((response) => {
      commit(types.SET_MERAKI_ORGS, response.data.data)
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const fetchDevices = ({ commit, state }, filters) => {
  return new Promise((resolve, reject) => {
    axios.get(`${API_URL}/device/`, { params: filters }).then((response) => {
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const fetchDeviceVendors = ({ commit, state }) => {
  const url = `${API_URL}/devicevendor/`
  return new Promise((resolve, reject) => {
    axios.get(url).then((response) => {
      commit(types.SET_DEVICE_VENDORS, response.data.data)
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const fetchDeviceImportOptions = ({ commit, state }, orgId) => {
  return new Promise((resolve, reject) => {
    axios.options(
      `${API_URL}/organization/${orgId}/import/custom/load/`
    ).then((response) => {
      commit(types.SET_DEVICE_IMPORT_OPTIONS, response.data)
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const createDevice = ({ commit, state }, payload) => {
  const url = `${API_URL}/device/`
  return new Promise((resolve, reject) => {
    axios.post(url, payload).then((response) => {
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const merakiApiImport = ({ commit, state }, {orgId, ...payload}) => {
  const url = `${API_URL}/organization/${orgId}/import/meraki/load/`
  return new Promise((resolve, reject) => {
    axios.post(url, payload).then((response) => {
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const deleteSelectedDevices = ({ commit, state }, deviceIds) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${API_URL}/device/bulk-delete/`, { params: {ids: deviceIds} }).then((response) => {
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const deleteDevice = ({ commit, state }, deviceId) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${API_URL}/device/${deviceId}/`).then((response) => {
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const moveSelectedDevices = ({ commit, state }, { targetNode, deviceIds }) => {
  return new Promise((resolve, reject) => {
    axios.post(
      `${API_URL}/node/bulk-move/`,
      { target: targetNode },
      { params: { ids: deviceIds } }
    ).then((response) => {
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const csvXlsImport = ({ commit, state }, {orgId, formData}) => {
  const url = `${API_URL}/organization/${orgId}/import/custom/load/`
  return new Promise((resolve, reject) => {
    axios.post(url, formData).then((response) => {
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}
