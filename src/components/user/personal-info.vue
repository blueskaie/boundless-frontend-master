<template lang="pug">
  editable-panel(
    :is-editing="isEditing"
    :is-loading="isLoading"
    :title="$t('general.personalInformation')"
    :disableSubmit="disableSubmit"
    @cancel="cancel"
    @edit="edit"
    @submit="submit"
  )
    v-layout(row wrap slot-scope="{readonly}")
      v-flex(xs12 md6 px-3)
        v-text-field(
          :error-messages="nameErrors"
          :label="$t('general.name')"
          :readonly="readonly"
          placeholder="--"
          required
          v-model="formData.name"
          @input="$v.formData.name.$touch()",
          @blur="$v.formData.name.$touch()"
        )

      v-flex(xs12 md6 px-3)
        v-text-field(
          :label="$t('general.jobTitle')"
          :readonly="readonly"
          placeholder="--"
          v-model="formData.job_title"
        )

      v-flex(xs12 md6 px-3)
        tel-input(
          :error-messages="getErrorMessages('phone', profileErrors)"
          :readonly="readonly"
          placeholder="--"
          v-model="formData.phone"
        )

</template>

<script>
import { required } from 'vuelidate/lib/validators'

import CurrentUserMixin from '@/mixins/current-user.mixin'
import EditablePanelMixin from '@/mixins/editable-panel.mixin'
import ErrorHandlerMixin from '@/mixins/error-handler.mixin'

import EditablePanel from '@/components/common/editable-panel'
import TelInput from '@/components/common/tel-input/input'

export default {
  components: {
    EditablePanel,
    TelInput
  },
  mixins: [
    CurrentUserMixin,
    EditablePanelMixin,
    ErrorHandlerMixin
  ],
  validations: {
    formData: {
      name: {
        required
      }
    }
  },
  data () {
    return {
      formData: {
        job_title: '',
        name: '',
        phone: ''
      }
    }
  },
  mounted () {
    this.setFormData()
  },
  computed: {
    profileErrors () {
      return this.errorData.profile
    },
    nameErrors () {
      const errors = []
      const name = this.$v.formData.name
      if (!name.$dirty) return errors
      !name.required && errors.push('Name is required.')
      return errors
    },
    disableSubmit () {
      return this.$v.formData.$invalid
    }
  },
  methods: {
    setFormData () {
      const profile = this.profile
      this.formData = Object.assign({}, this.formData, {
        job_title: profile.job_title,
        name: profile.name,
        phone: profile.phone
      })
    },
    submit () {
      this.isLoading = true
      this.$v.$touch()
      this.clearErrorData()
      if (!this.$v.formData.$invalid) {
        this.updateUser({profile: this.formData}).then(response => {
          this.isEditing = false
          this.isLoading = false
          this.showSuccessMessage()
        }).catch(err => {
          this.setErrorData(err)
          this.isLoading = false
        })
      }
    }
  }
}
</script>
