<template lang="pug">
  vue-slider(v-bind="sliderOptions", :value="value", @callback="callback")
    template(slot="label" slot-scope="{ label, active }")
      span(:class="['vue-slider-piecewise-label', { active }]") {{ formatLabel(label) }}
</template>

<script>
import VueSlider from 'vue-slider-component'

export default {
  props: {
    index: {
      type: [Number, String],
      required: false
    },
    value: {
      type: [Array, Number, String],
      required: true
    },
    labelFormatter: {
      type: Function,
      required: false
    },
    options: {
      type: Object,
      default: () => {}
    }
  },

  components: {
    VueSlider
  },

  data () {
    return {
      defaultOptions: {
        width: '100%',
        height: 4,
        dotSize: 14,
        tooltip: false,
        piecewise: true,
        piecewiseLabel: true,
        piecewiseStyle: {
          'backgroundColor': '#ccc',
          'visibility': 'visible',
          'width': '12px',
          'height': '12px'
        },
        piecewiseActiveStyle: {
          'backgroundColor': '#9575cd'
        },
        labelActiveStyle: {
          'color': '#9575cd'
        }
      }
    }
  },
  computed: {
    sliderOptions () {
      return Object.assign({}, this.defaultOptions, this.options)
    }
  },
  methods: {
    formatLabel (value) {
      if (!this.labelFormatter) {
        return value
      } else {
        return this.labelFormatter(value)
      }
    },
    callback (val) {
      this.$emit('callback', {
        index: this.index,
        value: val
      })
    }
  }
}
</script>

<style lang="scss">
.vue-slider-component .vue-slider-process {
  background-color: #9575cd;
}

.vue-slider-component .vue-slider-piecewise-dot {
  position: absolute;
  left: 50%;
  top: 10px !important;
  width: 100%;
  height: 100%;
  display: inline-block;
  background-color: rgba(0,0,0,.16);
  border-radius: 50%;
  transform: translate(-50%,-50%);
  z-index: 2;
  transition: all .3s;
  background-color: rgb(149, 117, 205);
  visibility: visible;
  width: 1px !important;
  height: 16px !important;
}

.vue-slider-component.vue-slider-horizontal-reverse .vue-slider-piecewise-label,
.vue-slider-component.vue-slider-horizontal .vue-slider-piecewise-label {
  position: absolute;
  display: inline-block;
  top: 12px;
  left: 50%;
  white-space: nowrap;
  font-size: 14px;
  color: #9ba9c4;
  transform: translate(-50%,8px);
  visibility: visible;
}

</style>
