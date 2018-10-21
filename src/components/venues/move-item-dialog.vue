<template lang="pug">
  base-dialog(:show="show", @close="$emit('close')", max-width="500")
    h2.dialog-heading.mb-3 {{dialogHeading}}
    node-select(
      :items="filteredList"
      :label="$t('settings.selectGroup')"
      autocomplete
      hide-details
      v-help-tooltip="{ message: $t('settings.selectGroupHelp') }"
      v-model="selected"
    )
    v-layout.pt-3.text-xs-right(row)
      v-flex(xs12)
        v-btn(
          :disabled="!selected"
          :loading="loading"
          @click="moveItems"
          color="success"
          large
          round
        ) {{$t('general.move')}}
</template>

<script>
import { mapActions } from 'vuex'

import ManageableNodesMixin from '@/mixins/manageable-nodes.mixin'

import NodeSelect from '@/components/common/node-select'

export default {
  props: ['show', 'item', 'flatList', 'selectedItems'],
  data () {
    return {
      selected: null,
      loading: false
    }
  },
  mixins: [
    ManageableNodesMixin
  ],
  components: {
    NodeSelect
  },
  methods: {
    ...mapActions('venue', ['moveSelectedItems', 'toggleMoveDialog']),
    moveItems () {
      this.loading = true
      let successMessage = (this.selectedItems.length > 1) ? this.$t('venue.itemsMovedMessage') : this.$t('venue.itemMovedMessage')

      this.moveSelectedItems(this.selected).then(() => {
        this.loading = false
        global.toastr['success'](successMessage, this.$t('general.success'))
        this.toggleMoveDialog()
      })
    }
  },
  computed: {
    filteredList () {
      // filter list of groups from allItems except the selected groups
      const nodes = this.flatList.filter((obj) => {
        return obj.type === 'group' && !this.selectedItems.some((obj2) => {
          return obj.id === obj2.id
        })
      })
      return this.transformNodesWithTypeAndIndentation(nodes)
    },
    dialogHeading () {
      if (this.selectedItems.length) {
        let deleteMessage = `Move "${this.selectedItems[0].name}" to`

        if (this.selectedItems.length > 1) {
          deleteMessage = `Move ${this.selectedItems.length} ${this.selectedItems[0].type}s to`
        }

        return deleteMessage
      }

      return 'Delete Item'
    }
  }
}
</script>
