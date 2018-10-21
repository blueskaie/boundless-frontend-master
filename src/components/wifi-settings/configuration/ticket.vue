<template lang="pug">
  v-container(grid-list-md)
    // top paragraphs
    v-layout(row)
      v-flex(xs12, class="input-wrap")
        p {{ $t('etc.loremShort') }}

    // personalWifiOptions
    h3.small-heading.mb-3.mt-5 {{ $t('wifi.createANewPersonalWifiTicket') }}
      tooltip(class-name="label-help", :label="$t(' wifi.createANewPersonalWifiTicketHelp ')")

    v-layout(row)
      v-flex.mr-2(xs12 sm6)
        .form-card.round
          v-layout(row)
            v-flex(xs12, sm6)
              v-text-field(:label="$t(' general.firstName ')", v-model="firstName")
              v-text-field(:label="$t(' general.email ')", v-model="email")

            v-flex(xs12, sm6)
              v-text-field(:label="$t(' general.lastName ')", v-model="lastName")
              v-text-field(:label="$t(' general.phoneNumber ')", v-model="phone")

      v-flex.ml-2(xs12 sm6)
        .form-card.round
          v-layout(row)
            v-flex.pt-4(xs12, sm6)
              v-layout(row)
                v-flex.switch-label(xs12, sm12, md6)
                  | {{ $t('wifi.wifiAccess') }}
                base-switch(color="deep-purple lighten-2", :label-left="$t('wifi.predefined')", :label-right="$t('wifi.customized')" v-model="wifiAccessEnabled")
          v-layout.mt-4(row)
            v-flex(xs12, sm6, v-if="!wifiAccessEnabled")
              v-select(:items='customDurationOptions', v-model='customDuration', :label="$t('wifi.duration')", single-line)

            v-flex(xs12, v-else)
              v-layout(row)
                v-flex(xs6)
                  v-text-field(:label="$t(' wifi.startDate ')", v-model="wifiStartDate")
                v-flex(xs6)
                  v-text-field(:label="$t(' wifi.endDate ')", v-model="wifiEndDate")

    // shippingConfirmationOptions
    h3.small-heading.mb-3.mt-5 {{ $t('wifi.shippingConfirmationOptions') }}
      tooltip(class-name="label-help", :label="$t(' wifi.shippingConfirmationOptionsHelp ')")

    v-layout(row)
      v-flex.mr-2(xs12 sm6)
        .form-card.round
          v-layout(row)
            v-flex.pt-2.switch-label(xs5) {{ $t('wifi.confirmationByEmail') }}
            v-flex(xs7)
              v-switch(v-model="confirmationByEmail", color="deep-purple lighten-2")
          v-layout(row, v-if="confirmationByEmail")
            v-flex(xs12)
              v-text-field(:label="$t('wifi.customizeTheConfirmationMessage')", textarea, v-model="emailConfirmationMessage")

      v-flex.ml-2(xs12, sm6)
        .form-card.round
          v-layout(row)
            v-flex.pt-2.switch-label(xs5) {{ $t('wifi.confirmationBySMS') }}
            v-flex(xs7)
              v-switch(v-model="confirmationBySms", color="deep-purple lighten-2")
          v-layout(row, v-if="confirmationBySms")
            v-flex(xs12)
              v-text-field(:label="$t('wifi.customizeTheConfirmationMessage')", textarea, v-model="smsConfirmationMessage")

    // passwordOptions
    h3.small-heading.mb-3.mt-5 {{ $t('wifi.passwordOptions') }}
      tooltip(class-name="label-help", :label="$t(' wifi.passwordOptionsHelp ')")

    v-layout(row)
      v-flex.mr-2(xs12 sm6)
        .form-card.round
          base-switch(color="deep-purple lighten-2", :label-left="$t('wifi.predefined')", :label-right="$t('wifi.customized')" v-model="passwordOptionsEnabled")
          v-text-field.mt-2(:label="$t(' wifi.setThePasswordManually ')", v-if="passwordOptionsEnabled", v-model="customPassword")
      v-flex.ml-2(xs12, sm6)

    v-layout(row)
      v-flex.text-xs-right(xs12)
        v-btn(color="success", outline, large, round)
          v-icon.pr-3 print
          | {{ $t('wifi.printThisTicket') }}
        v-btn(color="success", large, round)
          | {{ $t('wifi.createTicket') }}

</template>

<script>
export default {
  name: 'WifiConfigurationTicket',

  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      wifiAccessEnabled: false,
      wifiDuration: '',
      wifiStartDate: '',
      wifiEndDate: '',
      customDuration: '',
      customDurationOptions: [
        { text: '30 min' },
        { text: '1 hr' },
        { text: '12 hr' },
        { text: '24 hr' },
        { text: '7 d' },
        { text: '30 d' }
      ],
      confirmationByEmail: false,
      emailConfirmationMessage: '',
      confirmationBySms: false,
      smsConfirmationMessage: '',
      passwordOptionsEnabled: false,
      customPassword: ''
    }
  },

  methods: {}
}
</script>
<style lang="scss">
  .new-person-help {
    left: 200px;
    top: -16px;
  }
  .shipping-confirmation-help{
    left: 190px;
    top: -16px;
  }
  .password-options-help {
    left: 110px;
    top: -16px;
  }
  .switch-label {
    color: #9ba9c4;
  }
  .label-help {
    top: -5px !important;
  }
</style>
