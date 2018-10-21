<template lang="pug">
  v-navigation-drawer.sidebar-main(dark fixed app v-model="drawer" width="180")
    .logo-container
      img.logo-image(:src="logoUrl")
    side-menu(:menu="menu" :selected-org="this.selectedOrganization")
</template>

<script>
import {mapGetters} from 'vuex'
import sideMenu from './side-menu'
import SelectOrgMixin from '@/mixins/select-org.mixin'

export default {
  name: 'leftNavigation',

  props: ['menu'],

  mixins: [
    SelectOrgMixin
  ],
  components: {
    sideMenu
  },

  computed: {
    ...mapGetters(['drawer']),
    ...mapGetters('organization', ['selectedOrganization']),
    drawer: {
      get () {
        return this.$store.state.drawer
      },
      set (value) {
        this.$store.commit('UPDATE_DRAWER', value)
      }
    },
    logoUrl () {
      if (this.selectedOrganization.logo) {
        return this.selectedOrganization.logo
      } else {
        return '/static/images/logo-main.png'
      }
    }
  }
}
</script>

<style lang="scss">
  @import "styles/colors.scss";

  .navigation-drawer.sidebar-main {
    overflow: visible;
    margin-top: 0 !important;
    z-index: 4;
    padding-bottom: 0;
    display: flex;
    flex-direction: column;

    &.navigation-drawer--is-mobile {
      z-index: 5;
    }

    .logo-container {
      img {
        width: 100%;
        height: 150px;
      }
    }
  }

  .application .theme--dark.navigation-drawer, .theme--dark .navigation-drawer {
    background-color: $primary;
  }
</style>
