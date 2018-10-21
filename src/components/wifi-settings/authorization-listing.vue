<template lang="pug">
  .page-content
    v-layout.mb-5
      v-flex(xs12, sm12, md6, lg6)
        h2 {{ $t(' wifi.wifiAuthorisationListing ') }}
      v-flex.pb-3(xs6, md6, lg6, text-xs-right)
        v-btn.primary-action(color='primary', @click.stop='showAuthorizationDetailsModal = true')
          | New Ticket
          v-icon add_circle_outline

    base-table(:items="wifiAuthorizationListing", :table-headers="headers", :loading="loading", icon="fas fa-wifi")
    authorization-details-dialog(:show="showAuthorizationDetailsModal", @close="showAuthorizationDetailsModal = false")
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import authorizationDetailsDialog from './authorization-details-dialog.vue'
import baseTable from '../common/base-table'

export default {
  name: 'WifiSettingsAuthorizationListing',

  mounted () {
    if (this.fetchWifiAuthorizationListing.length < 1) {
      this.loading = true
      this.fetchWifiAuthorizationListing().then(() => {
        this.loading = false
      })
    }
  },

  components: {
    authorizationDetailsDialog,
    baseTable
  },

  data () {
    return {
      headers: [
        { value: 'selected', align: 'left', sortable: false, width: 50, selected: true },
        { text: this.$t('wifi.creationDate'), value: 'authorized_at', align: 'left', sortable: false, selected: false },
        { text: this.$t('wifi.creatorEmail'), value: 'authorizer_email', align: 'left', sortable: false, selected: true },
        { text: this.$t('wifi.visitor'), value: 'visitor_email', align: 'left', sortable: false, selected: true },
        { text: this.$t('wifi.duration'), value: 'authorized_duration', align: 'left', sortable: false, selected: true },
        { text: this.$t('wifi.authenticationDate'), value: 'authenticated_at', align: 'left', sortable: false, selected: true },
        { text: this.$t('general.siteGroup'), value: 'site', align: 'left', sortable: false, selected: true },
        { text: this.$t('wifi.type'), value: 'type', align: 'left', sortable: false, selected: true },
        { text: 'actions', value: 'actions', align: 'right', sortable: false, selected: true }
      ],
      loading: false,
      showAuthorizationDetailsModal: false
    }
  },

  computed: {
    ...mapGetters(['wifiAuthorizationListing'])
  },

  methods: {
    ...mapActions(['fetchWifiAuthorizationListing']),
    editItem (item) {
      console.log('editItem', item)
    },
    deleteItem () {
      console.log('deleteItem')
    },
    moreActions () {
      console.log('moreActions')
    }
  }
}
</script>

<style scoped lang="sass">
  .user-list-table-row
    .user-list-table-actions
      opacity: 0
    &:hover
      .user-list-table-actions
        opacity: 1
</style>
