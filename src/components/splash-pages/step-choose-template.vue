<template lang="pug">
  v-card
    h4.mb-4 {{ $t('splash.chooseTemplate') }}
    v-divider.mb-4
    p Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
    v-divider.mt-4.mb-4
    v-container(grid-list-xs)
      v-layout(row, wrap)
        v-flex(v-for="template in templates", :key="template.id", xs4)
          v-card.pa-2(flat, tile, @click.native="selectedTemplate = template")
            v-card-media(src="/static/images/template.png", height="300px", :class="{ 'active': template.id == selectedTemplate.id }")
    v-divider
    v-card-actions(row)
      v-flex.pr-2.mt-2(sm-2)
        v-btn(@click.native="$emit('back')") Back
      v-flex.text-xs-right.pr-2.mt-2(sm-2)
        v-btn(color="primary", @click.native="$emit('continue')", :disabled="isContinueDisabled") Continue
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  props: ['currentStep'],
  data () {
    return {
      selectedTemplate: {id: null},
      templates: [
        {id: 1, image: ''},
        {id: 2, image: ''},
        {id: 3, image: ''},
        {id: 4, image: ''},
        {id: 5, image: ''}
      ]
    }
  },
  computed: {
    ...mapGetters('splashpage', ['splashTemplateTypes', 'selectedSplashTemplateType']),

    isContinueDisabled () {
      if (this.selectedTemplate.id) {
        return false
      }

      return true
    }
  },
  methods: {
    ...mapActions('splashpage', ['selectSplashTemplateType'])
  }
}
</script>

<style lang="sass" scoped>
  .active
    border: 2px solid #3f51b5
</style>
