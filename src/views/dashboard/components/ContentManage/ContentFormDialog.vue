<template>
  <el-dialog v-model="visibleInner" :title="isEdit ? '发布内容编辑' : '发布内容'" width="620px" @closed="onClosed">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="95px">
      <el-form-item label="发布主题" prop="category">
        <el-select v-model="form.category" placeholder="请选择">
          <el-option label="国风古韵专区" value="国风古韵专区" />
          <el-option label="流行热歌专区" value="流行热歌专区" />
          <el-option label="轻音乐专区" value="轻音乐专区" />
        </el-select>
      </el-form-item>
      <el-form-item label="歌曲名称" prop="songName">
        <el-input v-model="form.songName" maxlength="20" />
      </el-form-item>
      <el-form-item label="歌手" prop="singer">
        <el-input v-model="form.singer" maxlength="20" />
      </el-form-item>
      <el-form-item label="歌曲音频" prop="audioFileName">
        <el-upload :auto-upload="false" :show-file-list="false" :on-change="file => onFileChange(file, 'audioFileName')">
          <el-button>上传音频文件</el-button>
          <span class="tip">{{ form.audioFileName || '支持 mp3/wav' }}</span>
        </el-upload>
      </el-form-item>
      <el-form-item label="歌词文件" prop="lyricFileName">
        <el-upload :auto-upload="false" :show-file-list="false" :on-change="file => onFileChange(file, 'lyricFileName')">
          <el-button>上传歌词文件</el-button>
          <span class="tip">{{ form.lyricFileName || '支持 lrc/txt' }}</span>
        </el-upload>
      </el-form-item>
      <el-form-item label="歌曲封面图" prop="coverUrl">
        <el-upload drag :auto-upload="false" :show-file-list="false" :on-change="onCoverChange">
          <img v-if="form.coverUrl" :src="form.coverUrl" class="cover" />
          <span v-else>上传照片</span>
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
  category: '',
  songName: '',
  singer: '',
  audioFileName: '',
  lyricFileName: '',
  coverUrl: ''
})

const rules = {
  category: [{ required: true, message: '请选择发布主题', trigger: 'change' }],
  songName: [{ required: true, message: '请输入歌曲名称', trigger: 'blur' }],
  singer: [{ required: true, message: '请输入歌手', trigger: 'blur' }],
  audioFileName: [{ required: true, message: '请上传歌曲音频', trigger: 'change' }],
  coverUrl: [{ required: true, message: '请上传封面图', trigger: 'change' }]
}

watch(
  () => props.modelData,
  value => {
    form.id = value?.id ?? null
    form.category = value?.category ?? ''
    form.songName = value?.songName ?? ''
    form.singer = value?.singer ?? ''
    form.audioFileName = value?.audioFileName ?? ''
    form.lyricFileName = value?.lyricFileName ?? ''
    form.coverUrl = value?.coverUrl ?? ''
  },
  { immediate: true }
)

const onFileChange = (file, key) => {
  form[key] = file.name
}

const onCoverChange = file => {
  form.coverUrl = URL.createObjectURL(file.raw)
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
.tip {
  margin-left: 8px;
  color: #909399;
}
.cover {
  width: 80px;
  height: 80px;
  object-fit: cover;
}
</style>
