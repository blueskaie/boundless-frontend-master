<template lang="pug">
  editable-panel(
    :is-editing="isEditing"
    :is-loading="isLoading"
    :title="$t('organization.exportDataFTP')"
    :disableSubmit="disableSubmit"
    @cancel="cancel"
    @edit="edit"
    @submit="submit"
  )
    v-layout(row wrap slot-scope="{readonly}")
      v-flex(xs12 md6 px-3)
        v-text-field.mr-3(
          :error-messages="getErrors('serverHost')"
          :label="$t('general.serverHost')"
          :name="$t('general.serverHost')"
          :readonly="readonly"
          @input="$v.formData.serverHost.$touch()"
          placeholder="--"
          required
          v-model="formData.serverHost"
        )
      v-flex(xs12 md6 px-3)
        v-text-field(
          :error-messages="getErrors('serverPort')"
          :label="$t('general.serverPort')"
          :name="$t('general.serverPort')"
          :readonly="readonly"
          @input="$v.formData.serverPort.$touch()"
          type="number"
          placeholder="--"
          required
          v-model="formData.serverPort"
        )
      v-flex(xs12 md6 px-3)
        v-text-field(
          :error-messages="getErrors('username')"
          :label="$t('general.username')"
          :name="$t('general.username')"
          :readonly="readonly"
          @input="$v.formData.username.$touch()"
          placeholder="--"
          required
          v-model="formData.username"
        )
      v-flex(xs12 md6 px-3)
        v-text-field(
          :append-icon-cb="() => passwordHidden = !passwordHidden"
          :append-icon="passwordHidden ? 'visibility' : 'visibility_off'"
          :error-messages="getErrors('password')"
          :label="$t('general.password')"
          :name="$t('general.password')"
          :type="passwordHidden ? 'password' : 'text'"
          :readonly="readonly"
          @input="$v.formData.password.$touch()"
          placeholder="--"
          required
          v-model="formData.password"
        )
      v-flex(xs12 md6 px-3)
        v-select(
          :error-messages="getErrors('protocol')"
          :items='protocols'
          :label="$t('general.protocol')"
          :readonly="readonly"
          @input="$v.formData.protocol.$touch()"
          placeholder="--"
          required
          v-model="formData.protocol"
        )
      v-flex(xs12 md6 px-3)
        v-text-field(
          :label="$t('general.path')"
          :name="$t('general.path')"
          :readonly="readonly"
          placeholder="--"
          v-model="formData.path"
        )

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { between, required } from 'vuelidate/lib/validators'

import ErrorHandlerMixin from '@/mixins/error-handler.mixin'
import EditablePanelMixin from '@/mixins/editable-panel.mixin'

import EditablePanel from '@/components/common/editable-panel'

export default {
  name: 'DataExport',

  mixins: [
    EditablePanelMixin,
    ErrorHandlerMixin
  ],

  components: {
    EditablePanel
  },

  mounted () {
    this.setFormData()
  },

  data () {
    return {
      formData: {
        path: '',
        serverHost: '',
        username: '',
        protocol: '',
        serverPort: '',
        password: ''
      },
      protocols: [
        'FTP',
        'SFTP'
      ],
      isLoading: false,
      passwordHidden: true
    }
  },

  validations: {
    formData: {
      serverHost: {
        required
      },
      username: {
        required
      },
      protocol: {
        required
      },
      serverPort: {
        required,
        between: between(1, 65535)
      },
      password: {
        required
      }
    }
  },

  computed: {
    ...mapGetters('organization', ['selectedOrganization']),
    disableSubmit () {
      return this.$v.formData.$invalid
    }
  },

  methods: {
    ...mapActions('organization', ['updateOrganization']),
    getErrors (fieldName) {
      const vueErrors = this.getVueErrors(`formData.${fieldName}`)
      if (vueErrors.length > 0) {
        return vueErrors
      } else {
        return this.getErrorMessages(fieldName)
      }
    },
    setFormData () {
      if (this.selectedOrganization.export_config) {
        this.formData = {...this.selectedOrganization.export_config.FTP}
      }
    },
    submit () {
      this.isLoading = true
      this.$v.$touch()
      this.clearErrorData()
      const data = {
        export_config: {
          FTP: this.formData
        }
      }
      this.updateOrganization(data).then(response => {
        this.isEditing = false
        this.isLoading = false
        this.showSuccessMessage()
      }).catch(err => {
        this.setErrorData(err)
        this.isLoading = false
      })
    }
  },

  watch: {
    selectedOrganization (val) {
      this.setFormData()
    }
  }
}
</script>
