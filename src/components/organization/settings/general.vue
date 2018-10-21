<template lang="pug">
  .general
    v-layout(row wrap)
      v-flex(xs12 md6 px-2)
        h3.small-heading.py-3 {{ $t('organization.uploadYourLogo') }}
        .form-card.text-xs-center
          logo-uploader
    v-layout(row wrap)
      v-flex(xs12 md6 px-2)
        h3.small-heading.py-3.error--text {{$t('general.dangerZone')}}
        .form-card.small.danger
          v-layout(row, align-center)
            v-flex(xs7)
              p {{$t('organization.deleteOrganizationText')}}
            v-flex.text-xs-right(xs5)
              v-btn(
                color="error", round, @click="showDeleteConfirmation"
              ) {{$t('organization.deleteThisOrganization')}}

    confirm-delete(ref="confirm")

    v-dialog(
      v-model="deletingOrganization", persistent, width="300", content-class="deleting-org"
    )
      v-card(color="primary", dark)
        v-card-text {{ $t('organization.deletingOrganization') }}...
          v-progress-linear(indeterminate, color="white", calss="mb-0")
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import ConfirmDelete from '@/components/common/confirm-delete'
import LogoUploader from './logo-uploader'

export default {
  data () {
    return {
      selectedFile: null,
      deletingOrganization: false
    }
  },
  components: {
    ConfirmDelete,
    LogoUploader
  },
  computed: {
    ...mapGetters('organization', ['selectedOrganization'])
  },
  methods: {
    ...mapActions('organization', ['deleteOrganization']),
    showDeleteConfirmation () {
      const options = {
        color: 'error',
        width: 500,
        confirmText: `${this.$t('organization.deleteResponse')} ${this.selectedOrganization.name}`,
        deleteButtonText: this.$t('organization.deleteThisOrganizationPermanently')
      }
      this.$refs.confirm.open('', options).then((confirm) => {
        if (confirm) {
          this.deletingOrganization = true
          this.deleteOrganization(this.selectedOrganization.id).then(response => {
            setTimeout(() => (window.location = '/'), 500)
          }).catch(err => {
            global.toastr['error'](this.$t('general.errorOccurred'), this.$t('general.error'))
            this.deletingOrganization = false
            console.log(err)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .dialog.deleting-org {
    background-color: transparent !important;
    box-shadow: none;
    -webkit-box-shadow: none;
  }
</style>
