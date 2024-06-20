'use client'

import { SessionProvider } from 'next-auth/react'

import React from 'react'

const SessionWrapper = ({ children }) => {
  return (
    <SessionProvider refetchInterval={4 * 60}>
      {children}
    </SessionProvider>
  )
}

export default SessionWrapper