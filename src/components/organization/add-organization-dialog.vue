<template lang="pug">
  base-dialog(:show="show", @close="close")
    h2.dialog-heading.mb-3 {{ $t('general.newOrganization') }}
    p {{ $t('organization.description1') }}
    v-layout(row wrap py-2)
      v-flex(xs12 sm6 px-2)
        // organization name field
        node-name-input(
          :error-messages="nameErrors"
          :label="$t('organization.enterOrganizationName')"
          @input="$v.orgData.name.$touch()"
          required
          v-help-tooltip="{ message: $t('organization.enterOrganizationNameHelp') }"
          v-model='orgData.name'
        )
      v-flex(xs12 sm6 px-2)
        // region field
        v-select(
          :error-messages="regionErrors"
          :items='regionChoices'
          :label="$t('organization.selectRegion')"
          @input="$v.orgData.region.$touch()"
          required
          v-help-tooltip="{ message: $t('organization.selectRegionHelp') }"
          v-model='orgData.region'
        )
    v-layout.mt-3(row)
      v-flex(sm12, text-xs-right)
        v-btn(
          :disabled="$v.orgData.$invalid"
          :loading="loading"
          @click="addOrganization"
          color="success"
          large
          round
        ) {{ $t('organization.createOrganization') }}
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { maxLength, required } from 'vuelidate/lib/validators'

import baseDialog from '@/components/common/base-dialog'
import ErrorHandlerMixin from '@/mixins/error-handler.mixin'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  mixins: [
    ErrorHandlerMixin
  ],

  mounted () {
    this.fetchOrganizationOptions()
  },

  validations: {
    orgData: {
      name: {
        required,
        maxLength: maxLength(64)
      },
      region: {
        required
      }
    }
  },

  data () {
    return {
      currentStep: 0,
      orgData: {
        name: '',
        region: null
      },
      loading: false
    }
  },

  computed: {
    ...mapGetters('organization', ['regionChoices']),
    nameErrors () {
      const errors = []
      if (!this.$v.orgData.name.$dirty) return errors
      !this.$v.orgData.name.required && errors.push('Name is required')
      return errors.length > 0 ? errors : this.getErrorMessages('name')
    },
    regionErrors () {
      const errors = []
      if (!this.$v.orgData.region.$dirty) return errors
      !this.$v.orgData.region.required && errors.push('Region is required')
      return errors
    }
  },

  components: {
    baseDialog
  },

  methods: {
    ...mapActions('organization', ['createOrganization', 'fetchOrganizations', 'fetchOrganizationOptions']),
    close () {
      this.resetForm()
      this.$emit('close')
    },
    resetForm () {
      this.$v.orgData.$reset()
      this.orgData = {}
    },
    addOrganization () {
      this.$v.$touch()

      if (!this.$v.orgData.$invalid) {
        this.loading = true
        this.createOrganization(this.orgData).then(response => {
          const newOrg = response.data.data
          this.$emit('close', newOrg)
          this.loading = false
          this.resetForm()
        }).catch(err => {
          // `this.setErrorData()` is from ErrorHandlerMixin
          this.setErrorData(err)
          this.loading = false
        })
      }
    }
  }
}
</script>
