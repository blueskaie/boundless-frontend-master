<template lang='pug'>
  router-view(:auth="auth", :authenticated="authenticated")
</template>

<script>
import SelectOrgMixin from '@/mixins/select-org.mixin'

export default {
  name: 'LayoutOrganization',
  props: ['authenticated', 'auth'],
  mixins: [SelectOrgMixin],
  watch: {
    '$route' (to, from) {
      // Updated selected org when the url changes
      if (to.params && to.params.orgId) {
        this.selectOrgById(to.params.orgId)
      }
    }
  }
}
</script>
