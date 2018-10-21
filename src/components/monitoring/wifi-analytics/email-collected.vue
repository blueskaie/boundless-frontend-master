<template lang="pug">
  .email-collected
    .form-card.x3
      v-layout(row)
        v-flex.mb-5(xs12)
          h4 {{ $t(' monitoring.emailsCollected ') }}
      v-layout.envelop-bg(row, justify-center)
        .main
          span.large 50
          p.medium {{ $t(' monitoring.emailsCollected ') }}
</template>

<script>
export default {
  name: 'EmailCollected'
}
</script>

<style lang="scss">
@import "styles/colors.scss";

.email-collected {
  width: 100%;

  .envelop-bg {
    flex: 1;
    background: #fff url('/static/images/email-collected.png') no-repeat center center;
    background-size: contain;
    height: 16.67em;
  }
  .main {
    text-align: center;
    margin-top: 25px;
  }
  .large {
    color: $purple;
    font-size: 5em;
  }
  .medium {
    color: $purple;
    font-size: 1.3em;
  }
}

</style>
