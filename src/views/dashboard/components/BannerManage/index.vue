<template>
  <div>
    <div class="module-title">已发布内容 ({{ pagination.total }})</div>
    <div class="toolbar">
      <el-button type="primary" @click="openCreate">+ 添加海报</el-button>
    </div>
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column prop="sort" label="资源位序号" width="110" />
      <el-table-column prop="name" label="Banner名称" min-width="180" />
      <el-table-column label="海报图" width="220">
        <template #default="{ row }">
          <el-image :src="row.imageUrl" style="width: 180px; height: 54px" fit="cover" />
        </template>
      </el-table-column>
      <el-table-column prop="linkUrl" label="跳转链接" min-width="240">
        <template #default="{ row }">{{ row.hasLink ? row.linkUrl : '无' }}</template>
      </el-table-column>
      <el-table-column prop="updatedAtText" label="最近更新时间" width="190" />
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="{ row, $index }">
          <el-button link type="primary" @click="openEdit(row)">编辑</el-button>
          <el-button link type="danger" @click="onDelete(row)">删除</el-button>
          <el-button link type="primary" :disabled="$index === 0" @click="onMove(row, 'up')">上移</el-button>
          <el-button
            link
            type="primary"
            :disabled="$index === tableData.length - 1"
            @click="onMove(row, 'down')"
          >
            下移
          </el-button>
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

    <banner-form-dialog v-model="dialogVisible" :model-data="currentRow" :submitting="submitting" @submit="onSubmit" />
    <confirm-dialog v-model="deleteDialogVisible" content="确定删除吗？" :loading="deleteLoading" @confirm="confirmDelete" />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import BannerFormDialog from './BannerFormDialog.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import { createBanner, deleteBanner, getBannerList, moveBanner, updateBanner } from '@/api/banner'

const loading = ref(false)
const submitting = ref(false)
const deleteLoading = ref(false)
const deleteDialogVisible = ref(false)
const dialogVisible = ref(false)
const tableData = ref([])
const currentRow = ref({})
const pendingDeleteId = ref(null)

const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

const fetchList = async () => {
  loading.value = true
  try {
    const res = await getBannerList({
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
      await updateBanner(form)
    } else {
      await createBanner(form)
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
    await deleteBanner({ id: pendingDeleteId.value })
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

const onMove = async (row, direction) => {
  await moveBanner({ id: row.id, direction })
  await fetchList()
}

fetchList()
</script>

<style lang="scss" scoped>
.module-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
}
.toolbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
