<template>
  <div>
    <module-header title="已发布内容" add-text="+ 添加主题" @add="openCreate" />
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="scene" label="主题场景定位" width="130" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="description" label="描述词" min-width="220" />
      <el-table-column prop="updatedAtText" label="最近更新时间" width="190" />
      <el-table-column label="操作" width="150">
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

    <el-dialog v-model="dialogVisible" :title="form.id ? '编辑主题' : '新增主题'" width="560px" @closed="onClosed">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="95px">
        <el-form-item label="主题模块" prop="scene">
          <el-select v-model="form.scene" style="width: 100%">
            <el-option label="首页" value="首页" />
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" maxlength="20" placeholder="请输入标题文案，限制20个字" />
        </el-form-item>
        <el-form-item label="描述词" prop="description">
          <el-input v-model="form.description" maxlength="20" placeholder="请输入描述文案，限制20个字" />
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
import { createTheme, deleteTheme, getThemeList, updateTheme } from '@/api/material'

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
  scene: '首页',
  title: '',
  description: ''
})
const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})
const rules = {
  scene: [{ required: true, message: '请选择主题模块', trigger: 'change' }],
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  description: [{ required: true, message: '请输入描述词', trigger: 'blur' }]
}

const fetchList = async () => {
  loading.value = true
  try {
    const res = await getThemeList({
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
  form.scene = '首页'
  form.title = ''
  form.description = ''
  dialogVisible.value = true
}

const openEdit = row => {
  form.id = row.id
  form.scene = row.scene
  form.title = row.title
  form.description = row.description
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
        await updateTheme({ ...form })
      } else {
        await createTheme({ ...form })
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
    await deleteTheme({ id: pendingDeleteId.value })
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
