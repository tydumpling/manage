<template>
  <el-dialog
    :model-value="modelValue"
    width="420px"
    align-center
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="confirm-content">{{ content }}</div>
    <template #footer>
      <el-button @click="$emit('update:modelValue', false)">{{ cancelText }}</el-button>
      <el-button type="primary" :loading="loading" @click="$emit('confirm')">{{ confirmText }}</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
defineProps({
  modelValue: { type: Boolean, default: false },
  content: { type: String, default: '确定删除吗？' },
  confirmText: { type: String, default: '确认' },
  cancelText: { type: String, default: '取消' },
  loading: { type: Boolean, default: false }
})

defineEmits(['update:modelValue', 'confirm'])
</script>

<style lang="scss" scoped>
.confirm-content {
  min-height: 48px;
  line-height: 24px;
  font-size: 15px;
  color: #303133;
  text-align: center;
  word-break: break-word;
}
</style>
