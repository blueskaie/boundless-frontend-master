<template lang='pug'>
  v-layout.mb-3(row wrap)
    v-flex.pa-2.pt-3(xs12 md6)
      personal-info

    v-flex.pa-2.pt-3(xs12 md6)
      preferences

    v-flex.pa-2.pt-3(xs12 md6)
      email-info

    v-flex.pa-2.pt-3(xs12 md6)
      password-info

    v-flex.pa-2.pt-3(xs12 md6)
      meraki-api-info

    v-flex.pa-2.pt-3(xs12 md6)
      boundless-api-info

    v-flex.pa-2.pt-4(xs12)
      h3.small-heading.pb-3 Account authorization
      template
        v-data-table.elevation-1(:headers='headers', :items='desserts', hide-actions='')
          template(slot='items', slot-scope='props')
            td {{ props.item.name }}
            td.text-xs-right {{ props.item.site }}
            td.text-xs-right {{ props.item.admin }}
            td.text-xs-right {{ props.item.manage }}
            td.text-xs-right {{ props.item.edit }}
            td.text-xs-right {{ props.item.read }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import BoundlessApiInfo from './boundless-api-info'
import EmailInfo from './email-info'
import MerakiApiInfo from './meraki-api-info'
import PasswordInfo from './password-info'
import PersonalInfo from './personal-info'
import Preferences from './preferences'

export default {
  name: 'UserProfile',

  // use auth from auth.service
  props: ['auth'],

  components: {
    EmailInfo,
    BoundlessApiInfo,
    MerakiApiInfo,
    PasswordInfo,
    PersonalInfo,
    Preferences
  },

  mounted () {
    if (global._.isEmpty(this.userOptions)) {
      this.fetchUserOptions()
    }
  },

  data () {
    // each field is represented by a value property and its validation rule
    return {
      headers: [
        { text: 'Organization', align: 'left', value: 'name' },
        { text: 'Site/ Group', align: 'right', value: 'site' },
        { text: 'Admin', align: 'right', value: 'admin' },
        { text: 'Manage', align: 'right', value: 'manage' },
        { text: 'Edit', align: 'right', value: 'edit' },
        { text: 'Read', align: 'right', value: 'read' }
      ],
      desserts: [
        {
          value: false,
          name: 'Etam France',
          site: 'Rue de Rennes',
          admin: true,
          manage: false,
          edit: false,
          read: false
        },
        {
          value: false,
          name: 'Etam France',
          site: 'Rue de Rennes',
          admin: true,
          manage: false,
          edit: false,
          read: true
        },
        {
          value: false,
          name: 'Etam France',
          site: 'Rue de Rennes',
          admin: true,
          manage: false,
          edit: false,
          read: false
        }
      ]
    }
  },

  computed: {
    ...mapGetters('user', ['currentUser', 'userOptions'])
  },

  methods: {
    ...mapActions('user', ['fetchUserOptions'])
  },

  // meta tags
  metaInfo: {
    title: ``
  }
}
</script>
