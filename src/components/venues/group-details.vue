<template lang="pug">
  .page-content
    v-layout(row)
      // google map section
      v-flex(xs12)
        google-map(:pbcode="mapCode")

    v-layout.mt-5(row)
      // Establishment Information column
      v-flex.mr-2(xs12 sm6)
        v-layout(row)
          v-flex(xs12)
            h3.small-heading.mb-3 {{ $t('settings.establishmentInformation') }}
        v-layout(row)
          editable-panel(
            :is-editing="isEditingEstablishmentForm"
            :is-loading="isLoadingEstablishmentForm"
            :submitText="$t('general.save')"
            @cancel="cancelEstablishmentForm"
            @edit="editEstablishmentForm"
            @submit="submitEstablishmentForm"
            class="flex xs12"
          )
            v-form(
              @submit.prevent="submitEstablishmentForm"
              slot-scope="{readonly}"
            )
              v-container(grid-list-lg)
                v-layout(row)
                  v-flex(xs12 sm6, class="input-wrap")
                    v-text-field(
                      v-model="facilityName"
                      v-help-tooltip="{ message: $t('settings.facilityNameHelp') }"
                      :label="$t(' settings.facilityName ')"
                    )
                    v-select(
                      :items='timeZones',
                      v-model='timeZone',
                      :label="$t(' settings.selectTimeZone ')",
                      v-help-tooltip="{ message: $t('settings.selectTimeZoneHelp') }"
                    )
                    v-text-field(v-model='zone', :label="$t(' settings.zone ')")
                    v-select(:items='cities', v-model='city', :label="$t(' general.city ')")
                    v-text-field(v-model='zipCode', :label="$t(' general.zipCode ')")
                    v-select(:items='countries', item-text="name" v-model='country', :label="$t(' general.city ')", autocomplete)

                  v-flex(xs12 sm6, class="input-wrap")
                    v-select(
                      :items='groups',
                      v-model='group',
                      :label="$t(' settings.selectGroup ')"
                      v-help-tooltip="{ message: $t('settings.selectGroupHelp') }"
                    )
                    v-select(
                      :items='zones',
                      v-model='zone',
                      :label="$t(' settings.selectZone ')"
                      v-help-tooltip="{ message: $t('settings.selectZoneHelp') }"
                    )
                    v-container.pa-0
                      v-layout
                          v-flex(xs6)
                            v-text-field(v-model='m2Number', :label="$t(' settings.m2Number ')")
                          v-flex(xs6)
                            v-text-field(v-model='floorNumber', :label="$t(' settings.floorNumber ')")
                    v-text-field(v-model='phoneNumber', :label="$t(' general.phoneNumber ')")
                    v-text-field(v-model='emailAddress', :label="$t(' general.emailAddress ')")
                    v-text-field(
                      v-model='VATNumber',
                      :label="$t(' settings.VATNumber ')"
                      v-help-tooltip="{ message: $t('settings.VATNumberHelp') }"
                    )

      // tags column
      v-flex.ml-2(xs12 sm6)
        v-layout(row)
          v-flex(xs12)
            h3.small-heading.mb-3 {{ $t('general.tags') }}
        v-layout(row)
          v-flex(xs12)
            .form-card.round
              v-layout(row)
                v-flex(xs12)
                  p.py-4 {{ $t('etc.loremShort') }}
                  tags-input(v-model="tags")

    v-layout(row).mt-5
      // materialDetails column
      v-flex(xs12)
        h3.small-heading.mb-3 {{ $t('settings.materialDetails') }}
        v-layout(row)
          v-flex(xs12)
            base-table(
              :items="materialList",
              :table-headers="materialTableHeaders",
              icon="fas fa-wifi",
              :use-default-pagination="true"
            )

    v-layout(row).mt-5
      // status column
      v-flex(xs12)
        h3.small-heading.mb-3 {{ $t('general.status') }}
          tooltip(class-name="status-help", :label="$t(' general.statusHelp ')")
        .status-wrapper
          .status-block
            .status-text {{ $t(' settings.receptionProbData ') }}
            .status-button.success
              v-icon sentiment_dissatisfied
          .status-block
            .status-text {{ $t(' settings.peerSyslogData ') }}
            .status-button.warning
              v-icon sentiment_satisfied
          .status-block
            .status-text {{ $t(' settings.wallenGarden ') }}
            .status-button.error
              v-icon sentiment_very_satisfied

    v-layout(row).mt-5
      // detailsOfUsersOfThisSite row
      v-flex(xs12)
          h3.small-heading.mb-3 {{ $t('settings.detailsOfUsersOfThisGroup') }}
          base-table(
            :items="userList",
            :table-headers="userTableHeaders",
            icon="fas fa-user",
            :use-default-pagination="true"
          )
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import googleMap from '@/components/common/google-map.vue'
import EditablePanel from '@/components/common/editable-panel'
import tagsInput from '@/components/common/tags-input'
import baseTable from '@/components/common/base-table'

