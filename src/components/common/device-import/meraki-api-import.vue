<template lang='pug'>
  v-container(grid-list-md)
    v-layout(row)
      // materialDetails row
      v-flex(xs12)
        v-layout(row)
          v-flex(xs12)
            h2 {{ $t('settings.materialDetails') }} : {{ $t('organization.importMeraki') }}
            p.mt-4 {{ $t('organization.importMerakiDescription') }}

    v-layout.card.px-5.pa-4(
      row
      wrap
      v-loading="loading"
    )
      meraki-api-selection.xs12(
        ref="meraki"
        :value="value"
        @input="change"
        @loading="fetching"
      )

</template>
<script>
import MerakiApiSelection from './meraki-api-selection'

export default {
  props: ['value'],
  data () {
    return {
      loading: false
    }
  },
  components: {
    MerakiApiSelection
  },
  methods: {
    change (selectedOrg) {
      this.$emit('input', selectedOrg)
    },
    fetching (val) {
      this.loading = val
    },
    submit (orgId) {
      return this.$refs.meraki.submit(orgId)
    }
  }
}
</script>
