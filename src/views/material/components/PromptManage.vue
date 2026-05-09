<template>
  <div>
    <module-header title="提示词标签列表" add-text="+ 添加标签" @add="openCreate" />
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="promptName" label="提示词标签名" width="180" />
      <el-table-column prop="promptText" label="提示词语义内容" min-width="280" show-overflow-tooltip />
      <el-table-column prop="updatedAtText" label="最近更新时间" width="190" />
      <el-table-column label="操作" width="140">
        <template #default="{ row }">
          <el-button link type="primary" @click="openEdit(row)">编辑</el-button>
          <el-button link type="danger" @click="onDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        v-model:current-page="pagination.pageNum"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50]"
        @size-change="fetchList"
        @current-change="fetchList"
      />
    </div>

    <el-dialog v-model="dialogVisible" :title="form.id ? '编辑灵感标签' : '新增灵感标签'" width="560px" @closed="onClosed">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="提示词标签名" prop="promptName">
          <el-input v-model="form.promptName" maxlength="20" placeholder="请输入文案，限制20个字" />
        </el-form-item>
        <el-form-item label="详细提示词文案" prop="promptText">
          <el-input
            v-model="form.promptText"
            type="textarea"
            :rows="8"
            maxlength="500"
            show-word-limit
            placeholder="请输入完整文案，限500个字"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitting" @click="onSubmit">保存</el-button>
      </template>
    </el-dialog>
    <confirm-dialog v-model="deleteDialogVisible" content="确定删除吗？" :loading="deleteLoading" @confirm="confirmDelete" />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import ModuleHeader from '@/components/common/ModuleHeader.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import { createPrompt, deletePrompt, getPromptList, updatePrompt } from '@/api/material'

const loading = ref(false)
const submitting = ref(false)
const deleteLoading = ref(false)
const deleteDialogVisible = ref(false)
const dialogVisible = ref(false)
const tableData = ref([])
const formRef = ref()
const pendingDeleteId = ref(null)
const form = reactive({
  id: null,
  promptName: '',
  promptText: ''
})
const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})
const rules = {
  promptName: [{ required: true, message: '请输入提示词标签名', trigger: 'blur' }],
  promptText: [{ required: true, message: '请输入提示词语义内容', trigger: 'blur' }]
}

const fetchList = async () => {
  loading.value = true
  try {
    const res = await getPromptList({
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    })
    tableData.value = res.data.data.list
    pagination.total = res.data.data.total
  } finally {
    loading.value = false
  }
}

const openCreate = () => {
  form.id = null
  form.promptName = ''
  form.promptText = ''
  dialogVisible.value = true
}

const openEdit = row => {
  form.id = row.id
  form.promptName = row.promptName
  form.promptText = row.promptText
  dialogVisible.value = true
}

const onSubmit = () => {
  formRef.value.validate(async valid => {
    if (!valid) {
      return
    }
    submitting.value = true
    try {
      if (form.id) {
        await updatePrompt({ ...form })
      } else {
        await createPrompt({ ...form })
      }
      ElMessage.success('保存成功')
      dialogVisible.value = false
      await fetchList()
    } finally {
      submitting.value = false
    }
  })
}

const onDelete = async row => {
  pendingDeleteId.value = row.id
  deleteDialogVisible.value = true
}

const confirmDelete = async () => {
  if (!pendingDeleteId.value) {
    return
  }
  deleteLoading.value = true
  try {
    await deletePrompt({ id: pendingDeleteId.value })
    ElMessage.success('删除成功')
    deleteDialogVisible.value = false
    const nextTotal = Math.max(0, pagination.total - 1)
    const nextMaxPage = Math.max(1, Math.ceil(nextTotal / pagination.pageSize))
    pagination.pageNum = Math.min(pagination.pageNum, nextMaxPage)
    await fetchList()
  } finally {
    deleteLoading.value = false
    pendingDeleteId.value = null
  }
}

const onClosed = () => {
  formRef.value?.clearValidate()
}

fetchList()
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
