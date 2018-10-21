<template lang="pug">
  v-container
    v-layout(row)
      v-flex(xs12)
        h1 {{ $t( 'organization.title1' ) }} (1/2)
        hr
        em {{ $t( 'organization.description1' ) }}
    v-layout(row)
      v-flex.py-5.pr-3(xs12 sm6)
        // organization name field
        v-text-field(v-model='organizationName',
          :rules='organizationNameRules',
          :label="$t('organization.enterOrganizationName')",
          type="text", required)

      v-flex.py-5.pl-3(xs12 sm6)
        // title field
        v-select(:items='regions',
          v-model='title',
          :label="$t('organization.selectRegion')",
          single-line, required)

</template>

<script>
import {nameRules} from '@/utils/form-fields-validation-rules'

export default {
  name: 'NewOrganizationStep1',
  data () {
    return {
      organizationName: '',
      organizationNameRules: nameRules('First name'),
      regions: [
        { text: 'Europe' },
        { text: 'Africa' },
        { text: 'South America' },
        { text: 'North America' },
        { text: 'Asia' },
        { text: 'China' }
      ],
      title: ''
    }
  }
}
</script>
