import http from '@/utils/http'

export const getBannerList = params => {
  return http.get('/mock/banner/list', { params })
}

export const createBanner = data => {
  return http.post('/mock/banner/create', data)
}

export const updateBanner = data => {
  return http.post('/mock/banner/update', data)
}

export const deleteBanner = data => {
  return http.post('/mock/banner/delete', data)
}

export const moveBanner = data => {
  return http.post('/mock/banner/move', data)
}
