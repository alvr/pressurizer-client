import axios, { AxiosRequestConfig } from 'axios'
import { config } from '@/config'
import store from '@/store'

export const http = axios.create({
  baseURL: config.apiUrl,
  timeout: 0,
})

http.interceptors.request.use(
  (cfg: AxiosRequestConfig) => {
    const token = store.getters.token

    if (token) {
      cfg.headers.Authorization = `Bearer ${token}`
    }

    return cfg
  },

  (error: any) => {
    return Promise.reject(error)
  },
)
