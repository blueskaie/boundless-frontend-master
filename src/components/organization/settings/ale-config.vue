<template lang="pug">
  div
    h3.py-3.small-heading
      | {{ $t('general.aleConfiguration') }}
      tooltip(
        :label="$t('general.aleConfigurationHelp')"
        style="top: 2px"
      )
    .card.form-card.round
      v-layout(row pt-2)
        v-flex(xs12)
          v-text-field(
            :error-messages="errorMessage"
            :label="$t('general.aleId')"
            :rules="[(v) => v.length <= 17 || 'Max 17 characters']"
            :counter="17"
            required
            v-model="aleId"
          )

        v-flex(x1 pl-2 pt-1)
          v-btn(
            @click="addAleId"
            color="success"
            round
            outline
        ) {{ $t('general.add') }}

      v-layout(row wrap pr-3)
        v-flex(
          v-for="(aleId, idx) in currentAleIds"
          :class="flexClass(idx)"
          :key="idx"
          xs12
          md6
        )
          removable-item(
            :action-class="{'pt-2': true}"
            :removable="!isSaving"
            @remove="removeAleId(idx)"
            align-center
          )
            v-flex(xs12)
              v-text-field(
                readonly
                :value="aleId.aruba_ale_id"
              )
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

import RemovableItem from '@/components/common/removable-item'
import ErrorHandlerMixin from '@/mixins/error-handler.mixin'

export default {
  data () {
    return {
      aleId: '',
      isSaving: false,
      actionClass: {
        'pt-2': true
      }
    }
  },
  mixins: [
    ErrorHandlerMixin
  ],
  components: {
    RemovableItem
  },
  computed: {
    ...mapGetters('organization', ['selectedOrganization']),
    currentAleIds () {
      return this.selectedOrganization.aruba_ale_ids
    },
    errorMessage () {
      const errors = this.errorData.aruba_ale_ids
      if (Array.isArray(errors)) {
        for (let item of errors) {
          if (item.aruba_ale_id) {
            const err = item.aruba_ale_id[0]
            return err ? [err.message] : []
          }
        }
      }
      return []
    }
  },
  methods: {
    ...mapActions('organization', ['updateOrganization']),
    flexClass (idx) {
      if (this.$vuetify.breakpoint.mdAndUp) {
        const even = (idx + 1) % 2 === 0
        return {
          'pr-4': !even,
          'pl-4': even
        }
      }
      return {}
    },
    clearData () {
      this.isSaving = false
      this.aleId = ''
    },
    addAleId () {
      this.clearErrorData()
      this.isSaving = true
      const newIds = this.currentAleIds.slice()
      newIds.push({
        aruba_ale_id: this.aleId
      })
      this.save(newIds)
    },
    removeAleId (idx) {
      const newIds = this.currentAleIds.slice()
      newIds.splice(idx, 1)
      this.save(newIds)
    },
    save (newIds) {
      this.updateOrganization({aruba_ale_ids: newIds}).then(response => {
        this.clearData()
      }).catch(err => {
        this.setErrorData(err)
      })
    }
  }
}
</script>
