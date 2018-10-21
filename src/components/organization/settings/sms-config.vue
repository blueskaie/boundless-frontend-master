<template lang="pug">
  div
    v-layout(row wrap)
      v-flex
        h3.py-3.small-heading
          | {{ $t('general.smsConfiguration') }}
          tooltip(
            :label="$t('general.smsConfigurationHelp')"
            style="top: 2px"
          )

      v-flex(pt-3)
        base-switch(
          color="deep-purple lighten-2",
          :label-left="$t('organization.boundlessPresets')",
          :label-right="$t('organization.customSettings')",
          v-model="smsConfig.use_default_config"
        )

    .form-card.pt-4.round(:class="{ disabled: !smsConfig.use_default_config }")
      // configuration email row2
      v-layout(row wrap)
        v-flex(xs12 md6 px-2)
          v-select(
            :items='configTypes'
            :label="$t('general.chooseProvider')"
            v-model='smsConfig.config_type'
          )
        v-flex(xs12 md6 px-2)
          v-text-field(
            :error-messages="getErrorMessages('account_sid', smsConfigErrors)"
            :label="$t('general.accountSid')"
            required
            v-model="smsConfig.account_sid"
          )
        v-flex(xs12 md6 px-2)
          v-text-field(
            :error-messages="getErrorMessages('caller_id', smsConfigErrors)"
            :label="$t('general.twilioPhoneNumber')"
            required
            v-model="smsConfig.caller_id"
          )
        v-flex(xs12 md6 px-2)
          v-text-field(
            :error-messages="getErrorMessages('auth_token', smsConfigErrors)"
            :label="$t('general.authToken')"
            required
            v-model="smsConfig.auth_token"
          )
        v-flex(xs12 md6 px-2)
          v-text-field(
            :error-messages="getErrorMessages('sender_name', smsConfigErrors)"
            :label="$t('organization.senderName')"
            v-model="smsConfig.sender_name"
          )

      v-layout(row v-show="smsConfig.use_default_config")
        v-flex.text-xs-right(xs12)
          v-btn(
            :disabled="disableSubmit"
            :loading="isSavingSmsConfig"
            @click="saveSmsConfig(true)"
            color="success"
            outline
            round
            large
          ) {{$t('organization.sendTestSms')}}

          v-btn(
            :disabled="disableSubmit"
            :loading="isSavingSmsConfig"
            @click="saveSmsConfig()"
            color="success"
            round
            large
          ) {{$t('general.save')}}
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import ErrorHandlerMixin from '@/mixins/error-handler.mixin'

export default {
  data () {
    return {
      isSavingSmsConfig: false,
      smsConfig: {
        config_type: 'twilio',
        sender_name: '',
        account_sid: '',
        caller_id: '',
        auth_token: '',
        use_default_config: false
      },
      configTypes: [
        {value: 'twilio', text: 'Twilio'}
      ]
    }
  },

  mixins: [
    ErrorHandlerMixin
  ],

  mounted () {
    this.setSmsConfig(this.selectedOrganization)
  },

  computed: {
    ...mapGetters('organization', ['selectedOrganization']),
    smsConfigErrors () {
      return this.errorData.sms_config
    },
    disableSubmit () {
      const data = this.smsConfig
      return !data.account_sid || !data.caller_id || !data.auth_token
    }
  },

  methods: {
    ...mapActions('organization', ['updateOrganization', 'sendTestSms']),
    setSmsConfig (org) {
      if (org.sms_config) {
        this.smsConfig = Object.assign({}, this.smsConfig, org.sms_config)
      }
    },
    saveSmsConfig (sendTestSms = false) {
      this.clearErrorData()
      this.isSavingSmsConfig = true
      const data = {
        sms_config: this.smsConfig
      }
      this.updateOrganization(data).then(response => {
        return response
      }).then(response => {
        if (sendTestSms) {
          global.toastr['success'](this.$t('organization.sentTestSms'), this.$t('general.success'))
          this.sendTestSms()
        } else {
          global.toastr['success'](this.$t('general.dataSaveSuccess'), this.$t('general.success'))
        }
        this.isSavingSmsConfig = false
      }).catch(err => {
        this.setErrorData(err)
        this.isSavingSmsConfig = false
      })
    }
  },
  watch: {
    selectedOrganization (org) {
      this.setSmsConfig(org)
    }
  }
}
</script>
