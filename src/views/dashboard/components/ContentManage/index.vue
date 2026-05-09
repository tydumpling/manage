<template>
  <div>
    <div class="module-title">已发布内容 ({{ pagination.total }})</div>
    <el-form :inline="true" :model="queryForm" class="query-form">
      <el-form-item label="发布主题">
        <el-select v-model="queryForm.category" placeholder="全部" clearable style="width: 180px">
          <el-option label="国风古韵专区" value="国风古韵专区" />
          <el-option label="流行热歌专区" value="流行热歌专区" />
          <el-option label="轻音乐专区" value="轻音乐专区" />
        </el-select>
      </el-form-item>
      <el-form-item label="歌曲名">
        <el-input v-model="queryForm.keyword" placeholder="请输入关键词搜索" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
      </el-form-item>
      <el-form-item class="add-btn">
        <el-button type="primary" @click="openCreate">+ 添加内容</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="category" label="主题分类" width="130" />
      <el-table-column prop="songName" label="歌曲名称" min-width="160" />
      <el-table-column prop="singer" label="主唱" width="120" />
      <el-table-column prop="coverUrl" label="预览图" width="100">
        <template #default="{ row }">
          <el-image :src="row.coverUrl" style="width: 40px; height: 40px" fit="cover" />
        </template>
      </el-table-column>
      <el-table-column prop="updatedAtText" label="最近更新时间" width="190" />
      <el-table-column prop="duration" label="歌曲时长" width="100" />
      <el-table-column label="操作" width="170">
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

    <content-form-dialog
      v-model="dialogVisible"
      :model-data="currentRow"
      :submitting="submitting"
      @submit="onSubmit"
    />
    <confirm-dialog v-model="deleteDialogVisible" content="确定删除吗？" :loading="deleteLoading" @confirm="confirmDelete" />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import ContentFormDialog from './ContentFormDialog.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import { createContent, deleteContent, getContentList, updateContent } from '@/api/content'

const loading = ref(false)
const submitting = ref(false)
const deleteLoading = ref(false)
const deleteDialogVisible = ref(false)
const dialogVisible = ref(false)
const tableData = ref([])
const currentRow = ref({})
const pendingDeleteId = ref(null)

const queryForm = reactive({
  category: '',
  keyword: ''
})

const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

const fetchList = async () => {
  loading.value = true
  try {
    const res = await getContentList({
      ...queryForm,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    })
    tableData.value = res.data.data.list
    pagination.total = res.data.data.total
  } finally {
    loading.value = false
  }
}

const onSearch = () => {
  pagination.pageNum = 1
  fetchList()
}

const openCreate = () => {
  currentRow.value = {}
  dialogVisible.value = true
}

const openEdit = row => {
  currentRow.value = { ...row }
  dialogVisible.value = true
}

const onSubmit = async form => {
  submitting.value = true
  try {
    if (form.id) {
      await updateContent(form)
    } else {
      await createContent(form)
    }
    ElMessage.success('保存成功')
    dialogVisible.value = false
    await fetchList()
  } finally {
    submitting.value = false
  }
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
    await deleteContent({ id: pendingDeleteId.value })
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

fetchList()
</script>

<style lang="scss" scoped>
.module-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
}
.query-form {
  margin-bottom: 12px;
}
.add-btn {
  float: right;
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
