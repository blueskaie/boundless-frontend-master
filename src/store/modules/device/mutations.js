import * as types from './mutation-types'

const mutations = {
  [types.SET_MERAKI_ORGS] (state, merakiOrgs) {
    state.merakiOrgs = merakiOrgs
  },
  [types.SET_DEVICE_VENDORS] (state, deviceVendors) {
    state.deviceVendors = deviceVendors
  },
  [types.SET_DEVICE_IMPORT_OPTIONS] (state, deviceImportOptions) {
    state.deviceImportOptions = deviceImportOptions
  }
}

export default mutations
