<template lang="pug">
  panel-container(:title="$t('general.password')")
    v-layout(row wrap)
      v-flex(xs12 md6 px-3)
        v-text-field(
          :error-messages="getErrorMessages('password')"
          :label="$t('general.newPassword')"
          placeholder="--"
          type="password"
          v-model="formData.password"
        )
      v-flex(xs12 md6 px-3)
        v-text-field(
          :error-messages="getErrorMessages('password_confirm')"
          :label="$t('general.confirmNewPassword')"
          placeholder="--"
          type="password"
          v-model="formData.password_confirm"
        )
      v-flex(xs12 px-3)
        v-alert(
          :value="nonFieldError"
          color="error"
          icon="warning"
          outline
        ) {{ nonFieldError }}

    v-layout(row wrap)
      v-flex(xs12 text-xs-right)
        v-btn(
          :disabled="disableSubmit"
          :loading="isLoading"
          @click="submit"
          color="success"
          round
        ) {{ $t('general.save') }}
</template>

<script>
import { mapActions } from 'vuex'

import PanelContainer from '@/components/common/panel-container'

import EditablePanelMixin from '@/mixins/editable-panel.mixin'
import ErrorHandlerMixin from '@/mixins/error-handler.mixin'

export default {
  components: {
    PanelContainer
  },
  mixins: [
    EditablePanelMixin,
    ErrorHandlerMixin
  ],
  data () {
    return {
      formData: {
        password: '',
        password_confirm: ''
      }
    }
  },
  computed: {
    disableSubmit () {
      return !this.formData.password || !this.formData.password_confirm
    },
    nonFieldError () {
      for (let error of this.getErrorMessages('non_field_errors')) {
        return error
      }
      return ''
    }
  },
  methods: {
    ...mapActions('user', ['changePassword']),
    submit () {
      this.isLoading = true
      this.changePassword(this.formData).then(response => {
        this.setFormData()
        this.showSuccessMessage()
        this.isEditing = false
        this.isLoading = false
      }).catch(err => {
        this.setErrorData(err)
        this.isLoading = false
        console.log(this.errorData)
      })
    }
  }
}
</script>
