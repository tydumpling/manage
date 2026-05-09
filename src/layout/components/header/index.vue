<template>
  <div class="header">
    <div class="header-left">
      <SvgIcon
        :class="settingStore.isCollapsed ? 'icon-style-form' : ''"
        name="collapsed"
        width="1.5rem"
        height="1.5rem"
        @click="flodClick"
      />
      <CoustomBreadcrumb class="bread-crumb" v-if="config.ISBREADCRUMB" />
    </div>
    <div class="header-right">
      <div class="header-icon" @click="toggle">
        <SvgIcon name="fullscreen" />
      </div>
      <CustomFontSize />
      <CustomSetting />
    </div>
  </div>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core'
import { useSettingStore } from '@/stores/modules/setting'
import CoustomBreadcrumb from './components/breadcrumb/index.vue'
import CustomFontSize from './components/font/index.vue'
import CustomSetting from './components/setting/index.vue'
import config from '@/config'

const { toggle } = useFullscreen()
const settingStore = useSettingStore()

const flodClick = () => {
  settingStore.increment()
}
</script>

<style lang="scss" scoped>
@use './index.scss' as *;
</style>
