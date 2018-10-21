<template lang='pug'>
  .page-content
    v-layout.mb-5
      v-flex(xs12, sm12, md6, lg6)
        h2 {{$t('inventory.deviceInventory')}}
      v-flex.pb-3(xs6, md6, lg6, text-xs-right)
        v-btn.primary-action(color="primary", @click.stop="showNewDeviceInventory = true")
          | {{ $t("inventory.newDevice") }}
          v-icon add_circle_outline

    v-layout.grey.lighten-3(row wrap)
      v-flex(xs6)
        // tags popup, disable for now
        v-menu(v-if="false" :close-on-content-click='false', :nudge-width='320', v-model='tagsMenu', offset-y)
          v-btn(slot='activator', color='indigo', dark) {{ $t('general.tags') }}

          // tags management component
          tags-management

        // move popup
        v-menu(
          :close-on-content-click="false"
          :nudge-width="320"
          offset-y
          v-model="moveMenu"
        )
          v-btn(
            slot="activator"
            color="indigo"
            class="white--text"
            :disabled="!selectedDevices.length"
          ) {{ $t('general.move') }}

          // move site component
          move-device(
            :selected-items="devicesToBeMoved"
            @move="moveSelectedDevices"
            @delete="deleteSelectedDevices"
          )

    base-table.devices-table(
      :loading="loading"
      :table-headers="headers"
      :items="devicesWithMacAddresses"
      :search="search"
      icon="wifi"
      @rowClicked="onRowClick"
      row-clickable
      selectable
      select-all
      v-model="selectedDevices"
    )
      template(slot="row-action" slot-scope="props")
        .row-popover-item(@click="moveDevice(props.item)")
          v-icon fas fa-arrows-alt
        .row-popover-item(@click="deleteDevice(props.item.id)")
          v-icon delete

    device-details(
      :device="selectedDevice"
      :show="showDetails"
      @close="hideDeviceDetails"
      @move="moveSelectedDevices"
      @delete="deleteSelectedDevices"
    )
    add-inventory-dialog(:show="showNewDeviceInventory", @close="showNewDeviceInventory = false")
    move-device-dialog(
      :selected-items="devicesToBeMoved"
      :show="showMoveDeviceDialog"
      @close="hideMoveDeviceDialog"
      @move="moveSelectedDevices"
    )
</template>

<script>
import { mapGetters } from 'vuex'

import DeviceDetails from './device-details.vue'
import MoveDevice from './move-device.vue'
import MoveDeviceDialog from './move-device-dialog'
import WifiIcon from '@/components/icons/wifi'

import addInventoryDialog from './add-inventory-dialog'
import baseTable from '../common/base-table'
import tagsManagement from './tags.vue'

export default {
  components: {
    DeviceDetails,
    MoveDevice,
    MoveDeviceDialog,
    WifiIcon,
    addInventoryDialog,
    baseTable,
    tagsManagement
  },

  mounted () {
    if (this.selectedOrganization.id) {
      this.fetchDevices()
    } else {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'organization/SELECT_ORGANIZATION') {
          if (this.selectedOrganization.id) {
            this.fetchDevices()
          }
        }
      })
    }
  },

  data () {
    return {
      devices: [],
      headers: [
        { sortable: false, value: 'icon', selected: true },
        { text: this.$t('general.name'), sortable: true, value: 'name', selected: true },
        { text: this.$t('general.MACAddress'), sortable: true, value: 'macAddresses', selected: true },
        { text: this.$t('general.siteGroup'), sortable: true, value: 'parent_name', selected: true },
        { text: this.$t('general.model'), sortable: true, value: 'model_name', selected: true },
        { text: this.$t('general.vendor'), sortable: true, value: 'vendor_name', selected: true },
        { text: 'actions', sortable: false, align: 'right', value: 'actions', selected: true }
      ],
      search: '',
      selectedDevice: {},
      selectedDevices: [],
      showNewDeviceInventory: false,
      showMoveDeviceDialog: false,
      showDetails: false,
      moveMenu: false,
      loading: false
    }
  },

  computed: {
    ...mapGetters('organization', ['selectedOrganization']),
    selectedDeviceIds () {
      return this.selectedDevices.map(item => item.id).toString()
    },
    devicesToBeMoved () {
      if (global._.isEmpty(this.selectedDevice)) {
        return this.selectedDevices
      } else {
        return [this.selectedDevice]
      }
    },
    devicesWithMacAddresses () {
      return this.devices.map(device => {
        return {
          ...device,
          macAddresses: this.getMacAddresses(device)
        }
      })
    }
  },

  methods: {
    showDeviceDetails (device) {
      this.selectedDevice = device
      this.showDetails = true
    },
    hideDeviceDetails () {
      this.showDetails = false
      this.selectedDevice = {}
    },
    clearSelectedDevices () {
      if (global._.isEmpty(this.selectedDevice)) {
        this.selectedDevices = []
      }
      this.selectedDevice = {}
      this.moveMenu = false
      this.showDetails = false
      this.showMoveDeviceDialog = false
    },
    fetchDevices () {
      this.loading = true
      const filters = {
        organization: this.selectedOrganization.id,
        page_size: 1000
      }
      this.$store.dispatch('device/fetchDevices', filters).then(response => {
        const data = response.data.data
        this.devices = data.results
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    moveDevice (device) {
      this.selectedDevice = device
      this.showMoveDeviceDialog = true
    },
    moveSelectedDevices (targetNode) {
      const data = {
        targetNode: targetNode,
        deviceIds: this.devicesToBeMoved.map(item => item.id).toString()
      }
      this.$store.dispatch('device/moveSelectedDevices', data).then(response => {
        this.clearSelectedDevices()
        this.fetchDevices()
      }).catch(err => {
        console.log(err)
      })
    },
    deleteSelectedDevices () {
      this.$store.dispatch('device/deleteSelectedDevices', this.selectedDeviceIds).then(response => {
        this.clearSelectedDevices()
        this.fetchDevices()
      }).catch(err => {
        console.log(err)
      })
    },
    deleteDevice (deviceId) {
      this.$store.dispatch('device/deleteDevice', deviceId).then(response => {
        this.fetchDevices()
      }).catch(err => {
        console.log(err)
      })
    },
    getMacAddresses (device) {
      return device.mac_addresses.map(item => item.mac_address).join(', ')
    },
    onRowClick (item) {
      this.showDeviceDetails(item)
    },
    hideMoveDeviceDialog () {
      this.showMoveDeviceDialog = false
      this.selectedDevice = {}
    }
  },

  watch: {
    selectedOrganization (newOrg, oldOrg) {
      if (newOrg.id !== oldOrg.id) {
        this.fetchDevices()
      }
    }
  }
}
</script>
