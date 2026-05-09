<template>
  <el-dialog v-model="visibleInner" :title="title" width="520px" @closed="onClosed">
    <el-form ref="formRef" :model="form" :rules="rules" :label-width="labelWidth">
      <el-form-item :label="label" prop="value">
        <el-input v-model="form.value" :placeholder="placeholder" :maxlength="maxlength" clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visibleInner = false">{{ cancelText }}</el-button>
      <el-button type="primary" :loading="loading" @click="onSubmit">{{ confirmText }}</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '编辑' },
  label: { type: String, default: '参数值' },
  placeholder: { type: String, default: '请输入' },
  initialValue: { type: String, default: '' },
  requiredMessage: { type: String, default: '请输入内容' },
  loading: { type: Boolean, default: false },
  maxlength: { type: Number, default: 100 },
  labelWidth: { type: String, default: '90px' },
  confirmText: { type: String, default: '保存' },
  cancelText: { type: String, default: '取消' }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const formRef = ref()
const form = reactive({ value: '' })

const visibleInner = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

watch(
  () => props.initialValue,
  value => {
    form.value = value
  },
  { immediate: true }
)

const rules = computed(() => ({
  value: [{ required: true, message: props.requiredMessage, trigger: 'blur' }]
}))

const onSubmit = () => {
  formRef.value.validate(valid => {
    if (!valid) {
      return
    }
    emit('submit', form.value)
  })
}

const onClosed = () => {
  formRef.value?.clearValidate()
}
</script>
