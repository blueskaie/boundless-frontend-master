<template lang="pug">
  editable-panel(
    :disable-submit="disableSubmit"
    :is-editing="isEditing"
    :is-loading="isLoading"
    :submitText="$t('general.changeEmail')"
    :title="$t('general.email')"
    @cancel="cancel"
    @edit="edit"
    @submit="submit"
  )
    v-form(
      @submit.prevent="submit"
      slot-scope="{readonly}"
    )
      v-layout(row wrap)
        v-flex.px-3(xs12)
          v-text-field(
            :error-messages="getErrorMessages('email')"
            :label="$t('general.email')"
            :readonly="readonly"
            v-model="formData.email"
          )
        v-flex(xs12)
          v-alert(
            color="success"
            dismissible
            icon="check_circle"
            outline
            transition="scale-transition"
            v-model="showConfirmationAlert"
          )
            | {{ $t('user.changeEmailConfirmationSent') }}
            | {{ $t('user.changeEmailVerify') }}
</template>

<script>
import { mapActions } from 'vuex'

import EditablePanel from '@/components/common/editable-panel'

import CurrentUserMixin from '@/mixins/current-user.mixin'
import EditablePanelMixin from '@/mixins/editable-panel.mixin'
import ErrorHandlerMixin from '@/mixins/error-handler.mixin'

export default {
  components: {
    EditablePanel
  },
  mixins: [
    CurrentUserMixin,
    EditablePanelMixin,
    ErrorHandlerMixin
  ],
  mounted () {
    this.setFormData()
    this.currentEmail = this.currentUser.email
  },
  data () {
    return {
      formData: {
        email: ''
      },
      showConfirmationAlert: false,
      currentEmail: ''
    }
  },
  computed: {
    disableSubmit () {
      return !this.formData.email || this.currentEmail === this.formData.email
    }
  },
  methods: {
    ...mapActions('user', ['updateUserEmail']),
    setFormData () {
      this.$set(this.formData, 'email', this.currentUser.email)
    },
    submit () {
      this.clearErrorData()
      this.isLoading = true
      this.updateUserEmail(this.formData).then((response) => {
        this.isLoading = false
        this.isEditing = false
        this.showConfirmationAlert = true
        this.currentEmail = this.formData.email
      }).catch(err => {
        this.setErrorData(err)
        this.isLoading = false
      })
    }
  }
}
</script>
