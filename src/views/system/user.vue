<template>
  <div class="system-params">
    <el-card shadow="never">
      <div class="title">系统参数</div>
      <el-table :data="tableData" border v-loading="loading">
        <el-table-column prop="key" label="参数名" width="240" />
        <el-table-column prop="value" label="参数值" width="220" />
        <el-table-column prop="description" label="参数备注" min-width="320" />
        <el-table-column prop="editor" label="最近操作人" width="160" />
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button link type="primary" @click="openEdit(row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <single-field-dialog
      v-model="dialogVisible"
      title="编辑参数"
      label="参数值"
      placeholder="请输入，逗号分割"
      required-message="请输入参数值"
      :initial-value="currentValue"
      :loading="submitting"
      @submit="onSubmit"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import SingleFieldDialog from '@/components/common/SingleFieldDialog.vue'
import { getSystemParamList, updateSystemParam } from '@/api/system'

defineOptions({
  name: 'SystemParams'
})

const loading = ref(false)
const submitting = ref(false)
const dialogVisible = ref(false)
const tableData = ref([])
const currentId = ref(null)
const currentValue = ref('')

const fetchList = async () => {
  loading.value = true
  try {
    const res = await getSystemParamList()
    tableData.value = res.data.data
  } finally {
    loading.value = false
  }
}

const openEdit = row => {
  currentId.value = row.id
  currentValue.value = row.value
  dialogVisible.value = true
}

const onSubmit = async value => {
  submitting.value = true
  try {
    await updateSystemParam({
      id: currentId.value,
      value
    })
    ElMessage.success('修改成功')
    dialogVisible.value = false
    await fetchList()
  } finally {
    submitting.value = false
  }
}

fetchList()
</script>

<style lang="scss" scoped>
.system-params {
  padding: 16px;

  .title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
  }
}
</style>
