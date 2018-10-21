<template lang="pug">
  v-dialog.base-dialog(v-model='showDialog', :max-width='maxWidth', :persistent="persistent")
    v-icon.close-modal(@click.stop="$emit('close')") close
    slot
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: '920'
    },
    persistent: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showDialog: {
      // This fixes the issue when clicking outside the dialog
      // and you can't open it again
      get () {
        return this.show
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  }
}
</script>

<style lang="scss">

  .dialog {
    padding: 60px;
    background-color: #eff3f8 !important;
    position: relative;
    border-radius: 6px;
    color: #00082a;
    font-family: 'Source Sans Pro', sans-serif;

    p {
      color: #00082a;
      font-size: 16px;
    }

    .dialog-heading {
      font-family: 'Fira Sans', sans-serif;
      color: #354c77;
    }

    .dialog-subtitle {
      font-weight: 600;
      font-size: 16px;
      color: #00082a;
    }

    &::-webkit-scrollbar {
      -webkit-appearance: none;
    }

    &::-webkit-scrollbar:vertical {
      width: 11px;
    }

    &::-webkit-scrollbar:horizontal {
      height: 11px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      border: 2px solid #eff3f8;
      background-color: #bdc9e1;
    }

    &::-webkit-scrollbar-track {
      background-color: #eff3f8;
      border-radius: 8px;
    }

  }

  .close-modal {
    position: absolute;
    top: 20px;
    right: 20px;
    color: #a0adc7 !important;
    cursor: pointer;
  }
</style>
