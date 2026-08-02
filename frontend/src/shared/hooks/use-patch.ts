import { useCallback, useState } from 'react'
import type { AxiosRequestConfig } from 'axios'
import { axiosClient } from '@/shared/config/axios-client'

export function usePatch<TResponse = unknown, TBody = unknown>() {
  const [data, setData] = useState<TResponse | null>(null)
  const [error, setError] = useState<unknown>(null)
  const [loading, setLoading] = useState(false)

  const patch = useCallback(async (url: string, body?: TBody, config?: AxiosRequestConfig) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axiosClient.patch<TResponse>(url, body, config)
      setData(response.data)
      return response.data
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, error, loading, patch }
}
