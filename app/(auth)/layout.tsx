// app/(auth)/layout.tsx or similar
import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated) {
    redirect('/'); // Authenticated users always go to home
  }

  return (
    <div className="auth-layout">
      {children}
    </div>
  );
}

export default AuthLayout