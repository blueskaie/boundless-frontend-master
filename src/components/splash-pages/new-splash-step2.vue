<template lang="pug">
  v-container(grid-list-md)
    v-layout(row wrap)
      v-flex(xs12)
        h2 {{ $t('splash.selectCreationMethod') }}
        hr.my-3
        p {{ $t('splash.selectCreationMethodDescription') }}

    v-layout.pa-3(row wrap justify-start)
      v-flex.selection-panel(
        v-for="templateType in templateTypes"
        :class="{ active: value === templateType.value }"
        :key="templateType.value"
        @click="selectMethod(templateType.value)"
        mx-1
      )
        v-layout(row wrap)
          v-flex(xs12)
            v-icon {{ templateType.icon }}
          v-flex(xs12)
            | {{ $t(templateType.title) }}
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    templateTypes () {
      return [
        {value: 'import', icon: 'fas fa-code', title: 'splash.importHtml'},
        {value: 'template', icon: 'fas fa-columns', title: 'splash.premadeTemplate'},
        {value: 'editor', icon: 'fas fa-file', title: 'splash.advancedEditor'},
        {value: 'custom', icon: 'fas fa-bars', title: 'splash.customProject'}
      ]
    }
  },
  methods: {
    selectMethod (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "styles/components/selection-panel.scss";

.selection-panel {
  min-height: 100px;
  text-transform: uppercase;

  .icon {
    color: $blue !important;
  }

  &.active {
    .icon {
      color: white !important;
    }
  }
}
</style>
