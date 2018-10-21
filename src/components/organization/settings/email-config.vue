<template lang="pug">
  div
    v-layout(row wrap)
      v-flex
        h3.py-3.small-heading
          | {{ $t('general.emailConfiguration') }}
          tooltip(
            :label="$t('general.emailConfigurationHelp')"
            style="top: 2px"
          )
      v-flex(pt-3)
        base-switch(
          color="deep-purple lighten-2",
          :label-left="$t('organization.boundlessPresets')",
          :label-right="$t('organization.customSettings')",
          v-model="emailConfig.use_default_config"
        )

    .form-card.pt-4.round(:class="{ disabled: !emailConfig.use_default_config }")
      // configuration email row2
      v-layout(row wrap)
        v-flex(xs12 md6 px-2)
          v-text-field(
            :error-messages="getErrors('sender_name')"
            :label="$t('organization.senderName')"
            @input="$v.emailConfig.sender_name.$touch()"
            required
            v-model="emailConfig.sender_name"
          )
        v-flex(xs12 md6 px-2)
          v-text-field(
            :error-messages="getErrors('sender_email')"
            :label="$t('organization.senderEmail')"
            @blur="$v.emailConfig.sender_email.$touch()"
            required
            v-model="emailConfig.sender_email"
          )
        v-flex(xs12 md6 px-2)
          v-text-field(
            :error-messages="getErrorMessages('host', emailConfigErrors)"
            :label="$t('organization.smtpHost')"
            @input="$v.emailConfig.host.$touch()"
            required
            v-model="emailConfig.host"
          )
        v-flex(xs12 md6 px-2)
          v-text-field(
            :error-messages="getErrors('port')"
            :label="$t('organization.smtpPort')"
            @input="$v.emailConfig.port.$touch()"
            type="number"
            required
            v-model="emailConfig.port"
          )
        v-flex(xs12 md6 px-2)
          v-text-field(
            :error-messages="getErrorMessages('username', emailConfigErrors)"
            :label="$t('organization.smtpUsername')"
            @input="$v.emailConfig.username.$touch()"
            required
            v-model="emailConfig.username"
          )
        v-flex(xs12 md6 px-2)
          v-text-field(
            :error-messages="getErrorMessages('password', emailConfigErrors)"
            :label="$t('organization.smtpPassword')"
            @input="$v.emailConfig.password.$touch()"
            required
            v-model="emailConfig.password"
          )
      v-layout(row v-show="emailConfig.use_default_config")
        v-flex.text-xs-right(xs12)
          v-btn(
            :disabled="disableSubmit"
            :loading="isSavingEmailConfig"
            @click="saveEmailConfig(true)"
            color="success"
            outline
            round
            large
          ) {{$t('organization.sendTestEmail')}}

          v-btn(
            :disabled="disableSubmit"
            :loading="isSavingEmailConfig"
            @click="saveEmailConfig()"
            color="success"
            round
            large
          ) {{$t('general.save')}}
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { between, email, required } from 'vuelidate/lib/validators'

import ErrorHandlerMixin from '@/mixins/error-handler.mixin'

export default {
  data () {
    return {
      isSavingEmailConfig: false,
      emailConfig: {
        host: '',
        port: '',
        username: '',
        password: '',
        sender_name: '',
        sender_email: '',
        use_default_config: false
      }
    }
  },

  validations: {
    emailConfig: {
      host: {
        required
      },
      port: {
        required,
        between: between(1, 65535)
      },
      username: {
        required
      },
      password: {
        required
      },
      sender_name: {
        required
      },
      sender_email: {
        required,
        email
      }
    }
  },

  mixins: [
    ErrorHandlerMixin
  ],

  mounted () {
    this.setEmailConfig(this.selectedOrganization)
  },

  computed: {
    ...mapGetters('organization', ['selectedOrganization']),
    emailConfigErrors () {
      return this.errorData.email_config
    },
    disableSubmit () {
      return this.$v.emailConfig.$invalid
    }
  },

  methods: {
    ...mapActions('organization', ['updateOrganization', 'sendTestEmail']),
    setEmailConfig (org) {
      if (org.email_config) {
        this.emailConfig = Object.assign({}, this.emailConfig, org.email_config)
      }
    },
    saveEmailConfig (sendTestEmail = false) {
      this.clearErrorData()
      this.isSavingEmailConfig = true
      const data = {
        email_config: this.emailConfig
      }
      this.updateOrganization(data).then(response => {
        return response
      }).then(response => {
        if (sendTestEmail) {
          global.toastr['success'](this.$t('organization.sentTestEmail'), this.$t('general.success'))
          this.sendTestEmail()
        } else {
          global.toastr['success'](this.$t('general.dataSaveSuccess'), this.$t('general.success'))
        }
        this.isSavingEmailConfig = false
      }).catch(err => {
        this.setErrorData(err)
        this.isSavingEmailConfig = false
      })
    },
    getErrors (fieldName) {
      const vueErrors = this.getVueErrors(`emailConfig.${fieldName}`)
      if (vueErrors.length > 0) {
        return vueErrors
      } else {
        return this.getErrorMessages(fieldName, this.emailConfigErrors)
      }
    }
  },
  watch: {
    selectedOrganization (org) {
      this.setEmailConfig(org)
    }
  }
}
</script>
