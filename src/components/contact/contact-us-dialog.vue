<template lang="pug">
  base-dialog(:show="show", @close="$emit('close')")
    v-layout(row)
      v-flex.mb-4(xs12)
        h2.dialog-heading.mb-1 {{ $t(' contact.contactUs') }}
        h4.dialog-subtitle {{ $t(' contact.fillTheContactForm') }}

    // contact row
    v-layout(row wrap)
      v-flex(xs12 sm6 px-2)
        v-text-field(
          :error-messages="nameErrors"
          :label="$t('general.name')"
          :name="$t('general.name')"
          @blur="$v.contactForm.name.$touch()"
          @input="$v.contactForm.name.$touch()"
          required
          v-model="contactForm.name"
        )
      v-flex(xs12 sm6 px-2)
        v-text-field(
          :error-messages="emailErrors"
          :label="$t('general.email')"
          :name="$t('general.email')"
          @blur="$v.contactForm.email.$touch()"
          required
          v-model="contactForm.email"
        )
      v-flex(xs12 sm6 px-2)
        tel-input(
          :error-messages="telephoneErrors"
          :label="$t('general.phoneNumber')"
          @blur="$v.contactForm.telephone.$touch()"
          @input="$v.contactForm.telephone.$touch()"
          required
          v-model="contactForm.telephone"
        )
      v-flex(xs12 sm6 px-2)
        availability-select(
          :error-messages="availabilityErrors"
          @blur="$v.contactForm.availability.$touch()"
          required
          v-model="contactForm.availability"
        )
      v-flex(xs12 px-2)
        v-text-field(
          :error-messages="messageErrors"
          :label="$t('contact.writeMessageHere')"
          :name="$t('contact.writeMessageHere')"
          @blur="$v.contactForm.message.$touch()"
          @input="$v.contactForm.message.$touch()"
          required
          textarea
          v-model='contactForm.message'
        )

    v-layout.pt-3(row)
      v-flex(xs12)
        em.required-label {{ $t('contact.mandatoryFields') }}
    v-layout.pt-3.text-xs-right(row)
      v-flex(xs12)
        v-btn(
          :disabled="$v.contactForm.$invalid"
          :loading="loading"
          @click="submitForm"
          color="success"
          large
          round
        ) {{$t('general.send')}}
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { required, email, maxLength } from 'vuelidate/lib/validators'

import AvailabilitySelect from '@/components/common/availability-select'
import baseDialog from '@/components/common/base-dialog'
import telInput from '@/components/common/tel-input/input'

export default {
  name: 'ContactUsDialog',

  props: ['show'],

  components: {
    AvailabilitySelect,
    baseDialog,
    telInput
  },

  validations: {
    contactForm: {
      email: {
        required,
        email
      },
      name: {
        required
      },
      telephone: {
        required
      },
      availability: {
        required
      },
      message: {
        required,
        maxLength: maxLength(500)
      }
    }
  },

  data () {
    return {
      contactForm: {
        name: '',
        email: '',
        telephone: '',
        availability: '',
        message: ''
      },
      loading: false
    }
  },

  mounted () {
    Object.assign(this.contactForm, {
      name: this.currentUser.profile.name,
      telephone: this.currentUser.profile.phone,
      email: this.currentUser.email
    })
  },

  methods: {
    submitForm () {
      this.$v.$touch()
      const API_URL = process.env.API_URL

      Object.assign(this.contactForm, {}, {
        type: 'contact',
        subject: 'Contact Form Submission'
      })

      if (!this.$v.contactForm.$invalid) {
        this.loading = true
        axios.post(API_URL + '/contact/', this.contactForm).then((response) => {
          global.toastr['success'](this.$t('contact.contactSuccessMessage'), this.$t('general.success'))
          this.loading = false
          this.clearForm()
          this.$emit('close')
        }).catch(err => {
          this.loading = false
          console.log(err)
        })
      }
    },
    clearForm () {
      this.contactForm = {
        name: this.currentUser.profile.name,
        email: this.currentUser.email,
        telephone: this.currentUser.profile.phone,
        availability: '',
        message: ''
      }

      this.$v.$reset()
    }
  },
  computed: {
    ...mapGetters('user', ['currentUser']),
    emailErrors () {
      const errors = []
      if (!this.$v.contactForm.email.$dirty) return errors
      !this.$v.contactForm.email.email && errors.push('Must be valid e-mail')
      !this.$v.contactForm.email.required && errors.push(`${this.$t('general.email')} is required`)
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.contactForm.name.$dirty) return errors
      !this.$v.contactForm.name.required && errors.push(`${this.$t('general.name')} is required`)
      return errors
    },
    telephoneErrors () {
      const errors = []
      if (!this.$v.contactForm.telephone.$dirty) return errors
      !this.$v.contactForm.telephone.required && errors.push(`${this.$t('general.phoneNumber')} is required`)
      return errors
    },
    availabilityErrors () {
      const errors = []
      if (!this.$v.contactForm.availability.$dirty) return errors
      !this.$v.contactForm.availability.required && errors.push(`${this.$t('contact.availability')} is required`)
      return errors
    },
    messageErrors () {
      const errors = []
      if (!this.$v.contactForm.message.$dirty) return errors
      !this.$v.contactForm.message.required && errors.push(`${this.$t('general.message')} is required`)
      !this.$v.contactForm.message.maxLength && errors.push(`${this.$t('general.message')} cannot have more than 500 letters`)
      return errors
    }
  }
}
</script>

<style>
  .required-label {
    color: #9ba9c4 !important;
  }
</style>
