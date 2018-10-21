<template lang='pug'>
  v-container(grid-list-md)
    v-layout(row wrap)
      // materialDetails row
      v-flex(xs12)
        v-layout(row)
          v-flex(xs12)
            h2 {{ $t('settings.materialDetails') }} : {{ $t('organization.importCsvXls') }}
            p.mt-4 {{ $t('organization.importCsvXlsDescription') }}

      v-flex(xs12)
        v-select(
          :items="inventoryFileTypes"
          :label="$t('general.selectInventoryFileType')"
          :value="value.inventory_file_type"
          @change="changeFileType"
          item-text="display_name"
        )
      v-flex(xs12)
         v-dropzone(
           :options="dropzoneOptions"
           @file-added="fileAdded"
           @removed-file="removedFile"
           ref="fileDropzone"
         )
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

import VDropzone from '@/components/common/v-dropzone'

export default {
  name: 'CsvImport',
  props: ['value'],
  components: {
    VDropzone
  },
  mounted () {
    if (!this.hasImportOptions) {
      this.fetchDeviceImportOptions(this.selectedOrganization.id)
    }
  },
  computed: {
    ...mapGetters('device', ['deviceImportOptions']),
    ...mapGetters('organization', ['selectedOrganization']),
    hasImportOptions () {
      return !global._.isEmpty(this.deviceImportOptions)
    },
    inventoryFileTypes () {
      if (this.hasImportOptions) {
        return this.deviceImportOptions.data.actions.POST.inventory_file_type.choices
      } else {
        return []
      }
    },
    dropzoneOptions () {
      return {
        acceptedFiles: 'text/csv',
        url: '/api/mock/url/',
        autoProcessQueue: false // Do not upload automatically
      }
    }
  },
  methods: {
    ...mapActions('device', ['fetchDeviceImportOptions']),
    changeFileType (inventoryFileType) {
      const newValue = Object.assign({}, this.value, {
        inventory_file_type: inventoryFileType
      })
      this.$emit('input', newValue)
    },
    fileAdded (file) {
      const newValue = Object.assign({}, this.value, {
        inventory_file: file
      })
      this.$emit('input', newValue)
    },
    removedFile (file) {
      const newValue = Object.assign({}, this.value, {
        inventory_file: null
      })
      this.$emit('input', newValue)
    },
    isValid () {
      return this.value.inventory_file && this.value.inventory_file_type
    },
    submit (orgId) {
      const formData = new FormData()
      formData.append('inventory_file_type', this.value.inventory_file_type)
      formData.append('inventory_file', this.value.inventory_file)
      const data = {
        orgId: orgId,
        formData: formData
      }
      return this.$store.dispatch('device/csvXlsImport', data)
    }

  }
}
</script>

<style lang="sass" scoped>
</style>
