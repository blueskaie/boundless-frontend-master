<template lang="pug">
  v-card.pa-4
    h3.pb-3 {{ dialogHeading }}
    node-select(
      :items="nodesWithGroupsDisabled"
      :label="$t('settings.selectSite')"
      clearable
      single-line
      autocomplete
      hide-details
      v-help-tooltip="{ message: $t('settings.selectSiteHelp') }"
      v-model="targetNode"
    )

    v-card-actions.pt-5
      v-spacer
      v-btn(
        :disabled="!targetNode"
        @click="move"
        class="white--text"
        color="indigo"
      ) {{ $t('general.move') }}
      v-btn(
        @click="$emit('delete')"
        color="error"
      ) {{ $t('general.delete') }}
</template>

<script>
import MoveDeviceMixin from '@/mixins/move-device.mixin'

export default {
  props: {
    selectedItems: {
      type: Array,
      required: true
    }
  },

  mixins: [
    MoveDeviceMixin
  ],

  methods: {
    close () {
      this.targetNode = null
      this.$emit('close')
    },
    move () {
      this.$emit('move', this.targetNode)
      this.targetNode = null
    }
  }
}
</script>
