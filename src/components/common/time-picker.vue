<template lang="pug">
  v-menu(
    ref="menu"
    v-model="show"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="time"
    lazy
    transition="scale-transition"
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
      readonly
      clearable
    )
    v-time-picker(
      v-model="time"
      :format="format"
      @change="$refs.menu.save(time)"
    )
</template>
<script>
import CurrentUserMixin from '@/mixins/current-user.mixin'

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  mixins: [
    CurrentUserMixin
  ],
  data () {
    return {
      show: false,
      time: null
    }
  },
  computed: {
    format () {
      if (this.profile.use_24h_clock) {
        return '24hr'
      } else {
        return 'ampm'
      }
    }
  },
  methods: {
    input (val) {
      this.$emit('input', val)
    }
  },
  watch: {
    time (val) {
      this.$emit('input', val)
    }
  }
}
</script>
