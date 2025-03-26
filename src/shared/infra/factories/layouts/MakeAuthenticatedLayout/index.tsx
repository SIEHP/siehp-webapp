'use client'
import React, { useEffect } from 'react'
import { MakeAuthenticatedLayoutProps as MakeAuthenticatedLayoutProps } from './types'
import AuthenticatedLayout from '@/shared/infra/presentation/layouts/AuthenticatedLayout'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/modules/user/infra/services/hooks/useAuth';
import { usePathname } from 'next/navigation';
const MakeAuthenticatedLayout = ({children}: MakeAuthenticatedLayoutProps) => {
  const router = useRouter();
  const { auth, refreshAccessToken } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (!auth) {
      router.push('/');
    }
  }, [auth]); 

  useEffect(() => {
    if (auth) {
      refreshAccessToken.handleRefreshAccessToken();
    }
  }, [pathname]);

  return (
    <>
      <AuthenticatedLayout>
        {children}
      </AuthenticatedLayout>
    </>
  )
}

export default MakeAuthenticatedLayout
