<template lang="pug">
  .step-three
    h2.step-heading.mb-5 {{ $t('campaign.analyticsConfig') }}
    h5 {{ $t('campaign.addAnalyticsCode') }}
    v-text-field(
      v-model='campaign.analyticsCode'
      textarea
      :placeholder="$t('campaign.pasteYourCode')"
      :rows="2"
    )
</template>

<script>
export default {
  props: ['currentStep', 'campaign', 'hide-steps'],
  computed: {
    isContinueDisabled () {
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
h5 {
  font-family: 'Fira Sans', sans-serif;
  font-size: 16px;
}
</style>
