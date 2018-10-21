<template lang='pug'>
  v-container(grid-list-md)
    v-layout(row)
      // materialDetails row
      v-flex(xs12)
        device-import-selection(
          v-model="importMode"
        )

    v-layout(row px-2)
      v-flex(xs12)
        manual-import(
          ref="manualImport"
          v-if="isManualImport"
          v-model="device.manualData"
        )
        csv-import(
          ref="csvImport"
          v-if="isCsvImport"
          v-model="device.fileUploadData"
        )
        vendor-api-import(
          ref="vendorImport"
          v-if="isVendorImport"
          v-model="device.vendorData"
        )
</template>
<script>
import Vue from 'vue'

import DeviceImportMixin from '@/mixins/device-import.mixin'

import DeviceImportSelection from '@/components/common/device-import/selection'
import ManualImport from '@/components/common/device-import/manual-import'
import CsvImport from '@/components/common/device-import/csv-import'
import VendorApiImport from '@/components/common/device-import/vendor-api-import'

export default {
  mixins: [DeviceImportMixin],
  components: {
    DeviceImportSelection,
    ManualImport,
    CsvImport,
    VendorApiImport
  },

  data () {
    return {
      isSaving: false
    }
  },

  watch: {
    device: {
      handler () {
        const vm = this
        Vue.nextTick(function () {
          vm.$emit('change', vm.isImportDataValid())
        })
      },
      deep: true
    },
    importMode () {
      const vm = this
      Vue.nextTick(function () {
        vm.$emit('change', vm.isImportDataValid())
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.material-details-buttons {
  height: 90px;
  padding: 25px 15px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #333;
  background: #eee;
  cursor: pointer;
}
</style>
