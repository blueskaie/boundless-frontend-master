<template lang="pug">
  base-dialog(:show='show', @close="close")
    v-layout(row)
      v-flex(sm11)
        h2.step-heading.px-2.py-3 {{ $t('user.newUser') }}
    v-divider
    v-layout(row)
      v-flex(xs12)
        v-container(grid-list-lg, wrap)
          v-layout(row)
            v-flex(xs12, sm6, pr-4, class="input-wrap")
              v-text-field(
                :error-messages="getErrors('name')"
                :label="$t('general.name')"
                @input="$v.user.name.$touch"
                required
                v-help-tooltip="{ message: $t('general.nameHelp') }"
                v-model="user.name"
              )
            v-flex(xs12, sm6, pl-4, class="input-wrap")
              v-text-field(
                :error-messages="getErrors('email')"
                :label="$t('general.email')"
                @blur="$v.user.email.$touch"
                required
                v-help-tooltip="{ message: $t('general.emailHelp') }"
                v-model='user.email'
              )
    v-divider
    v-layout(row, v-if="hasAdminPermission")
      v-flex(xs12)
        v-container(grid-list-lg, wrap)
          v-layout(row)
            v-flex(xs12, sm6)
              h3.pt-4(style="position: relative")
                | {{ $t('user.addAsOrganizationAdmin') }}
                tooltip(
                  :label="$t('user.addAsOrganizationAdminHelp')"
                  style="top: 10px"
                )
            v-flex(xs12, sm6)
              base-switch.pt-4(
                color="deep-purple lighten-2"
                label-left="Yes"
                label-right="No"
                reverse
                v-model="addAsOrganizationAdmin"
              )

    v-divider(v-show="!addAsOrganizationAdmin || !hasAdminPermission")
    v-layout(row, v-if="!addAsOrganizationAdmin || !hasAdminPermission")
      v-flex(xs12)
        v-container(grid-list-lg, wrap)
          v-layout(row)
            v-flex(sm12)
              h3.pt-4 {{ $t('user.chooseSitesAndGroups') }}

          v-layout(row, align-end)
            v-flex(xs12, sm5, class="input-wrap")
              node-select(
                :indent-level="0"
                :items="nodesWithSelectedDisabled"
                :label="$t('settings.selectGroup')"
                autocomplete
                hide-details
                v-help-tooltip="{ message: $t('settings.selectGroupHelp') }"
                v-model="selectedGroup"
              )
            v-flex(xs12, sm5, class="input-wrap")
              v-select(
                :items='accessLevels'
                :label="$t('user.accessLevel')"
                hide-details
                v-help-tooltip="{ message: $t('user.accessLevelHelp') }"
                v-model='selectedAccess'
              )
            v-flex.text-xs-right(xs12, sm2)
              v-btn.no-margin(
                :disabled="!selectedGroup || !selectedAccess"
                @click.stop='addUserGroupAndPermission'
                color='success'
                outline
                round
              ) {{ $t('user.addSite') }}

          .access-items.mt-3
            removable-item.py-3.pl-3.pr-1.my-3(
              :key="index"
              v-for="(userGroup, index) in userGroupsAndPermissions"
              @remove="removeUserGroupAndPermission(index)"
            )
              v-flex(xs12, sm6)
                node-select(
                  :indent-level="0"
                  :items="nodesWithSelectedDisabled"
                  :label="$t('settings.selectGroup')"
                  autocomplete
                  hide-details
                  v-model='userGroup.id'
                )
              v-flex(xs12, sm6)
                v-select(
                  :items='accessLevels'
                  :label="$t('user.accessLevel')"
                  hide-details
                  v-model='userGroup.role'
                )

    v-layout.mt-4(row)
      v-flex.text-xs-right.pb-3.pr-2(sm-2)
        v-btn(
          :disabled="disableInviteButton"
          :loading="loading"
          @click="submitInvite"
          color='success'
          large
          round
        ) {{ $t('general.invite') }}
</template>

<script>
import { email, maxLength, required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

import ErrorHandlerMixin from '@/mixins/error-handler.mixin'
import ManageableNodesMixin from '@/mixins/manageable-nodes.mixin'
import OrgPermissionsMixin from '@/mixins/org-permissions.mixin'

import RemovableItem from '@/components/common/removable-item'
import NodeSelect from '@/components/common/node-select'

export default {
  props: ['show'],

  mixins: [
    ErrorHandlerMixin,
    ManageableNodesMixin,
    OrgPermissionsMixin
  ],

  components: {
    NodeSelect,
    RemovableItem
  },

  validations: {
    user: {
      name: {
        required,
        maxLength: maxLength(180)
      },
      email: {
        required,
        email
      }
    }
  },

  data () {
    return {
      user: {
        name: '',
        email: ''
      },
      loading: false,
      addAsOrganizationAdmin: true,
      userGroupsAndPermissions: [],
      selectedGroup: null,
      selectedAccess: null,
      accessLevels: [
        {text: this.$t('user.manage'), value: 'manage'},
        {text: this.$t('general.readOnly'), value: 'view'}
      ],
      filters: {
        types: 'organization,group,site'
      }
    }
  },

  computed: {
    inviteType () {
      if (this.addAsOrganizationAdmin) {
        return 'organization_admin'
      } else {
        return 'external_user'
      }
    },
    nodesWithSelectedDisabled () {
      return this.nodesWithTypeAndIndentation.map(group => {
        if (this.userGroupsAndPermissions.find(item => item.id === group.value)) {
          group.disabled = true
        } else {
          group.disabled = false
        }
        return group
      })
    },
    disableInviteButton () {
      if (this.$v.user.$invalid) {
        return true
      } else if (!this.addAsOrganizationAdmin || !this.hasAdminPermission) {
        return this.userGroupsAndPermissions.length === 0
      } else {
        return false
      }
    }
  },

  methods: {
    ...mapActions('user', ['inviteUser']),
    getErrors (fieldName) {
      const vueErrors = this.getVueErrors(`user.${fieldName}`)
      if (vueErrors.length > 0) {
        return vueErrors
      } else {
        return this.getErrorMessages(fieldName)
      }
    },
    addUserGroupAndPermission () {
      this.userGroupsAndPermissions.push({
        id: this.selectedGroup,
        role: this.selectedAccess
      })
      this.selectedGroup = null
      this.selectedAccess = null
    },
    removeUserGroupAndPermission (index) {
      this.userGroupsAndPermissions.splice(index, 1)
    },
    clearForm () {
      this.$v.user.$reset()
      this.user = {
        name: '',
        email: ''
      }
      this.userGroupsAndPermissions = []
      this.addAsOrganizationAdmin = true
      this.selectedGroup = null
      this.selectedAccess = null
    },
    close () {
      this.$emit('close')
      this.clearForm()
    },
    submitInvite () {
      this.$v.user.$touch()
      if (!this.$v.user.$invalid) {
        this.loading = true
        this.user.organization = this.selectedOrganization.id
        this.user.invite_type = this.inviteType

        if (!this.hasAdminPermission || !this.addAsOrganizationAdmin) {
          this.user.permissions = this.userGroupsAndPermissions
        }

        this.inviteUser(this.user).then(response => {
          this.close()
          global.toastr['success'](this.$t('user.inviteSuccess'), this.$t('general.success'))
          this.loading = false
        }).catch(err => {
          this.setErrorData(err)
          this.loading = false
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .divider {
    background-color: darken(#eff3f8, 10%);
  }

  .btn__close .icon {
    font-size: 22px !important;
  }
</style>
