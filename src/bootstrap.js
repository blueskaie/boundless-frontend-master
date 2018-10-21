import Ls from '@/services/ls.js'
import Meta from 'vue-meta'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import VueMoment from 'vue-moment'
import VueTouch from 'vue-touch'
import Vuelidate from 'vuelidate'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import moment from 'moment-timezone'
import store from './store'

/**
 * Global Component Imports
 */

import baseSwitch from '@/components/common/base-switch'
import baseDialog from '@/components/common/base-dialog'
import tooltip from '@/components/common/tooltip'
import HelpTooltip from '@/components/common/help-tooltip'
import NodeNameInput from '@/components/common/node-name-input'

/**
 * Global Directive Imports
 */
import BLoading from '@/directives/b-loading'
import PrependSocialIcon from '@/directives/prepend-social-icon.js'

/**
 * CSS Imports
 */

import 'vuetify/dist/vuetify.min.css' // En
import 'toastr/build/toastr.min.css'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import '@/styles/main.scss'

/**
 * Globals
 */

global.axios = require('axios')
global.toastr = require('toastr')
global._ = require('lodash')

/**
 * Global Axios Request Interceptor
 */

global.axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  const AUTH_TOKEN = Ls.get('auth.token')

  if (AUTH_TOKEN) {
    config.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`
  }

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

/**
 * Global Axios Response Interceptor
 */

global.axios.interceptors.response.use(undefined, function (err) {
  // Do something with request error
  return new Promise((resolve, reject) => {
    // Do not logout and redirect if the error code is present in the exemptedCodes
    const exemptedCodes = ['reset_token_invalid', 'wrong_credentials']

    if (err.response && err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
      let errorCode = err.response.data.error.detail.code

      if (!exemptedCodes.includes(errorCode)) {
        if (errorCode !== 'refresh_expired') {
          console.log('Refreshing')
          return store.dispatch('auth/refreshToken').then((res) => {
            err.config.headers.common['Authorization'] = `Bearer ${res.data.data.token}`

            global.axios.request(err.config).then((res) => {
              resolve(res)
            })
          }).catch(() => {
            console.log('NOT AUTHENTICATED')
            store.dispatch('auth/logout')
            console.log('Unauthorized! Logging out.')
          })
        } else {
          console.log('REFRESH EXPIRED!')
          store.dispatch('auth/logout')
          console.log('Unauthorized! Logging out.')
        }
      }
    }
    throw err
  })
})

/**
 * Plugins
 */

Vue.use(Vuetify, {
  theme: {
    primary: '#4b83f0',
    secondary: '#3260D3',
    accent: colors.purple.base,
    error: '#EC5F59',
    warning: colors.orange.base,
    info: colors.yellow.base,
    success: '#62d862'
  }
})

Vue.use(VueClipboard)
Vue.use(VueTouch)
Vue.use(Meta)
Vue.use(Vuelidate)
Vue.use(VueMoment, {
  moment
})

Vue.config.productionTip = false

/**
 * Custom Directive
 */

Vue.directive('loading', BLoading)
Vue.directive('prepend-social-icon', PrependSocialIcon)

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.event = function (event) {
      // here I check that click was outside the el and his childrens
      if (!(el === event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('click', el.event)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.event)
  }
})

Vue.directive('help-tooltip', {
  /*
    Adds help icon with a tooltip in an input field.

    Usage:

    v-text-field(v-help-tooltip="{ message: 'This is the tooltip message' }")
  */
  bind: function (el, binding, vnode) {
    const HelpTooltipClass = Vue.extend(HelpTooltip)
    const helpTooltip = new HelpTooltipClass({
      propsData: {message: binding.value.message}
    })
    helpTooltip.$mount()

    const inputEl = el.getElementsByClassName('input-group__input')[0]
    if (!inputEl) {
      return
    }
    const appendedIcon = inputEl.getElementsByClassName(
      'input-group__append-icon'
    )[0]

    if (appendedIcon) {
      // This occurs when there is an existing icon like a select input
      inputEl.insertBefore(helpTooltip.$el, appendedIcon)
    } else {
      inputEl.appendChild(helpTooltip.$el)
    }
  }
})

/**
 * Register Global Components
 */

Vue.component('base-switch', baseSwitch)
Vue.component('base-dialog', baseDialog)
Vue.component('tooltip', tooltip)
Vue.component('node-name-input', NodeNameInput)

/**
 * Register Global Filters
 */
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
