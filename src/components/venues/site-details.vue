<template lang="pug">
  v-container
    v-layout(row)
      // google map section
      v-flex(xs12)
        google-map(:pbcode="mapCode")

    v-layout(row)
      // Establishment Information column
      v-flex(xs12 sm6)
        v-container(grid-list-md)
          v-layout(row)
            v-flex(xs12)
              h2 {{ $t('settings.establishmentInformation') }}
              hr
          v-layout(row)
            v-flex(xs12 sm6, class="input-wrap")
              v-text-field(v-model='facilityName', :label="$t(' settings.facilityName ')")
              tooltip(class-name="facility-name-help", :label="$t(' settings.facilityNameHelp ')")
              v-select(:items='timeZones', v-model='timeZone', :label="$t(' settings.selectTimeZone ')")
              tooltip(class-name="select-timezone-help", :label="$t(' settings.selectTimeZoneHelp ')")
              v-text-field(v-model='zone', :label="$t(' settings.zone ')")
              v-select(:items='cities', v-model='city', :label="$t(' general.city ')")
              v-text-field(v-model='zipCode', :label="$t(' general.zipCode ')")
              v-select(:items='countries', item-text="name" v-model='country', :label="$t(' general.city ')", autocomplete)

              v-btn.my-5(dark, color="black") {{ $t('general.save') }}

            v-flex(xs12 sm6, class="input-wrap")
              v-select(:items='groups', v-model='group', :label="$t(' settings.selectGroup ')")
              tooltip(class-name="select-group-help", :label="$t(' settings.selectGroupHelp ')")
              v-select(:items='zones', v-model='zone', :label="$t(' settings.selectZone ')")
              tooltip(class-name="select-zone-help", :label="$t(' settings.selectZoneHelp ')")
              v-container.pa-0
                v-layout
                    v-flex(xs6)
                      v-text-field(v-model='m2Number', :label="$t(' settings.m2Number ')")
                    v-flex(xs6)
                      v-text-field(v-model='floorNumber', :label="$t(' settings.floorNumber ')")
              v-text-field(v-model='phoneNumber', :label="$t(' general.phoneNumber ')")
              v-text-field(v-model='emailAddress', :label="$t(' general.emailAddress ')")
              v-text-field(v-model='VATNumber', :label="$t(' settings.VATNumber ')")

      // tags column
      v-flex(xs12 sm6)
        v-container(grid-list-md)
          v-layout(row)
            v-flex(xs12)
              h2 {{ $t('general.tags') }}
              hr
              p.py-5 {{ $t('etc.loremShort') }}

              v-select.pa-3(v-model='chips', :label="$t('settings.enterYourTags')", chips, tags, solo, append-icon="OK", :append-icon-cb="appendCB")
                template(slot='selection', slot-scope='data')
                  v-chip(:selected='data.selected', close='', @input='remove(data.item)')
                    strong {{ data.item }}

    v-layout(row)
      // settingUpSocialNetworks column
      v-flex(xs12 sm6)
        v-container(grid-list-md)
          v-layout(row)
            v-flex(xs12)
              h2.pt-5 {{ $t('settings.settingUpSocialNetworks') }}
              hr.mb-3
              v-text-field(v-model='facebookLink', :label="$t(' social.facebookLink ')")
              v-text-field(v-model='twitterLink', :label="$t(' social.twitterLink ')")
              v-text-field(v-model='linkedInLink', :label="$t(' social.linkedInLink ')")
              v-text-field(v-model='instagramLink', :label="$t(' social.instagramLink ')")
              v-text-field(v-model='googleLink', :label="$t(' social.googleLink ')")

    v-layout(row)
      // materialDetails column
      v-flex(xs12)
        v-container(grid-list-md)
          v-layout(row)
            v-flex(xs12)
              h2.pt-5 {{ $t('settings.materialDetails') }}
              hr.mb-3
        v-container(grid-list-md)
          v-layout(row)
            v-flex(xs12, sm6, md4, lg3)
              v-select(:items='tags', v-model='tag', :label="$t(' general.tags ')")
            v-flex(xs12, sm6, md4, lg3)
              v-select(:items='moves', v-model='move', :label="$t(' general.move ')")

        // materialDetails table
        v-container(grid-list-md)
          v-layout(row)
            v-flex(xs12)
              v-data-table.elevation-1(:headers='headers', :items='desserts', hide-actions='')
                template(slot='items', slot-scope='props')
                  td.px-2
                    v-icon {{ props.item.icon }}
                  td.px-2
                    v-checkbox(v-model="props.item.checkbox")
                  td
                    v-icon(v-if="props.item.status", small, color="green") brightness_1
                    v-icon(v-else, small, color="grey") brightness_1
                  td.text-xs-right {{ props.item.name}}
                  td.text-xs-right {{ props.item.macAddress }}
                  td.text-xs-right {{ props.item.siteGroup }}
                  td.text-xs-right {{ props.item.tags }}
                  td.text-xs-right {{ props.item.vendor }}
                  td.justify-center.layout.px-0
                    v-btn.mx-0(icon, @click='editItem')
                      v-icon(small, color='grey') edit
                    v-btn.mx-0(icon, @click='deleteItem')
                      v-icon(small, color='grey') delete
                  td.justify-center.layout.px-0

    v-layout(row)
      // status column
      v-flex(xs12)
        v-container(grid-list-md)
          v-layout(row)
            v-flex(xs12)
              h2.pt-5.pr-5.d-inline-block(class="input-wrap") {{ $t('general.status') }}
                tooltip(class-name="status-help", :label="$t(' general.statusHelp ')")
              hr.mb-3
        // materialDetails table
        v-container(grid-list-md)
          v-layout(row)
            v-flex(xs12, md4)
              v-container(grid-list-md)
                v-layout(row)
                  v-flex(xs8)
                    v-text-field(v-model='receptionProbData', :label="$t(' settings.receptionProbData ')")
                  v-flex(xs4)
                    v-btn.mx-0(color="error")
                      v-icon sentiment_dissatisfied
            v-flex(xs12, md4)
              v-container(grid-list-md)
                v-layout(row)
                  v-flex(xs8)
                    v-text-field(v-model='peerSyslogData', :label="$t(' settings.peerSyslogData ')")
                  v-flex(xs4)
                    v-btn.mx-0(color="warning")
                      v-icon sentiment_satisfied
            v-flex(xs12, md4)
              v-container(grid-list-md)
                v-layout(row)
                  v-flex(xs8)
                    v-text-field(v-model='wallenGarden', :label="$t(' settings.wallenGarden ')")
                  v-flex(xs4)
                    v-btn.mx-0(color="success")
                      v-icon sentiment_very_satisfied

    v-layout(row)
      // detailsOfUsersOfThisSite row
      v-flex(xs12)
        v-container(grid-list-md)
          v-layout(row)
            v-flex(xs12)
              h2.pt-5 {{ $t('settings.detailsOfUsersOfThisSite') }}
              hr.mb-3
        // detailsOfUsersOfThisSite table
        v-container(grid-list-md)
          v-layout(row)
            v-flex(xs12)
              v-data-table.elevation-1(hide-headers, :items='desserts2', hide-actions)
                template(slot='items', slot-scope='props')
                  td.px-2
                    v-icon {{ props.item.icon }}
                  td.text-xs-right {{ props.item.name}}
                  td.text-xs-right {{ props.item.company }}
                  td.text-xs-right {{ props.item.role }}
                  td.text-xs-right {{ props.item.time }}

