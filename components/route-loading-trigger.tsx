'use client'

import { useEffect } from 'react'
import { useLoading } from '@/providers/LoadingProvider'
import { usePathname, useRouter } from 'next/navigation'

const RouteLoadingTrigger = () => {
  const { setLoading } = useLoading()
  const pathname = usePathname()

  useEffect(() => {
    // When the pathname changes, show loading briefly
    setLoading(true)

    // Wait briefly to simulate loading or let actual async page logic run
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 300) // adjust this to match your app’s behavior

    return () => clearTimeout(timeout)
  }, [pathname, setLoading])

  return null
}

export default RouteLoadingTrigger
