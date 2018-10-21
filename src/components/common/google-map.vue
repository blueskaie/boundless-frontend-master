<template>
  <iframe width="100%" height="400" frameborder="0" :src="'https://www.google.com/maps/embed?pb=' + pbcode"/>
</template>

<script>
export default {
  name: 'google-map',
  props: {
    pbcode: {
      type: String,
      required: true
    }
  }
}
</script>
