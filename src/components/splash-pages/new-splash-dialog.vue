<template lang='pug'>
  base-dialog(
    :persistent="true"
    :show="show"
    @close="close"
    max-width="920"
  )
    h2.step-heading.mb-3 {{ $t('splash.newSplash') }}
    v-stepper(v-model="currentStep")
      v-stepper-header
        v-stepper-step(:complete="currentStep > 1", step="1")
        v-divider
        v-stepper-step(:complete="currentStep > 2", step="2")
        v-divider
        v-stepper-step(:complete="currentStep > 3", step="3")
      v-stepper-items
        v-stepper-content(step="1")
          div.pt-4
            new-splash-step1(
              v-model="pageData"
            )
        v-stepper-content(step="2")
          div.pt-4
            new-splash-step2(
              v-model="creationMethod"
            )
        v-stepper-content(step="3")
          new-splash-import-file(
            v-if="isMethodImport"
            v-model="pageData.selectedFile"
          )
          new-splash-custom-project(
            v-else-if="isMethodCustomProject"
            v-model="projectData"
            :current-step="currentStep"
            :errors="errorData"
            :get-error-messages="getErrorMessages"
            :clear-error-data="clearErrorData"
            @continue="currentStep = 2"
            @back="currentStep = 1"
          )
          step-choose-template(
            :current-step="currentStep"
            @back="currentStep = 1"
            @continue="currentStep = 2"
            v-else-if="creationMethod === 'custom'"
          )

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
          :loading="isLoading"
          color="success"
          large
          round
          style="float: right"
        ) {{ continueLabel }}
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import ErrorHandlerMixin from '@/mixins/error-handler.mixin'

import NewSplashStep1 from './new-splash-step1'
import NewSplashStep2 from './new-splash-step2'
import NewSplashImportFile from './new-splash-import-file'
import NewSplashCustomProject from './new-splash-custom-project'

import stepChooseTemplate from './step-choose-template'

export default {
  props: ['show'],
  mixins: [
    ErrorHandlerMixin
  ],
  components: {
    NewSplashStep1,
    NewSplashStep2,
    NewSplashImportFile,
    NewSplashCustomProject,
    stepChooseTemplate
  },
  data () {
    return {
      isLoading: false,
      pageData: {
        name: '',
        type: ''
      },
      projectData: {
        message: '',
        description: '',
        phone: '',
        availabilities: '',
        attachments: []
      },
      creationMethod: '',
      currentStep: 1
    }
  },
  computed: {
    ...mapGetters('organization', ['selectedOrganization']),
    continueLabel () {
      if (this.currentStep === 3) {
        if (this.isMethodImport) {
          return this.$t('general.importPage')
        } else if (this.isMethodCustomProject) {
          return this.$t('general.submit')
        }
      }
      return this.$t('general.continue')
    },
    isMethodImport () {
      return this.creationMethod === 'import'
    },
    isMethodCustomProject () {
      return this.creationMethod === 'custom'
    }
  },
  methods: {
    ...mapActions('splashpage', ['createSplashPage', 'sendProjectData']),
    continueDisabled () {
      if (this.currentStep === 1) {
        return !this.pageData.name || !this.pageData.type
      } else if (this.currentStep === 2) {
        return !this.creationMethod
      } else if (this.currentStep === 3) {
        if (this.isMethodImport) {
          return !this.pageData.selectedFile
        } else if (this.isMethodCustomProject) {
          return !this.projectData.message
        }
      }
      return true
    },
    submitCreationMethod () {
      if (this.isMethodCustomProject) {
        return this.sendProjectData(this.projectData)
      }
    },
    close () {
      Object.assign(this.$data, this.$options.data.apply(this))
      this.$emit('close')
    },
    submit () {
      this.isLoading = true

      this.submitCreationMethod().then(response => {
        return this.createSplashPage({
          orgId: this.selectedOrganization.id,
          payload: this.pageData
        })
      }).then(response => {
        this.close()
        global.toastr['success'](this.$t('general.dataSaveSuccess'), this.$t('general.success'))
        this.isLoading = false
      }).catch(err => {
        this.setErrorData(err)
        this.isLoading = false
      })
    },
    nextStep () {
      if (this.currentStep < 3) {
        this.currentStep += 1
      } else {
        this.submit()
      }
    }
  }
}
</script>
