<template lang="pug">
div
  h4.step-heading.mt-5.mb-4(class="input-wrap") {{ $t('campaign.redirectionMobile') }}
    tooltip(class-name="label-help", :label="$t(' campaign.redirectionMobileHelp ')")
  .connect-form
    .connect-group
      .connect-icon
        v-icon.default fas fa-mobile
        span Default*
      .connect-field
        v-text-field(
          v-model="value.redirection_url_device_default"
          :append-icon="urlAppendIcon('value.redirection_url_device_default', value.redirection_url_device_default)"
          :error-messages="getVueErrors('value.redirection_url_device_default')"
          :label="$t('campaign.redirectLink')"
          @blur="$v.value.redirection_url_device_default.$touch()"
          class="url-field"
        )

    .connect-group(v-for="key in redirects" :key="key")
      .connect-icon
        v-icon(:class="`${key} fab fa-${key}`")
        span {{ key|capitalize }}
      .connect-field
        v-text-field(
          v-model="value[`redirection_url_device_${key}`]"
          :append-icon="urlAppendIcon(`value.redirection_url_device_${key}`, value[`redirection_url_device_${key}`])"
          :error-messages="getVueErrors(`value.redirection_url_device_${key}`)"
          :label="$t('campaign.redirectLink')"
          @blur="$v.value[`redirection_url_device_${key}`].$touch()"
          class="url-field"
        )
</template>

<script>
import { url } from 'vuelidate/lib/validators'

import CampaignUrlMixin from '@/mixins/campaign-url.mixin'
import ErrorHandlerMixin from '@/mixins/error-handler.mixin'

export default {
  props: ['value'],
  mixins: [
    CampaignUrlMixin,
    ErrorHandlerMixin
  ],
  data () {
    return {
      redirects: [
        'apple',
        'android',
        'windows'
      ]
    }
  },
  validations: {
    value: {
      redirection_url_device_default: { url },
      redirection_url_device_apple: { url },
      redirection_url_device_android: { url },
      redirection_url_device_windows: { url }
    }
  }
}
</script>
