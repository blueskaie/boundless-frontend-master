<template lang="pug">
  v-flex
    v-select(
      @change="change"
      :items="aleIds"
      :label="$t('general.selectAleId')"
      :value="value"
      required
      v-if="hasAleId"
    )
    p.pt-2(v-else)
      | {{ $t('inventory.noAleId') }}.
      | {{ $t('inventory.addAleId') }}&nbsp;
      router-link(
        :to="{ name: 'OrganizationSettingsExternalIntegrations' }"
      )
        | {{ $t('general.organizationSettings') }}.
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: ['value'],
  computed: {
    ...mapGetters('organization', ['selectedOrganization']),
    aleIds () {
      return this.selectedOrganization.aruba_ale_ids.map(item => item.aruba_ale_id)
    },
    hasAleId () {
      return this.aleIds.length > 0
    }
  },
  methods: {
    change (selectedAleId) {
      this.$emit('input', selectedAleId)
    },
    submit (orgId) {
      const data = {
        aruba_ale_id: this.value
      }
      return this.$store.dispatch('organization/loadArubaDevices', data)
    }
  }
}
</script>
