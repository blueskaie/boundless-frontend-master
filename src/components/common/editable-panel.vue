<template lang="pug">
  div
    .title(v-if="title")
      v-layout(row)
        v-flex.py-3(xs12)
          h3.small-heading {{ title }}
    .editable-panel
      v-layout(row wrap)
        v-card.editable-card(:class="cardClass")
          div(
            @mouseleave="isHovering = false"
            @mouseover="isHovering = true"
          )
            v-toolbar.px-2.py-0(
              color="transparent"
              flat
            )
              v-spacer
              v-fade-transition
                v-btn(
                  @click="edit"
                  icon
                  small
                  v-show="showEditIcon"
                )
                  v-icon edit
            v-card-text.px-4.pt-0.pb-4
              slot(:readonly="!isEditing")
          v-fade-transition
            v-card-actions.px-4.pb-5.pt-0(
              color="white"
              v-show="isEditing || isLoading"
            )
              slot(name="actions")
                v-spacer
                v-btn(
                  @click="cancel"
                  color="success"
                  outline
                  round
                ) Cancel
                v-btn(
                  :disabled="disableSubmit"
                  :loading="isLoading"
                  @click="submit"
                  color="success"
                  round
                ) {{ submitText }}

</template>

<script>
export default {
  name: 'EditablePanel',
  props: {
    disableSubmit: {
      type: Boolean,
      default: false
    },
    isEditing: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isReadonly: {
      type: Boolean,
      default: false
    },
    submitText: {
      type: String,
      default: 'Save'
    },
    title: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      isHovering: false
    }
  },

  computed: {
    showEditIcon () {
      if (this.isReadonly) {
        return false
      }
      return !this.isEditing && this.isHovering
    },
    cardClass () {
      return {
        readonly: !this.isEditing,
        'elevation-10': this.isEditing,
        'showing-edit-icon': this.showEditIcon
      }
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    edit () {
      this.$emit('edit')
    },
    submit () {
      this.$emit('submit')
    }
  }
}
</script>

<style lang="scss" scoped>
  .editable-panel {
    padding-bottom: -20px;
  }

  .editable-card {

    div /deep/ {
      .toolbar__content {
        height: 40px !important;
      }
    }

    &.showing-edit-icon {
      background-color: #fafafa !important;
    }

    &.readonly /deep/ {
      .input-group--select .input-group__input {
        cursor: auto;
      }

      .input-group__details:before,
      .input-group__details:after,

      .input-group__input i,
      .dropdown-arrow {
        display: none;
      }

      .tel-input {
        .selection {
          cursor: default;
          .flag {
            margin-right: 0;
          }
        }

        .input-wrapper {
          &::before {
            background-color: transparent !important;
            border: none !important;
          }
          &::after {
            display: none;
          }

          // Hide flag icon if readonly state has no value
          &.no-value {
            .selection {
              display: none;
            }
          }

          label {
            transform: translateY(-18px) scale(.75);
            left: 0;
          }

          input {
            padding-left: 0;
          }
        }
      }
    }

    .with-label /deep/ {
      .subheader {
        font-size: 16px;
        font-weight: bolder;
        height: 30px;;
        padding: 0;
      }

      .input-group--single-line,
      .tel-input {
        padding-top: 0;
      }
    }
  }

</style>
