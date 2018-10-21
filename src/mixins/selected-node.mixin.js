import { mapActions, mapGetters } from 'vuex'

const SelectedNodeMixin = {
  computed: {
    ...mapGetters('node', ['selectedNode']),
    wifiConfig () {
      return this.selectedNode.wifi_config || {}
    }
  },
  methods: {
    ...mapActions('node', ['updateNode'])
  }
}

export default SelectedNodeMixin
