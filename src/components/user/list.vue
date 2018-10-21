<template lang='pug'>
  .page-content
    v-layout.mb-5
      v-flex(xs12, sm12, md6, lg6)
        h2 {{ $t('user.userList') }}
      v-flex.pb-3(xs6, md6, lg6, text-xs-right)
        v-btn.primary-action(
          @click.stop='addNewUserDialog = true'
          color='primary'
          v-if="canManageOrg"
        )
          | {{ $t('user.newUser') }}
          v-icon add_circle_outline
    base-table(
      :items="users"
      :loading="loading"
      :row-clickable="true"
      :table-headers="userListHeaders"
      @rowClicked="onItemClick"
      icon="fas fa-image"
    )
      template(slot="row-action", slot-scope="slotProps")
        .row-popover-item(@click.prevent.stop="openDeleteUser")
          v-icon delete

    add-user-dialog(:show="addNewUserDialog", @close="addNewUserDialog = false", @next="addNewUser")
    add-user-account-dialog(:show="newUserAccountCreationDialog",  @close="newUserAccountCreationDialog = false")
    user-remove-dialog(:show="userRemoveDialog", @close="userRemoveDialog = false")
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import OrgPermissionsMixin from '@/mixins/org-permissions.mixin'
import addUserDialog from './add-user-dialog'
import addUserAccountDialog from './add-user-account-dialog'
import userRemoveDialog from './user-remove-dialog'
import baseTable from '../common/base-table'

export default {
  name: 'UserList',

  mounted () {
    if (this.users.length < 1) {
      this.loading = true
      this.fetchUsers({ page_size: 1000 }).then((response) => {
        this.users = response.data.data.results
        this.loading = false
      })
    }
  },

  mixins: [
    OrgPermissionsMixin
  ],

  components: {
    addUserDialog,
    addUserAccountDialog,
    userRemoveDialog,
    baseTable
  },

  data () {
    return {
      search: '',
      newUserAccountCreationDialog: false,
      addNewUserDialog: false,
      userRemoveDialog: false,
      users: [],
      userListHeaders: [
        { sortable: false, value: 'icon', selected: true },
        { text: this.$t('general.name'), align: 'left', value: 'profile.name', selected: true },
        { text: this.$t('general.email'), align: 'left', value: 'email', selected: true },
        { text: this.$t('general.role'), sortable: false, align: 'left', value: 'permissions', selected: true },
        { text: this.$t('general.phoneNumber'), align: 'right', value: 'profile.phone', selected: true },
        { text: this.$t('general.function'), align: 'left', value: 'profile.job_title', selected: true },
        { text: this.$t('general.lastConnected'), align: 'left', value: 'last_login', selected: true, formatter: this.dateFormatter },
        { text: 'actions', sortable: false, align: 'right', value: 'actions', selected: true }
      ],
      loading: false
    }
  },

  computed: {
    ...mapGetters('user', ['currentUser']),
    profile () {
      return this.currentUser.profile
    }
  },

  methods: {
    ...mapActions('user', ['fetchUsers']),
    dateFormatter (value) {
      if (!value) {
        return value
      }
      const dateTime = this.$moment(value)
      let dateFormat = 'L' // 09/04/1986
      let timeFormat = 'LT' // 8:30 PM

      if (this.profile.date_format !== 'mdy') {
        dateFormat = 'DD/MM/YYYY'
      }

      if (this.profile.use_24h_clock) {
        timeFormat = 'HH:mm' // 23:00
      }

      return dateTime.format(`${dateFormat} ${timeFormat}`)
    },
    addNewUser () {
      this.addNewUserDialog = false
      this.newUserAccountCreationDialog = true
    },
    addNewUserAccount () {
      console.log('addNewUserAccount')
      this.newUserAccountCreationDialog = false
    },
    addUserSitesAndPermissions () {
      this.userSitesAndPermissions.push({
        groupSite: this.group,
        permissions: this.accessLevel
      })
      this.group = ''
      this.accessLevel = ''
    },
    removeUserSitesAndPermissions (usp, idx) {
      console.log('removeUserSitesAndPermissions', usp, idx)
      this.userSitesAndPermissions.splice(idx, 1)
    },
    openDeleteUser () {
      console.log('openDeleteUser')
      this.userRemoveDialog = true
    },
    deleteUser (user) {
      console.log('deleteUser', user)
      this.userRemoveDialog = false
    },
    moreActions () {
      console.log('moreActions')
    },
    onItemClick (item) {
      this.$router.push({name: 'UserDetail', params: {userId: item.id}})
    }
  },

  // meta tags
  metaInfo: {
    title: 'UserList'
  }
}
</script>

<style scoped lang="sass">
  .user-list-table-row
    .user-list-table-actions
      opacity: 0
    &:hover
      .user-list-table-actions
        opacity: 1
</style>
