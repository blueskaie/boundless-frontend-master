<template lang="pug">
  div
    .title
      v-layout(row)
        v-flex.py-3(xs12)
          h3.small-heading {{ title }}

    v-layout(row wrap)
      v-card.pt-4
        v-card-text.pt-2.pb-4.px-4
          slot
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
