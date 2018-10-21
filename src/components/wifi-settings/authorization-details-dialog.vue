<template lang="pug">
  base-dialog(:show="show", @close="$emit('close')")
    v-layout(row)
      v-flex(xs10)
        h2.dialog-heading {{ $t(' wifi.wifiAuthorisationDetails ') }}

    v-divider.my-2

    v-layout(row)
      v-flex(xs12, class="input-wrap")
        h3
          | {{ $t(' wifi.detailOfThePersonalWifiAccessTicket ') }}
          tooltip(class-name="label-help", :label="$t(' wifi.detailOfThePersonalWifiAccessTicketHelp ')")
        p
          | {{ $t(' wifi.personalInformation ') }}
    v-layout(row)
      v-flex.mx-1(xs6, sm3)
        v-text-field(:label="$t('general.firstName')")
        v-text-field(:label="$t('general.email')")
      v-flex.mx-1(xs6, sm3)
        v-text-field(:label="$t('general.lastName')")
        v-text-field(:label="$t('general.phoneNumber')")
      v-flex.mx-1(xs12, sm6)
        v-text-field(:label="$t('wifi.note')", textarea)

    v-layout(row)
      v-flex.py-5(xs12 sm3)
        h4 {{ $t(' wifi.wifiAccess ') }}
      v-flex.py-5(xs4 sm1)
        | {{ $t('general.yes') }}
      v-flex.py-5(xs4 sm1)
        v-switch(v-model="switch1", color="success")
      v-flex.py-5(xs4 sm1)
        | {{ $t('general.no') }}

    v-layout(row)
      v-flex.mx-1(xs12, sm4)
        v-select(:items='collection', v-model='collectionItem', :label="$t('wifi.duration')")
      v-flex.mx-1(xs6, sm2)
        v-text-field(:label="$t('wifi.startDate')")
      v-flex.mx-1(xs6, sm2)
        v-text-field(:label="$t('wifi.endDate')")

    v-divider.my-5

    v-layout(row)
      v-flex.mx-1(xs12, sm6)
        h4 {{ $t('wifi.createdBy') }}
        p {{ createdBy }}

      v-flex.mx-1(xs12, sm6)
        h4 {{ $t('general.status') }}
        p {{ status }}

    v-divider.my-5

    v-layout(row)
      v-flex.mx-1(xs12, sm6)
        v-btn {{ $t('wifi.printThisTicket') }}
        v-btn {{ $t('wifi.disableThisTicket') }}

    v-divider.my-5

    v-layout(row)
      v-flex.mx-1(xs12, sm6)
        h4 {{ $t('wifi.passwordOptions') }}
        p {{ $t('wifi.customPassword') }}
        v-text-field(:label="$t('wifi.setThePasswordManually')")
        v-btn {{ $t('wifi.changePassword') }}

    v-divider.my-5

    v-card-actions
      v-btn(color='grey', flat, @click.native="$emit('close')") {{ $t('general.close') }}
</template>

<script>
import baseDialog from '@/components/common/base-dialog'

export default {
  name: 'AuthorizationDetails',

  props: ['show'],

  components: {
    baseDialog
  },

  data () {
    return {
      switch1: false,
      authorizationDetailsModal: false,
      collectionItem: '',
      createdBy: 'Sydney Burk le 21/12/2018 - 14:37:07',
      status: 'Active',
      collection: ['a', 'b']
    }
  }
}
</script>
