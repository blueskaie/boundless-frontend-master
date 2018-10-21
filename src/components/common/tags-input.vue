<template lang="pug">
  .tags-input(:class="{ 'focused' : focused }")
    .input-wrap
      input(v-model="newTag", :placeholder="$t('settings.enterYourTags')", v-on:keyup.enter="addTag", @focus="focused = true", @blur="focused = false")
      v-btn(round, large, outline, color="success", @click="addTag") {{ $t('general.add') }}
        v-icon(right) add_circle_outline
    v-layout.mt-4(row)
      v-flex(xs12)
        v-chip(v-for="(tag, index) in value", :key="index", close='', @input='remove(index)')
          strong {{ tag }}
</template>

<script>
export default {
  props: {
    value: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      newTag: '',
      focused: false
    }
  },
  methods: {
    addTag () {
      if (this.newTag) {
        this.$emit('input', [...this.value, this.newTag])
        this.newTag = ''
      }
    },
    remove (index) {
      let newArray = [...this.value]
      newArray.splice(index, 1)
      this.$emit('input', newArray)
    }
  }
}
</script>

<style lang="scss">
  .tags-input {
    .chip {
      background: #e3ecfc;
      color: #4b83f0;
      font-family: 'Fira Sans', sans-serif;
      font-size: 14px;
      padding: 5px 10px;

      i {
        font-size: 23px
      }
    }

    .input-wrap {
      display: flex;
      border: 1px solid #dce2ed;
      border-radius: 50px;
      justify-content: space-between;
      padding-left: 20px;
      align-items: center;
      position: relative;
      height: 44px;

      .btn {
        margin: 0;
        position: absolute;
        top: -1px;
        right: -1px;
      }

      input {
        outline: none;
        height: 40px;
        font-size: 15px;
        flex: 1;
        padding-right: 140px;
      }
    }

    &.focused .input-wrap {
      border-color: darken(#dce2ed, 10%);
    }
  }
</style>
