<template lang="pug">
  div
    v-menu.org-menu(
      :close-on-content-click="false"
      :nudge-bottom="10"
      offset-y
      transition="slide-y-transition"
      v-if="hasOrganization"
      v-model="menu"
    )
      h3.org-menu-heading(slot="activator")
        span {{selectedOrganization.name}}
        span.caret-icon(v-show="menu")
          v-icon(small) fas fa-caret-up
        span.caret-icon(v-show="!menu")
          v-icon(small) fas fa-caret-down
      v-card.org-menu-dropdown
        v-layout(row)
          v-flex(sm10)
            v-text-field.search-input(
              append-icon="search"
              placeholder="Search"
              solo
              v-model="search"
            )
          v-flex.v-flex(sm2, justify-end)
            button.org-menu-button(@click="openDialog")
              .circle-container
                v-icon(small) fas fa-plus
        ul.org-list
          li.org-item(
            v-for="org in filteredOrganizations",
            :key="org.id",
            :class="{'active': selectedOrganization.id == org.id}"
            @click="selectOrg(org)"
          )
            span.org-item-icon
              v-icon(small) fas fa-check
            span {{ org.name }}

    button.org-menu-button.new-org(@click="openDialog" v-else) {{ $t('general.newOrganization') }}
      .circle-container
        v-icon(small) fas fa-plus
    add-organization-dialog(:show="showNewOrganizationDialog", @close="closeDialog")
</template>

<script>
import matchSorter from 'match-sorter'
import addOrganizationDialog from '@/components/organization/add-organization-dialog'
import SelectOrgMixin from '@/mixins/select-org.mixin'

export default {
  components: {
    addOrganizationDialog
  },
  mixins: [SelectOrgMixin],
  mounted () {
    // Fetch Organizations and select cached or first organization
    this.fetchOrganizations().then((res) => {
      this.$nextTick(() => {
        this.selectActiveOrganization()
      })
      if (!this.hasOrganization) {
        this.openDialog()
      }
    })
  },
  data () {
    return {
      menu: false,
      search: '',
      showNewOrganizationDialog: false
    }
  },
  computed: {
    filteredOrganizations () {
      return matchSorter(this.organizations, this.search.toLowerCase(), { keys: ['name'] })
    }
  },
  methods: {
    openDialog () {
      this.showNewOrganizationDialog = true
      this.menu = false
    },
    selectOrg (org) {
      this.menu = false
      this.selectOrgById(org.id)
    },
    closeDialog (newOrg) {
      // Closes dialog and set the active organization if newOrg is supplied or created
      this.showNewOrganizationDialog = false
      if (newOrg) {
        this.fetchOrganizations().then(response => {
          // Select and redirect to proper org url
          this.selectOrgById(newOrg.id)
        })
      }
    }
  },
  watch: {
    menu (newValue) {
      if (!newValue) {
        this.search = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "styles/colors.scss";

  .org-menu {
    font-family: 'Source Sans Pro', sans-serif;

    .org-menu-heading {
      font-size: 30px;
      color: $primary;
      position: relative;
    }

    .caret-icon {
      position: absolute;
      top: 5px;
      margin-left: 10px;
      top: -3px;
    }

    .menu__content {
      box-shadow: none !important;
    }

  }

  .v-flex {
    display: flex;
  }

  .org-menu-dropdown {
    padding: 30px;
    box-shadow: none !important;
    border: 1px solid $light-gray;
    min-width: 400px;
  }

  .org-menu-button {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    color: #ffffff;
    background-color: $primary;
    height: 40px;
    width: 40px;

    &:hover {
      background-color: lighten($primary, 5%);
    }

    .icon {
      color: #ffffff;
    }
    &.new-org {
      padding: 0 10px;
      width: auto;
      font-size: 20px;

      .circle-container {
        margin-left: 5px;
      }
    }
  }

  .circle-container {
    border-radius: 100px;
    border: 1px solid #ffffff;
    height: 26px;
    width: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .org-list {
    list-style-type: none;
    padding: 0;
    margin-top: 10px;
    max-height: 165px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: $light-gray;
      border: 3px solid transparent;
      background-clip: content-box;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: $success;
      border: 1px solid $success;
      border-radius: 5px;
    }

    .org-item {
      padding: 5px 10px;
      margin-right: 5px;
      cursor: pointer;
      border-radius: 5px;
      margin-top: 2px;
      position: relative;

      .org-item-icon {
        display: none;
        color: #ffffff;
        margin-right: 5px;
        position: absolute;
        top: 5px;
        right: 5px;

        svg {
          color: #ffffff;
        }
      }

      &:hover {
        background-color: lighten($light-gray, 5%);
      }

      &.active {
        background-color: $primary;
        color: #ffffff;

        .org-item-icon {
          display: block;
        }
      }
    }
  }
</style>
