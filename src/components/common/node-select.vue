<template lang="pug">
  v-select.tree-style(
    :value="value"
    @input="$emit('input', $event)"
    content-class="tree-style"
    v-bind="$attrs"
  )
    template(slot="item" slot-scope="data" class="disabled")
      .item-wrap(:style="indent(data.item.level)")
        span
          folder-icon(v-if="data.item.type === 'group'")
          map-marker-icon(v-else)
        span {{ data.item.text }}
</template>
<script>
import briefcaseIcon from '@/components/icons/briefcase'
import folderIcon from '@/components/icons/folder'
import folderIconClosed from '@/components/icons/folder-closed'
import mapMarkerIcon from '@/components/icons/map-marker'
import wifiIcon from '@/components/icons/wifi'
import floorIcon from '@/components/icons/floor'

export default {
  props: {
    value: {
      type: Number,
      default: null
    },
    indentLevel: {
      type: Number,
      default: 1
    }
  },
  components: {
    briefcaseIcon,
    folderIcon,
    mapMarkerIcon,
    folderIconClosed,
    wifiIcon,
    floorIcon
  },
  methods: {
    indent (level) {
      return { transform: `translate(${(level - this.indentLevel) * 25}px)` }
    }
  }
}
</script>
<style lang="scss" scoped>
.menu__content {
  &.tree-style {
    transform: translateY(34px);

    .s-icon {
      width: 15px;
      height: 15px;
      display: block;
      color: #9ba9c4;
      margin-right: 12px;
    }

    .item-wrap {
      display: flex;
      transform: translate(20px);
      width: 100%;
      align-items: center;
    }
  }
}
</style>
