<template lang="pug">
  .collection-satistics
    .form-card.x3
      v-layout(column, wrap)
        v-flex.mb-3(xs12)
          h4 {{ $t('monitoring.connectionSatistics') }}
        v-flex.mb-4(xs12, text-xs-center)
          span.large 150
          p.medium {{ $t('monitoring.totalConnections') }}
      v-layout.mb-4(row)
        .collection-row.mr-1(xs12, md6)
          v-icon.default fa-file
          span.pl-3 {{$t('general.form')}} :
          span.small.px-1 25
        .collection-row.ml-1(xs12, md6)
          v-icon.facebook fab fa-facebook
          span.pl-3 Facebook :
          span.small.px-1 25
      v-layout.mb-4(row)
        .collection-row.mr-1(xs12, md6)
          v-icon.instagram fab fa-instagram
          span.pl-3 Instagram :
          span.small.px-1 25
        .collection-row.ml-1(xs12, md6)
          v-icon.linkedin fab fa-linkedin
          span.pl-3 Linkedin :
          span.small.px-1 25
      v-layout.mb-4(row)
        .collection-row.mr-1(xs12, md6)
          v-icon.google-plus fab fa-google
          span.pl-3 Google :
          span.small.px-1 25
        .collection-row.ml-1(xs12, md6)
          v-icon.twitter fab fa-twitter
          span.pl-3 Twitter :
          span.small.px-1 25
</template>

<script>
export default {
  name: 'CollectionSatistics'
}
</script>

<style lang="scss">
@import "styles/colors.scss";

.collection-satistics {
  width: 100%;
  position: relative;

  .large {
    color: $blue;
    font-size: 4em;
  }
  .medium {
    color: $blue;
    font-size: 1.3em;
    margin-bottom: 1em;
  }
  .small {
    color: $blue;
    font-weight: bold;
    right: 10px;
    position: absolute;
  }
  .collection-row {
    display: flex;
    width: 100%;
    position: relative;
  }
}
</style>
