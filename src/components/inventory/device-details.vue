<template lang="pug">
  base-dialog(
    :show="show"
    @close="close"
    max-width="900"
    persistent
  )
    v-layout(row)
      v-flex(xs10)
        h2.dialog-heading {{ $t('inventory.equipmentDetails') }}
    // data details row
    v-layout.py-4(row wrap)
      v-flex
        v-icon(
          v-if="device.status === 'active'"
          color="green"
          small
        ) brightness_1
        v-icon(
          v-else
          color="grey"
          small
        ) brightness_1

      v-flex
        | {{ device.status === 'active' ? 'online' : 'offline' }}
      v-flex
        strong.mr-1 {{ $t('general.name') }}:
        | {{ device.name }}
      v-flex
        strong.mr-1 {{ $t('general.MACAddress') }}:
        | {{ device.macAddresses }}
      v-flex
        strong.mr-1 {{ $t('general.siteGroup') }}:
        | {{ device.parent_name }}
      v-flex
        strong.mr-1 {{ $t('general.vendor') }}:
        | {{ device.vendor_name || '--' }}

    v-layout.py-4(row)
      // hide tags for now
      v-flex(xs6 v-if="false")
        // tags management component
        tags-management
      v-flex(xs12)
        // move site component
        move-device(
          :selected-items="[device]"
          @move="move"
          @delete="this.$emit('delete')"
        )
</template>

<script>
import { mapGetters } from 'vuex'

import MoveDevice from './move-device.vue'
import TagsManagement from './tags.vue'

export default {
  components: {
    MoveDevice,
    TagsManagement
  },

  props: {
    show: {
      type: Boolean,
      default: false
    },
    device: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  computed: {
    ...mapGetters(['equipmentDetails'])
  },

  methods: {
    close () {
      this.$emit('close')
    },
    move (targetNode) {
      this.$emit('move', targetNode)
    }
  }
}
</script>
