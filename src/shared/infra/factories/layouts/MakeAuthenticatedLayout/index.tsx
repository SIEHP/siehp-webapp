'use client'
import React, { useEffect } from 'react'
import { MakeAuthenticatedLayoutProps as MakeAuthenticatedLayoutProps } from './types'
import AuthenticatedLayout from '@/shared/infra/presentation/layouts/AuthenticatedLayout'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/modules/user/infra/services/hooks/useAuth';
const MakeAuthenticatedLayout = ({children}: MakeAuthenticatedLayoutProps) => {
  const router = useRouter();
  const { auth } = useAuth();

  useEffect(() => {
    if (!auth) {
      router.push('/');
    }
  }, [auth]); 

  return (
    <>
      <AuthenticatedLayout>
        {children}
      </AuthenticatedLayout>
    </>
  )
}

export default MakeAuthenticatedLayout
