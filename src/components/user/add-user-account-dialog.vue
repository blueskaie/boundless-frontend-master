<template lang="pug">
  base-dialog(:show='show', @close="$emit('close')")
    v-layout(row)
      v-flex(sm11)
        h2.dialog-heading.px-2.py-3 {{ $t('user.newUserAccountCreation') }}
    v-divider
    v-layout(row)
      v-flex(xs12)
        v-container(grid-list-lg, wrap)
          v-layout(row)
            v-flex(xs12)
              | {{ $t('etc.loremShort') }}
    v-divider
    v-layout.px-4(row)
      v-flex.px-1(xs12, sm6, class="input-wrap")
        v-text-field(
          :label="$t('general.password')"
          required
          v-help-tooltip="{ message: $t('general.passwordHelp') }"
          v-model='password'
        )
      v-flex.px-1(xs12, sm6, class="input-wrap")
        v-text-field(
          :label="$t('general.confirmPassword')"
          required
          v-help-tooltip="{ message: $t('general.confirmPasswordHelp') }"
          v-model='confirmPassword'
        )
    v-layout.px-4(row)
      v-flex.px-1(xs12, sm6, class="input-wrap")
        v-text-field(
          :label="$t('general.company')"
          v-help-tooltip="{ message: $t('general.companyHelp') }"
          v-model='company'
        )
      v-flex.px-1(xs12, sm6, class="input-wrap")
        v-text-field(
          v-model='role'
          v-help-tooltip="{ message: $t('general.functionHelp') }"
          :label="$t('general.function')"
        )
    v-layout.px-4(row)
      v-flex.px-1(xs12, sm6, class="input-wrap")
        v-text-field(
          v-model="phoneNumber"
          :label="$t('general.mobile')"
          v-help-tooltip="{ message: $t('general.mobileHelp') }"
        )
      v-flex.px-1(xs12, sm6, class="input-wrap")
        v-select(
          :items='languages'
          :label="$t('general.language')"
          v-model='language'
          v-help-tooltip="{ message: $t('general.languageHelp') }"
        )
    v-layout(row)
      v-flex.text-xs-right.pb-3.pr-2(sm-2)
        v-btn(color='success', @click.stop='addNewUserAccount') {{ $t('general.create') }}
</template>

<script>
import baseDialog from '@/components/common/base-dialog'

export default {
  props: ['show'],
  data () {
    return {
      password: '',
      confirmPassword: '',
      company: '',
      role: '',
      phoneNumber: '',
      language: '',
      languages: ['Romanian', 'French', 'English']
    }
  },
  components: {
    baseDialog
  }
}
</script>
