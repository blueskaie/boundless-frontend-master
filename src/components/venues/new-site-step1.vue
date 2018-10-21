<template lang="pug">
  v-container(grid-list-md)
    v-layout(row)
      v-flex(xs12)
        h2 {{ $t('settings.establishmentInformation') }}
        hr.my-3
        p {{ $t('settings.establishmentInformationDescription') }}
    v-layout.card.pa-3(row wrap)
      v-flex(xs12 md6 px-3)
        node-name-input(
          :label="$t('settings.facilityName')"
          required
          v-help-tooltip="{ message: $t('settings.facilityNameHelp') }"
          v-model="value.name"
        )

      v-flex(xs12 md6 px-3)
        node-select(
          :items="nodesWithTypeAndIndentation"
          :label="$t('settings.selectGroup')"
          autocomplete
          clearable
          required
          v-help-tooltip="{ message: $t('settings.selectGroupHelp') }"
          v-model="value.node"
        )

      v-flex(xs12 px-3)
        address-input(
          :label="$t('general.address')"
          @changed="setTimezone"
          v-model="value.address"
        )

      v-flex(xs12 md6 px-3)
        v-select(
          :items="timezoneChoices"
          :label="$t('settings.selectTimeZone')"
          autocomplete
          item-text="display_name"
          required
          v-help-tooltip="{ message: $t('settings.selectTimeZoneHelp') }"
          v-model='value.timezone'
        )

      v-flex(md6 xs12 px-3)
        v-select(
          :items="getChoices('sector')"
          :label="$t('general.selectIndustry')"
          clearable
          item-text="display_name"
          v-model="value.sector"
        )
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { maxLength, required } from 'vuelidate/lib/validators'

import ManageableNodesMixin from '@/mixins/manageable-nodes.mixin'

import AddressInput from '@/components/common/address-input'
import NodeSelect from '@/components/common/node-select'

export default {
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          name: '',
          node: null,
          address: '',
          timezone: '',
          sector: null,
          address_json: {}
        }
      }
    }
  },

  data () {
    return {
      filters: {
        types: 'group'
      }
    }
  },

  mixins: [
    ManageableNodesMixin
  ],

  components: {
    AddressInput,
    NodeSelect
  },

  mounted () {
    if (global._.isEmpty(this.options)) {
      this.fetchSiteOptions()
    }
  },

  validations: {
    value: {
      name: {
        required,
        maxLength: maxLength(64)
      },
      node: {
        required
      },
      timezone: {
        required
      }
    }
  },

  computed: {
    ...mapGetters('site', ['siteOptions']),
    options () {
      try {
        return this.siteOptions.data.actions.POST
      } catch (TypeError) {
        return {}
      }
    },
    timezoneChoices () {
      return this.getChoices('timezone')
    }
  },

  methods: {
    ...mapActions('site', ['fetchSiteOptions']),
    setTimezone (place) {
      this.$set(this.value, 'address_json', place)
      let offset = place.utc_offset / 60
      if (offset >= 0 && offset < 10) {
        offset = `+0${offset}`
      } else if (offset > 0 && offset >= 10) {
        offset = `+${offset}`
      } else if (offset < 0 && offset > -10) {
        offset = `${offset}`
        offset = `-0${offset.slice(1)}`
      } else {
        offset = offset.toString()
      }

      const timezone = this.timezoneChoices.find(item => {
        return item.display_name.includes(offset)
      })

      if (timezone) {
        this.$set(this.value, 'timezone', timezone.value)
      } else {
        this.$set(this.value, 'timezone', '')
      }
    },
    getChoices (key) {
      try {
        return this.options[key].choices
      } catch (TypeError) {
        return []
      }
    },
    isValid () {
      return !this.$v.value.$invalid
    }
  }
}
</script>
