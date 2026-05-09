<template>
  <el-breadcrumb>
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadCrumbList" :key="getItemKey(item, index)">
        <template #default>
          <div class="breadcrumb">
            <SvgIcon v-if="config.ISBREADCRUMBICON" :name="item?.meta?.icon" marginRight="3px" cursor="default" />
            <span>{{ getDisplayTitle(item) }}</span>
          </div>
        </template>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import config from '@/config'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { t } = useI18n()

const resolveTitle = meta => {
  if (!meta) {
    return ''
  }
  if (meta.i18nName) {
    const translation = t(`messages.${meta.i18nName}`, {})
    if (translation !== `messages.${meta.i18nName}`) {
      return translation
    }
  }
  return meta.title || 'Untitled'
}

const breadCrumbList = computed(() => {
  const matched = route.matched || []

  const normalized = matched
    .filter(item => item.meta?.title || item.meta?.i18nName)
    .map(item => ({
      path: item.path,
      meta: { ...item.meta }
    }))

  // 去重：当父子路由标题一致时，仅保留一个面包屑
  return normalized.filter((item, index) => {
    if (index === 0) {
      return true
    }
    const prev = normalized[index - 1]
    return resolveTitle(item.meta) !== resolveTitle(prev.meta)
  })
})

// 生成唯一标识（考虑相同路径不同参数的场景）
const getItemKey = (item, index) => {
  return `${item.path}-${index}-${JSON.stringify(route.query)}`
}

const getDisplayTitle = item => {
  return resolveTitle(item.meta)
}
</script>

<style lang="scss" scoped>
@use './index.scss' as *;
</style>
