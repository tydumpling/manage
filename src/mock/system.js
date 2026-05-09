let systemParamStore = [
  { id: 1, key: 'cosmic_user', value: '0/1', description: '运营访问用户', editor: '运营' },
  { id: 2, key: 'ai_queue_per_max_num', value: '4', description: '允许单个用户同时执行任务数量', editor: '系统' },
  { id: 3, key: 'ai_node_timeout_auto_recover_time', value: '120', description: 'AI节点超时未返回，下线节点', editor: '系统' },
  { id: 4, key: 'ai_node_delect_auto_recover_time', value: '30', description: 'AI节点自动剔除后，自动恢复可用状态间隔', editor: '系统' },
  { id: 5, key: 'auth_server_name', value: 'platform', description: '异常访问拦截节点，监控异常流量', editor: '系统' },
  { id: 6, key: 'a_template_showcover_compress_max_value', value: '960', description: '模板显示封面图片压缩最大边长', editor: '系统' }
]

let visitStats = {
  totalUsers: '4560人'
}

const success = (data, msg = '操作成功') => ({ code: '0', msg, data })

const parsePayload = value => {
  if (!value) return {}
  if (typeof value === 'string') {
    try {
      return JSON.parse(value)
    } catch {
      return {}
    }
  }
  return value
}

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

export const dispatchSystemMock = async ({ url, method, data }) => {
  await wait(180)
  const lowerMethod = (method || 'get').toLowerCase()
  const payload = parsePayload(data)

  if (url === '/mock/system/params/list' && lowerMethod === 'get') {
    return success(systemParamStore)
  }

  if (url === '/mock/system/params/update' && lowerMethod === 'post') {
    const target = systemParamStore.find(item => item.id === Number(payload.id))
    if (!target) {
      return { code: '1', msg: '参数不存在', data: null }
    }
    target.value = payload.value
    return success(true, '修改成功')
  }

  if (url === '/mock/system/visit/stats' && lowerMethod === 'get') {
    return success(visitStats)
  }

  if (url === '/mock/system/visit/update' && lowerMethod === 'post') {
    visitStats.totalUsers = payload.totalUsers
    return success(true, '修改成功')
  }

  return { code: '1', msg: 'mock接口不存在', data: null }
}
