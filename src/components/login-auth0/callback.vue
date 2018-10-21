<template lang='pug'>
  div
    activity-indicator(:show='true')
      #social-user-hidden-form-wrapper
</template>

<script>
import activityIndicator from '@/components/common/activity-indicator.vue'

// auth0 callback action
export default {
  name: 'CallbackAuth0',

  components: {activityIndicator},

  // use auth from auth0.service
  props: ['auth'],

  data () {
    this.auth.handleSocialAuthentication()
    return {}
  }
}
</script>
