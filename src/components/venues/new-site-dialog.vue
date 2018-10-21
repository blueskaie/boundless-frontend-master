<template lang="pug">
  // new site modal
  base-dialog(
    :show="show"
    @close="$emit('close')"
    max-width="900"
  )
    v-stepper(v-model="currentStep")
      v-stepper-header
        v-stepper-step(
          :complete="currentStep > 1"
          step="1"
        ) {{ $t('settings.establishmentInformation') }}

        v-divider
        v-stepper-step(
          :complete="currentStep > 2"
          step="2"
        ) {{ $t('settings.materialDetails') }}

        v-divider
        v-stepper-step(step="3") {{ $t('general.finish') }}

      v-stepper-items
        v-stepper-content(step="1")
          div.pt-4
            new-site-step1(
              ref="siteData"
              v-model="siteData"
            )

        v-stepper-content(step="2")
          div.pt-4
            new-site-step2(
              ref="deviceImport"
              @change="setImportDataValid"
            )

        v-stepper-content(step="3")
          div.pt-4
            new-site-step3

    v-layout(row wrap mt-5)
      v-flex(xs12)
        v-btn(
          v-show="currentStep > 1"
          @click.native="currentStep = currentStep - 1"
          color="success"
          large
          round
        ) {{ $t('general.previous') }}

        v-btn(
          @click.native="nextStep"
          :disabled="continueDisabled()"
          color="success"
          large
          round
          style="float: right"
        ) {{ continueLabel }}

        v-btn(
          v-show="currentStep === 2"
          @click.native="currentStep = 3"
          color="success"
          large
          outline
          round
          style="float: right"
        ) {{ $t('general.skip') }}
</template>

<script>
import NewSiteStep1 from './new-site-step1.vue'
import NewSiteStep2 from './new-site-step2.vue'
import NewSiteStep3 from './new-site-step3.vue'

export default {
  props: ['show'],

  components: {
    NewSiteStep1,
    NewSiteStep2,
    NewSiteStep3
  },

  data () {
    return {
      currentStep: 1,
      importDataValid: false,
      siteData: {}
    }
  },

  computed: {
    continueLabel () {
      if (this.currentStep < 3) {
        return this.$t('general.continue')
      } else {
        return this.$t('general.finish')
      }
    }
  },

  methods: {
    continueDisabled () {
      if (this.currentStep === 1) {
        if (!this.$refs.siteData) {
          return true
        } else {
          return !this.$refs.siteData.isValid()
        }
      } else if (this.currentStep === 2) {
        return !this.importDataValid
      } else {
        return false
      }
    },
    setImportDataValid (value) {
      this.importDataValid = value
    },
    nextStep () {
      if (this.currentStep < 3) {
        this.currentStep += 1
      } else {
        // TODO: implement save
      }
    }
  }
}
</script>
