<template lang="pug">
  v-app
    v-content
      v-container.invite-signup(fluid fill-height)
        v-layout(class="align-center justify-center")
          v-flex(xs12 sm7 md3)
            v-card.pa-4
              v-card-text
                .logo-container
                  img.logo-image(src="/static/images/boundless-logo.png")
                  p.tag-line {{ $t('login.welcomeTo') }}
                  h3.logo-text  BOUNDLESS

                registration-form.mt-5(:submit-text="$t('login.completeSignupText')")
</template>

<script>
import RegistrationForm from './registration-form'

export default {
  name: 'Register',
  components: {
    RegistrationForm
  }
}
</script>

<style lang="scss">
@import 'styles/_logo-container.scss';

.invite-signup {
  flex: 1;
  background: url('/static/images/background.png') no-repeat center center;
  background-size: cover;

  .tag-line {
    margin-top: 20px;
  }
}

html {
  overflow-y: auto !important;
}
</style>
