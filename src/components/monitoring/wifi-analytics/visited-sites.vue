<template lang="pug">
  .visited-sites
    .form-card.x3
      v-layout(row)
        v-flex.mb-3(xs12)
          h4 {{ $t(' monitoring.visitedSites ') }}
      v-layout(row, align-end)
        .chart-container(xs6, md2)
          .chart-bar(
            :style="'height: ' + lineBaseUnit * 200 + 'px; background:' + lineColors[0] "
          )
          p.medium(
            :style="'color:' + lineColors[0] "
          ) 200
          .chart-title {{ truncate('Etam Europe') }}
        .chart-container(xs6, md2)
          .chart-bar(
            :style="'height: ' + lineBaseUnit * 190 + 'px; background:' + lineColors[1] "
          )
          p.medium(
            :style="'color:' + lineColors[1] "
          ) 180
          .chart-title {{ truncate('Etam France') }}
        .chart-container(xs6, md2)
          .chart-bar(
            :style="'height: ' + lineBaseUnit * 180 + 'px; background:' + lineColors[2] "
          )
          p.medium(
            :style="'color:' + lineColors[2] "
          ) 170
          .chart-title {{ truncate('Etam Rue de Rennes') }}
        .chart-container(xs6, md2)
          .chart-bar(
            :style="'height: ' + lineBaseUnit * 170 + 'px; background:' + lineColors[3] "
          )
          p.medium(
            :style="'color:' + lineColors[3] "
          ) 165
          .chart-title {{ truncate('Etam Champs Elysees') }}
        .chart-container(xs6, md2)
          .chart-bar(
            :style="'height: ' + lineBaseUnit * 165 + 'px; background:' + lineColors[4] "
          )
          p.medium(
            :style="'color:' + lineColors[4] "
          ) 160
          .chart-title {{ truncate('Etam Levallois') }}
</template>

<script>
import {rgbToHex, hexToRgb} from '@/utils/functions'
import * as $ from 'jquery'

export default {
  name: 'VisitedSites',
  created () {
    this.lineColors = [0, 1, 2, 3, 4].map(i => {
      const rgbInfo1 = hexToRgb('#4b83f0')
      const rgbInfo2 = hexToRgb('#65d866')
      const newRGBInfo = Object.assign({}, rgbInfo1)

      if (rgbInfo1 && rgbInfo2) {
        newRGBInfo.r = Math.min(rgbInfo1.r, rgbInfo2.r) + parseInt(Math.abs(rgbInfo1.r - rgbInfo2.r) / 5 * i)
        newRGBInfo.g = Math.min(rgbInfo1.g, rgbInfo2.g) + parseInt(Math.abs(rgbInfo1.g - rgbInfo2.g) / 5 * i)
        newRGBInfo.b = Math.min(rgbInfo1.b, rgbInfo2.b) + parseInt(Math.abs(rgbInfo1.b - rgbInfo2.b) / 5 * i)
      }

      return rgbToHex(newRGBInfo.r, newRGBInfo.g, newRGBInfo.b)
    })
  },
  methods: {
    truncate (str) {
      return str.length > 12 ? str.substring(0, 9) + '...' : str
    }
  },
  mounted () {
    const temp = parseInt($('.form-card').css('font-size').replace(/\D+$/g, ''))
    this.lineBaseUnit = temp / 17
  },
  data () {
    return {
      lineColors: [
        '#65d866',
        '#65d866',
        '#65d866',
        '#65d866',
        '#65d866'
      ],
      lineBaseUnit: 0.85
    }
  }
}
</script>

<style lang="scss">
@import "styles/colors.scss";

.visited-sites {
  width: 100%;

  .chart-container {
    text-align: center;
    align-items: end;
    width: 100%;
    max-width: 20%;

    .chart-bar {
      width: 5px;
      height: 200px;
      background: red;
      border-radius: 5px;
      margin: 10px auto;
    }

    .chart-title {
      height: 65px;
      display: block;
      line-height: 1.2em;
      max-width: 90% !important;
    }
  }
  .medium {
    color: $blue;
    font-size: 1.3em;
  }

}

</style>
