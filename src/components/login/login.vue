<template lang='pug'>
  div
    p.login-text {{ $t('login.signInText')}}
    v-form(ref='form', @submit.prevent="loginUser")
      // email field
      v-layout(row)
        v-flex(xs12)
          v-text-field(
            v-model='email',
            required,
            :label="$t('login.email')",
            :error-messages="getErrorMessages('email')"
          )
      // password field
      v-layout(row)
        v-flex(xs12)
          v-text-field(
            v-model='password',
            required
            :append-icon="passwordHidden ? 'visibility' : 'visibility_off'",
            :append-icon-cb='() => passwordHidden = !passwordHidden',
            :type="passwordHidden ? 'password' : 'text'",
            :label="$t('login.password')",
            :error-messages="getErrorMessages('password')"
          )
      // button container
      v-layout.mt-4(row)
        v-flex(xs12)
          // v-checkbox.primary--text(v-model='checkbox', :rules="checkboxRules", :label="$t('login.doYouAgree')", required)
          v-btn.success.white--text(:loading="loading", round, block, type="submit") {{ $t('login.loginButtonText') }}
      // the links below the form: register and forgot pass
      v-layout(row).mt-3
        v-flex(xs6)
          router-link.forgot-link(to="/sign-up") {{ $t("login.register") }}
        v-flex.text-xs-right(xs6)
          a.forgot-link(href="#", @click.prevent="showForgotPasswordDialog = true") {{ $t("login.forgotPassword") }}
    forgot-password-dialog(:show="showForgotPasswordDialog", @close="showForgotPasswordDialog = false")
</template>

<script>
import { mapActions } from 'vuex'
import forgotPasswordDialog from './forgot-password-dialog'

import ErrorHandlerMixin from '@/mixins/error-handler.mixin'
import SelectOrgMixin from '@/mixins/select-org.mixin'

export default {
  name: 'Login',

  components: {
    forgotPasswordDialog
  },

  mixins: [
    ErrorHandlerMixin,
    SelectOrgMixin
  ],

  data () {
    // each field is represented by a value property and its validation rule
    return {
      // email
      email: '',
      // password
      password: '',
      passwordHidden: true,
      // checkbox
      checkbox: false,

      // form is valid
      valid: true,
      loading: false,
      showForgotPasswordDialog: false
    }
  },

  methods: {
    ...mapActions('auth', ['login']),
    // the form cleanup action
    clear () {
      this.$refs.form.reset()
    },

    // action to perform upon form submission
    loginUser () {
      this.loading = true
      this.login({
        email: this.email,
        password: this.password
      }).then(() => {
        this.fetchOrganizations().then(response => {
          // Redirects to proper organization url
          this.selectActiveOrganization()
          this.loading = false
        })
      }).catch((err) => {
        this.setErrorData(err)
        this.showCommonErrorMessage()
        this.loading = false
      })
    }
  },

  // meta tags
  metaInfo: {
    title: ``
  }
}
</script>
