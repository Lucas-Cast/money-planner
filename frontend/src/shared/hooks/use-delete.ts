import { useCallback, useState } from 'react'
import type { AxiosRequestConfig } from 'axios'
import { axiosClient } from '@/shared/config/axios-client'

export function useDelete<T = unknown>() {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<unknown>(null)
  const [loading, setLoading] = useState(false)

  const remove = useCallback(async (url: string, config?: AxiosRequestConfig) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axiosClient.delete<T>(url, config)
      setData(response.data)
      return response.data
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, error, loading, remove }
}
