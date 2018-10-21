<template lang='pug'>
  v-container(grid-list-md)
    v-layout(row)
      // materialDetails row
      v-flex(xs12)
        v-layout(row)
          v-flex(xs12)
            h2 {{ $t('settings.materialDetails') }} : {{ $t('organization.createManually') }}
            p.mt-4 {{ $t('organization.createManuallyDescription') }}

    removable-item.py-3.pl-3.pr-1.my-3(
      v-for="(device, index) in value"
      :key="index"
      :removable="index > 0"
      @remove="removeDevice(index)"
    )
      v-flex(xs12 sm6 px-2)
        v-select(
          :items="deviceVendors"
          :label="$t('general.routerVendor')"
          item-text="name"
          item-value="id"
          required
          v-help-tooltip="{ message: $t('general.routerVendorHelp') }"
          v-model="device.vendor"
        )

      v-flex(xs12 sm6 px-2)
        v-select(
          :disabled="!device.vendor"
          :items="getRouterModels(device)"
          :label="$t('general.routerModel')"
          item-text="name"
          item-value="id"
          required
          v-help-tooltip="{ message: $t('general.routerModelHelp') }"
          v-model="device.model"
        )

      v-flex(xs12 sm6 px-2)
        node-name-input(
          :label="$t('settings.routerName')"
          required
          v-model="device.name"
        )

      v-flex(xs12 sm6 px-2)
        v-text-field(
          :label="$t('general.MACAddress')"
          :error-messages="device.mac_address_error"
          @blur="validateMacAddress"
          v-model="device.mac_address"
        )

    v-layout(row)
      v-flex.text-xs-right(xs12)
        v-btn(
          color="success"
          outline
          round
          @click.native="addDevice"
        ) {{ $t(' general.addAnother ') }}

</template>
<script>
import { mapActions, mapGetters } from 'vuex'

import RemovableItem from '@/components/common/removable-item'

export default {
  props: ['value'],
  components: {
    RemovableItem
  },
  mounted () {
    if (!this.deviceVendors.length) {
      this.fetchDeviceVendors()
    }
  },
  computed: {
    ...mapGetters('device', ['deviceVendors']),
    ...mapGetters('organization', ['selectedOrganization'])
  },
  methods: {
    ...mapActions('device', ['fetchDeviceVendors']),
    isValidMacaddress (value) {
      const regexp = /^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/i
      return regexp.test(value)
    },
    validateMacAddress () {
      this.value.forEach(device => {
        if (device.mac_address && !this.isValidMacaddress(device.mac_address)) {
          this.$set(device, 'mac_address_error', this.$t('general.invalidMacAddress'))
        } else {
          this.$set(device, 'mac_address_error', [])
        }
      })
    },
    getRouterModels (device) {
      const vendor = this.deviceVendors.find(vendor => vendor.id === device.vendor)
      const models = vendor ? vendor.models : []

      if (!models.find(model => model.id === device.model)) {
        device.model = null
      }
      return models
    },
    addDevice () {
      const newValue = this.value.slice()
      newValue.push({})
      this.$emit('input', newValue)
    },
    removeDevice (index) {
      const newValue = this.value.slice()
      newValue.splice(index, 1)
      this.$emit('input', newValue)
    },
    isValid () {
      for (let item of this.value) {
        if (!item.name || !item.model || !item.vendor) {
          return false
        } else if (item.name.length > 64) {
          return false
        } else if (item.mac_address_error && !Array.isArray(item.mac_address_error)) {
          return false
        }
      }
      return true
    },
    submit (orgId) {
      this.value.forEach(device => {
        device.parent = this.selectedOrganization.id
        if (device.mac_address) {
          device.mac_addresses = [{mac_address: device.mac_address}]
        }
      })
      return this.$store.dispatch('device/createDevice', this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.removable-item /deep/ {
  .mac-label {
    margin-bottom: 18px !important;
  }
}
</style>
