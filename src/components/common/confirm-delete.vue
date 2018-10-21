<template lang="pug">
  v-dialog.base-dialog(v-model="dialog" :max-width="options.width" @keydown.esc="cancel()" content-class="confirmation")
    v-icon.close-modal(@click.stop="cancel()") close
    h2.dialog-heading.mb-2(v-show="title") {{ title }}
    h4.dialog-subtitle.mb-3 {{ $t('general.typeFollowingSentenceText') }}
    .suggest-text.mt-4
      p {{ options.confirmText }}
    v-text-field.mt-4.mb-4.transparent(v-model="confirmationText", placeholder="Type the sentence here", solo-inverted)
    v-btn(
      :color="options.color", @click.native="agree()" block, :disabled="!matchesResponse"
    ) {{ options.deleteButtonText }}
</template>

<script>
/**
 * Confirm Delete Dialog component
 *
 * Insert component where you want to use it:
 * <confirm ref="confirm"></confirm>
 *
 * Call it:
 * this.$refs.confirm.open('Delete', 'Are you sure?', { color: 'red' }).then((confirm) => {});
 *
 * Alternatively you can place it in main App component and access it globally via this.$root.$confirm
 * <template>
 *   <v-app>
 *     ...
 *     <confirm ref="confirm"></confirm>
 *   </v-app>
 * </template>
 *
 * mounted() {
 *   this.$root.$confirm = this.$refs.confirm.open;
 * }
 */
export default {
  data () {
    return {
      dialog: false,
      resolve: null,
      reject: null,
      title: null,
      options: {
        color: 'primary',
        width: 290,
        confirmText: '',
        successMessage: '',
        deleteButtonText: ''
      },
      confirmationText: ''
    }
  },
  methods: {
    open (title, options) {
      this.dialog = true
      this.title = title
      this.options = Object.assign(this.options, options)
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    agree () {
      this.dialog = false
      this.resolve(true)
      if (this.options.successMessage) {
        global.toastr['success'](this.options.successMessage, this.$t('general.success'))
      }
    },
    cancel () {
      this.resolve(false)
      this.dialog = false
    }
  },
  computed: {
    matchesResponse () {
      return this.options.confirmText.toLowerCase() === this.confirmationText.toLowerCase()
    }
  }
}
</script>

<style lang="scss">
  @import "styles/colors.scss";

  .suggest-text {
    border: 2px solid #d7dfec;
    padding: 10px;

    p {
      margin: 0;
    }
  }
</style>
