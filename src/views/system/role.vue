<template>
  <div class="visit-data">
    <el-card shadow="never">
      <template #header>
        <div class="header">用户数据</div>
      </template>
      <div class="data-line">
        <span class="label">累计注册用户规模</span>
        <el-input v-model="totalUsers" readonly class="input" />
        <el-button type="primary" link @click="dialogVisible = true">修改</el-button>
      </div>
    </el-card>

    <single-field-dialog
      v-model="dialogVisible"
      title="确认修改？"
      label="参数值"
      placeholder="请输入用户规模"
      required-message="请输入参数值"
      :initial-value="totalUsers"
      :loading="submitting"
      confirm-text="确认"
      cancel-text="取消"
      @submit="onSubmit"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import SingleFieldDialog from '@/components/common/SingleFieldDialog.vue'
import { getVisitStats, updateVisitStats } from '@/api/system'

defineOptions({
  name: 'SystemVisit'
})

const totalUsers = ref('')
const dialogVisible = ref(false)
const submitting = ref(false)

const fetchData = async () => {
  const res = await getVisitStats()
  totalUsers.value = res.data.data.totalUsers
}

const onSubmit = async value => {
  submitting.value = true
  try {
    await updateVisitStats({ totalUsers: value })
    totalUsers.value = value
    ElMessage.success('修改成功')
    dialogVisible.value = false
  } finally {
    submitting.value = false
  }
}

fetchData()
</script>

<style lang="scss" scoped>
.visit-data {
  padding: 16px;

  .header {
    font-size: 16px;
    font-weight: 600;
  }

  .data-line {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .label {
    color: #606266;
  }

  .input {
    width: 220px;
  }
}
</style>
