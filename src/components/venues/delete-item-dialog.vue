<template lang="pug">
    // delete group modal
    base-dialog(:show="show", max-width='700px', @close="$emit('close')")
      h2.dialog-heading.mb-3 {{ dialogHeading }}
      h4.dialog-subtitle {{ $t('settings.deleteGroupDescription') }}

      .text-xs-right.mt-5
        v-btn(@click.native="$emit('close')", round, large) {{ $t('general.cancel') }}
        v-btn(color="error", :loading="loading", @click.native="removeItems", round, large) {{ $t('general.delete') }}
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'DeleteGroupModal',

  props: ['show'],

  data () {
    return {
      checkbox: true,
      deleteGroupModal: false,
      loading: false
    }
  },

  computed: {
    ...mapGetters('venue', ['selectedItems']),

    dialogHeading () {
      if (this.selectedItems.length) {
        let deleteMessage = `Delete "${this.selectedItems[0].name}"`

        if (this.selectedItems.length > 1) {
          deleteMessage = `Delete ${this.selectedItems.length} ${this.selectedItems[0].type}s`
        }

        return deleteMessage
      }

      return 'Delete Item'
    }
  },

  methods: {
    ...mapActions('venue', ['deleteSelectedSites', 'deleteSelectedGroups', 'deleteSelectedDevices', 'deleteSelectedFloors', 'toggleDeleteDialog']),
    removeItems () {
      let selectedItemsLength = this.selectedItems.length
      let itemType = this.selectedItems[0].type

      if (itemType === 'group') {
        this.loading = true
        this.deleteSelectedGroups().then(() => {
          this.loading = false
          this.fireGroupsDeletedMessage(selectedItemsLength)
          this.toggleDeleteDialog()
        })
      } else if (itemType === 'site') {
        this.loading = true
        this.deleteSelectedSites().then(() => {
          this.loading = false
          this.fireSitesDeletedMessage(selectedItemsLength)
          this.toggleDeleteDialog()
        })
      } else if (itemType === 'device') {
        this.loading = true
        this.deleteSelectedDevices().then(() => {
          this.loading = false
          this.fireDevicesDeletedMessage(selectedItemsLength)
          this.toggleDeleteDialog()
        })
      } else if (itemType === 'floor') {
        this.loading = true
        this.deleteSelectedFloors().then(() => {
          this.loading = false
          this.fireFloorsDeletedMessage(selectedItemsLength)
          this.toggleDeleteDialog()
        })
      }
    },
    fireGroupsDeletedMessage (selectedItemsLength) {
      if (selectedItemsLength > 1) {
        global.toastr['success'](this.$t('venue.deleteGroupsMessage'), this.$t('general.success'))
      } else {
        global.toastr['success'](this.$t('venue.deleteGroupMessage'), this.$t('general.success'))
      }
    },
    fireSitesDeletedMessage (selectedItemsLength) {
      if (selectedItemsLength > 1) {
        global.toastr['success'](this.$t('venue.sitesDeletedMessage'), this.$t('general.success'))
      } else {
        global.toastr['success'](this.$t('venue.siteDeletedMessage'), this.$t('general.success'))
      }
    },
    fireDevicesDeletedMessage (selectedItemsLength) {
      if (selectedItemsLength > 1) {
        global.toastr['success'](this.$t('venue.devicesDeletedMessage'), this.$t('general.success'))
      } else {
        global.toastr['success'](this.$t('venue.deviceDeletedMessage'), this.$t('general.success'))
      }
    },
    fireFloorsDeletedMessage (selectedItemsLength) {
      if (selectedItemsLength > 1) {
        global.toastr['success'](this.$t('venue.floorsDeletedMessage'), this.$t('general.success'))
      } else {
        global.toastr['success'](this.$t('venue.floorDeletedMessage'), this.$t('general.success'))
      }
    }
  }
}
</script>
