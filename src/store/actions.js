import * as types from './mutation-types'
import apiService from '@/api/api.service'

const actions = {

  bootstrap ({commit, dispatch}) {
    return dispatch('user/fetchCurrentUser')
  },

  setGroupAndSiteFileStructure ({commit}, payload) {
    commit(types.UPDATE_GROUP_SITE_STRUCTURE, payload)
  },

  fetchWifiAuthorizationListing ({commit}) {
    return apiService.callApi(window.location.origin + '/static/data/wifi_authorizations_listings.json', 'get').then((response) => {
      commit(types.UPDATE_WIFI_AUTHORIZATION_LISTING, response.data)
    })
  },

  fetchDevices ({commit}) {
    apiService.callApi(window.location.origin + '/static/data/device_listing.json', 'get').then((response) => {
      commit(types.UPDATE_DEVICES, response.data)
    })
  },

  fetchMenu ({commit}) {
    apiService.callApi(window.location.origin + '/static/data/menu.json', 'get').then((response) => {
      commit(types.UPDATE_MENU, response.data)
    })
  },

  fetchCountries ({commit}) {
    apiService.callApi(window.location.origin + '/static/data/countries.json', 'get').then((response) => {
      commit(types.UPDATE_COUNTRIES, response.data)
    })
  },

  setIsMobile: ({commit}) => {
    const isMobile = window.matchMedia('only screen and (max-width: 767px)').matches
    commit(types.UPDATE_IS_MOBILE, isMobile)
  },

  setPointerIsTouch: ({ commit }, payload) => {
    commit(types.UPDATE_POUNTER_IS_TOUCH, payload)
  },

  setWindowSize: ({commit}, payload) => {
    commit(types.UPDATE_WINDOW_SIZE, payload)
  },

  setActivityIndicator ({commit}, payload) {
    commit(types.UPDATE_ACTIVITY_INDICATOR, payload)
  }

}

export default actions
