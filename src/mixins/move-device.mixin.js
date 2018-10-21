import ManageableNodesMixin from '@/mixins/manageable-nodes.mixin'

import NodeSelect from '@/components/common/node-select'

let MoveDeviceMixin = {
  mixins: [
    ManageableNodesMixin
  ],
  components: {
    NodeSelect
  },
  data () {
    return {
      filters: {
        types: 'group,site'
      },
      targetNode: null,
      loading: false
    }
  },

  computed: {
    dialogHeading () {
      if (this.selectedItems.length) {
        let message = this.$t('general.moveNodeNameTo', {
          name: this.selectedItems[0].name
        })

        if (this.selectedItems.length > 1) {
          message = this.$t('general.moveSelectedNodesTo', {
            count: this.selectedItems.length, type: 'devices'
          })
        }

        return message
      }
    },
    nodesWithGroupsDisabled () {
      return this.nodes.map(node => {
        return {
          value: node.id,
          text: node.name,
          type: node.type,
          level: node.level,
          disabled: node.type === 'group'
        }
      })
    }
  }
}

export default MoveDeviceMixin
