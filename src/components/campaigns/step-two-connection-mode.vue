<template lang="pug">
div.connection-mode
  h4.step-heading.mt-5.mb-4(class="input-wrap")
    | {{ $t('campaign.redirectionConnectionMode') }}
    tooltip(
      class-name="label-help"
      :label="$t('campaign.redirectionConnectionModeHelp')"
    )
  .connect-form
    .connect-group
      .connect-icon
        v-icon.default fa-file
        span {{$t('general.form')}}
      .connect-field
        v-text-field(
          v-model="value.redirection_url_auth_form"
          :append-icon="urlAppendIcon('value.redirection_url_auth_form', value.redirection_url_auth_form)"
          :error-messages="getVueErrors('value.redirection_url_auth_form')"
          :label="$t('campaign.redirectLink')"
          @blur="$v.value.redirection_url_auth_form.$touch()"
          class="url-field"
        )

    .connect-group(v-for="key in redirects" :key="key")
      .connect-icon
        v-icon(:class="`${key} fab fa-${key}`")
        span {{ key|capitalize }}
      .connect-field
        v-text-field(
          v-model="value[`redirection_url_auth_${key}`]"
          :append-icon="urlAppendIcon(`value.redirection_url_auth_${key}`, value[`redirection_url_auth_${key}`])"
          :error-messages="getVueErrors(`value.redirection_url_auth_${key}`)"
          :label="$t('campaign.redirectLink')"
          @blur="$v.value[`redirection_url_auth_${key}`].$touch()"
          class="url-field"
        )
</template>

<script>
import { url } from 'vuelidate/lib/validators'

import CampaignUrlMixin from '@/mixins/campaign-url.mixin'
import ErrorHandlerMixin from '@/mixins/error-handler.mixin'

export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  mixins: [
    CampaignUrlMixin,
    ErrorHandlerMixin
  ],
  data () {
    return {
      redirects: [
        'twitter',
        'instagram',
        'facebook',
        'linkedin',
        'google'
      ]
    }
  },
  validations: {
    value: {
      redirection_url_auth_form: { url },
      redirection_url_auth_facebook: { url },
      redirection_url_auth_twitter: { url },
      redirection_url_auth_linkedin: { url },
      redirection_url_auth_instagram: { url },
      redirection_url_auth_google: { url }
    }
  }
}
</script>