export default {
  name: 'ConfigurationGroupDetails',

  components: {
    googleMap,
    EditablePanel,
    tagsInput,
    baseTable
  },

  mounted () {
    if (this.countries.length < 1) {
      this.fetchCountries()
    }
  },

  data () {
    return {
      isEditingEstablishmentForm: false,
      isLoadingEstablishmentForm: false,
      mapCode: '!1m18!1m12!1m3!1d2717.583877175037!2d21.917799951585!3d47.06801263291736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDA0JzA0LjgiTiAyMcKwNTUnMTIuMCJF!5e0!3m2!1sen!2sro!4v1526626085921',
      group: '',
      groups: ['Etam Global', '> Etam France', '> Etam Romania', '>> Etam Oradea'],
      facilityName: '',
      zone: '',
      zones: ['a', 'b'],
      timeZone: '',
      timeZones: [
        { text: 'GMT' },
        { text: 'GMT + 2' },
        { text: 'EST' },
        { text: 'PST' }
      ],
      city: '',
      cities: [
        { text: 'Paris' },
        { text: 'Oradea' }
      ],
      zipCode: '',
      country: '',
      m2Number: '',
      floorNumber: '',
      phoneNumber: '',
      emailAddress: '',
      VATNumber: '',
      tags: ['Programming', 'Watching'],
      materialTableHeaders: [
        { sortable: false, value: 'icon', selected: true },
        { text: 'Status', sortable: false, align: 'left', value: 'status', width: 50, selected: true },
        { text: 'Name', sortable: false, align: 'left', value: 'name', selected: true },
        { text: 'Mac Address', sortable: false, align: 'left', value: 'macAddress', selected: true },
        { text: 'Site/Group', sortable: false, align: 'left', value: 'siteGroup', selected: true },
        { text: 'Tags', sortable: false, align: 'left', value: 'tags', selected: true },
        { text: 'Vendor', sortable: false, align: 'left', value: 'vendor', selected: true },
        { text: 'actions', sortable: false, align: 'left', value: 'actions', selected: true }
      ],
      materialList: [
        { icon: 'public', checkbox: true, status: false, name: 'AP Magasin', macAddress: '00:00:11:22:33:44', siteGroup: 'Etam France', tags: 'Europe', vendor: 'Aruba', actions: '' },
        { icon: 'email', checkbox: false, status: true, name: 'AP Magasin', macAddress: '00:00:11:22:33:44', siteGroup: 'Etam France', tags: 'Europe', vendor: 'Aruba', actions: '' },
        { icon: 'home', checkbox: false, status: false, name: 'AP Magasin', macAddress: '00:00:11:22:33:44', siteGroup: 'Etam France', tags: 'Europe', vendor: 'Aruba', actions: '' },
        { icon: 'public', checkbox: true, status: false, name: 'AP Magasin', macAddress: '00:00:11:22:33:44', siteGroup: 'Etam France', tags: 'Europe', vendor: 'Aruba', actions: '' },
        { icon: 'email', checkbox: false, status: true, name: 'AP Magasin', macAddress: '00:00:11:22:33:44', siteGroup: 'Etam France', tags: 'Europe', vendor: 'Aruba', actions: '' },
        { icon: 'home', checkbox: false, status: false, name: 'AP Magasin', macAddress: '00:00:11:22:33:44', siteGroup: 'Etam France', tags: 'Europe', vendor: 'Aruba', actions: '' },
        { icon: 'public', checkbox: true, status: false, name: 'AP Magasin', macAddress: '00:00:11:22:33:44', siteGroup: 'Etam France', tags: 'Europe', vendor: 'Aruba', actions: '' },
        { icon: 'email', checkbox: false, status: true, name: 'AP Magasin', macAddress: '00:00:11:22:33:44', siteGroup: 'Etam France', tags: 'Europe', vendor: 'Aruba', actions: '' },
        { icon: 'home', checkbox: false, status: false, name: 'AP Magasin', macAddress: '00:00:11:22:33:44', siteGroup: 'Etam France', tags: 'Europe', vendor: 'Aruba', actions: '' }
      ],
      userTableHeaders: [
        { sortable: false, value: 'icon', selected: true },
        { text: 'Status', sortable: false, align: 'left', value: 'status', width: 50, selected: true },
        { text: 'Name', sortable: false, align: 'left', value: 'name', selected: true },
        { text: 'Company', sortable: false, align: 'left', value: 'company', selected: true },
        { text: 'Role', sortable: false, align: 'left', value: 'role', selected: true },
        { text: 'Time', sortable: false, align: 'left', value: 'time', selected: true },
        { text: 'actions', sortable: false, align: 'left', value: 'actions', selected: true }
      ],
      userList: [
        { icon: 'person', status: false, name: 'Chenu Noël Edouard', company: 'Etam Europe - Lecteur', role: 'Directeur Marketing', time: 'Il y a 6 heures' },
        { icon: 'person', status: true, name: 'Chenu Noël Edouard', company: 'Etam Europe - Lecteur', role: 'Directeur Marketing', time: 'Il y a 6 heures' },
        { icon: 'person', status: false, name: 'Chenu Noël Edouard', company: 'Etam Europe - Lecteur', role: 'Directeur Marketing', time: 'Il y a 6 heures' }
      ]
    }
  },

  computed: {
    ...mapGetters(['countries'])
  },
  methods: {
    ...mapActions(['fetchCountries']),
    editItem () {
      console.log('editItem')
    },
    deleteItem () {
      console.log('deleteItem')
    },
    cancelEstablishmentForm () {
      this.isEditingEstablishmentForm = false
    },
    editEstablishmentForm () {
      this.isEditingEstablishmentForm = true
    },
    submitEstablishmentForm () {

    }
  }
}
</script>

<style lang="scss" scoped>
  .status-help {
    top: -2px;
    left: 80px;
  }
</style>

<style lang="scss">
.status-wrapper {
  display: flex;
}

.status-block {
  display: flex;
  margin-right: 20px;

  .status-text {
    color: #00082a;
    font-size: 14px;
    background: white;
    border-radius: 5px;
    padding: 15px 25px;
    flex: 1;
    min-width: 220px;
  }

  .status-button {
    height: 51px;
    width: 51px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin-left: 5px;

    .icon {
      color: white;
    }

    &.success {
      background-color: #10bf73;
    }

    &.error {
      background-color: #e76262;
    }

    &.warning {
      background-color: #f0ab26;
    }
  }
}
</style>
