<template lang="pug">
  base-dialog(:show="show", @close="$emit('close')", persistent)
    h2.dialog-heading.mb-3 {{ $t('login.resetPassword') }}
    h4.dialog-subtitle {{ $t('login.resetPasswordText') }}
    v-form(ref='form', @submit.prevent="submit")
      // password field
      v-layout(row)
        v-flex.py-2.pr-3(xs12 sm6)
          v-text-field(
            v-model='password',
            min='8', required, counter,
            :append-icon="passwordHidden ? 'visibility' : 'visibility_off'",
            :append-icon-cb='() => passwordHidden = !passwordHidden',
            :type="passwordHidden ? 'password' : 'text'",
            :label="$t('login.password')",
            :error-messages="passwordErrors",
            @input="$v.password.$touch()",
            @blur="$v.password.$touch()"
          )
        v-flex.py-2.pl-3(xs12 sm6)
          v-text-field(
            v-model='password2',
            :append-icon="password2Hidden ? 'visibility' : 'visibility_off'",
            :append-icon-cb='() => password2Hidden = !password2Hidden',
            :type="password2Hidden ? 'password' : 'text'",
            :label="$t('login.confirmPassword')",
            :error-messages="password2Errors",
            @input="$v.password2.$touch()",
            @blur="$v.password2.$touch()"
          )

      // submit
      v-layout.mt-3(row)
        v-flex(sm12, text-xs-right)
          v-btn.success.white--text(
            :loading="loading", round,
            :disabled='this.$v.$dirty && this.$v.$invalid', type="submit"
          ) {{ $t('login.submit') }}

</template>

<script>
import { mapActions } from 'vuex'

import BaseDialog from '@/components/common/base-dialog'
import PasswordFieldValidationMixin from '@/mixins/password-field-validation.mixin'

export default {
  name: 'ResetPasswordDialog',

  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  components: {
    BaseDialog
  },

  mixins: [
    PasswordFieldValidationMixin
  ],

  data () {
    // each field is represented by a value property and its validation rule
    return {
      // password
      password: '',
      password2: '',
      passwordHidden: true,
      password2Hidden: true,
      loading: false
    }
  },

  computed: {
    formData () {
      return {
        password: this.password,
        password2: this.password2,
        uidb64: this.$route.params.uidb64,
        token: this.$route.params.token
      }
    }
  },

  methods: {
    ...mapActions('auth', ['resetPassword']),
    // the form cleanup
    clear () {
      this.$refs.form.reset()
    },

    // actions
    submit () {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.resetPassword(this.formData).then((res) => {
          global.toastr['success'](this.$t('login.resetPasswordSuccess'), this.$t('general.success'))
          this.$router.push({name: 'login'})
          this.loading = false
        }).catch((err) => {
          this.setErrorData(err)
          const message = this.getErrorMessages('message')
          if (message.length > 0) {
            global.toastr['error'](message[0], this.$t('general.error'))
          }
          this.loading = false
        })
      }
    }
  },

  // meta tags
  metaInfo: {
    title: ``
  }
}
</script>
