<template lang='pug'>
  .page-content
    v-layout.mb-5
      v-flex(xs12, sm12, md6, lg6)
        h2 {{$t('campaign.campaigns')}}
      v-flex.pb-3(xs6, md6, lg6, text-xs-right)
        v-btn.primary-action(color='primary', @click.stop='showNewCampaignDialog = true')
          | {{ $t('campaign.newCampaign') }}
          v-icon add_circle_outline
    base-table(
      :items="campaigns",
      :table-headers="campaignListHeaders",
      :loading="loading",
      icon="fas fa-bullhorn",
      @rowClicked="openCampaignDetails",
      :row-clickable="true"
    )
      template(slot="row-action", slot-scope="slotProps")
        .row-popover-item(@click.prevent.stop="openAnalytics")
          v-icon bar_chart
        .row-popover-item(@click.prevent.stop="openDeleteCampaign")
          v-icon delete
    add-campaign-dialog(:show="showNewCampaignDialog", @close="showNewCampaignDialog = false")
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import addCampaignDialog from './add-campaign-dialog.vue'
import baseTable from '../common/base-table'

export default {
  name: 'Campaigns',

  mounted () {
    if (this.campaigns.length < 1) {
      this.loading = true
      this.fetchCampaigns().then(() => {
        this.loading = false
      })
    }
  },

  components: {
    addCampaignDialog,
    baseTable
  },

  data () {
    return {
      search: '',
      campaignListHeaders: [
        { sortable: false, value: 'icon', selected: true },
        { text: this.$t('campaign.campaignName'), sortable: true, align: 'left', value: 'campaign', selected: true },
        { text: this.$t('general.splashPage'), sortable: true, align: 'left', value: 'splash_page', selected: true },
        { text: this.$t('general.owner'), sortable: true, align: 'left', value: 'owner', selected: true },
        { text: this.$t('general.creationDate'), sortable: true, align: 'left', value: 'created_at', selected: true },
        { text: this.$t('general.status'), sortable: true, align: 'left', value: 'status', selected: true },
        { text: 'actions', sortable: false, align: 'right', value: 'actions', selected: true }
      ],
      showNewCampaignDialog: false,
      loading: false
    }
  },

  computed: {
    ...mapGetters('campaign', ['campaigns'])
  },

  methods: {
    ...mapActions('campaign', ['fetchCampaigns']),
    openCampaignDetails (item) {
      console.log(item)
      this.$router.push({ name: 'CampaignsEdit', params: { id: item.id } })
    },
    openDeleteCampaign () {
      console.log('delete')
    }
  }
}
</script>

<style lang="scss">
  @import "styles/colors.scss";

</style>