</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import googleMap from '@/components/common/google-map.vue'

export default {
  name: 'ConfigurationSiteDetails',

  components: {googleMap},

  mounted () {
    if (this.countries.length < 1) {
      this.fetchCountries()
    }
  },

  data () {
    return {
      mapCode: '!1m18!1m12!1m3!1d2717.583877175037!2d21.917799951585!3d47.06801263291736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDA0JzA0LjgiTiAyMcKwNTUnMTIuMCJF!5e0!3m2!1sen!2sro!4v1526626085921',
      group: '',
      groups: ['Etam Global', '> Etam France', '> Etam Romania', '>> Etam Oradea'],
      facilityName: '',
      tag: '',
      tags: ['a', 'b'],
      move: '',
      moves: ['a', 'b'],
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
      chips: ['Programming', 'Watching'],
      facebookLink: '',
      twitterLink: '',
      linkedInLink: '',
      instagramLink: '',
      googleLink: '',
      materialDetailsCheckbox: '',
      receptionProbData: '',
      peerSyslogData: '',
      wallenGarden: '',
      headers: [
        { sortable: false, align: 'left', value: 'icon', width: 50 },
        { sortable: false, align: 'left', value: 'checkbox', width: 50 },
        { text: this.$t('general.status'), sortable: false, align: 'left', value: 'status', width: 50 },
        { text: this.$t('general.name'), sortable: false, align: 'right', value: 'name' },
        { text: this.$t('general.MACAddress'), sortable: false, align: 'right', value: 'macAddress' },
        { text: this.$t('general.siteGroup'), sortable: false, align: 'right', value: 'siteGroup' },
        { text: this.$t('general.tags'), sortable: false, align: 'right', value: 'tags' },
        { text: this.$t('general.vendor'), sortable: false, align: 'right', value: 'vendor' },
        { text: this.$t('general.actions'), sortable: false, align: 'right', value: 'actions' }
      ],
      desserts: [
        { icon: 'public', checkbox: true, status: false, name: 'AP Magasin', macAddress: '00:00:11:22:33:44', siteGroup: 'Etam France', tags: 'Europe', vendor: 'Aruba', actions: '' },
        { icon: 'email', checkbox: false, status: true, name: 'AP Magasin', macAddress: '00:00:11:22:33:44', siteGroup: 'Etam France', tags: 'Europe', vendor: 'Aruba', actions: '' },
        { icon: 'home', checkbox: false, status: false, name: 'AP Magasin', macAddress: '00:00:11:22:33:44', siteGroup: 'Etam France', tags: 'Europe', vendor: 'Aruba', actions: '' }
      ],
      desserts2: [
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
    appendCB () {
      console.log(this.chips)
    },
    remove (item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
    }
  }
}
</script>
<style lang="scss" scoped>
  .facility-name-help {
    top: 0px;
    left: 90px;
  }
  .select-timezone-help{
    top: 70px;
    left: 120px;
  }
  .select-group-help {
    top: 0px;
    left: 90px;
  }
  .select-zone-help {
    top: 70px;
    left: 80px;
  }
  .status-help {
    top: 24px;
    left: 50px;
  }
</style>
