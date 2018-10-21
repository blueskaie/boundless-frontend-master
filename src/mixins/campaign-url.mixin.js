import { url } from 'vuelidate/lib/validators'

let CampaignUrlMixin = {
  methods: {
    urlAppendIcon (fieldName, value) {
      if (!value) {
        return null
      } else if (this.getUrlErrors(value).length || this.hasVueError(fieldName)) {
        return 'close'
      } else if (url(value)) {
        return 'done'
      } else {
        return null
      }
    },
    getUrlErrors (value) {
      const errors = []
      if (!url(value)) {
        errors.push(this.$t('errors.url'))
      }
      return errors
    }
  }
}

export default CampaignUrlMixin
