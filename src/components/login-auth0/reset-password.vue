<template lang='pug'>
  v-container
    // layout holding the entire login view
    v-layout(row)
      v-flex(xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4)
        h1.text-xs-center.mb-0.primary--text {{ $t('login.resetPassword') }}
        em.d-block.text-xs-center.mb-3.grey--text.lighten-1 {{ $t('login.resetPasswordSubtitle') }}
        // the card wrapping the form only
        v-card.pa-3
          v-form(ref='form', v-model='valid', lazy-validation)
            // password field
            v-container
              v-layout(row)
                v-flex(xs12)
                  v-text-field(v-model='password',
                    :rules='passwordRules',
                    :append-icon="passwordHidden ? 'visibility' : 'visibility_off'",
                    :append-icon-cb='() => passwordHidden = !passwordHidden',
                    :type="passwordHidden ? 'password' : 'text'",
                    :label="$t('login.enterPassword')",
                    :hint="$t('login.passwordHint')", min='8', required, counter)
            // password confirmation field
            v-container
              v-layout(row)
                v-flex(xs12)
                  v-text-field(v-model='password2',
                    :rules='password2Rules',
                    :append-icon="password2Hidden ? 'visibility' : 'visibility_off'",
                    :append-icon-cb='() => password2Hidden = !password2Hidden',
                    :type="password2Hidden ? 'password' : 'text'",
                    :label="$t('login.confirmPassword')",
                    :hint="$t('login.passwordHint')", min='8', required, counter)
            // submit
            v-container
              v-layout(row)
                v-flex(xs12)
                  v-btn.primary.white--text(:disabled='!valid', @click='resetPassword') {{ $t('login.submit') }}
        // the links below the form: register and forgot pass
        v-container
          v-layout(row)
            v-flex(xs12)
              router-link(to="/auth0/login") {{ $t("login.alreadyRegistered") }}
</template>

<script>
import passwordFieldMatchingValidation from '@/mixins/password-field-matching-validation.mixin'

export default {
  name: 'ResetPasswordAuth0',

  // use auth from auth0.service
  props: ['auth'],

  mixins: [passwordFieldMatchingValidation],

  data () {
    // each field is represented by a value property and its validation rule
    return {
      // password
      password: '',
      password2: '',
      passwordRules: [],
      password2Rules: [],
      passwordHidden: true,
      password2Hidden: true,
      // form is valid
      valid: true
    }
  },

  methods: {
    // the form cleanup
    clear () {
      this.$refs.form.reset()
    },

    // actions
    resetPassword () {
      if (this.$refs.form.validate()) {
        console.log(this.password)
        // this.auth.resetPassword()
      }
    }
  },

  // meta tags
  metaInfo: {
    title: ``
  }
}
</script>
