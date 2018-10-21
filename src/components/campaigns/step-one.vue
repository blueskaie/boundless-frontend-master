<template lang="pug">
  .step-one
    h2.step-heading.mb-3 {{ $t('campaign.createNewCampaign') }}
    v-layout(row)
      v-flex(xs12)
          v-layout(row)
            v-flex(xs12, sm5)
              v-text-field(
                v-model="value.name"
                :label="$t('campaign.nameOfCampaign')"
                required
              )
            v-flex(xs12, offset-sm2, sm5, class="input-wrap")
              v-select(
                :items="splashPages"
                :label="$t('campaign.chooseSplashPage')"
                required
                item-text="name"
                v-help-tooltip="{ message: $t('campaign.chooseSplashPageHelp') }"
                v-model="value.splashpage"
              )
          v-layout(row)
            v-flex(xs12, sm5, class="input-wrap")
              node-select(
                :indent-level="0"
                :items="nodesWithTypeAndIndentation"
                :label="$t('campaign.selectGroup')"
                autocomplete
                clearable
                hide-details
                v-help-tooltip="{ message: $t('campaign.selectGroupHelp') }"
                v-model="value.node"
              )

            v-flex(xs12, offset-sm2, sm5)
              v-select(
                :items="filteredDevices"
                :label="$t('campaign.chooseWifiDevice')"
                autocomplete
                item-text="name"
                item-value="id"
                v-model="value.device"
              )

          v-layout(row).mt-4
            v-flex(xs12, sm5)
              h2.step-heading.mb-3 {{ $t('campaign.programMyCampaign') }}
            v-flex(xs12, offset-sm2, sm5).custom-switch
              label.disabled-label {{ $t('general.disabled') }}
              v-switch(
                :label="$t('general.active')"
                v-model="value.schedule_is_active"
                color="deep-purple lighten-2"
                hide-details
              )

          v-layout(row v-if="value.schedule_is_active")
            v-flex(xs12, sm5)
              date-picker(
                v-model="value.campaignStartDate"
                :label="$t('campaign.campaignStartDate')"
                required
              )
            v-flex(xs12, offset-sm2, sm5)
              date-picker(
                v-model="value.campaignEndDate"
                :label="$t('campaign.campaignFinishDate')"
                required
              )
          v-layout(row v-if="value.schedule_is_active")
            v-flex(xs12, sm5)
              time-picker(
                v-model="value.campaignStartTime"
                :label="$t('campaign.campaignStartTime')"
                required
              )
            v-flex(xs12, offset-sm2, sm5)
              time-picker(
                v-model="value.campaignEndTime"
                :label="$t('campaign.campaignFinishTime')"
                required
              )

          v-layout.mt-3(row v-if="value.schedule_is_active")
            label
              | {{ '* ' + $t('campaign.newCampaignNote') }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import DatePicker from '@/components/common/date-picker'
import TimePicker from '@/components/common/time-picker'

import ManageableNodesMixin from '@/mixins/manageable-nodes.mixin'
import NodeSelect from '@/components/common/node-select'

export default {
  props: ['value'],
  data () {
    return {
      devices: [],
      filters: {
        types: 'organization,group,site'
      }
    }
  },
  mixins: [
    ManageableNodesMixin
  ],
  components: {
    DatePicker,
    NodeSelect,
    TimePicker
  },
  mounted () {
    if (this.splashPages.length < 1) {
      if (this.orgId) {
        this.fetchSplashPages()
      }
    }

    if (this.devices.length < 1) {
      this.fetchDevices()
    }
  },
  computed: {
    ...mapGetters('organization', ['selectedOrganization', 'splashPages']),
    orgId () {
      return this.selectedOrganization.id
    },
    filteredDevices () {
      if (this.value.node) {
        return this.devices.filter(device => device.parent === this.value.node)
      } else {
        return this.devices
      }
    }
  },
  methods: {
    ...mapActions('organization', ['fetchSplashPages']),
    ...mapActions('device', ['fetchDevices']),
    fetchDevices () {
      this.$store.dispatch('device/fetchDevices', {
        organization: this.orgId,
        page_size: 1000
      }).then(response => {
        this.devices = response.data.data.results
      })
    },
    input (value) {
      console.log(value)
    }
  },
  watch: {
    orgId (newId) {
      this.fetchSplashPages()
      this.fetchDevices()
    }
  }
}
</script>

<style lang="scss">
  .custom-switch {
    display: flex;
    align-items: center;
    .disabled-label {
      color: #6e7072;
      font-size: 16px;
      margin-right: 14px;
    }
  }
  .condition-text {
    position: absolute;
    bottom: 5px;
  }
</style>
