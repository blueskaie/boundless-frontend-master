<template lang="pug">
  v-container(grid-list-md)
    v-layout(row)
      // Setting up social networks row
      v-flex(xs12)
        v-layout(row)
          v-flex(xs12)
            h2 {{ $t('general.confirmAndSubmit') }}
            hr.mb-3
            p {{ $t('settings.finishEstablishment') }}

        // TODO: Hide for now
        v-layout.card(pa-4 row wrap v-if="false")
          v-flex.px-2(
            v-for="(value, key, index) in value"
            :key="key"
            xs12
            md6
          )
            v-text-field(
              v-prepend-social-icon="key"
              v-model="value[key]"
              :label="$t('settings.urlOrIdOfPage')"
            )
</template>
<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          facebook: '',
          twitter: '',
          instagram: '',
          linkedin: '',
          google: ''
        }
      }
    }
  }
}
</script>
