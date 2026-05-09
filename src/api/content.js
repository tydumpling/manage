import http from '@/utils/http'

export const getContentList = params => {
  return http.get('/mock/content/list', { params })
}

export const createContent = data => {
  return http.post('/mock/content/create', data)
}

export const updateContent = data => {
  return http.post('/mock/content/update', data)
}

export const deleteContent = data => {
  return http.post('/mock/content/delete', data)
}
