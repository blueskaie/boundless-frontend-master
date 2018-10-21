import axios from 'axios'

import * as types from './mutation-types'
import apiService from '@/api/api.service'
import Ls from '@/services/ls'

const API_URL = process.env.API_URL
const ORG_LIST_URL = `${API_URL}/organization/`

export const fetchOrganizationOptions = ({ commit, dispatch, state }) => {
  return new Promise((resolve, reject) => {
    axios.options(ORG_LIST_URL).then((response) => {
      commit(types.UPDATE_ORGANIZATION_OPTIONS, response.data)
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

export const fetchOrganizations = ({ commit, dispatch, state }, task) => {
  return new Promise((resolve, reject) => {
    axios.get(`${API_URL}/node/organizations/`).then((response) => {
      // User is not associated with any organization by default
      // unless user was invited, so we need to return an empty list
      const organizations = response.data.data || []
      commit(types.UPDATE_ORGANIZATIONS, organizations)
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

export const fetchActivityLogs = ({ commit, dispatch, state }, task) => {
  return apiService.callApi(window.location.origin + '/static/data/activity_log.json', 'get').then((response) => {
    commit(types.UPDATE_ACTIVITY_LOGS, response.data)
  })
}

export const selectOrganization = ({ commit, dispatch, state }, organization) => {
  if (!organization) return
  Ls.set('organization', organization.id)
  commit(types.SELECT_ORGANIZATION, organization)
  dispatch('setSelectedOrgPermissions', organization.id)
}

export const setSelectedOrgPermissions = ({ commit, dispatch, state }, orgId) => {
  return new Promise((resolve, reject) => {
    axios.get(`${API_URL}/node/${orgId}/permissions/`).then((response) => {
      commit(types.SET_SELECTED_ORG_PERMISSIONS, response.data.data)
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

export const createOrganization = ({ commit, dispatch, state }, organization) => {
  return new Promise((resolve, reject) => {
    axios.post(ORG_LIST_URL, organization).then(response => {
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

export const updateOrganization = ({ commit, dispatch, state }, data) => {
  /*
    Issues `patch` request to org detail url.

    :param data:
        object -- if `id` is present then that will be the org that will be updated:
        {
          id: 1,
          logo: null,
          email_config: {
            host: 'samplehost'
          }
        }
  */
  let orgId = state.selectedOrganization.id
  if (data.id) {
    orgId = data.id
  }
  return new Promise((resolve, reject) => {
    axios.patch(`${ORG_LIST_URL}${orgId}/`, data).then(response => {
      const updatedOrg = response.data.data

      commit(types.UPDATE_ORG_IN_LIST, updatedOrg)
      commit(types.SELECT_ORGANIZATION, updatedOrg)

      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

export const uploadOrganizationLogo = ({ commit, dispatch, state }, data) => {
  /*
    Uploads new logo to organization.

    :param data:
        object -- Should contain orgId and file
        {
          orgId: 1,
          logo: files[0]
        }
  */
  return new Promise((resolve, reject) => {
    const formData = new FormData()
    formData.append('file', data.logo, data.logo.name)
    axios.put(`${ORG_LIST_URL}${data.orgId}/upload-logo/`, formData).then(response => {
      const updatedOrg = {...state.selectedOrganization, logo: response.data.data.file}

      commit(types.UPDATE_ORG_IN_LIST, updatedOrg)
      commit(types.SELECT_ORGANIZATION, updatedOrg)

      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

export const deleteOrganization = ({ commit, dispatch, state }, orgId) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${ORG_LIST_URL}${orgId}/`).then(response => {
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

export const sendTestEmail = ({ state }, orgId) => {
  let id = orgId
  if (!id) {
    id = state.selectedOrganization.id
  }
  return new Promise((resolve, reject) => {
    axios.get(`${ORG_LIST_URL}${id}/test-email/`).then(response => {
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

export const sendTestSms = ({ state }, orgId) => {
  let id = orgId
  if (!id) {
    id = state.selectedOrganization.id
  }
  return new Promise((resolve, reject) => {
    axios.get(`${ORG_LIST_URL}${id}/test-sms/`).then(response => {
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

export const loadArubaDevices = ({ state }, { orgId, ...payload }) => {
  let id = orgId
  if (!id) {
    id = state.selectedOrganization.id
  }
  return new Promise((resolve, reject) => {
    axios.post(`${ORG_LIST_URL}${id}/import/aruba/load/`, payload).then(response => {
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

export const fetchSplashPages = ({ commit, dispatch, state }, task) => {
  return new Promise((resolve, reject) => {
    axios.get(
      `${ORG_LIST_URL}${state.selectedOrganization.id}/splashpage/`
    ).then((response) => {
      commit(types.SET_SPLASH_PAGES, response.data.data)
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}
