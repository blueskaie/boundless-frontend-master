<template lang="pug">
  editable-panel(
    :disableSubmit="disableSubmit"
    :is-editing="isEditing"
    :is-loading="isLoading"
    :title="`Meraki ${$t('general.apiKey')}`"
    @cancel="cancel"
    @edit="edit"
    @submit="submit"
  )
    v-form(slot-scope="{readonly}")
      v-layout(row)
        v-flex(xs12 px-3)
          v-text-field(
            :error-messages="getErrorMessages('meraki_api_key', profileErrors)"
            :readonly="readonly"
            :label="$t('general.apiKey')"
            clearable
            placeholder="--"
            v-model="formData.meraki_api_key"
          )
</template>

<script>
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
  data () {
    return {
      formData: {
        meraki_api_key: ''
      }
    }
  },
  mounted () {
    this.setFormData()
  },
  computed: {
    disableSubmit () {
      const formKey = this.formData.meraki_api_key
      const apiDisplay = this.profile.meraki_api_key_display
      return (!formKey && !apiDisplay) || this.formKey === apiDisplay
    },
    profileErrors () {
      return this.errorData.profile
    }
  },
  methods: {
    setFormData () {
      this.$set(this.formData, 'meraki_api_key', this.profile.meraki_api_key_display)
    },
    submit () {
      this.clearErrorData()
      this.isLoading = true

      // Set to blank instead of null since vuetifyjs sets the value to null
      // when clearing the input
      if (!this.formData.meraki_api_key) {
        this.$set(this.formData, 'meraki_api_key', '')
      }

      this.updateUser({profile: this.formData}).then(response => {
        this.isLoading = false
        this.isEditing = false
        this.setFormData()
        this.showSuccessMessage()
      }).catch(err => {
        this.setErrorData(err)
        this.isLoading = false
      })
    }
  }
}
</script>
