<template>
  <div class="sidebar">
    <custom-logo class="custom-logo" />
    <el-scrollbar class="menu-scrollbar">
      <el-menu router :default-active="route.path" :unique-opened="true" :collapse="settingStore.isCollapsed">
        <custom-menu :menu="menu" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { useSettingStore } from '@/stores/modules/setting'
import { useRoute } from 'vue-router'
import customLogo from './components/logo/index.vue'
import customMenu from './components/menu/index.vue'
import { ref } from 'vue'

const settingStore = useSettingStore()

const route = useRoute()

const menu = ref([
  { path: '/dashboard', icon: 'house', il18Name: 'tadHome', name: '首页运营', id: '01', children: [] },
  {
    path: '/material/index',
    icon: 'editor',
    name: '素材中心',
    il18Name: 'tadMaterialCenter',
    id: '03',
    children: []
  },
  {
    path: '/system',
    icon: 'system',
    name: '系统中心',
    il18Name: 'tadSysManagement',
    id: '05',
    children: [
      {
        path: '/system/params',
        icon: 'system',
        name: '系统参数',
        il18Name: 'tadSystemParam',
        id: '051',
        children: []
      },
      {
        path: '/system/visit',
        icon: 'user',
        name: '访问数据',
        il18Name: 'tadVisitData',
        id: '052',
        children: []
      }
    ]
  }
])
</script>

<style lang="scss" scoped>
@use './index.scss' as *;
</style>
