<template lang="pug">
  v-container(grid-list-md)
    v-layout(row wrap)
      v-flex(xs12)
        h2 {{ $t('splash.addSplashTemplate') }}
        hr.my-3
        p {{ $t('splash.splashTemplateDescription') }}
    v-layout.card.pa-3(row wrap)
      v-flex(xs12 md6 px-3)
        v-text-field(
          :label="$t('general.pageName')"
          required
          v-model="value.name"
        )

      v-flex(xs12 md6 px-3)
        v-select(
          :items="pageTypeChoices"
          :label="$t('general.pageType')"
          v-model="value.type"
          item-text="display_name"
          required
        )
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          type: '',
          name: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters('splashpage', ['splashPageOptions']),
    pageTypeChoices () {
      if (global._.isEmpty(this.splashPageOptions)) {
        return []
      } else {
        return this.splashPageOptions.data.actions.POST.type.choices
      }
    }
  }
}
</script>
