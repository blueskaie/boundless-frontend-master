<template lang="pug">
  v-layout(row wrap)
    v-flex(pa-2 pb-4 xs12)
      wifi-programming

    v-flex(pa-2 pb-4 xs12 md6)
      connection-time

    v-flex(pa-2 pb-4 xs12 md6)
      connection-frequency

    v-flex(pa-2 pb-4 xs12 xl6)
      data-limitation

    v-flex(pa-2 pb-4 xs12 xl6)
      bandwidth-limitation

</template>

<script>
import BandwidthLimitation from './guest/bandwidth-limitation'
import ConnectionFrequency from './guest/connection-frequency'
import ConnectionTime from './guest/connection-time'
import DataLimitation from './guest/data-limitation'
import WifiProgramming from './guest/wifi-programming'

export default {
  components: {
    BandwidthLimitation,
    ConnectionFrequency,
    ConnectionTime,
    DataLimitation,
    WifiProgramming
  }
}
</script>
