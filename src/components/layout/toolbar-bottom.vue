<template lang="pug">
  v-toolbar.toolbar-bottom(color="white darken-3" app fixed height="50px")
    ul.breadcrumb-list
      li(v-for="crumb in crumbs")
        router-link(v-if="crumb.route", :to="{ name: crumb.route }")
          v-icon keyboard_arrow_right
          span {{ crumb.title }}
        a(v-else)
          v-icon keyboard_arrow_right
          span {{ crumb.title }}
</template>

<script>
export default {
  props: ['menu'],

  data () {
    return {
      crumbs: []
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.generateCrumbs()
    })
  },

  watch: {
    '$route' (to, from) {
      this.generateCrumbs()
    }
  },

  methods: {
    addCrumb (crumb) {
      this.crumbs.push(crumb)
    },
    subIsActive (input) {
      const paths = Array.isArray(input) ? input : [input]
      return paths.some(path => {
        return this.$route.path.indexOf(path) === 0 // current path starts with this path string
      })
    },
    generateCrumbs () {
      this.crumbs = []

      this.menu.forEach((item) => {
        if (this.subIsActive(item.active)) {
          this.addCrumb(item)
        } else if (item.route === this.$route.name) {
          this.addCrumb(item)
        }

        if (item.submenu) {
          item.submenu.forEach((subitem) => {
            if (this.$route.name === subitem.route) {
              this.addCrumb(subitem)
            }
          })
        }
      })
    }
  }

}
</script>

<style lang="scss">
  .toolbar-bottom {
    top: 100px;
    left: 0;
    background-color: #f8fafc !important;
    z-index: 2;
    padding-left: 280px;
    display: flex;
    align-items: center;
    border-top: 1px solid #eff3f8 !important;
    border-bottom: 1px solid #eff3f8 !important;
    box-shadow: none;
    position: absolute !important;

    .toolbar__content {
      padding: 0 95px;
    }

    .breadcrumb-list {
      list-style-type: none;
      padding: 0;

      li {
        margin-right: 30px;
        display: inline-block;
        font-size: 18px;

        a {
          text-decoration: none;
          color: #9ba9c4;
          display: flex;
          align-items: center;
        }
      }

    }
  }
</style>
