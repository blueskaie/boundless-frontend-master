<template lang="pug">
  div
    v-layout(row wrap)
      v-flex
        h3.small-heading.py-3
          | {{ $t(' organization.dataLimitation ') }}
          tooltip(
            :label="$t('organization.dataLimitationHelp')"
            style="top: 2px"
          )
      v-flex(pt-3)
        base-switch(
          :label-left="$t('general.disabled')",
          :label-right="$t('general.enabled')",
          color="deep-purple lighten-2",
          v-model="enableDataLimitation"
        )
    .form-card.round(:class="{ disabled: !enableDataLimitation }")
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
      enableDataLimitation: false,
      download: '1Mb',
      upload: '1Mb',
      sliderValues: [
        '1Mb',
        '2Mb',
        '5Mb',
        '10Mb',
        '50Mb',
        '100Mb',
        '250Mb',
        '500Mb',
        '1Gb',
        '2Gb',
        '5Gb',
        '10Gb'
      ]
    }
  },

  computed: {
    sliderOptions () {
      return {
        data: this.sliderValues,
        disabled: !this.enableDataLimitation
      }
    }
  }
}
</script>
