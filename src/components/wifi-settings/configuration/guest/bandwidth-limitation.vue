<template lang="pug">
  div
    v-layout(row wrap)
      v-flex
        h3.small-heading.py-3
          | {{ $t(' organization.bandwidthLimitation ') }}
          tooltip(
            :label="$t('organization.bandwidthLimitationHelp')"
            style="top: 2px"
          )
      v-flex(pt-3)
        base-switch(
          :label-left="$t('general.disabled')",
          :label-right="$t('general.enabled')",
          color="deep-purple lighten-2",
          v-model="enableBandwidthLimitation"
        )
    .form-card.round(:class="{ disabled: !enableBandwidthLimitation }")
      v-layout(row wrap)
        v-flex(xs12)
          label {{ $t('general.download') }}
        v-flex(xs12)
          slider-wrapper(
            :value="download"
            :options="sliderOptions"
          )
      v-layout(row wrap mt-5)
        v-flex(xs12)
          label {{ $t('general.upload') }}
        v-flex(xs12)
          slider-wrapper(
            :value="upload"
            :options="sliderOptions"
          )

</template>
<script>
import SliderWrapper from '@/components/common/slider-wrapper'

export default {
  components: {
    SliderWrapper
  },

  data () {
    return {
      enableBandwidthLimitation: false,
      download: '100Kb/s',
      upload: '100Kb/s',
      sliderValues: [
        '100Kb/s',
        '250Kb/s',
        '500Kb/s',
        '750Kb/s',
        '1Mb/s',
        '2Mb/s',
        '5Mb/s',
        '10Mb/s'
      ]
    }
  },

  computed: {
    sliderOptions () {
      return {
        data: this.sliderValues,
        disabled: !this.enableBandwidthLimitation
      }
    }
  }
}
</script>
