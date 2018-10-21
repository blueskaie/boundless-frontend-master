<template lang="pug">
  div
    v-layout(row wrap)
      v-flex(md5 lg3)
        v-layout(row wrap)
          v-flex
            h3.small-heading.py-3
              |  {{ $t('organization.wifiProgramming') }}
              tooltip(
                :label="$t('organization.wifiProgramming')"
                style="top: 2px"
              )
          v-flex.py-3
            base-switch(
              color="deep-purple lighten-2",
              v-model="enableWifiProgramming"
            )
    v-layout(row wrap)
      v-flex(xs12)
        v-data-table(
          :headers='headers'
          :items='rows'
          :total-items="7"
          v-if="enableWifiProgramming"
        )
          template(slot='items', slot-scope='props')
            td {{ props.item.day }}
            td
              div.circle-status(
                :class="{'active' : props.item.status == 'general.active'}"
                @click="updateStatus(props.item)"
              )
                v-icon fas fa-circle
                span {{ $t(props.item.status) }}
            td
              v-select(
                :items='timeList'
                @input="changeTime(props.item)"
                single-line
                v-model='props.item.minimum'
              )
            td
              v-select(
                :items='timeList'
                @input="changeTime(props.item)"
                single-line
                v-model='props.item.maximum'
              )
            td
              slider-wrapper(
                :index="props.item.day"
                :value="[props.item.minimum, props.item.maximum]"
                :label-formatter="labelFormatter"
                :options="{ min: 0, max: 24, interval: 2 }"
                @callback="callback"
              )
</template>
<script>
import timeArray from '@/utils/time-array'

import SliderWrapper from '@/components/common/slider-wrapper'

export default {
  components: {
    SliderWrapper
  },
  data () {
    return {
      enableWifiProgramming: false,
      headers: [
        { text: this.$t('general.day'), value: 'day', sortable: false, width: 100 },
        { text: this.$t('general.status'), value: 'status', sortable: false, width: 100 },
        { text: this.$t('general.from'), value: 'minimum', sortable: false, width: 100 },
        { text: this.$t('general.to'), value: 'maximum', sortable: false, width: 100 },
        { text: '', value: 'edit', sortable: false }
      ],
      rows: [
        { day: this.$t('general.days.monday'), status: 'general.active', minimum: 0, maximum: 24, edit: '' },
        { day: this.$t('general.days.tuesday'), status: 'general.active', minimum: 0, maximum: 24, edit: '' },
        { day: this.$t('general.days.wednesday'), status: 'general.active', minimum: 0, maximum: 24, edit: '' },
        { day: this.$t('general.days.thursday'), status: 'general.active', minimum: 0, maximum: 24, edit: '' },
        { day: this.$t('general.days.friday'), status: 'general.active', minimum: 0, maximum: 24, edit: '' },
        { day: this.$t('general.days.saturday'), status: 'general.active', minimum: 0, maximum: 24, edit: '' },
        { day: this.$t('general.days.sunday'), status: 'general.active', minimum: 0, maximum: 24, edit: '' }
      ],
      timeList: timeArray
    }
  },

  methods: {
    labelFormatter (value) {
      if (value % 4 === 0) {
        return (value < 10 ? '0' : '') + value + ':00'
      }
      return ''
    },
    changeTime (item) {
      if (item.minimum === 24) {
        item.maximum = 24
        item.minimum = 22
      } else if (item.minimum > item.maximum) {
        item.maximum = item.minimum + 1
      }
    },
    updateStatus (item) {
      if (item.status === 'general.active') {
        item.status = 'general.disabled'
      } else {
        item.status = 'general.active'
      }
    },
    callback (val) {
      let row = this.rows.find((r) => r.day === val.index)

      if (row) {
        row.minimum = val.value[0]
        row.maximum = val.value[1]
      }
    },
    isMinimumNumber (min, max, evt) {
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
        return
      }

      let final = parseInt(min + evt.key)
      if (final > 24 || final < 0 || final >= max) {
        evt.preventDefault()
      }
    },
    isMaximumNumber (min, max, evt) {
      let final = parseInt(max + evt.key)
      console.log(final)
      if (final > 24 || final < 0 || final <= min) {
        evt.preventDefault()
      }
    }
  }
}
</script>

<style lang="scss">
@import "styles/colors.scss";

.table .circle-status {
  display: flex;
  align-items: center;
  cursor: pointer;
  min-width: 70px;

  .icon {
    font-size: 10px;
    color: $red !important;
    margin-right: 5px;
  }

  &:hover .icon{
    color: $red !important;
  }

  &.active .icon {
    color: $green !important;

    &:hover {
      color: $green !important;
    }
  }
}
</style>
