<template lang="pug">
  v-container(grid-list-md)
    // top paragraph
    v-layout(row)
      v-flex(xs12)
        p {{ $t('etc.loremShort') }}

    // connection time row
    v-layout(row)
      v-flex.py-5.mr-2(xs12 sm6)
        v-layout(row)
          v-flex(xs12, class="input-wrap")
            h3.small-heading.mb-3 {{ $t('wifi.assignOneOrMoreEmails') }}
        .form-card.round
          v-layout(row).mb-3
            v-flex(xs8, sm6)
              v-text-field(
                :label="$t('wifi.enterAnEmail')",
                ref='email',
                v-model='email',
                :error-messages="emailErrors",
                @blur="$v.email.$touch()"
              )
            v-flex.text-xs-right.pt-2(xs4, sm6)
              v-btn(:loading='emailLoading', :disabled="email === '' || emailLoading || $v.email.$invalid", color='success', round, outline, @click.native='addEmail(email)')
                | {{ $t('wifi.addEmail') }}

          v-layout.mt-2(row, v-for="(email, index) in emails", :key="index")
            .item-row
              .item-text {{ email }}
              .item-action
                v-btn.divider-vert.mx-0(icon, @click="removeItemFromCollection(emails, index)")
                  v-icon(small, color='grey') close

      v-flex.py-5.ml-2(xs12 sm6)
        v-layout(row)
          v-flex(xs12, class="input-wrap")
            h3.small-heading.mb-3 {{ $t('wifi.assignOneOrMoreDomains') }}
        .form-card.round
          v-layout(row).mb-3
            v-flex(xs8, sm6)
              v-text-field(
                :label="$t('wifi.domains')",
                ref='domain',
                v-model='domain',
                :error-messages="domainErrors",
                @input="$v.domain.$touch()",
                @blur="$v.domain.$touch()"
              )
            v-flex.text-xs-right.pt-2(xs4, sm6)
              v-btn(:loading='domainLoading', :disabled="domain === '' || domainLoading || $v.domain.$invalid", color='success', round, outline, @click.native='addDomain(domain)')
                | {{ $t('wifi.addDomain') }}

          v-layout.mt-2(row, v-for="(domain, index) in domains", :key="index")
            .item-row
              .item-text {{ domain }}
              .item-action
                v-btn.divider-vert.mx-0(icon, @click="removeItemFromCollection(domains, index)")
                  v-icon(small, color='grey') close

    // allowWifiPersonalization row
    v-layout(row)
      v-flex.py-3.ml-2(xs12 sm6)
        v-layout(row)
          v-flex(xs9, class="input-wrap")
            h3.small-heading.mb-3 {{ $t(' wifi.allowWifiPersonalization ') }}
          v-flex(xs3)
            v-switch(v-model="allowWifiPersonalization", color="deep-purple lighten-2", hide-details)
        .form-card.round(:class="{'disabled': !allowWifiPersonalization}")
          v-layout(row wrap)
            v-flex(xs12 sm6)
              v-layout(row)
                v-flex(xs9)
                  p {{ $t(' wifi.wifiAvailabilityWindow ') }}
                v-flex(xs3)
                  v-switch(v-model="enableWifiAvailabilityWindow", color="deep-purple lighten-2", hide-details)

            v-flex(xs12 sm6)
              v-layout(row)
                v-flex(xs9)
                  p {{ $t(' wifi.accessWindow ') }}
                v-flex(xs3)
                  v-switch(v-model="enableAccessWindow", color="deep-purple lighten-2", hide-details)

            v-flex(xs12 sm6)
              v-layout(row)
                v-flex(xs9)
                  p {{ $t(' wifi.sessionDuration ') }}
                v-flex(xs3)
                  v-switch(v-model="enableSessionDuration", color="deep-purple lighten-2", hide-details)

            v-flex(xs12 sm6)
              v-layout(row)
                v-flex(xs9)
                  p {{ $t('general.dataLimit') }}
                v-flex(xs3)
                  v-switch(v-model="enableDataLimit", color="deep-purple lighten-2", hide-details)

            v-flex(xs12 sm6)
              v-layout(row)
                v-flex(xs9)
                  p {{ $t('general.bandwidthLimit') }}
                v-flex(xs3)
                  v-switch(v-model="enableBandwidthLimit", color="deep-purple lighten-2", hide-details)
</template>

<script>
import { required, email, url } from 'vuelidate/lib/validators'

export default {
  name: 'WifiConfigurationSponsors',

  data () {
    return {
      allowWifiPersonalization: false,
      enableWifiAvailabilityWindow: false,
      enableSessionDuration: false,
      enableAccessWindow: false,
      enableDataLimit: false,
      enableBandwidthLimit: false,

      email: '',
      emailLastValid: '',
      emails: [],
      emailLoading: false,

      domain: '',
      domainLastValid: '',
      domains: [],
      domainLoading: false
    }
  },

  validations: {
    email: {
      required,
      email
    },
    domain: {
      required,
      url
    }
  },

  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push(`${this.$t('general.email')} is required`)
      return errors
    },
    domainErrors () {
      const errors = []
      if (!this.$v.domain.$dirty) return errors
      !this.$v.domain.url && errors.push('Must be valid URL')
      !this.$v.domain.required && errors.push(`${this.$t('general.domain')} is required`)
      return errors
    }
  },

  methods: {
    addEmail (email) {
      if (!this.$v.email.$invalid) {
        this.emails.push(email)
        this.email = ''
        this.$v.email.$reset()
        this.$refs.email.focus()
      }
    },
    addDomain (domain) {
      if (!this.$v.domain.$invalid) {
        this.domains.push(domain)
        this.domain = ''
        this.$v.domain.$reset()
        this.$refs.domain.focus()
      }
    },

    removeItemFromCollection (arr, idx) {
      console.log(arr, idx)
      arr.splice(idx, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-card p {
    color: #9ba9c4;
    font-size: 14px;
    margin: 0;
  }

  .item-row {
    display: flex;
    padding: 10px 20px;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    background-color: #f8fafc;
    border-radius: 5px;

    .item-text {
      color: #00082a;
    }

  }

  .label-help {
    top: -5px !important;
  }
</style>
