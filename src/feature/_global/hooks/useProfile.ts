'use client'

import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'

export interface IUserProfile {
  email: string
  exp: number
  name: string
  iat: number
  id: number
  role: 'SUPERADMIN' | 'OPERATOR' | 'INSPECTOR'
  telephone: string
}

const useProfile = () => {
  const [profile, setProfile] = useState<IUserProfile | null>(null)
  const router = useRouter()

  useEffect(() => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const decoded = jwtDecode<IUserProfile>(token)

        // optional: cek expiry
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token')
          router.push('/403')
        } else {
          setProfile(decoded)
        }
      }
    } catch (error) {
      console.error('Error decoding token:', error)
      localStorage.removeItem('token')
      router.push('/403')
    }
  }, [router])

  return profile
}

export default useProfile
