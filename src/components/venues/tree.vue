<template lang="pug">
  .tree-item-container
    .tree-item(@click.stop="collapseChildren($event)")
      .item-checkbox(v-if="item.type !== 'organization'")
        v-checkbox(ref="checkboxEl", v-model="selected", :value="item", :disabled="isSelectionDisabled", color="deep-purple lighten-2", hide-details)
      .item-title(:style="indent")
        .item-title-icon
          itemIcon(:type="item.type", :collapsed="collapsed")
        h5 {{ item.name }} <span v-if="childCount"> ({{ childCount }}) </span>
      .tree-item-actions(v-if="item.type !== 'organization'")
        v-menu(left, offset-y)
          v-btn.divider-vert.mx-0(slot="activator", icon)
            v-icon(small, color='grey') more_horiz
          .row-popover
            .row-popover-arrow
            .row-popover-inner
              .row-popover-item(@click="goToDashboard(item)", v-if="item.type === 'group' || item.type === 'site'")
                v-icon fas fa-chart-pie
              .row-popover-item(@click="addUser(item)", v-if="item.type === 'group' || item.type === 'site'")
                v-icon fas fa-user-plus
              .row-popover-item(@click="addGroup(item)", v-if="item.type === 'group'")
                v-icon fas fa-folder-plus
              .row-popover-item(@click="moveItem(item)")
                v-icon fas fa-arrows-alt
              .row-popover-item(@click="goToSettings(item)", v-if="item.type === 'group' || item.type === 'site'")
                v-icon fas fa-cog
              .row-popover-item(@click="deleteItem(item)")
                v-icon delete

    tree(
      v-if="item.children && item.children.length && !collapsed",
      v-for="subitem in item.children",
      :key="subitem.id"
      :item="subitem"
      :tree="tree"
      @move="moveItem",
      @delete="deleteItem"
    )
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import itemIcon from './item-icon'

export default {
  name: 'tree',
  props: {
    item: {
      required: true,
      type: Object
    },
    tree: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      collapsed: false,
      childCount: 0
    }
  },
  components: {
    itemIcon
  },
  watch: {
    tree: {
      handler (value) {
        this.childCount = 0
        this.countChildren(this.item)
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapGetters('venue', ['selectedItems']),
    selected: {
      get () {
        return this.selectedItems
      },
      set (value) {
        this.updateSelectedItems(value)
      }
    },
    indent () {
      return { transform: `translate(${this.item.level * 50}px)` }
    },
    isSelectionDisabled () {
      let currentType = this.item.type

      let found = this.selectedItems.find(item => item.type !== currentType)

      return found !== undefined
    }
  },
  methods: {
    ...mapActions('venue', [
      'updateSelectedItems',
      'deselectAll',
      'toggleDeleteDialog',
      'toggleMoveDialog',
      'setAddUserDialog',
      'updateSelectedNode',
      'setAddGroupDialog'
    ]),
    moveItem (item) {
      this.updateSelectedItems([item])
      this.toggleMoveDialog()
    },
    deleteItem (item) {
      this.updateSelectedItems([item])
      this.toggleDeleteDialog()
    },
    collapseChildren (e) {
      // toggle collapse if (not clicked action-button, not clicked checkbox, is-group, has-children)
      if (!e.target.closest('.tree-item-actions') && !e.target.closest('.item-checkbox') && this.item.type === 'group' && this.item.children.length) {
        this.collapsed = !this.collapsed
      }
    },
    countChildren (item) {
      if (item.children) {
        item.children.forEach((subitem) => {
          if (subitem.type === 'site' || subitem.type === 'device') {
            this.childCount++
          }

          this.countChildren(subitem)
        })
      }
    },
    goToDashboard (item) {
      this.$router.push({
        name: 'WifiAnalytics'
      })
    },
    addUser (item) {
      this.setAddUserDialog(true)
      this.updateSelectedNode(item)
    },
    addGroup (item) {
      this.setAddGroupDialog(true)
      this.updateSelectedNode(item)
    },
    goToSettings (item) {
      this.$router.push({
        name: 'SiteGroupDetail',
        params: {id: 1}
      })
    }
  }
}
</script>

<style lang="scss">
@import "styles/colors.scss";

.tree-item {
  background-color: white;
  padding: 20px;
  display: flex;
  align-items: center;
  margin-top: 5px;
  border-radius: 6px;
  position: relative;
  cursor: pointer;

  .item-checkbox {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &::before {
    position: absolute;
    content: '';
    left: -8px;
    width: 7px;
    height: calc(100% - 20px);
    top: 10px;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    background: #aa85d9;
    opacity: 0;
    transition: all 0.3s ease-in-out;
  }

  &:hover {
    background-color: #ecf8ff !important;
    color: $primary;

    .item-title h5 {
      color: $primary;
    }

    .s-icon {
      color: $primary !important;
    }
  }

  &:hover::before {
    opacity: 1;
  }

  .item-title {
    display: flex;
    align-items: center;

    h5 {
      font-weight: normal;
      font-family: 'Source Sans Pro', sans-serif;
      font-size: 15px;
      color: #0f202f;
    }
  }

  .tree-item-actions {
    position: absolute;
    top: 10px;
    right: 20px;
  }

  .item-title-icon {
    margin-right: 15px;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      color: #9EACC6;
    }
  }
}

.input-group--selection-controls.input-group--disabled .icon--selection-control{
  color: #d9d9d9;
}

</style>
