<template lang="pug">
  base-dialog(:show='show', @close="$emit('close')", max-width="1200")
    v-layout(row)
      v-flex(xs10)
        h2.dialog-heading {{ $t(' wifi.wifiAuthorisationDetails ') }}
    v-divider
    // general info
    v-card-text
      p {{ $t('general.name') }} : {{ userDetails.name }}
      p {{ $t('general.email') }} : {{ userDetails.email }}
      p {{ $t('general.mobile') }} : {{ userDetails.mobile || 'unknown' }}
    v-divider
    v-card-text
      // user permissions
      h2.py-3 {{ $t('user.userPermissions') }}
      v-data-table(:headers='userPermissionsHeaders', :items='userPermissionsTable', :search='search', item-key='name', hide-actions)
        template(slot='items', slot-scope='props')
          tr
            td.px-2
              v-checkbox.px-3
            td.text-xs-right {{ props.item.organization }}
            td.text-xs-right {{ props.item.siteGroup }}
            td.text-xs-right {{ props.item.admin ? 'yes' : 'no' }}
            td.text-xs-right {{ props.item.manage }}
            td.text-xs-right {{ props.item.edit }}
    v-divider
    v-card-text
      // user history
      h2.py-3 {{ $t('user.userHistory') }}

      v-data-table(:headers='userHistoryHeaders', :items='userHistoryTable', :search='search', item-key='name', hide-actions)
        template(slot='items', slot-scope='props')
          tr
            td.text-xs-right {{ props.item.date }}
            td.text-xs-right {{ props.item.user }}
            td.text-xs-right {{ props.item.siteGroup }}
            td.text-xs-right {{ props.item.description }}
            td.text-xs-right { props.item.oldDonated }}
            td.text-xs-right {{ props.item.newDonated }}
    v-layout(row)
      v-flex.text-xs-right(sm-2)
        v-btn(color='primary', @click.stop="$emit('close')") {{ $t('general.close') }}
</template>

<script>
import baseDialog from '@/components/common/base-dialog'

export default {
  props: ['show', 'userDetails'],
  components: {
    baseDialog
  },
  data () {
    return {
      search: '',
      userPermissionsHeaders: [
        { sortable: false, align: 'center', value: 'icon', width: 50 },
        { text: this.$t('general.organization'), sortable: false, align: 'center', value: 'organization' },
        { text: this.$t('general.siteGroup'), sortable: false, align: 'center', value: 'siteGroup' },
        { text: this.$t('user.admin'), sortable: false, align: 'center', value: 'admin' },
        { text: this.$t('user.manage'), sortable: false, align: 'center', value: 'manage' },
        { text: this.$t('user.edit'), sortable: false, align: 'center', value: 'edit' }
      ],
      userPermissionsTable: [
        {
          organization: 'Etam France',
          siteGroup: 'Rue de Rennes',
          admin: true,
          manage: '',
          edit: ''
        },
        {
          organization: 'Etam France',
          siteGroup: 'Rue de Rennes',
          admin: true,
          manage: '',
          edit: ''
        },
        {
          organization: 'Etam France',
          siteGroup: 'Rue de Rennes',
          admin: false,
          manage: '',
          edit: ''
        },
        {
          organization: 'Etam France',
          siteGroup: 'Rue de Rennes',
          admin: false,
          manage: '',
          edit: ''
        }
      ],
      userHistoryHeaders: [
        { text: this.$t('general.date'), sortable: false, align: 'center', value: 'date' },
        { text: this.$t('user.user'), sortable: false, align: 'center', value: 'user' },
        { text: this.$t('general.siteGroup'), sortable: false, align: 'center', value: 'siteGroup' },
        { text: this.$t('general.description'), sortable: false, align: 'center', value: 'description' },
        { text: this.$t('user.oldDonated'), sortable: false, align: 'center', value: 'oldDonated' },
        { text: this.$t('user.newDonated'), sortable: false, align: 'center', value: 'newDonated' }
      ],
      userHistoryTable: [
        {
          date: '26/04/18 - 11: 08',
          user: 'Pierre Hayon',
          siteGroup: 'Etam - Rue de Rennes',
          description: 'Lorem ipsum',
          oldDonated: 'Lorem ipsum',
          newDonated: 'Lorem ipsum'
        },
        {
          date: '26/04/18 - 11: 08',
          user: 'Pierre Hayon',
          siteGroup: 'Etam - Rue de Rennes',
          description: 'Lorem ipsum',
          oldDonated: 'Lorem ipsum',
          newDonated: 'Lorem ipsum'
        },
        {
          date: '26/04/18 - 11: 08',
          user: 'Pierre Hayon',
          siteGroup: 'Etam - Rue de Rennes',
          description: 'Lorem ipsum',
          oldDonated: 'Lorem ipsum',
          newDonated: 'Lorem ipsum'
        },
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
  }
}
</script>
