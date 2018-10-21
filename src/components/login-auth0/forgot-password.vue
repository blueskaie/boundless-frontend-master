<template lang='pug'>
  v-container
    // layout holding the entire login view
    v-layout(row)
      v-flex(xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4)
        h1.text-xs-center.mb-0.primary--text {{ $t('login.forgotPassord') }}
        em.d-block.text-xs-center.mb-3.grey--text.lighten-1 {{ $t('login.forgotPassordSubtitle') }}
        // the card wrapping the form only
        v-card.pa-3
          v-form(ref='form', v-model='valid', lazy-validation)
            // email field
            v-container
              v-layout(row)
                v-flex(xs12)
                  v-text-field(v-model='email', :rules='emailRules', :label="$t('login.enterEmail')", type="email", required)
            // submit
            v-container
              v-layout(row)
                v-flex(xs12)
                  v-btn.primary.white--text(:disabled='!valid', @click='forgotPassword') {{ $t('login.submit') }}
        // the links below the form: register and forgot pass
        v-container
          v-layout(row)
            v-flex(xs12)
              router-link(to="/auth0/login") {{ $t("login.alreadyRegistered") }}
</template>

<script>
import { emailRules } from '@/utils/form-fields-validation-rules'

export default {
  name: 'ForgotPasswordAuth0',

  // use auth from auth0.service
  props: ['auth'],

  data () {
    // each field is represented by a value property and its validation rule
    return {
      // email
      email: '',
      emailRules: emailRules(),
      // form is valid
      valid: true
    }
  },

  methods: {
    forgotPassword () {
      if (this.$refs.form.validate()) {
        console.log(this.email)
        // this.auth.forgotPassword()
      }
    }
  },

  // meta tags
  metaInfo: {
    title: ``
  }
}
</script>
