import axios from 'axios'

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || ''

export const API_ENABLED = configuredBaseUrl.length > 0
export const API_BASE_URL = API_ENABLED ? configuredBaseUrl.replace(/\/+$/, '') : ''

const api = axios.create({
  ...(API_ENABLED ? { baseURL: API_BASE_URL } : {}),
  timeout: 5000,
})

export default api
