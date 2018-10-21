<template lang="pug">
  .page-content
    v-layout.mb-5
      v-flex(xs12, sm12, md6, lg6)
        h2 {{$t('organization.activityLog')}}
    base-table(
        :items="activityLogs",
        :table-headers="activityLogHeaders",
        :loading="loading",
        icon="fas fa-bullhorn",
        :hide-actions="true"
      )
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import baseTable from '../common/base-table'

export default {
  name: 'ActivityLog',

  mounted () {
    if (this.activityLogs.length < 1) {
      this.loading = true
      this.fetchActivityLogs().then(() => {
        this.loading = false
      })
    }
  },

  components: {
    baseTable
  },

  data () {
    return {
      search: '',
      activityLogHeaders: [
        { sortable: false, value: 'icon', selected: true },
        { text: this.$t('general.date'), sortable: true, align: 'left', value: 'created_at', selected: true },
        { text: this.$t('general.user'), sortable: true, align: 'left', value: 'user', selected: true },
        { text: this.$t('general.siteGroup'), sortable: true, align: 'left', value: 'site', selected: true },
        { text: this.$t('general.description'), sortable: true, align: 'left', value: 'description', selected: true },
        { text: this.$t('general.formGiven'), sortable: true, align: 'left', value: 'formGiven', selected: true },
        { text: this.$t('general.newData'), sortable: true, align: 'left', value: 'newData', selected: true },
        { text: 'actions', sortable: false, align: 'right', value: 'actions', selected: true }
      ],
      loading: false
    }
  },

  computed: {
    ...mapGetters('organization', ['activityLogs'])
  },

  methods: {
    ...mapActions('organization', ['fetchActivityLogs'])
  }
}
</script>

<style lang="scss">
  @import "styles/colors.scss";

</style>
