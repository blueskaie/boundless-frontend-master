<template lang='pug'>
  .page-content
    v-layout.mb-5
      v-flex(xs12, sm12, md6, lg6)
        h2 Splash Pages
      v-flex.pb-3(xs6, md6, lg6, text-xs-right)
        v-btn.primary-action(color='primary', @click.stop='showNewSplashDialog = true')
          | {{ $t('splash.newSplash') }}
          v-icon add_circle_outline
    base-table(
      :items="splashPages",
      :table-headers="splashListHeaders",
      :loading="loading",
      icon="fas fa-image",
      @rowClicked="openSplashDetailPage",
      :row-clickable="true"
    )
      template(slot="row-action", slot-scope="slotProps")
        .row-popover-item(@click.prevent.stop="openPreview")
          v-icon remove_red_eye
        .row-popover-item(@click.prevent.stop="openAnalytics")
          v-icon bar_chart
        .row-popover-item(@click.prevent.stop="openDeleteCampaign")
          v-icon delete
    new-splash-dialog(:show="showNewSplashDialog", @close="showNewSplashDialog = false")
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import newSplashDialog from './new-splash-dialog.vue'
import baseTable from '../common/base-table'

export default {
  name: 'SplashPages',

  mounted () {
    if (this.orgId) {
      if (global._.isEmpty(this.splashPageOptions)) {
        this.fetchSplashPageOptions(this.orgId)
      }
    } else {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'organization/SELECT_ORGANIZATION') {
          if (this.orgId) {
            if (global._.isEmpty(this.splashPageOptions)) {
              this.fetchSplashPageOptions(this.orgId)
            }
          }
        }
      })
    }

    if (this.splashPages.length < 1) {
      this.loading = true
      this.fetchSplashPages().then(() => {
        this.loading = false
      })
    }
  },

  components: {
    newSplashDialog,
    baseTable
  },

  data () {
    return {
      search: '',
      splashListHeaders: [
        { sortable: false, value: 'icon', selected: true },
        { text: this.$t('general.name'), sortable: true, align: 'left', value: 'name', selected: true },
        { text: this.$t('general.campaign'), sortable: true, align: 'left', value: 'campaign', selected: true },
        { text: this.$t('general.owner'), sortable: true, align: 'left', value: 'owner', selected: true },
        { text: this.$t('general.creationDate'), sortable: true, align: 'left', value: 'created_at', selected: true },
        { text: this.$t('general.status'), sortable: true, align: 'left', value: 'status', selected: true },
        { text: 'actions', sortable: false, align: 'right', value: 'actions', selected: true }
      ],
      showNewSplashDialog: false,
      loading: false
    }
  },

  computed: {
    ...mapGetters('organization', ['selectedOrganization']),
    ...mapGetters('splashpage', ['splashPages']),
    orgId () {
      return this.selectedOrganization.id
    }
  },

  methods: {
    ...mapActions('splashpage', ['fetchSplashPages', 'fetchSplashPageOptions']),
    openEditItem (user) {
      console.log('openEditItem', user)
    },
    openSplashDetailPage (item) {
      this.$router.push({ name: 'SplashPagesEdit', params: { id: item.id } })
    },
    openAnalytics () {
      console.log('Analytics')
    },
    openDeleteUser () {
      console.log('openDeleteUser')
    },
    deleteUser (user) {
      console.log('deleteUser', user)
    }
  }
}
</script>
