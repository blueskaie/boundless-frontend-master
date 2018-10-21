<template lang="pug">
  .type-of-product
    .form-card.x2
      v-layout(row)
        v-flex.chart-root-container(xs12 md6)
          v-layout.row-container(column)
            .hidden-div
            v-flex.mb-4(x12)
              h4 {{  type === 'os' ? $t(' monitoring.typeOfOS ') :  $t(' monitoring.typeOfDevice ') }}
            .type-row
              .label-container
                v-icon {{ icons[0] }}
                span.small-label.pl-3 {{ labels[0] }}
              .color-badge(
                :style="'background-color: ' + colors[0]"
              )
            .type-row
              .label-container
                v-icon {{ icons[1] }}
                span.small-label.pl-3 {{ labels[1] }}
              .color-badge(
                :style="'background-color: ' + colors[1]"
              )
            .type-row
              .label-container
                v-icon {{ icons[2] }}
                span.small-label.pl-3 {{ labels[2] }}
              .color-badge(
                :style="'background-color: ' + colors[2]"
              )
            .type-row
              .label-container
                v-icon {{ icons[3] }}
                span.small-label.pl-3 {{ labels[3] }}
              .color-badge(
                :style="'background-color: ' + colors[3]"
              )
        v-flex.chart-root-container(xs12 md6)
          .chart-container
            pie-chart(
              :data="chartData"
            )
          .hidden-div
          .chart-bg(
            :style="'background-image: url(' + bgImg + ');'"
          )
</template>

<script>
import PieChart from '@/components/common/pie-chart.js'

export default {
  name: 'TypeOfDevice',
  props: ['type', 'data', 'bgImg'],
  components: {
    PieChart
  },
  methods: {

  },
  mounted () {

  },
  computed: {
    chartData () {
      return {
        datasets: [{
          data: Object.values(this.data).map(v => v.value),
          backgroundColor: this.colors
        }],
        labels: Object.values(this.data).map(v => `${v.value}%`)
      }
    },
    labels () {
      return Object.keys(this.data)
    },
    icons () {
      return Object.values(this.data).map(v => v.icon)
    }
  },
  data () {
    return {
      colors: ['#4b83f0', '#62d862', '#aa85d9', '#354c77']
    }
  }
}
</script>

<style lang="scss">
@import "styles/colors.scss";

.type-of-product {
  width: 100%;

  .chart-bg {
    position: absolute;
    background-size: cover;
    height: 5.334em;
    width: 5.334em;
    right: 3.9em;
    border-radius: 50%;
  }
  .chart-root-container {
    position: relative;
    padding: 0;
  }
  .chart-container {
    position: absolute;
    max-width: 16.67em;;
    max-height: 16.67em;;
    right: 0;
    margin: -0.57em -1.77em 0 0;
  }
  .form-card {
    padding-top: 0;
    padding-bottom: 0;
  }
  .color-badge {
    width: 30px;
    height: 5px;
    border-radius: 5px;
    background: red;
    margin-top: -5px;
  }
  .icon {
    width: 50%;
    font-size: 1.334em;
  }
  .hidden-div {
    position: absolute;
    top: 0;
    width: 110%;
    height: 3.3em;
    background: white;
    z-index: 1;
  }
  .type-row {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    max-width: 16.67em;;
    margin-bottom: 0.8em;
  }
  .row-container {
    padding: 3.334em 0 3.334em 0;
  }
  .label-container {
    display: flex;
    width: 8em;
  }
  .small-label {
    color: $deemed-gray;
  }

  @media (min-width: 1440px) {
    .chart-bg {
      top: 7.1em;
    }
  }

  @media (max-width: 1440px) {
    .chart-bg {
      top: 7.3em;
    }
  }

  @media (max-width: 1320px) {
    .chart-bg {
      top: 7.4em;
    }
  }
}

</style>
