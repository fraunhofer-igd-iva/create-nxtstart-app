'use client'

import React from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/store/store'

export default function StateProvider({ children }: { children: React.ReactNode }) {
  const [store] = React.useState<AppStore>(() => makeStore())

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
