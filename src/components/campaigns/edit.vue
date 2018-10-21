<template lang='pug'>
  .page-content
    v-layout.mb-3
      v-flex(xs12, sm12, md6, lg6)
        h2 {{$t('campaign.editCampaign')}}
      v-flex.pb-3(xs6, md6, lg6, text-xs-right)
        v-btn(color='black', dark, @click.stop='showNewCampaignDialog = true')
          | {{ $t('campaign.newCampaign') }}
    v-layout(row)
      v-flex(xs12)
        v-tabs(v-model="active", fixed-tabs)
          v-tab Details
          v-tab Redirection
          v-tab Parameters
          v-tab-item
            step-one(:campaign="campaign", hide-steps, @save="saveCampaign")
          v-tab-item
            step-two(:campaign="campaign", hide-steps, @save="saveCampaign")
          v-tab-item
            step-three(:campaign="campaign", hide-steps, @save="saveCampaign")
      add-campaign-dialog(:show="showNewCampaignDialog", @close="showNewCampaignDialog = false")
</template>

<script>
import stepOne from './step-one'
import stepTwo from './step-two'
import stepThree from './step-three'
import addCampaignDialog from './add-campaign-dialog.vue'

export default {
  components: {
    stepOne,
    stepTwo,
    stepThree,
    addCampaignDialog
  },

  mounted () {
    console.log(this.$route.params.id)
  },

  data () {
    return {
      active: null,
      currentStep: 0,
      showNewCampaignDialog: false,
      campaign: {
        name: '',
        splashPage: '',
        group: '',
        wifi: '',
        campaignStartDate: '',
        campaignFinishDate: '',
        campaignStartTime: '',
        campaignFinishTime: '',
        acceptTerms: false,
        active: false,
        static: false,
        site: '',
        selectedType: {id: 1},
        redirection: {
          connection: {
            formUrl: '',
            facebookUrl: '',
            twitterUrl: '',
            linkedUrl: '',
            instagramUrl: '',
            googleUrl: ''
          },
          mobile: {
            apple: '',
            android: '',
            windows: '',
            defaults: ''
          },
          scenarios: [
            {
              order: 1,
              redirectUrl: '',
              param: '',
              condition: '',
              value: '',
              moreConditions: [
                {order: 1, logical: '', param: '', condition: '', browser: ''}
              ]
            }
          ]
        },
        options: {
          showMinAge: false,
          showMaxAge: false,
          acceptCommercialParticipation: false,
          verifyIdentifyBySms: false,
          acceptDefaultUgc: false,
          customizeText: false,
          acceptanceTerms: '',
          generalTerms: '',
          generalCustomizeText: '',
          minAge: '',
          maxAge: '',
          maxAgeText: ''
        },
        analyticsCode: '',
        summary: ''
      }
    }
  },

  methods: {
    saveCampaign () {
      console.log('Save Campaign', this.campaign)
    }
  }
}
</script>
