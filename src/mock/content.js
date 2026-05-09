const now = Date.now()

let contentStore = [
  {
    id: 1,
    category: '国风古韵专区',
    songName: '心中的乡愁',
    singer: '国风流行',
    coverUrl: 'https://dummyimage.com/60x60/5b8ff9/ffffff&text=A',
    duration: '03:24',
    audioFileName: 'home.mp3',
    lyricFileName: 'home.lrc',
    updatedAt: now - 1000 * 60 * 90
  },
  {
    id: 2,
    category: '流行热歌专区',
    songName: '晚风和你',
    singer: '鹿鸣',
    coverUrl: 'https://dummyimage.com/60x60/5ad8a6/ffffff&text=B',
    duration: '04:12',
    audioFileName: 'wind.mp3',
    lyricFileName: 'wind.lrc',
    updatedAt: now - 1000 * 60 * 45
  }
]

let idSeed = 3

const success = (data, msg = '操作成功') => ({
  code: '0',
  msg,
  data
})

const parsePayload = value => {
  if (!value) return {}
  if (typeof value === 'string') return JSON.parse(value)
  return value
}

const formatTime = timestamp => {
  const date = new Date(timestamp)
  const pad = num => String(num).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

const listContent = params => {
  const { category = '', keyword = '', pageNum = 1, pageSize = 10 } = params
  const list = contentStore.filter(item => {
    const categoryMatched = !category || item.category === category
    const keywordMatched = !keyword || item.songName.includes(keyword) || item.singer.includes(keyword)
    return categoryMatched && keywordMatched
  })
  const total = list.length
  const size = Number(pageSize)
  const maxPage = Math.max(1, Math.ceil(total / size))
  const safePageNum = Math.min(Math.max(Number(pageNum), 1), maxPage)
  const start = (safePageNum - 1) * size
  return success({
    list: list.slice(start, start + size).map(item => ({ ...item, updatedAtText: formatTime(item.updatedAt) })),
    total,
    pageNum: safePageNum,
    pageSize: size
  })
}

const createContent = payload => {
  contentStore.unshift({
    id: idSeed++,
    ...payload,
    duration: payload.duration || '03:00',
    updatedAt: Date.now()
  })
  return success(true)
}

const updateContent = payload => {
  const target = contentStore.find(item => item.id === payload.id)
  if (!target) return { code: '1', msg: '数据不存在', data: null }
  Object.assign(target, payload, { updatedAt: Date.now() })
  return success(true)
}

const deleteContent = payload => {
  contentStore = contentStore.filter(item => item.id !== payload.id)
  return success(true)
}

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

export const dispatchContentMock = async ({ url, method, params, data }) => {
  await wait(220)
  const payload = parsePayload(data)
  const lowerMethod = (method || 'get').toLowerCase()
  if (url === '/mock/content/list' && lowerMethod === 'get') return listContent(params || {})
  if (url === '/mock/content/create' && lowerMethod === 'post') return createContent(payload)
  if (url === '/mock/content/update' && lowerMethod === 'post') return updateContent(payload)
  if (url === '/mock/content/delete' && lowerMethod === 'post') return deleteContent(payload)
  return { code: '1', msg: 'mock接口不存在', data: null }
}
