<template lang="pug">
  .page-content
    v-layout.mb-3(row wrap)
      v-flex(xs12)
        h2 {{ $t(' wifi.wifiAuthorisationDetails ') }}

    v-divider
    v-layout(row wrap my-4)
      v-flex(xs12)
        p {{ $t('general.name') }} : {{ user.profile.name }}
        p {{ $t('general.email') }} : {{ user.email }}
        p {{ $t('general.phoneNumber') }} : {{ user.profile.phone || 'unknown' }}

    v-divider
    v-layout(row wrap my-4)
      v-flex(xs12)
        h2.py-3 {{ $t('user.userPermissions') }}
      v-flex(xs12)
        base-table(
          :table-headers="userPermissionsHeaders"
          :items="userPermissionsTable"
          hide-icon
          hide-search
          hide-actions
          item-key="name"
        )

    v-divider
    v-layout(row wrap my-4)
      v-flex(xs12)
        h2.py-3 {{ $t('user.userHistory') }}
      v-flex(xs12)
        v-data-table(:headers='userHistoryHeaders', :items='userHistoryTable', :search='search', item-key='name', hide-actions)
          template(slot='items', slot-scope='props')
            tr
              td {{ props.item.date }}
              td {{ props.item.user }}
              td {{ props.item.siteGroup }}
              td {{ props.item.description }}
              td { props.item.oldDonated }}
              td {{ props.item.newDonated }}
</template>
<script>
import { mapActions } from 'vuex'

import BaseTable from '../common/base-table'

export default {
  props: {
    userId: {
      type: [String, Number]
    }
  },
  components: {
    BaseTable
  },
  data () {
    return {
      user: {
        profile: {}
      },
      search: '',
      userPermissionsHeaders: [
        { text: this.$t('general.organization'), sortable: false, align: 'left', value: 'organization', selected: true },
        { text: this.$t('general.siteGroup'), sortable: false, align: 'left', value: 'siteGroup', selected: true },
        { text: this.$t('user.admin'), sortable: false, align: 'left', value: 'admin', selected: true },
        { text: this.$t('user.manage'), sortable: false, align: 'left', value: 'manage', selected: true },
        { text: this.$t('user.edit'), sortable: false, align: 'left', value: 'edit', selected: true },
        { text: 'actions', sortable: false, align: 'right', value: 'actions', selected: true }
      ],
      userPermissionsTable: [
        {
          organization: 'Etam France',
          siteGroup: 'Rue de Rennes',
          admin: true,
          manage: '',
          edit: ''
        }
      ],
      userHistoryHeaders: [
        { text: this.$t('general.date'), sortable: false, align: 'left', value: 'date' },
        { text: this.$t('user.user'), sortable: false, align: 'left', value: 'user' },
        { text: this.$t('general.siteGroup'), sortable: false, align: 'left', value: 'siteGroup' },
        { text: this.$t('general.description'), sortable: false, align: 'left', value: 'description' },
        { text: this.$t('user.oldDonated'), sortable: false, align: 'left', value: 'oldDonated' },
        { text: this.$t('user.newDonated'), sortable: false, align: 'left', value: 'newDonated' }
      ],
      userHistoryTable: [
        {
          date: '26/04/18 - 11: 08',
          user: 'Pierre Hayon',
          siteGroup: 'Etam - Rue de Rennes',
          description: 'Lorem ipsum',
          oldDonated: 'Lorem ipsum',
          newDonated: 'Lorem ipsum'
        }
      ]
    }
  },
  mounted () {
    this.fetchUser(this.userId).then(response => {
      this.user = response.data.data
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    ...mapActions('user', ['fetchUser'])
  }
}
</script>
