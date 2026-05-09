<template>
  <div class="dashboard-operation">
    <el-card shadow="never">
      <el-segmented v-model="activeTab" :options="tabOptions" />
      <div class="tab-content">
        <component :is="activeComponent" />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, ref } from 'vue'

defineOptions({
  name: 'Dashboard'
})

const BannerManage = defineAsyncComponent(() => import('./components/BannerManage/index.vue'))
const ContentManage = defineAsyncComponent(() => import('./components/ContentManage/index.vue'))

const activeTab = ref('banner')
const tabOptions = [
  { label: 'Banner管理', value: 'banner' },
  { label: '内容管理', value: 'content' }
]

const activeComponent = computed(() => {
  if (activeTab.value === 'banner') {
    return BannerManage
  }
  return ContentManage
})
</script>

<style lang="scss" scoped>
.dashboard-operation {
  padding: 16px;

  .tab-content {
    margin-top: 16px;
  }
}
</style>
