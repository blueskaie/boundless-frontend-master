<template lang='pug'>
  v-flex
    v-select(
      v-if="hasMerakiApi"
      @change="change"
      :items="merakiOrgs"
      :label="$t('general.selectMerakiOrg')"
      :value="value"
      item-text="name"
      item-value="id"
      required
    )
    p.pt-2(v-else)
      | {{ $t('inventory.noMerakiApi') }}.
      | {{ $t('inventory.saveMerakiApi') }}&nbsp;
      router-link(:to="{ name: 'UserProfile' }")
        | {{ $t('general.profilePage') }}.

</template>
<script>
import { mapActions, mapGetters } from 'vuex'

import CurrentUserMixin from '@/mixins/current-user.mixin'

export default {
  props: {
    value: {
      type: Number,
      default: null
    }
  },
  mixins: [
    CurrentUserMixin
  ],
  mounted () {
    if (this.hasMerakiApi && this.merakiOrgs.length < 1) {
      this.fetchOrgs()
    }
  },
  computed: {
    ...mapGetters('device', ['merakiOrgs']),
    ...mapGetters('organization', ['selectedOrganization']),
    hasMerakiApi () {
      return Boolean(this.profile.meraki_api_key_display)
    }
  },
  methods: {
    ...mapActions('device', ['fetchMerakiOrgs']),
    fetchOrgs () {
      this.$emit('loading', true)
      this.fetchMerakiOrgs(this.selectedOrganization.id).then(response => {
        this.$emit('loading', false)
      }).catch(() => {
        this.$emit('loading', false)
      })
    },
    change (selectedOrg) {
      this.$emit('input', selectedOrg)
    },
    submit (orgId) {
      const data = {
        orgId: orgId,
        meraki_organization_id: this.value
      }
      return this.$store.dispatch('device/merakiApiImport', data)
    }
  },
  watch: {
    hasMerakiApi (value) {
      if (value && this.selectedOrganization.id) {
        this.fetchMerakiOrgs(this.selectedOrganization.id)
      }
    }
  }
}
</script>
