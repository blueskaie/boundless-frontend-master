<template lang="pug">
  v-container
    v-layout(row)
      v-flex(xs12)
        v-tabs(v-model='active', color='white', light, slider-color='yellow')
          v-tab(v-for='n in 2', :key='n', ripple)
            | Step {{ n }}
          v-tab-item(v-for='n in 2', :key='n')
            template(v-if="active == 0")
              step1
            template(v-else)
              step2
        .text-xs-center.text-sm-right.mt-3(v-if="active == 0")
          v-btn(@click.native="next") next tab
</template>

<script>
import Step1 from './new-step1.vue'
import Step2 from './new-step2.vue'

export default {
  name: 'NewOrganization',

  components: {Step1, Step2},

  data () {
    return {
      active: null
    }
  },

  methods: {
    next () {
      const active = parseInt(this.active)
      this.active = (active < 2 ? active + 1 : 0).toString()
    }
  }
}
</script>
