import { useCallback, useState } from 'react'
import { axiosClient } from '@/config/axios-client'
import type { AxiosRequestConfig } from 'axios'

export function useGet<T = unknown>() {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<unknown>(null)
  const [loading, setLoading] = useState(false)

  const get = useCallback(async (url: string, config?: AxiosRequestConfig) => {
    setLoading(true)
    setError(null)

    try {
      const response = await axiosClient.get<T>(url, config)
      setData(response.data)
      return response.data
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, error, loading, get }
}
