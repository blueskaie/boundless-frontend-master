<template lang="pug">
  // Simplified add-user dialog for venues page
  base-dialog(:show='show', @close="$emit('close')")
    v-layout(row)
      v-flex(sm11, v-if="selectedGroupItem")
        h2.step-heading.px-3.py-3 {{$t('user.addNewUserTo')}} <b>{{selectedGroupItem.text}}</b>
    v-divider
    v-layout(row)
      v-flex(xs12)
        v-container(grid-list-lg, wrap)
          v-layout(row)
            v-flex(xs12, sm6, pr-4, class="input-wrap")
              v-text-field(
                :error-messages="nameErrors"
                :label="$t('general.name')"
                @input="$v.user.name.$touch"
                required
                v-help-tooltip="{ message: $t('general.nameHelp') }"
                v-model="user.name"
              )
            v-flex(xs12, sm6, pl-4, class="input-wrap")
              v-text-field(
                :error-messages="emailErrors"
                :label="$t('general.email')"
                @input="$v.user.email.$touch"
                required
                v-help-tooltip="{ message: $t('general.emailHelp') }"
                v-model='user.email'
              )
    v-divider
    v-layout(row, v-if="!addAsOrganizationAdmin || !hasAdminPermission")
      v-flex(xs12)
        v-container(grid-list-lg, wrap)
          v-layout(row, align-end)
            v-flex(xs12, sm5, class="input-wrap")
              v-select(
                :items='accessLevels'
                :label="$t('user.accessLevel')"
                hide-details
                v-help-tooltip="{ message: $t('user.accessLevelHelp') }"
                v-model='selectedAccess'
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
import { email, required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

import ErrorHandlerMixin from '@/mixins/error-handler.mixin'
import ManageableNodesMixin from '@/mixins/manageable-nodes.mixin'
import OrgPermissionsMixin from '@/mixins/org-permissions.mixin'

import RemovableItem from '@/components/common/removable-item'

export default {
  props: ['show', 'nodePreselected'],

  mixins: [
    ErrorHandlerMixin,
    ManageableNodesMixin,
    OrgPermissionsMixin
  ],

  components: {
    RemovableItem
  },

  validations: {
    user: {
      name: {
        required
      },
      email: {
        required,
        email
      }
    }
  },

  watch: {
    nodePreselected: {
      handler (val) {
        if (val) {
          this.addAsOrganizationAdmin = false
          this.selectedGroup = val.id
        }
      },
      immediate: true
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
        {text: this.$t('user.view'), value: 'view'}
      ]
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
    groupsWithoutSelected () {
      /*
         Removes groups that were already selected/added, used in the input field
       */
      return this.nodesWithIndentation.filter(group => {
        return !this.userGroupsAndPermissions.find(item => item.id === group.value)
      })
    },
    selectedGroupItem () {
      return this.nodesWithTypeAndIndentation.find((group) => {
        return group.value === this.selectedGroup
      })
    },
    emailErrors () {
      const errors = []
      const email = this.$v.user.email
      if (!email.$dirty) return errors
      !email.required && errors.push('Email is required')
      !email.email && errors.push('Must be valid e-mail')
      return errors.length > 0 ? errors : this.getErrorMessages('email')
    },
    nameErrors () {
      const errors = []
      const name = this.$v.user.name
      if (!name.$dirty) return errors
      !name.required && errors.push('Name is required')
      return errors.length > 0 ? errors : this.getErrorMessages('name')
    },
    disableInviteButton () {
      if (this.$v.user.$invalid) {
        return true
      } else if (!this.addAsOrganizationAdmin || !this.hasAdminPermission) {
        return false
      } else {
        return false
      }
    }
  },

  methods: {
    ...mapActions('user', ['inviteUser']),
    addUserGroupAndPermission () {
      this.userGroupsAndPermissions.push({
        id: this.selectedGroup,
        role: this.selectedAccess
      })
      this.selectedGroup = null
      this.selectedAccess = null
    },
    getGroupsWithoutSelectedExceptSelf (groupId) {
      /*
         Removes groups that were already selected/added except itself.
         Used in the selected groups dropdown
      */
      return this.nodesWithIndentation.filter(group => {
        return !this.userGroupsAndPermissions.find(item => item.id === group.value) || group.value === groupId
      })
    },
    removeUserGroupAndPermission (index) {
      this.userGroupsAndPermissions.splice(index, 1)
    },
    clearForm () {
      this.user = {
        name: '',
        email: ''
      }
      this.userGroupsAndPermissions = []
      this.addAsOrganizationAdmin = true
      this.$v.user.$reset()
    },
    submitInvite () {
      this.$v.user.$touch()
      if (!this.$v.user.$invalid) {
        this.loading = true
        this.userGroupsAndPermissions.push({
          id: this.selectedGroup,
          role: this.selectedAccess
        })

        this.user.organization = this.selectedOrganization.id
        this.user.invite_type = this.inviteType

        if (!this.hasAdminPermission || !this.addAsOrganizationAdmin) {
          this.user.permissions = this.userGroupsAndPermissions
        }

        this.inviteUser(this.user).then(response => {
          this.$emit('close')
          global.toastr['success'](this.$t('user.inviteSuccess'), this.$t('general.success'))
          this.loading = false
          this.clearForm()
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
