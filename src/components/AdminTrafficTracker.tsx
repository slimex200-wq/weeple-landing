'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { sendAdminEvent } from '@/lib/adminEvents'

export default function AdminTrafficTracker() {
  const pathname = usePathname()

  useEffect(() => {
    sendAdminEvent(pathname || '/')
  }, [pathname])

  return null
}
