<template lang="pug">
  .page-content
    v-layout.mb-5
      v-flex(xs12, sm12, md6, lg6)
        h2 {{$t('general.venues')}}
      v-flex.pb-3(xs6, md6, lg6, text-xs-right)
        v-btn.primary-action(color='primary', @click.stop='showNewSiteDialog = true')
          | {{ $t('general.newSite') }}
          v-icon add_circle_outline
    add-user-dialog(
      :show="showAddUserDialog",
      @close="setAddUserDialog(false)",
      @next="addNewUser",
      :node-preselected="selectedNode",
    )
    .venue-progress(v-if="isTreeLoading")
      v-progress-circular(:size="50" indeterminate color="primary")
    .venues-list-wrap(v-else)
      v-layout.group-site-header(row)
        v-flex.group-site-actions(xs6)
          //- span.d-inline-block
          //- v-checkbox(v-model="selectAllSwitch", color="deep-purple lighten-2", hide-details)
          span.ml-2.d-inline-block(v-if="selectedItems.length") {{selectedItems.length}} {{$t('general.itemsSelected')}}
          a.ml-2.d-inline-block(v-if="selectedItems.length", @click="deselectAll") Deselect All
        v-flex.group-site-buttons.text-xs-right.pr-1.pt-1(xs6)
          span.d-inline-block
            v-checkbox.action-check.mr-2(v-model="showFloorsAndDevices", color="deep-purple lighten-2", hide-details, :label="$t('venue.showFloorsAndDevices')", @change="toggleFloorsAndDevices")
          span.d-inline-block
            v-btn(icon, @click.stop="setAddGroupDialog(true)")
              v-icon create_new_folder
          span.d-inline-block
            v-btn(icon, @click.stop="toggleMoveDialog", :disabled="!selectedItems.length")
              v-icon fas fa-arrows-alt
          span.d-inline-block
            v-btn(icon, @click.stop="toggleDeleteDialog", :disabled="!selectedItems.length")
              v-icon delete

          new-group-dialog(:show="showAddGroupDialog", :node-preselected="selectedNode", @close="setAddGroupDialog(false)")
          delete-item-dialog(:show="showDeleteDialog", @close="toggleDeleteDialog")
          new-site-dialog(:show="showNewSiteDialog", @close="showNewSiteDialog = false")
      // in the tree
      v-layout(row)
          v-flex(xs12)
            tree(
              v-for="item in currentOrgTree",
              :key="item.id"
              :item="item",
              :tree="currentOrgTree"
            )

      move-item-dialog(
        @close="toggleMoveDialog"
        :show="showMoveDialog",
        :flat-list="flatList"
        :selected-items="selectedItems"
      )
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import newGroupDialog from './new-group-dialog'
import deleteItemDialog from './delete-item-dialog'
import newSiteDialog from './new-site-dialog'
import tree from './tree'
import moveItemDialog from './move-item-dialog'
import addUserDialog from '@/components/user/add-user-dialog-simplified'

export default {
  components: {
    newGroupDialog,
    deleteItemDialog,
    newSiteDialog,
    tree,
    moveItemDialog,
    addUserDialog
  },

  data () {
    return {
      active: null,
      showNewSiteDialog: false,
      selectAllSwitch: false,
      showFloorsAndDevices: false,
      showAddNewUserDialog: false
    }
  },

  mounted () {
    this.loadDefaultTree()
  },

  computed: {
    ...mapGetters('venue', [
      'currentOrgTree',
      'flatList',
      'selectedItems',
      'showDeleteDialog',
      'showMoveDialog',
      'isTreeLoading',
      'showAddUserDialog',
      'showAddGroupDialog',
      'selectedNode'
    ])
  },

  watch: {
    selectAllSwitch (value) {
      if (value) {
        this.selectAll()
      } else {
        this.deselectAll()
      }
    }
  },

  methods: {
    ...mapActions('venue', [
      'selectAll',
      'deselectAll',
      'toggleDeleteDialog',
      'toggleMoveDialog',
      'fetchCurrentOrgTree',
      'setTreeLoading',
      'setAddUserDialog',
      'setAddGroupDialog'
    ]),
    loadDefaultTree () {
      this.setTreeLoading(true)
      this.fetchCurrentOrgTree().then(() => {
        this.setTreeLoading(false)
      })
    },
    loadFullTree () {
      let filters = {
        types: 'organization,group,site,floor,device'
      }
      this.setTreeLoading(true)
      this.fetchCurrentOrgTree(filters).then(() => {
        this.setTreeLoading(false)
      })
    },
    toggleFloorsAndDevices (val) {
      if (val) {
        this.loadFullTree()
      } else {
        this.loadDefaultTree()
      }
    },
    addNewUser () {
      console.log('ok')
    }
  }
}
</script>

<style lang="scss">
  .group-site-header {
    background-color: #f8fafc;
    color: #9ba9c4;

    .icon {
      color: #9ba9c4 !important;
    }
  }

  .group-site-actions {
    display: flex;
    align-items: center;
    padding-left: 20px;
  }

  .action-check {
    min-width: 210px;
  }

  .group-site-buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .deselect-link {
    padding-left: 5px;
  }

  .venue-progress {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
  }
</style>
