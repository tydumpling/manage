const now = Date.now()

let bannerStore = [
  {
    id: 1,
    name: 'AI音乐魔法城堡',
    imageUrl: 'https://dummyimage.com/320x120/409eff/ffffff&text=Banner+01',
    hasLink: 1,
    linkUrl: 'https://music.migu.cn/v5/musicSquare',
    sort: 1,
    updatedAt: now - 1000 * 60 * 60
  },
  {
    id: 2,
    name: 'AI音乐魔法城堡',
    imageUrl: 'https://dummyimage.com/320x120/67c23a/ffffff&text=Banner+02',
    hasLink: 0,
    linkUrl: '',
    sort: 2,
    updatedAt: now - 1000 * 60 * 35
  },
  {
    id: 3,
    name: 'AI音乐魔法城堡',
    imageUrl: 'https://dummyimage.com/320x120/e6a23c/ffffff&text=Banner+03',
    hasLink: 1,
    linkUrl: 'https://music.migu.cn/v5/musicSquare',
    sort: 3,
    updatedAt: now - 1000 * 60 * 10
  }
]

let idSeed = 4

const success = (data, msg = '操作成功') => ({
  code: '0',
  msg,
  data
})

const parsePayload = value => {
  if (!value) {
    return {}
  }
  if (typeof value === 'string') {
    try {
      return JSON.parse(value)
    } catch {
      return {}
    }
  }
  return value
}

const formatTime = timestamp => {
  const date = new Date(timestamp)
  const pad = num => String(num).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

const listBanner = params => {
  const { keyword = '', pageNum = 1, pageSize = 10 } = params
  const normalizedKeyword = keyword.trim().toLowerCase()

  const filtered = bannerStore
    .filter(item => {
      return (
        !normalizedKeyword ||
        item.name.toLowerCase().includes(normalizedKeyword) ||
        item.linkUrl.toLowerCase().includes(normalizedKeyword)
      )
    })
    .sort((a, b) => a.sort - b.sort || b.updatedAt - a.updatedAt)

  const current = Number(pageNum)
  const size = Number(pageSize)
  const total = filtered.length
  const maxPage = Math.max(1, Math.ceil(total / size))
  const safePageNum = Math.min(Math.max(current, 1), maxPage)
  const start = (safePageNum - 1) * size
  const records = filtered.slice(start, start + size).map(item => ({
    ...item,
    updatedAtText: formatTime(item.updatedAt)
  }))

  return success({
    list: records,
    total,
    pageNum: safePageNum,
    pageSize: size
  })
}

const createBanner = payload => {
  const item = {
    id: idSeed++,
    name: payload.name,
    imageUrl: payload.imageUrl,
    hasLink: Number(payload.hasLink),
    linkUrl: payload.linkUrl,
    sort: Number(payload.sort),
    updatedAt: Date.now()
  }
  bannerStore.push(item)
  return success(item)
}

const updateBanner = payload => {
  const target = bannerStore.find(item => item.id === Number(payload.id))
  if (!target) {
    return { code: '1', msg: '数据不存在', data: null }
  }
  target.name = payload.name
  target.imageUrl = payload.imageUrl
  target.hasLink = Number(payload.hasLink)
  target.linkUrl = payload.linkUrl
  target.updatedAt = Date.now()
  return success(target)
}

const deleteBanner = payload => {
  bannerStore = bannerStore.filter(item => item.id !== Number(payload.id))
  return success(true)
}

const moveBanner = payload => {
  const target = bannerStore.find(item => item.id === Number(payload.id))
  if (!target) {
    return { code: '1', msg: '数据不存在', data: null }
  }
  const currentIndex = bannerStore.findIndex(item => item.id === Number(payload.id))
  const swapIndex = payload.direction === 'up' ? currentIndex - 1 : currentIndex + 1
  if (swapIndex < 0 || swapIndex >= bannerStore.length) {
    return success(true)
  }
  const currentSort = bannerStore[currentIndex].sort
  bannerStore[currentIndex].sort = bannerStore[swapIndex].sort
  bannerStore[swapIndex].sort = currentSort
  bannerStore[currentIndex].updatedAt = Date.now()
  bannerStore[swapIndex].updatedAt = Date.now()
  return success(true)
}

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

export const dispatchBannerMock = async ({ url, method, params, data }) => {
  await wait(280)
  const payload = parsePayload(data)
  const lowerMethod = (method || 'get').toLowerCase()

  if (url === '/mock/banner/list' && lowerMethod === 'get') {
    return listBanner(params || {})
  }
  if (url === '/mock/banner/create' && lowerMethod === 'post') {
    return createBanner(payload)
  }
  if (url === '/mock/banner/update' && lowerMethod === 'post') {
    return updateBanner(payload)
  }
  if (url === '/mock/banner/delete' && lowerMethod === 'post') {
    return deleteBanner(payload)
  }
  if (url === '/mock/banner/move' && lowerMethod === 'post') {
    return moveBanner(payload)
  }

  return { code: '1', msg: 'mock接口不存在', data: null }
}
