<template lang="pug">
  v-container(grid-list-md)
    v-layout(row wrap)
      v-flex(xs12)
        v-layout(row)
          v-flex(xs12)
            h2 {{ $t('general.splashPage') }} : {{ $t('splash.projectMode') }}
            p.mt-4 {{ $t('splash.projectModeDescription') }}

      v-flex(xs12)
        h3.mb-4.mt-2 {{ $t('splash.howItWorks')}}
        p {{ $t('splash.howItWorksDescription') }}

        v-layout.pa-3(row wrap justify-start)
          v-flex.selection-panel(
            v-for="item in items"
            :key="item.id"
            mx-1
          )
            v-layout(row wrap)
              v-flex(xs12)
                v-icon {{ item.icon }}
              v-flex(xs12)
                | {{ item.title }} <br/> <small>( {{ item.alt }} )</small>

        v-divider.mb-4.mt-4

      v-flex(xs12)
        h3.mb-2 {{ $t('splash.defineNeeds')}}

        v-layout(row wrap)
          v-flex(xs12 px-2)
            v-dropzone(
              ref="dropzone"
              :options="briefDropzoneOptions"
              @file-added="fileAdded"
              @removed-file="removedFile"
              multiple
            )

        v-layout(row wrap mt-3)
          v-flex(xs12 md6 px-2)
            tel-input(
              :error-messages="getErrorMessages('phone', errors)"
              :label="$t('general.phoneNumber')"
              v-model="value.phone"
            )

          v-flex(xs12 md6 px-2)
            availability-select(
              v-help-tooltip="{ message: $t('splash.yourAvailabilityHelp') }"
              v-model="value.availabilities"
            )

        v-layout(row wrap)
          v-flex(xs12 px-2)
            v-text-field(
              :label="$t('general.message')"
              textarea
              required
              v-model="value.message"
            )
</template>

<script>
import AvailabilitySelect from '@/components/common/availability-select'
import TelInput from '@/components/common/tel-input/input'
import VDropzone from '@/components/common/v-dropzone'

export default {
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          description: '',
          phone: '',
          availabilities: '',
          attachments: []
        }
      }
    },
    errors: {
      type: Object,
      default: () => {
        return {}
      }
    },
    getErrorMessages: {
      type: Function,
      required: false
    },
    clearErrorData: {
      type: Function,
      required: false
    }
  },
  components: {
    AvailabilitySelect,
    TelInput,
    VDropzone
  },
  data () {
    return {
      items: [
        {id: 1, title: this.$t('splash.smallTeam'), alt: this.$t('splash.twoPersons'), icon: 'fas fa-user'},
        {id: 2, title: this.$t('splash.standardTeam'), alt: this.$t('splash.fourPersons'), icon: 'fas fa-users'},
        {id: 3, title: this.$t('splash.customTeam'), alt: this.$t('splash.tailored'), icon: 'fas fa-cut'}
      ]
    }
  },
  computed: {
    dropzoneOptions () {
      return {
        maxFilesize: 20,
        url: '/api/mock/url/',
        maxFiles: 10,
        autoProcessQueue: false // Do not upload automatically
      }
    },
    briefDropzoneOptions () {
      const options = {
        dictDefaultMessage: '<i class="fas fa-cloud-upload-alt"></i> ' + this.$t('splash.loadBrief'),
        ...this.dropzoneOptions
      }
      return options
    }
  },
  methods: {
    fileAdded (file) {
      this.value.attachments.push(file)
    },
    removedFile (file) {
      const index = this.value.attachments.indexOf(file)
      this.value.attachments.splice(index, 1)
    }
  },
  watch: {
    'value.phone': function (value) {
      this.clearErrorData()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "styles/components/selection-panel.scss";

.selection-panel {
  min-height: 100px;
  text-transform: uppercase;
  cursor: default;

  .icon {
    color: $blue !important;
  }
}
</style>
