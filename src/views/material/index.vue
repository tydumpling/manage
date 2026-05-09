<template>
  <div class="material">
    <el-card shadow="never">
      <template #header><div class="material-header">素材分类</div></template>
      <el-segmented v-model="activeTab" :options="tabOptions" />
      <div class="material-content">
        <component :is="activeComponent" />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, ref } from 'vue'

const ThemeManage = defineAsyncComponent(() => import('./components/ThemeManage.vue'))
const PromptManage = defineAsyncComponent(() => import('./components/PromptManage.vue'))

defineOptions({
  name: 'MaterialIndex'
})

const activeTab = ref('theme')
const tabOptions = [
  { label: '主题模板', value: 'theme' },
  { label: '灵感标签', value: 'prompt' }
]
const activeComponent = computed(() => {
  if (activeTab.value === 'theme') {
    return ThemeManage
  }
  return PromptManage
})
</script>

<style lang="scss" scoped>
.material {
  padding: 16px;

  &-header {
    font-weight: 600;
  }

  &-content {
    margin-top: 16px;
  }
}
</style>
