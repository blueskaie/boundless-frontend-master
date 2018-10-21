<template lang="pug">
  editable-panel(
    :is-editing="isEditing"
    :is-loading="isLoading"
    :title="$t('general.preferences')"
    @cancel="cancel"
    @edit="edit"
    @submit="submit"
  )
    v-form(slot-scope="{readonly}")
      v-layout(row wrap)
        v-flex(xs12 md6 px-3)
          v-select(
            :items="getChoices('language')"
            :label="$t('general.language')"
            :readonly="readonly"
            item-text="display_name"
            placeholder="--"
            v-model="formData.language"
          )

        v-flex(xs12 md6 px-3)
          v-select(
            :items="getChoices('timezone')"
            :label="$t('general.timezone')"
            :readonly="readonly"
            item-text="display_name"
            autocomplete
            placeholder="--"
            v-model="formData.timezone"
          )

        v-flex(xs12 md6 px-3)
          v-select(
            :items="getChoices('date_format')"
            :label="$t('general.dateFormat')"
            :readonly="readonly"
            item-text="display_name"
            placeholder="--"
            v-model="formData.date_format"
          )

        v-flex(xs12 md6 px-3)
          v-select(
            :items="timeFormatChoices"
            :label="$t('general.timeFormat')"
            :readonly="readonly"
            placeholder="--"
            v-model="selectedTimeFormat"
          )

        v-flex(xs12 md6 px-3)
          v-select(
            :items="getChoices('first_day_of_week')"
            :label="$t('general.firstDayOfWeek')"
            :readonly="readonly"
            item-text="display_name"
            placeholder="--"
            v-model="formData.first_day_of_week"
          )
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import CurrentUserMixin from '@/mixins/current-user.mixin'
import EditablePanelMixin from '@/mixins/editable-panel.mixin'
import ErrorHandlerMixin from '@/mixins/error-handler.mixin'

import EditablePanel from '@/components/common/editable-panel'

export default {
  name: 'Preferences',
  components: {
    EditablePanel
  },
  mixins: [
    CurrentUserMixin,
    EditablePanelMixin,
    ErrorHandlerMixin
  ],
  mounted () {
    this.setFormData()
  },
  data () {
    return {
      formData: {
        language: '',
        date_format: '',
        timeFormat: '',
        timezone: '',
        first_day_of_week: ''
      },
      selectedTimeFormat: '',
      timeFormatChoices: [
        {value: '12-hour', text: '12-hour time'},
        {value: '24-hour', text: '24-hour time'}
      ]
    }
  },
  computed: {
    ...mapGetters(['countries']),
    ...mapGetters('user', ['userOptions']),
    profileOptions () {
      try {
        return this.userOptions.data.actions.PUT.profile
      } catch (TypeError) {
        return null
      }
    }
  },
  methods: {
    ...mapActions(['fetchCountries']),
    getChoices (key) {
      try {
        return this.profileOptions.children[key].choices
      } catch (TypeError) {
        return []
      }
    },
    setFormData () {
      const profile = this.profile
      this.formData = Object.assign({}, this.formData, {
        language: profile.language,
        date_format: profile.date_format,
        timezone: profile.timezone,
        use_24h_clock: profile.use_24h_clock,
        first_day_of_week: profile.first_day_of_week
      })
      this.selectedTimeFormat = profile.use_24h_clock ? '24-hour' : '12-hour'
    },
    submit () {
      this.isLoading = true

      const use24hClock = this.selectedTimeFormat === '24-hour'
      this.$set(this.formData, 'use_24h_clock', use24hClock)

      this.updateUser({profile: this.formData}).then(response => {
        this.isLoading = false
        this.isEditing = false
        this.showSuccessMessage()
      }).catch(err => {
        this.isLoading = false
        this.setErrorData(err)
      })
    }
  }
}
</script>
