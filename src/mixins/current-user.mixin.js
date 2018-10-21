import { mapActions, mapGetters } from 'vuex'

let CurrentUserMixin = {
  computed: {
    ...mapGetters('user', ['currentUser']),
    profile () {
      return this.currentUser.profile
    }
  },
  methods: {
    ...mapActions('user', ['updateUser']),
    dateFormatter (value) {
      if (!value) {
        return value
      }
      const date = this.$moment(value)

      let format = 'L' // 09/04/1986
      if (this.profile.date_format !== 'mdy') {
        format = 'DD/MM/YYYY'
      }
      return date.format(format)
    }
  }
}

export default CurrentUserMixin
