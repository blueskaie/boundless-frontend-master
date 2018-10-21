<template lang="pug">
  div
    v-layout(row wrap)
      v-flex
        h3.small-heading.py-3
          | {{ $t('organization.connectionTime') }}
          tooltip(
            :label="$t('organization.connectionTimeHelp')"
            style="top: 2px"
          )
    .form-card.round
      v-layout(row wrap)
        v-flex(xs10)
          v-select(
            :items="connectionTimeOptions"
            :label="$t('organization.connectionTime')"
            v-model="connectionTimeOptionModel"
          )
</template>
<script>
export default {
  data () {
    return {
      connectionTimeOptionModel: '',
      connectionTimeOptions: [
        { text: '30 min' },
        { text: '1 hr' },
        { text: '12 hr' },
        { text: '24 hr' },
        { text: '7 d' },
        { text: '30 d' }
      ]
    }
  }
}
</script>
