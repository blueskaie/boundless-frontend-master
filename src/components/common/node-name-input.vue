<template lang="pug">
  v-text-field(
    :rules="rules"
    :counter="maxLength"
    :value="value"
    @input="$emit('input', $event)"
    v-bind="$attrs"
  )
</template>
<script>
import { VTextField } from 'vuetify'

export default {
  extends: VTextField,
  props: ['value'],
  data () {
    return {
      maxLength: 64
    }
  },
  computed: {
    rules (v) {
      const maxRule = (v) => {
        let value = v
        if (!value) {
          value = {
            length: 0
          }
        }
        return value.length <= this.maxLength || `Max ${this.maxLength} characters`
      }
      return [maxRule]
    }
  }
}
</script>
