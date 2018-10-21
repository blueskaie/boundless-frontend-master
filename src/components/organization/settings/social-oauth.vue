<template lang="pug">
  .social-oauth
    v-btn.primary-action(
      :disabled="isSavingAuth"
      @click="saveAuth"
      color='primary'
    )
      | {{ $t('general.save') }}
      v-icon save
    v-layout.mb-3(row)
      v-flex(xs12)
        h3.py-3.small-heading
          | {{ $t('organization.socialNetworkAuthorization') }}
          tooltip(
            :label="$t('organization.socialNetworkAuthorizationHelp')"
            style="top: 2px"
          )

    v-layout(row wrap)
      v-flex(
        :class="flexClass(index)"
        :key="key"
        md6
        v-for="(value, key, index) in auth"
      )
        v-layout(row wrap mb-2)
          v-flex.label-wrapper(xs5)
            v-icon(:class="`${key} fab fa-${key}`")
            span {{ key }}
          v-flex(xs7)
            base-switch(
              :label-left="$t('organization.defaultOauth')"
              :label-right="$t('organization.oauthCustomised')"
              color="deep-purple lighten-2"
              v-model="auth[key].custom"
            )
        .form-card.pt-4.mb-5.round(:class="{ disabled: !auth[key].custom }")
          v-layout(row wrap)
            v-flex(xs12)
              v-text-field(
                :label="$t('organization.oauthID')"
                hide-details
                v-model="auth[key].id"
                :disabled="!auth[key].custom"
              )
            v-flex(xs12)
              v-text-field(
                :label="$t('organization.oauthSecret')"
                hide-details
                v-model="auth[key].secret"
                :disabled="!auth[key].custom"
              )
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BaseSwitch from '@/components/common/base-switch'

export default {
  name: 'SocialOauth',

  components: {
    BaseSwitch
  },

  mounted () {
    this.setAuth(this.selectedOrganization)
  },

  data () {
    return {
      isSavingAuth: false,
      auth: {
        facebook: {
          custom: false,
          id: '',
          secret: ''
        },
        twitter: {
          custom: false,
          id: '',
          secret: ''
        },
        instagram: {
          custom: false,
          id: '',
          secret: ''
        },
        linkedin: {
          custom: false,
          id: '',
          secret: ''
        },
        google: {
          custom: false,
          id: '',
          secret: ''
        }
      }
    }
  },

  computed: {
    ...mapGetters('organization', ['selectedOrganization'])
  },

  methods: {
    ...mapActions('organization', ['updateOrganization']),
    flexClass (index) {
      let defaultClass = {
        'pb-3': true
      }

      if (this.$vuetify.breakpoint.mdAndUp) {
        const even = (index + 1) % 2 === 0
        defaultClass = Object.assign({}, defaultClass, {
          'pr-2': !even,
          'pl-2': even
        })
      }
      return defaultClass
    },
    setAuth (org) {
      if (org.oauth_config) {
        this.auth = Object.assign({}, this.auth, org.oauth_config)
      }
    },
    saveAuth () {
      this.isSavingAuth = true
      const data = {
        oauth_config: this.auth
      }
      this.updateOrganization(data).then(response => {
        global.toastr['success'](this.$t('general.dataSaveSuccess'), this.$t('general.success'))
        this.isSavingAuth = false
      }).catch(err => {
        console.log(err)
        this.isSavingAuth = false
      })
    }
  },
  watch: {
    selectedOrganization (val) {
      this.setAuth(val)
    }
  }
}
</script>
<style lang="scss" scoped>
.label-wrapper /deep/ {
  display: flex;
  align-items: center;

  span {
    color: #43619c;
    margin-left: 15px;
    font-weight: 600;
    text-transform: uppercase;
  }
}
</style>
