<template lang="pug">
  v-card.pa-4
    v-layout(row)
      v-flex(xs12)
        h3.pb-3 {{ $t('inventory.addTag') }}
    v-layout(row)
      v-flex(xs9)
        v-text-field(v-model='tagToAdd', :label="$t(' inventory.addATag ')")
      v-flex(xs3)
        v-btn(dark, color='indigo', @click='addTag') {{ $t('general.add') }}
    v-layout(row)
      v-flex(xs12)
        h3.pb-3 {{ $t('inventory.deleteTag') }}
    v-layout(row)
      v-flex(xs9)
        v-text-field(v-model='tagToRemove', :label="$t(' inventory.deleteATag ')")
      v-flex(xs3)
        v-btn(dark, color='red', @click='deleteTag') {{ $t('general.remove') }}
</template>

<script>
export default {
  name: 'TagsManagement',

  data () {
    return {
      tagToAdd: '',
      tagToRemove: ''
    }
  },

  methods: {
    addTag () {
      console.log('addTag function')
      this.$store.commit('UPDATE_TAGS_MENU', false)
    },
    deleteTag () {
      console.log('deleteTag function')
      this.$store.commit('UPDATE_TAGS_MENU', false)
    }
  }
}
</script>
