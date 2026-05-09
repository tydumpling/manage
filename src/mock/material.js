const now = Date.now()

let themeStore = [
  {
    id: 1,
    scene: '首页',
    title: '国风音乐之旅',
    description: '辞旧迎新歌声起',
    relatedCount: 1,
    updatedAt: now - 1000 * 60 * 30
  },
  {
    id: 2,
    scene: '首页',
    title: '地铁早班',
    description: '同行如影',
    relatedCount: 0,
    updatedAt: now - 1000 * 60 * 60
  },
  {
    id: 3,
    scene: '首页',
    title: '音乐治愈生活',
    description: '一键放空',
    relatedCount: 0,
    updatedAt: now - 1000 * 60 * 90
  }
]

let promptStore = [
  {
    id: 1,
    promptName: '更风流行',
    promptText: '将传统中式乐器与电子元素融合，节奏明确，副歌上头',
    updatedAt: now - 1000 * 60 * 20
  },
  {
    id: 2,
    promptName: '雨村时刻',
    promptText: '创作一首安静的雨中流行曲，细腻的钢琴与低频鼓点',
    updatedAt: now - 1000 * 60 * 80
  }
]

let themeSeed = 4
let promptSeed = 3

const success = (data, msg = '操作成功') => ({ code: '0', msg, data })

const parsePayload = data => {
  if (!data) {
    return {}
  }
  if (typeof data === 'string') {
    try {
      return JSON.parse(data)
    } catch {
      return {}
    }
  }
  return data
}

const formatTime = timestamp => {
  const date = new Date(timestamp)
  const pad = value => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

const paginate = (list, pageNum, pageSize) => {
  const total = list.length
  const size = Number(pageSize)
  const maxPage = Math.max(1, Math.ceil(total / size))
  const safePageNum = Math.min(Math.max(Number(pageNum), 1), maxPage)
  const start = (safePageNum - 1) * size
  return {
    list: list.slice(start, start + size),
    total,
    pageNum: safePageNum,
    pageSize: size
  }
}

const listTheme = params => {
  const { keyword = '', pageNum = 1, pageSize = 10 } = params
  const filtered = themeStore.filter(item => {
    if (!keyword) {
      return true
    }
    return item.title.includes(keyword) || item.description.includes(keyword)
  })
  const result = paginate(filtered, pageNum, pageSize)
  return success({
    ...result,
    list: result.list.map(item => ({ ...item, updatedAtText: formatTime(item.updatedAt) }))
  })
}

const listPrompt = params => {
  const { keyword = '', pageNum = 1, pageSize = 10 } = params
  const filtered = promptStore.filter(item => {
    if (!keyword) {
      return true
    }
    return item.promptName.includes(keyword) || item.promptText.includes(keyword)
  })
  const result = paginate(filtered, pageNum, pageSize)
  return success({
    ...result,
    list: result.list.map(item => ({ ...item, updatedAtText: formatTime(item.updatedAt) }))
  })
}

const createThemeItem = payload => {
  themeStore.unshift({
    id: themeSeed++,
    scene: payload.scene || '首页',
    title: payload.title,
    description: payload.description,
    relatedCount: 0,
    updatedAt: Date.now()
  })
  return success(true)
}

const updateThemeItem = payload => {
  const target = themeStore.find(item => item.id === Number(payload.id))
  if (!target) {
    return { code: '1', msg: '数据不存在', data: null }
  }
  target.scene = payload.scene
  target.title = payload.title
  target.description = payload.description
  target.updatedAt = Date.now()
  return success(true)
}

const deleteThemeItem = payload => {
  const target = themeStore.find(item => item.id === Number(payload.id))
  if (!target) {
    return { code: '1', msg: '数据不存在', data: null }
  }
  if (target.relatedCount > 0) {
    return {
      code: '1',
      msg: `已关联内容，不支持删除，请先删除主题下内容资源（当前关联${target.relatedCount}条）`,
      data: null
    }
  }
  themeStore = themeStore.filter(item => item.id !== Number(payload.id))
  return success(true)
}

const createPromptItem = payload => {
  promptStore.unshift({
    id: promptSeed++,
    promptName: payload.promptName,
    promptText: payload.promptText,
    updatedAt: Date.now()
  })
  return success(true)
}

const updatePromptItem = payload => {
  const target = promptStore.find(item => item.id === Number(payload.id))
  if (!target) {
    return { code: '1', msg: '数据不存在', data: null }
  }
  target.promptName = payload.promptName
  target.promptText = payload.promptText
  target.updatedAt = Date.now()
  return success(true)
}

const deletePromptItem = payload => {
  promptStore = promptStore.filter(item => item.id !== Number(payload.id))
  return success(true)
}

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

export const dispatchMaterialMock = async ({ url, method, params, data }) => {
  await wait(220)
  const payload = parsePayload(data)
  const lowerMethod = (method || 'get').toLowerCase()

  if (url === '/mock/material/theme/list' && lowerMethod === 'get') return listTheme(params || {})
  if (url === '/mock/material/theme/create' && lowerMethod === 'post') return createThemeItem(payload)
  if (url === '/mock/material/theme/update' && lowerMethod === 'post') return updateThemeItem(payload)
  if (url === '/mock/material/theme/delete' && lowerMethod === 'post') return deleteThemeItem(payload)

  if (url === '/mock/material/prompt/list' && lowerMethod === 'get') return listPrompt(params || {})
  if (url === '/mock/material/prompt/create' && lowerMethod === 'post') return createPromptItem(payload)
  if (url === '/mock/material/prompt/update' && lowerMethod === 'post') return updatePromptItem(payload)
  if (url === '/mock/material/prompt/delete' && lowerMethod === 'post') return deletePromptItem(payload)

  return { code: '1', msg: 'mock接口不存在', data: null }
}
