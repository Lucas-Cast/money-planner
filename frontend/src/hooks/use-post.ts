import { useCallback, useState } from 'react'
import { axiosClient } from '@/config/axios-client'
import type { AxiosRequestConfig } from 'axios'

export function usePost<TResponse = unknown, TBody = unknown>() {
  const [data, setData] = useState<TResponse | null>(null)
  const [error, setError] = useState<unknown>(null)
  const [loading, setLoading] = useState(false)

  const post = useCallback(
    async (url: string, body?: TBody, config?: AxiosRequestConfig) => {
      setLoading(true)
      setError(null)

      try {
        const response = await axiosClient.post<TResponse>(url, body, config)
        setData(response.data)
        return response.data
      } catch (err) {
        setError(err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  return { data, error, loading, post }
}
