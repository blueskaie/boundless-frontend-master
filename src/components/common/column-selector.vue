<template lang="pug">
  v-menu.column-menu(:close-on-content-click="false", v-model="menu", offset-y, :nudge-bottom="10")
    span(slot="activator")
      v-icon settings
    v-card.column-menu-dropdown
      h3 {{ $t('general.columnSelectorDescription') }}
      v-layout(row, wrap)
        v-flex.mb-1(sm6, v-for="column in columns", v-if="column.text && column.text !== 'actions'", :key="column.value")
          v-checkbox(:label="column.text", v-model="column.selected", hide-details)
</template>

<script>
export default {
  props: ['columns'],
  data () {
    return {
      menu: false,
      search: ''
    }
  }
}
</script>

<style lang="scss">
  @import "styles/colors.scss";

  .column-menu {
    font-family: 'Source Sans Pro', sans-serif;

    .organization-heading {
      font-size: 30px;
    }

    .caret-icon {
      margin-left: 10px;
    }

    .menu__content {
      box-shadow: none !important;
    }

  }

  .v-flex {
    display: flex;
  }

  .column-menu-dropdown {
    padding: 30px 60px;
    box-shadow: none !important;
    border: 1px solid $light-gray;
    min-width: 500px;

    h3 {
      font-family: 'Fira Sans', sans-serif;
      color: $black;
      margin-bottom: 25px;
      font-size: 15px;
    }
  }
</style>
