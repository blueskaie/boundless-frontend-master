import axios from 'axios'

import * as types from './mutation-types'

const API_URL = process.env.API_URL

export const fetchSiteOptions = ({ commit, state }) => {
  return new Promise((resolve, reject) => {
    axios.options(`${API_URL}/site/`).then((response) => {
      commit(types.SET_SITE_OPTIONS, response.data)
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}
