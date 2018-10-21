<template lang='pug'>
  base-dialog(:show="show", @close="close")
    v-stepper.pb-5(v-model="currentStep")
      v-stepper-header.mb-5
        v-stepper-step(:complete="currentStep > 1", step="1")
        v-divider
        v-stepper-step(:complete="currentStep > 2", step="2")
        v-divider
        v-stepper-step(:complete="currentStep > 3", step="3")
      v-stepper-items
        v-stepper-content(step="1")
          step-one(
            v-model="campaignData"
            ref="step1"
          )
        v-stepper-content(step="2")
          step-two(
            v-model="campaignData"
            ref="step2"
            :current-step="currentStep",
            :campaign="campaignData",
          )
        v-stepper-content(step="3")
          step-three(
            :current-step="currentStep",
            :campaign="campaignData",
          )

    v-layout(row wrap mb-2)
      v-flex(xs12)
        v-btn(
          v-show="this.currentStep > 1"
          @click.native="currentStep -= 1"
          color="success"
          large
          round
        ) {{$t('general.previous')}}

        v-btn(
          :disabled="!isDataValid()"
          @click.native="nextStep"
          color="success"
          large
          round
          style="float: right"
        ) {{ continueBtnLabel }}
</template>

<script>
import baseDialog from '@/components/common/base-dialog'
import stepOne from './step-one'
import stepTwo from './step-two'
import stepThree from './step-three'
import ScenarioStub from '@/stubs/scenario'

const scenarioStub = {...ScenarioStub}

export default {
  components: {
    baseDialog,
    stepOne,
    stepTwo,
    stepThree
  },
  data () {
    return {
      currentStep: 1,
      campaignData: {

        // Step 1 properties
        name: '',
        splashpage: null,
        node: null,
        device: null,
        schedule_is_active: false,
        schedule_start_datetime: null,
        schedule_end_datetime: null,

        // For pickers, not sent to api
        campaignStartDate: null,
        campaignEndDate: null,
        campaignStartTime: null,
        campaignEndTime: null,

        // Step 2 properties
        isConditionalRedirect: false,
        redirection_mode: 'static',

        // Step 2 connection mode
        redirection_url_static: '',
        redirection_url_auth_form: '',
        redirection_url_auth_facebook: '',
        redirection_url_auth_twitter: '',
        redirection_url_auth_linkedin: '',
        redirection_url_auth_instagram: '',
        redirection_url_auth_google: '',

        // Step 2 Device/Mobile app
        redirection_url_device_default: '',
        redirection_url_device_apple: '',
        redirection_url_device_android: '',
        redirection_url_device_windows: '',

        // Step 2 Scenario mode
        scenarios: [
          scenarioStub
        ],

        acceptTerms: false,
        site: '',
        analyticsCode: '',
        summary: ''
      }
    }
  },
  props: ['show'],
  computed: {
    continueBtnLabel () {
      if (this.currentStep < 3) {
        return this.$t('general.continue')
      } else {
        return this.$t('campaign.saveCampaign')
      }
    }
  },
  methods: {
    close () {
      const scenario = {...ScenarioStub}
      Object.assign(this.$data, this.$options.data.apply(this))
      this.$set(this.campaignData, 'scenarios', [scenario])
      this.$emit('close')
    },
    saveCampaign () {
      // TODO: Wire Up api
      this.close()
    },
    nextStep () {
      if (this.currentStep === 3) {
        this.saveCampaign()
      } else {
        this.currentStep += 1
      }
    },
    isDataValid () {
      if (this.currentStep === 1) {
        let valid = this.campaignData.name && this.campaignData.splashpage
        if (this.campaignData.schedule_is_active) {
          const fields = [
            'campaignStartDate',
            'campaignEndDate',
            'campaignStartTime',
            'campaignEndTime'
          ]
          for (let field of fields) {
            if (!this.campaignData[field]) {
              return false
            }
          }
        }
        return valid
      } else if (this.currentStep === 2 && this.$refs.step2) {
        return this.$refs.step2.isValid()
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="sass">
  .item-list
    display: flex
    flex-wrap: wrap
    align-items: center
    margin: 20px 10px
    .item
      padding: 10px 20px
      text-align: center
      background-color: #F2F2F2
      color: gray
      font-size: 13px
      border-radius: 3px
      margin: 5px
      flex: 1
      max-width: 30%
      min-width: 15%
      cursor: pointer
      border: 1px solid #d9d9d9
      &.active
        background-color: #ffffff
      .icon
        margin-top: 15px
        height: 30px
      p
        height: 30px
        font-size: 12px
        line-height: 1.2
        margin-top: 10px
</style>
