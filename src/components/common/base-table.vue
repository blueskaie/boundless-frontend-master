<template lang="pug">
  div(:class="{ 'default-pagination': useDefaultPagination }")
    v-layout(row)
      v-flex(sm4 v-if="!hideSearch")
        v-text-field.search-input.no-border(
          v-model="search"
          :placeholder="$t('general.search')"
          append-icon="search"
          solo
        )
      v-flex.text-xs-right(v-if="!useDefaultPagination" sm8)
        v-btn.btn-default(
          v-if="showPaginationButtons"
          @click="viewAll"
        ) {{ $t('general.viewAll') }} ({{ items.length }})

    v-layout.mt-2(row)
      v-data-table.table-container(
        ref="datatable"
        :headers="filteredHeaders"
        :items="items"
        :loading="loading"
        :search="search"
        :select-all="selectAll"
        :value="value"
        @input="input"
        item-key="name"
        sort-icon="arrow_drop_up"
      )
        v-progress-linear(slot="progress", color="blue", indeterminate)
        template(slot="headerCell", slot-scope="props")
          span(v-if="props.header.text == 'actions'")
            column-selector(
              v-if="!hideColumnSelector"
              :columns="tableHeaders"
            )
          span(v-else) {{ props.header.text }}

        template(slot='items', slot-scope='props')
          tr.list-table-row(
            :class="{'clickable' : rowClickable}"
            @click="onRowClick(props.item, $event)",
          )
            td(
              v-if="selectable"
              style="width: 25px"
            )
              v-checkbox(v-model="props.selected")

            td.px-3(slot="icon" v-if="!hideIcon")
              wifi-icon(v-if="icon === 'wifi'")
              v-icon(v-else small) {{ icon }}

            td.px-4(
              v-for="header in filteredHeaders",
              v-if="header.text && header.text !== 'actions'"
            ) {{ getValue(props.item, header) }}

            td.px-3.justify-end.layout(v-if="!hideActions || !hideColumnSelector")
              div.list-table-actions(v-if="!hideActions")
                v-menu(left, offset-y)
                  v-btn.divider-vert.mx-0(slot="activator", icon)
                    v-icon(small, color='grey') more_horiz
                  .row-popover
                    .row-popover-arrow
                    .row-popover-inner
                      slot(name="row-action", :item="props.item")
                        .row-popover-item(@click="")
                          v-icon add_circle_outline
                        .row-popover-item(@click="")
                          v-icon edit
                        .row-popover-item(@click="")
                          v-icon folder_open
                        .row-popover-item(@click="")
                          v-icon delete

        v-alert(slot='no-results', :value='true', color='error', icon='warning')
          | Your search for "{{ search }}" found no results.

    v-layout.mt-3(row v-show="loading || !useDefaultPagination")
      v-flex.text-xs-center(xs12)
        v-progress-circular(
          v-show="loading"
          color="blue"
          indeterminate
        )
        v-btn.btn-default(
          v-show="showPaginationButtons && !loading",
          @click="viewNext"
        ) {{ $t('general.viewMore') }} ({{ currentRows }} of {{ items.length }})

</template>

<script>
import columnSelector from './column-selector'
import WifiIcon from '@/components/icons/wifi'

export default {
  components: {
    columnSelector,
    WifiIcon
  },

  props: {
    value: {
      type: [Array],
      default: () => {
        return []
      }
    },
    items: {
      required: true,
      type: Array
    },
    tableHeaders: {
      required: true,
      type: Array
    },
    loading: {
      required: false,
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: 'fas fa-image'
    },
    rowClickable: {
      required: false,
      type: Boolean,
      default: false
    },
    hideIcon: {
      required: false,
      type: Boolean,
      default: false
    },
    hideActions: {
      required: false,
      type: Boolean,
      default: false
    },
    hideSearch: {
      required: false,
      type: Boolean,
      default: false
    },
    hideColumnSelector: {
      type: Boolean,
      default: false
    },
    useDefaultPagination: {
      type: Boolean,
      default: false
    },
    // Adds checkbox for selecting row
    selectable: {
      type: Boolean,
      default: false
    },
    selectAll: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      search: '',
      currentRows: 5
    }
  },

  methods: {
    getValue (item, header) {
      let value = item
      for (let key of header.value.split('.')) {
        value = value[key]
      }
      if (header.formatter) {
        return header.formatter(value)
      } else {
        return value
      }
    },
    viewAll () {
      let datatable = this.$refs.datatable
      datatable.updatePagination({
        page: 1,
        rowsPerPage: -1
      })

      this.currentRows = this.items.length
    },

    viewNext () {
      let datatable = this.$refs.datatable
      const rowsPerPage = datatable.computedPagination.rowsPerPage

      this.currentRows += 10
      datatable.updatePagination({
        page: 1,
        rowsPerPage: rowsPerPage + 10
      })
    },

    setCurrentRows () {
      if (this.currentRows > this.items.length) {
        this.currentRows = this.items.length
      }
    },

    onRowClick (item, e) {
      if (!e.target.closest('.list-table-actions') && !e.target.closest('.checkbox')) {
        this.$emit('rowClicked', item)
      }
    },

    input (value) {
      this.$emit('input', value)
    }
  },

  watch: {
    'items' () {
      this.setCurrentRows()
    }
  },

  computed: {
    filteredHeaders () {
      return this.tableHeaders.filter((header) => {
        return header.selected === true
      })
    },
    showPaginationButtons () {
      return (this.currentRows < this.items.length)
    }
  }
}
</script>

<style scoped lang="scss">
.s-icon {
  width: 15px;
  height: 15px;
  margin-left: 5px;
}
</style>
