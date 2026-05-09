<template>
  <div class="module-header">
    <div class="title">{{ title }}</div>
    <el-button type="primary" @click="$emit('add')">{{ addText }}</el-button>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  addText: {
    type: String,
    default: '新增'
  }
})

defineEmits(['add'])
</script>

<style lang="scss" scoped>
.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  .title {
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
