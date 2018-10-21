<template lang="pug">
  v-container
    group-site-selector
    v-layout.mt-5(row)
      v-flex(xs3)
        h3.small-heading {{ $t('wifi.openWifi') }}
        .selection-list.mb-5
          .list-item(:class="{'active': isRouteActive('WifiConfigurationGuest')}", @click="openPage('WifiConfigurationGuest')")
            p {{ $t('wifi.guestWifi') }}
      v-flex(xs9)
        h3.small-heading {{ $t('wifi.securedWifi') }}
        .selection-list.mb-5
          .list-item(:class="{'active': isRouteActive('WifiConfigurationTicket')}",  @click="openPage('WifiConfigurationTicket')")
            p {{ $t('wifi.accessTicket') }}
          .list-item(:class="{'active': isRouteActive('WifiConfigurationMultipleAccess')}",  @click="openPage('WifiConfigurationMultipleAccess')")
            p {{ $t('wifi.multipleAccess') }}
          .list-item(:class="{'active': isRouteActive('WifiConfigurationSponsors')}",  @click="openPage('WifiConfigurationSponsors')")
            p {{ $t('wifi.sponsors') }}

    router-view
</template>

<script>
import groupSiteSelector from '@/components/common/group-site-selector'

export default {
  name: 'WifiConfiguration',
  components: {
    groupSiteSelector
  },
  methods: {
    isRouteActive (input) {
      return this.$route.name === input
    },
    openPage (route) {
      this.$router.push({ name: route })
    }
  }
}
</script>

<style lang="sass" scoped>
  .square-link-wrapper
    padding: 0
    margin: 0
    list-style: none

    display: -webkit-box
    display: -moz-box
    display: -ms-flexbox
    display: -webkit-flex
    display: flex

    -webkit-flex-flow: row wrap
    justify-content: flex-start

    > *
      width: 150px

      display: -webkit-box
      display: -moz-box
      display: -ms-flexbox
      display: -webkit-flex
      display: flex

      padding: 5px
      margin: 0 10px 0 0
      font-weight: bold
      font-size: 16px

      &:first-child
        margin: 0 100px 0 0

  .square-link
    height: 150px
    color: #888
    background: #eee
    border: 1px solid #ddd
    border-radius: 5px

    align-items: center
    text-align: center
    justify-content: center
</style>
