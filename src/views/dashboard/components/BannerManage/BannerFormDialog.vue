<template>
  <el-dialog v-model="visibleInner" :title="isEdit ? '编辑海报' : '新增海报'" width="560px" @closed="onClosed">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="90px">
      <el-form-item label="banner名" prop="name">
        <el-input v-model="form.name" maxlength="20" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="有无跳转" prop="hasLink">
        <el-radio-group v-model="form.hasLink">
          <el-radio :value="0">无</el-radio>
          <el-radio :value="1">有</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="跳转链接" prop="linkUrl">
        <el-input v-model="form.linkUrl" :disabled="form.hasLink === 0" placeholder="请输入http开头的地址" />
      </el-form-item>
      <el-form-item label="海报图" prop="imageUrl">
        <el-upload class="upload-block" drag :auto-upload="false" :show-file-list="false" :on-change="onImageChange">
          <img v-if="form.imageUrl" :src="form.imageUrl" class="preview" />
          <template v-else>
            <div class="upload-text">上传照片</div>
            <div class="upload-tip">格式：PNG/JPG</div>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visibleInner = false">取消</el-button>
      <el-button type="primary" :loading="submitting" @click="onSubmit">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  modelData: { type: Object, default: () => ({}) },
  submitting: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue', 'submit'])

const formRef = ref()
const visibleInner = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
})
const isEdit = computed(() => Boolean(props.modelData?.id))

const form = reactive({
  id: null,
  name: '',
  hasLink: 0,
  linkUrl: '',
  imageUrl: ''
})

const rules = {
  name: [{ required: true, message: '请输入banner名称', trigger: 'blur' }],
  linkUrl: [
    {
      validator: (_, value, callback) => {
        if (form.hasLink === 0) return callback()
        if (!value) return callback(new Error('请输入跳转链接'))
        if (!/^https?:\/\//.test(value)) return callback(new Error('链接需要http/https开头'))
        callback()
      },
      trigger: 'blur'
    }
  ],
  imageUrl: [{ required: true, message: '请上传海报图', trigger: 'change' }]
}

watch(
  () => props.modelData,
  value => {
    form.id = value?.id ?? null
    form.name = value?.name ?? ''
    form.hasLink = value?.hasLink ?? 0
    form.linkUrl = value?.linkUrl ?? ''
    form.imageUrl = value?.imageUrl ?? ''
  },
  { immediate: true }
)

const onImageChange = file => {
  form.imageUrl = URL.createObjectURL(file.raw)
}

const onSubmit = () => {
  formRef.value.validate(valid => {
    if (!valid) return
    emit('submit', { ...form })
  })
}

const onClosed = () => {
  formRef.value?.resetFields()
}
</script>

<style lang="scss" scoped>
.upload-block {
  width: 220px;
}
.preview {
  width: 200px;
  height: 100px;
  object-fit: cover;
}
.upload-text {
  font-size: 20px;
}
.upload-tip {
  color: #909399;
  margin-top: 8px;
}
</style>
