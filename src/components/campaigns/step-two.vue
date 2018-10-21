<template lang="pug">
  .step-two
    v-layout.mb-4(row)
      v-flex(xs12, sm6, class="input-wrap")
        h2.step-heading(v-show="!value.isConditionalRedirect")
          | {{ $t('campaign.redirectionUrl') }}
          tooltip(
            :label="$t('campaign.redirectionUrlHelp')"
            style="top: -10px"
          )
        h2.step-heading(v-show="value.isConditionalRedirect")
          | {{ $t('campaign.chooseRedirectionMethod') }}
          tooltip(
            :label="$t('campaign.chooseRedirectionMethodHelp')"
            style="top: -10px"
          )
      v-flex(xs12, offset-sm3, sm3)
        base-switch(
          color="deep-purple lighten-2"
          label-left="Static"
          label-right="Conditional"
          v-model="value.isConditionalRedirect"
        )

    div(v-show="!value.isConditionalRedirect")
      v-text-field.transparent(
        :error-messages="getVueErrors('value.redirection_url_static')"
        :label="$t('campaign.redirectLink')"
        :append-icon="urlAppendIcon('value.redirection_url_static', value.redirection_url_static)"
        :error="hasVueError('value.redirection_url_static')"
        @blur="$v.value.redirection_url_static.$touch()"
        v-model="value.redirection_url_static"
        class="url-field"
        solo-inverted
      )
      div.input-group__details(v-show="hasVueError('value.redirection_url_static')")
        div.input-group__messages.input-group__error.error--text
          | {{ getVueErrors('value.redirection_url_static')[0] }}

    div(v-show="value.isConditionalRedirect")
      .item-list.redirection-list
        .item(
          v-for="mode in redirectionModes"
          @click="selectMode(mode)"
          :class="{'active': mode.value === value.redirection_mode}"
        )
          p {{ mode.title }}

      connection-mode(
        ref="connectionMode"
        v-if="value.redirection_mode === 'by_connection_mode'"
        v-model="value"
      )

      mobile-mode(
        ref="mobileMode"
        v-if="value.redirection_mode === 'by_device_type'"
        v-model="value"
      )
      scenario-mode(
        ref="scenarioMode"
        v-if="value.redirection_mode === 'by_scenario'"
        v-model="value"
      )
</template>

<script>
import { url } from 'vuelidate/lib/validators'

import CampaignUrlMixin from '@/mixins/campaign-url.mixin'
import ErrorHandlerMixin from '@/mixins/error-handler.mixin'

import connectionMode from './step-two-connection-mode'
import mobileMode from './step-two-mobile-mode'
import scenarioMode from './step-two-scenario-mode'
import baseSwitch from '@/components/common/base-switch'

export default {
  props: ['value', 'campaign', 'hideSteps'],
  components: {
    connectionMode,
    mobileMode,
    scenarioMode,
    baseSwitch
  },
  mixins: [
    CampaignUrlMixin,
    ErrorHandlerMixin
  ],
  data () {
    return {
      redirectionModes: [
        {value: 'by_connection_mode', title: this.$t('campaign.redirectionConnectionMode')},
        {value: 'by_device_type', title: this.$t('campaign.redirectionMobile')},
        {value: 'by_scenario', title: this.$t('campaign.redirectionScenario')}
      ]
    }
  },
  validations: {
    value: {
      redirection_url_static: { url }
    }
  },
  methods: {
    selectMode (mode) {
      this.$set(this.value, 'redirection_mode', mode.value)
      this.$emit('input', this.value)

      // scroll to specific section on type select
      this.$nextTick(() => {
        let el
        switch (mode.value) {
          case 'by_connection_mode':
            el = this.$refs.connectionMode.$el
            break
          case 'by_device_type':
            el = this.$refs.mobileMode.$el
            break
          case 'by_scenario':
            el = this.$refs.scenarioMode.$el
            break
        }
        this.$el.closest('.dialog').scrollTop = el.scrollHeight
      })
    },
    isConditionalModeValid (conditionals, redirectionType) {
      let hasValue = false
      for (let item of conditionals) {
        let fieldName = `redirection_url_${redirectionType}_${item}`
        if (this.value[fieldName]) {
          hasValue = true
          if (!url(this.value[fieldName])) {
            return false
          }
        }
      }
      return hasValue
    },
    isConnectionModeValid () {
      const conditionals = [
        'form',
        'facebook',
        'twitter',
        'linkedin',
        'instagram',
        'google'
      ]
      return this.isConditionalModeValid(conditionals, 'auth')
    },
    isMobileModeValid () {
      const conditionals = [
        'default'
      ]
      return this.isConditionalModeValid(conditionals, 'device')
    },
    isScenarioModeValid () {
      for (let item of this.value.scenarios) {
        if (!item.redirectUrl || !url(item.redirectUrl)) {
          return false
        }
      }
      return true
    },
    isValid () {
      if (!this.value.isConditionalRedirect) {
        return this.value.redirection_url_static && !this.$v.value.redirection_url_static.$invalid
      } else if (this.value.redirection_mode === 'by_connection_mode') {
        return this.isConnectionModeValid()
      } else if (this.value.redirection_mode === 'by_device_type') {
        return this.isMobileModeValid()
      } else if (this.value.redirection_mode === 'by_scenario') {
        return this.isScenarioModeValid()
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss">
@import "styles/colors.scss";

.input-group.input-group--append-icon.primary--text.url-field:not(.input-group--error) {
  .input-group__append-icon {
    color: $success !important;
  }
}

.item-list.redirection-list {
  margin: 20px 0;
  justify-content: space-between;

  .item {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    line-height: 1.5;
    max-width: 26%;
    padding: 30px;
    background-color: transparent;
    border-color: $primary;
    text-transform: uppercase;

    p {
      font-weight: bold;
      font-size: 15px;
      color: $primary;
    }

    &.active {
      background-color: $primary;
      color: #fff;

      p {
        color: #ffffff;
      }
    }
  }

  p {
      height: auto;
  }
}

/***** Sart step 2 Connection styles ******/
.connect-form {
  padding: 50px;
  background-color: white;
}

.connect-group {
  display: flex;
  justify-content: center;
  font-size: 15px;
  align-items: center;

  .connect-icon {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
    text-align: center;
    min-width: 170px;

    .icon {
      width: 50px;
      text-align: left;
      justify-content: flex-end;
      font-size: 20px;
    }

    span {
      padding-left: 20px;
    }
  }

  .connect-field {
    flex: 5;
    padding-left: 20px;
  }
}
/***** End step 2 styles ******/
</style>
