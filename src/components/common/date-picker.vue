<template lang="pug">
  v-menu(
    :close-on-content-click="false"
    :nudge-right="40"
    v-model="show"
    lazy
    offset-y
    full-width
    max-width="290px"
    min-width="290px"
  )
    v-text-field(
      slot="activator"
      :value="value"
      @input="input"
      v-bind="$attrs"
      clearable
      readonly
    )
    v-date-picker(
      v-model="date"
      no-title
      @input="show = false"
    )
</template>
<script>
import CurrentUserMixin from '@/mixins/current-user.mixin'

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    format: {
      type: String,
      default: 'L' // 09/04/2018
    }
  },
  mixins: [
    CurrentUserMixin
  ],
  data () {
    return {
      show: false,
      date: null
    }
  },
  watch: {
    date (val) {
      const formattedDate = this.formatDate(this.date)
      this.$emit('input', formattedDate)
    }
  },
  methods: {
    formatDate (date) {
      // Formats date based on User preference
      return this.dateFormatter(date)
    },
    input (val) {
      this.$emit('input', val)
    }
  }
}
</script>
