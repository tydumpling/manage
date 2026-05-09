import http from '@/utils/http'

export const getSystemParamList = () => {
  return http.get('/mock/system/params/list')
}

export const updateSystemParam = data => {
  return http.post('/mock/system/params/update', data)
}

export const getVisitStats = () => {
  return http.get('/mock/system/visit/stats')
}

export const updateVisitStats = data => {
  return http.post('/mock/system/visit/update', data)
}
