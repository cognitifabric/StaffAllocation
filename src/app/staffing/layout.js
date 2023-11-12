"use client"
import { CookiesProvider } from 'react-cookie';

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <>
      <CookiesProvider>
        {children}
      </CookiesProvider>
    </>
  )
}
