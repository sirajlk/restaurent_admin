'use client'

import { useLoading } from '@/providers/LoadingProvider'

const GlobalLoading = () => {
  const { isLoading } = useLoading()

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default GlobalLoading
