<template lang='pug'>
  base-dialog(:show="show", @close="close")
    h2.step-heading.mb-3 {{ $t('inventory.newDevice') }}
    v-stepper(v-model="currentStep")
      v-stepper-header.mb-5
        v-stepper-step(:complete="currentStep > 1", step="1")
        v-divider
        v-stepper-step(:complete="currentStep > 2", step="2")
        v-divider
        v-stepper-step(:complete="currentStep > 3", step="3")
      v-stepper-items
        v-stepper-content(step="1")
          div.mb-5.py-0
            device-import-selection(
              @change="nextStep"
              is-btn
              v-model="importMode"
            )

        v-stepper-content(step="2")
          div.mb-5.py-0
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

        v-stepper-content(step="3")
          v-layout.mb-5(row wrap)
            v-flex(xs12 text-xs-center)
              v-btn(
                color="success"
                large
                outline
                round
              ) {{ $t('general.viewDocumentation') }}

              v-btn(
                color="success"
                large
                outline
                round
              ) {{ $t('general.sendDocumentationByEmail') }}

      v-layout(
        row wrap mb-2
        v-show="currentStep > 1"
      )
        v-flex(xs12)
          v-btn(
            @click.native="currentStep -= 1"
            color="success"
            large
            round
          ) {{$t('general.previous')}}

          v-btn(
            :disabled="continueDisabled()"
            :loading="isSaving"
            @click.native="nextStep"
            color="success"
            large
            round
            style="float: right"
          ) {{ continueBtnLabel }}
</template>

<script>
import { mapGetters } from 'vuex'

import DeviceImportSelection from '@/components/common/device-import/selection'
import ManualImport from '@/components/common/device-import/manual-import'
import CsvImport from '@/components/common/device-import/csv-import'
import MerakiApiImport from '@/components/common/device-import/meraki-api-import'
import ArubaApiImport from '@/components/common/device-import/aruba-api-import'
import VendorApiImport from '@/components/common/device-import/vendor-api-import'

import DeviceImportMixin from '@/mixins/device-import.mixin'
import ErrorHandlerMixin from '@/mixins/error-handler.mixin'

export default {
  props: ['show'],
  data () {
    return {
      currentStep: 1,
      isSaving: false
    }
  },
  components: {
    ArubaApiImport,
    DeviceImportSelection,
    ManualImport,
    CsvImport,
    MerakiApiImport,
    VendorApiImport
  },
  mixins: [
    DeviceImportMixin,
    ErrorHandlerMixin
  ],
  computed: {
    ...mapGetters('organization', ['selectedOrganization']),
    orgId () {
      return this.selectedOrganization.id
    },
    continueBtnLabel () {
      if (this.currentStep < 3) {
        return this.$t('general.continue')
      } else {
        return this.$t('general.importDevices')
      }
    }
  },
  methods: {
    saveInventory () {
      if (this.isManualImport) {
        this.submit(this.$refs.manualImport)
      } else if (this.isCsvImport) {
        this.submit(this.$refs.csvImport)
      } else if (this.isVendorImport) {
        this.submit(this.$refs.vendorImport)
      }
    },
    submit (ref) {
      this.isSaving = true
      ref.submit(this.orgId).then(response => {
        this.isSaving = false
        this.showSuccessMessage()
      }).catch(err => {
        this.isSaving = false
        this.setErrorData(err)
      })
    },
    resetData () {
      Object.assign(this.$data, this.$options.data.apply(this))
    },
    close () {
      this.$emit('close')
      this.resetData()
    },
    showSuccessMessage () {
      this.close()
      const successMessage = this.$t('inventory.savedSuccessfully')
      global.toastr['success'](successMessage, this.$t('general.success'))
    },
    continueDisabled () {
      if (this.currentStep === 2) {
        return !this.isImportDataValid()
      } else if (this.currentStep === 3) {
        return false
      } else {
        return true
      }
    },
    nextStep () {
      if (this.currentStep < 3) {
        this.currentStep += 1
      } else {
        this.saveInventory()
      }
    }
  }
}
</script>
