<template lang="pug">
  .page-content.settings-page.no-margin
    // v-layout(row)
    //   v-flex(xs12)
    //     v-alert.info-strip(:value='true', outline, color='grey', icon='business_center')
    //       | {{ $t('general.currentOrganization') }}
    .selection-list.mb-5
      .list-item(
        :class="{'active': isRouteActive('OrganizationSettingsGeneral')}"
        @click="openPage('OrganizationSettingsGeneral')"
      )
        p {{ $t(' organization.general ') }}
      .list-item(
        :class="{'active': isRouteActive('OrganizationSettingsSocialOauth')}"
        @click="openPage('OrganizationSettingsSocialOauth')"
      )
        p {{ $t('organization.socialAuthSplashPage') }}
      .list-item(
        :class="{'active': isRouteActive('OrganizationSettingsDataExport')}"
        @click="openPage('OrganizationSettingsDataExport')"
      )
        p {{ $t('organization.exportData') }}
      .list-item(
        :class="{'active': isRouteActive('OrganizationSettingsExternalIntegrations')}"
        @click="openPage('OrganizationSettingsExternalIntegrations')"
      )
        p {{ $t('general.externalIntegrations') }}
      .list-item(
        :class="{'active': isRouteActive('OrganizationSettingsGDPRPortability')}"
        @click="openPage('OrganizationSettingsGDPRPortability')"
      )
        p {{ $t('organization.dataPortability') }}
    router-view
</template>

<script>
export default {
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

<style lang="scss">
  @import "styles/colors.scss";
</style>
