<template lang='pug'>
  v-container(grid-list-md)
    v-layout(row wrap)
      v-flex(xs12)
        v-layout(row)
          v-flex(xs12)
            h2 {{ $t('general.splashPage') }} : {{ $t('splash.importFromFile') }}
            p.mt-4 {{ $t('splash.importFromFileDescription') }}

      v-flex(xs12)
         v-dropzone(
           :options="dropzoneOptions"
           @file-added="fileAdded"
           @removed-file="removedFile"
           ref="fileDropzone"
         )
</template>
<script>
import VDropzone from '@/components/common/v-dropzone'

export default {
  props: ['value'],
  components: {
    VDropzone
  },
  computed: {
    dropzoneOptions () {
      return {
        acceptedFiles: [
          'application/zip'
        ],
        url: '/api/mock/url/',
        autoProcessQueue: false // Do not upload automatically
      }
    }
  },
  methods: {
    fileAdded (file) {
      this.$emit('input', file)
    },
    removedFile (file) {
      this.$emit('input', null)
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
