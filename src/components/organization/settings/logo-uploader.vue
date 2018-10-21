<template lang="pug">
  v-dropzone(
    :options="dropzoneOptions"
    @success="uploadLogoSuccess"
    id="dropzone"
    ref="logoDropzone"
  )
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

import VDropzone from '@/components/common/v-dropzone'

export default {
  components: {
    VDropzone
  },
  computed: {
    ...mapGetters('organization', ['selectedOrganization']),
    dropzoneOptions () {
      return {
        acceptedFiles: 'image/*',
        url: `${process.env.API_URL}/organization/${this.$route.params.orgId}/upload-logo/`
      }
    }
  },
  methods: {
    ...mapActions('organization', ['updateOrganization']),
    removeLogo () {
      const data = {
        logo: null
      }
      this.updateOrganization(data).then(response => {
      }).catch(err => {
        console.log(err)
      })
    },
    setCurrentLogo () {
      const url = this.selectedOrganization.logo
      const logo = {name: this.selectedOrganization.name}
      const logoDropzone = this.$refs.logoDropzone.$refs.dropzone
      logoDropzone.removeAllFiles()
      if (url) {
        logoDropzone.manuallyAddFile(logo, url)

        // Add event listener in remove link to remove the logo
        // in the server
        const removeLink = logoDropzone.dropzone.element.getElementsByClassName('dz-remove')[0]
        if (removeLink) {
          removeLink.addEventListener('click', () => {
            this.removeLogo()
          })
        }
      }
    },
    uploadLogoSuccess (file, response) {
      const org = {...this.selectedOrganization, logo: response.data.file}
      this.$store.commit('organization/SELECT_ORGANIZATION', org)
    }
  },
  watch: {
    selectedOrganization (val) {
      /* Updates image in the dropzone.  This is necessary especially
        if the user loads the settings page first because the organization
        data is not loaded yet.
      */
      this.setCurrentLogo()
    }
  }
}
</script>
