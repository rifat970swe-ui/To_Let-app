import axios from 'axios'

const DEFAULT_API_BASE_URL = 'http://localhost:5000'

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL

export const API_BASE_URL = configuredBaseUrl.replace(/\/+$/, '')

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
})

export default api
