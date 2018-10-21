import { mapActions, mapGetters } from 'vuex'

const ManageableNodesMixin = {
  mounted () {
    const filters = Object.assign({}, this.defaultFilters, this.filters)
    if (this.orgId) {
      this.fetchManageableNodes({ orgId: this.orgId, filters: filters }).then(response => {
        this.nodes = response.data.data
      })
    } else {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'organization/SELECT_ORGANIZATION') {
          if (this.orgId) {
            this.fetchManageableNodes({ orgId: this.orgId, filters: filters }).then(response => {
              this.nodes = response.data.data
            })
          }
        }
      })
    }
  },
  data () {
    return {
      nodes: [],
      defaultFilters: {
        role: 'manage',
        layout: 'flat',
        types: 'organization,group,site,floor'
      },
      filters: {}
    }
  },
  computed: {
    ...mapGetters('organization', ['selectedOrganization']),

    orgId () {
      return this.selectedOrganization.id
    },

    nodesWithIndentation () {
      return this.nodes.map(group => {
        return {
          value: group.id,
          text: `${'>'.repeat(group.level)} ${group.name}`
        }
      })
    },

    nodesWithTypeAndIndentation () {
      return this.transformNodesWithTypeAndIndentation(this.nodes)
    }
  },
  methods: {
    ...mapActions('node', ['fetchManageableNodes']),
    transformNodesWithTypeAndIndentation (nodes) {
      return nodes.map(group => {
        return {
          value: group.id,
          text: group.name,
          type: group.type,
          level: group.level
        }
      })
    }
  }
}

export default ManageableNodesMixin
