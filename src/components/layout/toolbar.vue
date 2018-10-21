<template lang="pug">
  v-toolbar.main-toolbar(color="white darken-3" app fixed height="100px")

    v-toolbar-side-icon.hidden-lg-and-up(@click.stop="toggleDrawer")

    organization-selector

    v-spacer

    contact-us-dialog(:show="showContactDialog", @close="showContactDialog = false")

    .toolbar-actions
      v-tooltip.action(bottom)
        v-btn(icon slot='activator', @click="showContactDialog = true")
          v-icon phone
        span {{ $t("contact.contactUs") }}

      v-menu.action(bottom left offset-y)
        v-btn(icon slot='activator')
          v-icon person
        v-list.pa-0
          v-list-tile(:to="{name: 'UserProfile'}")
            v-list-tile-avatar
              v-icon person
            v-list-tile-content
              v-list-tile-title {{ $t("general.myProfile") }}

          v-list-tile(@click="logoutUser")
            v-list-tile-avatar
              v-icon exit_to_app
            v-list-tile-content
              v-list-tile-title {{ $t("general.logout") }}

      // v-btn.action(icon)
      //   v-icon settings

      // v-btn.action(icon)
      //   v-icon more_vert
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import toggleNotificationPanel from '@/mixins/toggle-notifications-panel.mixin'
import toggleDrawer from '@/mixins/toggle-drawer.mixin'
import organizationSelector from './organization-selector'
import ContactUsDialog from '../contact/contact-us-dialog'

export default {
  name: 'headerToolbar',

  components: {
    organizationSelector,
    ContactUsDialog
  },

  mounted () {
    this.fetchOrganizations()
  },

  mixins: [toggleNotificationPanel, toggleDrawer],

  data () {
    return {
      unreadNotificationsAvailable: true,
      newOrganization: false,
      organizationName: '',
      showContactDialog: false,
      rules: {
        requiredName: (value) => {
          const pattern = /^$|^[a-zA-Z ]+$/
          return pattern.test(value) || 'Invalid Organization Name'
        }
      }
    }
  },

  computed: {
    ...mapGetters('organization', ['organizations']),
    ...mapGetters(['drawer'])
  },

  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions('organization', ['fetchOrganizations']),

    logoutUser () {
      this.logout()
    },

    createNewOrganization () {
      console.log('createNewOrganization')
      this.newOrganization = true
    },

    closeCreateNewOrganization () {
      console.log('close createNewOrganization')
      this.newOrganization = false
    }
  }
}
</script>

<style lang="scss">
  @import "styles/colors.scss";

  .main-toolbar {
    box-shadow: none;
    position: absolute !important;

    .toolbar__content {
      padding: 0 100px;
    }

    .btn {
      color: #9ba9c4 !important;
    }

    .toolbar-actions {
      margin-right: 0 !important;

      .action {
        margin-left: 40px;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          height: 20px;
          width: 1px;
          left: -20px;
          top: 50%;
          transform: translateY(-50%);
          background-color: #d9d9d9;
        }

        &:first-child::before {
          display: none;
        }
      }
    }
  }
</style>
