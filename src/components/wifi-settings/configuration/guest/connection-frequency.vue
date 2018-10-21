<template lang="pug">
  div
    v-layout(row wrap)
      v-flex
        h3.small-heading.py-3
          | {{ $t(' organization.limitConnectionFrequency ') }}
          tooltip(
            :label="$t('organization.dataLimitationHelp')"
            style="top: 2px"
          )
      v-flex(pt-3)
        base-switch(
          :label-left="$t('general.disabled')",
          :label-right="$t('general.enabled')",
          color="deep-purple lighten-2",
          v-model="enableConnectionFrequency"
        )
    .form-card.round(:class="{ disabled: !enableConnectionFrequency }")
      v-layout(row wrap)
        v-flex.pr-3(xs7)
          v-text-field(name='input-1', :label="$t(' organization.connectionName ')")
        v-flex.pl-3(xs5)
          v-select(:items='connectionFrequency', v-model='connectionFrequencyModel', :label="$t(' organization.frequency ')")
</template>
<script>
export default {
  data () {
    return {
      enableConnectionFrequency: false,
      connectionFrequencyModel: '',
      connectionFrequency: [
        { text: 'per hour' },
        { text: 'per day' },
        { text: 'per week' },
        { text: 'per month' }
      ]
    }
  }
}
</script>
