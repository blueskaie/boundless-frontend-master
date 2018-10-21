<template lang='pug'>
  v-container
    // layout holding the entire login view
    v-layout(row)
      v-flex(xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4)
        h1.text-xs-center.mb-0.primary--text {{ $t('login.register') }}
        em.d-block.text-xs-center.mb-3.grey--text.lighten-1 {{ $t('login.registerSubtitle') }}
        // the card wrapping the form only
        v-card.pa-3
          v-form(ref='form', v-model='valid', lazy-validation)
            // name field
            v-container
              v-layout(row)
                v-flex(xs12)
                  v-text-field(v-model='name', :rules='nameRules', :label="$t('login.enterName')", type="text", required)
            // email field
            v-container
              v-layout(row)
                v-flex(xs12)
                  v-text-field(v-model='email', :rules='emailRules', :label="$t('login.enterEmail')", type="email", required)
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
                    :append-icon="passwordHidden ? 'visibility' : 'visibility_off'",
                    :append-icon-cb='() => password2Hidden = !password2Hidden',
                    :type="password2Hidden ? 'password' : 'text'",
                    :label="$t('login.confirmPassword')",
                    :hint="$t('login.passwordHint')", min='8', required, counter)
            // job title
            v-container
              v-layout(row)
                v-layout(row)
                  v-flex(xs12)
                    v-text-field(v-model='jobTitle', :rules='jobTitleRules', :label="$t('login.enterJobTitle')", type="text", required)
            // job title
            v-container
              v-layout(row)
                v-layout(row)
                  v-flex(xs12)
                    v-text-field(v-model='phoneNumber', :rules='phoneNumberRules', :label="$t('login.enterPhoneNumber')", type="text", required)
            // checkbox
            v-container
              v-layout(row)
                v-flex(xs12)
                  v-checkbox.primary--text(v-model='checkbox', :rules="checkboxRules", :label="$t('login.doYouAgree')", required)
                  v-btn.primary.white--text(:disabled='!valid', @click='registerUser') {{ $t('login.submit') }}
                  v-btn.grey.lighten-3(@click='clear') {{ $t('login.clear') }}
        // the links below the form: register and forgot pass
        v-container
          v-layout(row)
            v-flex(xs12)
              router-link(to="/auth0/login") {{ $t("login.alreadyRegistered") }}
</template>

<script>
import passwordFieldMatchingValidation from '@/mixins/password-field-matching-validation.mixin'
import {nameRules, emailRules, numberRules, requiredField} from '@/utils/form-fields-validation-rules'

export default {
  name: 'RegisterAuth0',

  // use auth from auth0.service
  props: ['auth'],

  mixins: [passwordFieldMatchingValidation],

  data () {
    // each field is represented by a value property and its validation rule
    return {
      // name
      name: '',
      nameRules: nameRules('Name'),
      // email
      email: '',
      emailRules: emailRules(),
      // password
      password: '',
      password2: '',
      passwordRules: [],
      password2Rules: [],
      passwordHidden: true,
      password2Hidden: true,
      // jobTitle
      jobTitle: '',
      jobTitleRules: nameRules('Job title'),
      // phoneNumber
      phoneNumber: '',
      phoneNumberRules: numberRules('Phone number'),
      // checkbox
      checkbox: false,
      checkboxRules: requiredField('You must agree to continue!'),
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
    registerUser () {
      if (this.$refs.form.validate()) {
        console.log({
          name: this.name,
          email: this.email,
          password: this.password,
          jobTitle: this.jobTitle,
          phoneNumber: this.phoneNumber,
          checkbox: this.checkbox
        })
        // this.auth.signup()
      }
    }
  },

  // meta tags
  metaInfo: {
    title: ``
  }
}
</script>
