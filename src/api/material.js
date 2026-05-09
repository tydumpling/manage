import http from '@/utils/http'

export const getThemeList = params => {
  return http.get('/mock/material/theme/list', { params })
}

export const createTheme = data => {
  return http.post('/mock/material/theme/create', data)
}

export const updateTheme = data => {
  return http.post('/mock/material/theme/update', data)
}

export const deleteTheme = data => {
  return http.post('/mock/material/theme/delete', data)
}

export const getPromptList = params => {
  return http.get('/mock/material/prompt/list', { params })
}

export const createPrompt = data => {
  return http.post('/mock/material/prompt/create', data)
}

export const updatePrompt = data => {
  return http.post('/mock/material/prompt/update', data)
}

export const deletePrompt = data => {
  return http.post('/mock/material/prompt/delete', data)
}
