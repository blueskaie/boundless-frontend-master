<template lang='pug'>
  v-container
    // layout holding the entire login view
    v-layout(row)
      v-flex(xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4)
        h1.text-xs-center.mb-0.primary--text {{ $t('general.login') }}
        em.d-block.text-xs-center.mb-3.grey--text.lighten-1 {{ $t('login.loginSubtitle') }}
        // the card wrapping the form only
        v-card.pa-3
          v-form(ref='form', v-model='valid', lazy-validation)
            // email field
            v-container
              v-layout(row)
                v-flex(xs12)
                  v-text-field(v-model='email', :rules='emailRules', :label="$t('login.enterEmail')", required)
              // password field
              v-layout(row)
                v-flex(xs12)
                  v-text-field(v-model='password',
                    :rules='passwordRules',
                    :append-icon="passwordHidden ? 'visibility' : 'visibility_off'",
                    :append-icon-cb='() => passwordHidden = !passwordHidden',
                    :type="passwordHidden ? 'password' : 'text'",
                    :label="$t('login.enterPassword')",
                    :hint="$t('login.passwordHint')", min='8', required, counter)
              // checkbox
              v-layout(row)
                v-flex(xs12)
                  v-checkbox.primary--text(v-model='checkbox', :rules="checkboxRules", :label="$t('login.doYouAgree')", required)
                  v-btn.primary.white--text(:disabled='!valid', @click='loginUser') {{ $t('login.submit') }}
                  v-btn.grey.lighten-3(@click='clear') {{ $t('login.clear') }}
        // the links below the form: register and forgot pass
        v-container
          v-layout(row)
            v-flex(xs12 sm6)
              router-link(to="/auth0/forgot-password") {{ $t("login.forgotPassword") }}
            v-flex(xs12 sm6 text-sm-right)
              router-link(to="/auth0/sign-up") {{ $t("login.register") }}
</template>

<script>
import { emailRules, passwordRules, requiredField } from '@/utils/form-fields-validation-rules'

export default {
  name: 'LoginAuth0',

  // use auth from auth0.service
  props: ['auth'],

  data () {
    // each field is represented by a value property and its validation rule
    return {
      // email
      email: '',
      emailRules: emailRules(),
      // password
      password: '',
      passwordRules: passwordRules(this.password),
      passwordHidden: true,
      // checkbox
      checkbox: false,
      checkboxRules: requiredField('You must agree to continue!'),
      // form is valid
      valid: true
    }
  },

  methods: {
    // the form cleanup action
    clear () {
      this.$refs.form.reset()
    },

    // action to perform upon form submission
    loginUser () {
      if (this.$refs.form.validate()) {
        console.log({
          email: this.email,
          password: this.password,
          checkbox: this.checkbox
        })
        // this.auth.login(this.email, this.password)
      }
    }
  },

  // meta tags
  metaInfo: {
    title: ``
  }
}
</script>
