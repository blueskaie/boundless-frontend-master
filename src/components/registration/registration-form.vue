<template lang="pug">
  v-form(ref='form', @submit.prevent="registerUser")
    // name field
    v-layout(row)
      v-flex(xs12)
        v-text-field(
          v-model='formData.name',
          type="text",
          required,
          :label="$t('login.name')",
          :error-messages="nameErrors",
          @input="$v.formData.name.$touch()",
          @blur="$v.formData.name.$touch()"
        )
    // email field
    v-layout(row)
      v-flex(xs12)
        v-text-field(
          v-model='formData.email',
          type="email",
          required,
          :label="$t('login.email')",
          :error-messages="emailErrors",
          :disabled="disableEmail",
          @blur="$v.formData.email.$touch()"
        )
    // password field
    v-layout(row)
      v-flex(xs12)
        v-text-field(
          v-model='formData.password',
          min='8', required, counter,
          :append-icon="passwordHidden ? 'visibility' : 'visibility_off'",
          :append-icon-cb='() => passwordHidden = !passwordHidden',
          :type="passwordHidden ? 'password' : 'text'",
          :label="$t('login.password')",
          :error-messages="passwordErrors",
          @input="$v.formData.password.$touch()",
          @blur="$v.formData.password.$touch()"
        )
    // phone number
    v-layout(row)
      v-layout(row)
        v-flex(xs12)
          tel-input(
            :error-messages="getErrorMessages('phone')"
            :label="$t('login.phoneNumber')",
            :readonly="readonly"
            v-model="formData.phone"
          )
    // checkbox
    v-layout(row)
      v-flex(xs12)
        // v-checkbox.primary--text(v-model='checkbox', :rules="checkboxRules", :label="$t('login.doYouAgree')", required)
        v-btn.success.white--text(:loading="loading", round, block, type="submit") {{ submitTextDisplay }}
</template>

<script>
import { mapActions } from 'vuex'
import { required, minLength, email } from 'vuelidate/lib/validators'

import ErrorHandlerMixin from '@/mixins/error-handler.mixin'
import SelectOrgMixin from '@/mixins/select-org.mixin'

import RegistrationForm from './registration-form'
import TelInput from '@/components/common/tel-input/input'

export default {
  name: 'RegistrationForm',

  props: {
    submitText: {
      type: String,
      default: ''
    }
  },

  validations: {
    formData: {
      name: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      }
    }
  },

  mixins: [
    ErrorHandlerMixin,
    SelectOrgMixin
  ],

  components: {
    RegistrationForm,
    TelInput
  },

  mounted () {
    this.formData = Object.assign({}, this.formData, this.$route.query)
    if (this.$route.query.email) {
      this.disableEmail = true
    }
  },

  data () {
    // each field is represented by a value property and its validation rule
    return {
      formData: {
        name: '',
        email: '',
        password: '',
        phone: ''
      },
      disableEmail: false,
      passwordHidden: true,
      checkbox: false,
      loading: false
    }
  },

  computed: {
    submitTextDisplay () {
      return this.submitText || this.$t('login.submit')
    },
    nameErrors () {
      const errors = []
      const name = this.$v.formData.name
      if (!name.$dirty) return errors
      !name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      const email = this.$v.formData.email
      if (!email.$dirty) return errors
      !email.email && errors.push('Must be valid e-mail')
      !email.required && errors.push('E-mail is required')
      return errors.length > 0 ? errors : this.getErrorMessages('email')
    },
    passwordErrors () {
      const errors = []
      const password = this.$v.formData.password
      if (!password.$dirty) return errors
      !password.minLength && errors.push('Password must be at least 8 characters')
      !password.required && errors.push('Password is required')
      return errors.length > 0 ? errors : this.getErrorMessages('password')
    }
  },

  methods: {
    ...mapActions('auth', ['signup']),
    // the form cleanup
    clear () {
      this.$refs.form.reset()
      this.clearErrorData()
    },

    // actions
    registerUser () {
      this.$v.$touch()
      this.clearErrorData()

      if (!this.$v.formData.$invalid) {
        this.loading = true
        this.$set(this.formData, 'password2', this.formData.password)

        this.signup(this.formData).then(() => {
          this.fetchOrganizations().then(response => {
            // Redirects to proper organization url
            this.selectActiveOrganization()
            this.loading = false
          })
        }).catch((err) => {
          try {
            const errorDetail = err.response.data.error.detail
            if (errorDetail.invitation_key) {
              const message = this.getErrorMessages('invitation_key', errorDetail)
              global.toastr['error'](message, this.$t('general.error'))
              this.loading = false
              return
            }
          } catch (e) {
          }
          // `this.setErrorData()` is from ErrorHandlerMixin
          this.setErrorData(err)
          this.showCommonErrorMessage()
          this.loading = false
        })
      }
    }
  }
}
</script>
