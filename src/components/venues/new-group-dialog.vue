<template lang="pug">
    // new group modal
    base-dialog(:show="show", max-width='700px', @close="$emit('close')")
      v-layout(row)
        v-flex(xs10)
          h2.mb-3.dialog-heading {{ $t('settings.groupInfo') }}
      v-layout(row)
        v-flex(xs12)
          h4.pb-4
            | {{ $t('settings.newGroupDescription') }}
      v-layout(row)
        v-flex.px-3(xs12 sm6)
          v-text-field(:name="$t('settings.groupName')", v-model='groupName', :label="$t('settings.groupName')", append-icon="help_outlined", required)
        v-flex.px-3(xs12 sm6)
          v-select(:items='groupList', v-model='parentGroup', item-text="name", return-object, :label="$t('settings.selectGroup')", single-line, append-icon="help_outlined")
      v-layout(row)
        v-flex(xs12 sm6)
          p.py-5.pl-3.grey--text.lighten-4
            | {{ $t('contact.mandatoryFields') }}
        v-flex(xs12 sm6)
          p.py-5.pr-3.grey--text.lighten-4.text-sm-right
            v-btn(:loading='loading', :disabled='loading || !groupName', color='success', large, round, @click.native="saveNewGroup")
              | {{ $t('settings.saveGroup') }}

</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'NewGroupModal',

  props: ['show', 'nodePreselected'],

  data () {
    return {
      groupName: '',
      parentGroup: {id: 0, name: 'None'},
      loading: false
    }
  },

  mounted () {
    // Select None by default
    this.parentGroup = this.groupList[0]
  },

  watch: {
    nodePreselected: {
      handler (val) {
        if (val) {
          let found = this.groupList.find((g) => {
            return g.id === val.id
          })

          this.parentGroup = found
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('venue', ['addGroup']),
    saveNewGroup () {
      this.loading = true

      this.addGroup({
        name: this.groupName,
        parent: this.parentGroup.id
      }).then(() => {
        this.loading = false
        this.groupName = ''
        this.parentGroup = {id: this.$route.params.orgId, name: 'None'}
        this.$emit('close')
      })
    }
  },

  computed: {
    ...mapGetters('venue', ['groupAndSiteTree', 'flatList']),
    groupList () {
      let groupList = [{id: this.$route.params.orgId, name: 'None'}]

      let filteredGroups = this.flatList.filter((item) => {
        return item.type === 'group'
      })

      return groupList.concat(filteredGroups)
    }
  }
}
</script>
<style lang="scss">
  .select-group-help {
    left: 100px; top: 0px;
  }

</style>
