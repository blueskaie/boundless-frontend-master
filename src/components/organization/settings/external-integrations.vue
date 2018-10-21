<template lang="pug">
  .external-integrations
    v-layout(row wrap)
      v-flex(pa-2 xs12 md6)
        email-config

      v-flex(pa-2 xs12 md6)
        sms-config

      v-flex(pa-2 xs12 md6)
        ale-config

</template>

<script>
import AleConfig from './ale-config'
import EmailConfig from './email-config'
import SmsConfig from './sms-config'

export default {
  components: {
    AleConfig,
    EmailConfig,
    SmsConfig
  }
}
</script>
<style lang="scss">
.provider-help {
  left: 110px;
  top: 0px;
}
.boundless-preset-help {
  left: 250px;
  top: -16px;
}
</style>
