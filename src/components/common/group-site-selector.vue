<template lang="pug">
  .group-site-selector
    v-flex(xs3)
      node-select(
        :items="groupsAndSites"
        :label="$t('general.selectGroupOrSite')"
        clearable
        hide-details
        single-line
        v-model="selectedItem"
      )
    v-flex(xs9)
      v-layout(row, align-center)
        .item.organisation.icon-wrap
          briefcase-icon
          p.item-name {{ selectedOrganization.name }}
        .item.group(v-if="selectedGroup")
          v-icon keyboard_arrow_right
          folder-icon
          p.item-name {{ selectedGroup.name }}
        .item.site(v-if="selectedSite")
          v-icon keyboard_arrow_right
          map-marker-icon
          p.item-name {{ selectedSite.name }}

</template>

<script>
import { mapGetters } from 'vuex'

import briefcaseIcon from '@/components/icons/briefcase'
import folderIcon from '@/components/icons/folder'
import folderIconClosed from '@/components/icons/folder-closed'
import mapMarkerIcon from '@/components/icons/map-marker'
import floorIcon from '@/components/icons/floor'
import ManageableNodesMixin from '@/mixins/manageable-nodes.mixin'

import NodeSelect from '@/components/common/node-select'

export default {
  components: {
    briefcaseIcon,
    folderIcon,
    mapMarkerIcon,
    folderIconClosed,
    floorIcon,
    NodeSelect
  },
  mixins: [
    ManageableNodesMixin
  ],
  data () {
    return {
      selectedItem: null,
      filters: {
        role: 'manage',
        layout: 'flat',
        types: 'group,site,organization'
      }
    }
  },
  computed: {
    ...mapGetters('node', ['selectedNode']),
    ...mapGetters('organization', ['selectedOrganization']),
    groupsAndSites () {
      return this.nodesWithTypeAndIndentation.filter(node => node.type !== 'organization')
    },
    selectedOrgNode () {
      return this.nodes.find((node) => {
        return (node.id === this.selectedOrganization.id)
      })
    },
    matchedNode () {
      return this.nodes.find((node) => {
        return (node.id === this.selectedItem)
      })
    },
    selectedGroup () {
      if (this.matchedNode && this.matchedNode.type !== 'group') {
        let foundIndex = this.nodes.findIndex((node) => {
          return (node.id === this.selectedItem)
        })

        return this.nodes[foundIndex - 1]
      }

      return this.matchedNode || null
    },
    selectedSite () {
      return this.nodes.find((node) => {
        return (node.id === this.selectedItem && node.type === 'site')
      })
    }
  },
  methods: {
    setSelectedNode (node) {
      this.$store.commit('node/SET_SELECTED_NODE', node)
    }
  },
  watch: {
    matchedNode (value) {
      if (value) {
        this.setSelectedNode(value)
      } else {
        this.setSelectedNode(this.selectedOrgNode)
      }
    },
    selectedOrgNode (value) {
      if (value && global._.isEmpty(this.selectedNode)) {
        this.setSelectedNode(value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "styles/colors.scss";

  .group-site-selector /deep/ {
    display: flex;
    background-color: white;
    padding: 15px 20px;
    border-radius: 4px;
    align-items: center;
    color: $blue;
    font-weight: bold;

    p {
      margin: 0;
    }

    .item-name {
      margin-right: 25px;
    }

    .s-icon {
      width: 25px;
      height: 25px;
      display: block;
      color: $blue;
      margin-right: 10px;
    }

    .tree-style {
      border: 1px solid #d7dfec;
      padding: 10px 10px 10px 15px;

      &.input-group--hide-details .input-group__details {
        display: none;
      }

      &.input-group--text-field label {
        top: auto;
        left: auto;
      }
    }

    .tree-style .input-group__selections__comma:not(.input-group__selections__comma--active) {
      color: #354c77 !important;
    }

    .item {
      margin-left: 20px;
      display: flex;
      align-items: center;

      .icon {
        color: $blue;
        margin-right: 15px;
      }
    }

  }
</style>
