<template lang="pug">
  ul.main-menu
    li.menu-item(
      v-for="(item, index) in sidebarMenu",
      :class="{'active': subIsActive(item.active), 'disabled': !selectedOrg.id}"
    )
      ul.sub-menu(v-if="item.submenu", :class="{'menu-closed': closeSubMenu}")
        h4  {{ item.title }}
        li.sub-item(v-for="(subItem in item.submenu", @click="closeMenu")
          router-link(
            v-if="hasActiveRoute(subItem)",
            :to="{name: subItem.route, params: getRouteParams(subItem)}"
          )
            span.sub-item-title {{subItem.title}}
          a.disabled-link(v-else)
            span.sub-item-title {{subItem.title}}
      a(href="#", v-if="item.submenu || !selectedOrg.id", @click.prevent="")
        v-icon(large) {{item.icon}}
      router-link(v-else, :to="{ name: item.route }")
        v-icon(large) {{item.icon}}
</template>

<script>
export default {
  props: {
    menu: Array,
    selectedOrg: {
      type: Object,
      default: () => {
        return {id: 0}
      }
    }
  },
  data () {
    return {
      closeSubMenu: false
    }
  },
  computed: {
    sidebarMenu () {
      return this.menu.filter(item => item.sidebar !== false)
    }
  },
  methods: {
    subIsActive (input) {
      const paths = Array.isArray(input) ? input : [input]
      return paths.some(path => {
        return this.$route.path.indexOf(path) === 0 // current path starts with this path string
      })
    },
    hasActiveRoute (subItem) {
      const params = this.getRouteParams(subItem)
      const link = this.$router.resolve({
        name: subItem.route,
        params: params
      })

      if (link && link.href !== '/') {
        return true
      }

      return false
    },
    closeMenu () {
      this.closeSubMenu = true

      setTimeout(() => {
        this.closeSubMenu = false
      }, 800)
    },
    getRouteParams (subItem) {
      const params = {}
      if (!subItem.isRoot) {
        // This means that the route depends on org id
        params.orgId = this.selectedOrg.id
      }
      return params
    }
  }
}
</script>

<style lang="scss">
  @import "styles/colors.scss";

  .main-menu {
    list-style-type: none;
    padding: 30px 0;
    position: relative;
    flex: 1;

    .menu-item {
      text-align: center;

      &:not(.disabled):hover > a {
        .icon {
          color: #ffffff
        }
      }

      & > a {
        display: block;
        position: relative;
        padding: 30px 20px;

        .icon {
          color: #97b8f6;
        }
      }

      &.active > a,
      &:not(.disabled) .router-link-exact-active {
        .icon {
          color: #ffffff;
        }

        &::after {
          position: absolute;
          content: '';
          width: 30px;
          left: 50%;
          transform: translateX(-50%);
          height: 4px;
          bottom: 18px;
          background-color: $success;
        }
      }
    }

    .sub-menu {
      background-color: #f8fafc;
      border-top: 1px solid #e5eaf0;
      border-right: 1px solid #e5eaf0;
      padding: 90px 90px 0;
      list-style-type: none;
      position: absolute;
      top: 0;
      left: 100%;
      height: 100%;
      opacity: 0;
      visibility: hidden;
      transition: all 0.5s ease;
      text-align: left;
      min-width: 320px;
      font-family: 'Fira Sans', sans-serif;

      h4 {
        font-size: 23px;
        color: #354c77;
      }

      li {
        margin-top: 30px;
      }

      li > a {
        font-size: 15px;
        color: #9ba9c4;
        text-decoration: none;
        font-weight: bold;

        &.router-link-active {
          color: $primary;
        }
      }
    }

    .sub-menu.menu-closed {
      opacity: 0 !important;
      visibility: hidden !important;
    }

    .menu-item:not(.disabled):hover .sub-menu {
      opacity: 1;
      visibility: visible;
    }

    .menu-item.disabled a {
      cursor: default
    }
  }

  .disabled-link {
    text-decoration: line-through !important;
  }
</style>
