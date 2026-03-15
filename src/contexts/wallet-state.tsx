"use client"

import { createContext, useContext, useState } from "react"

export type WalletStateType = "unconnected" | "new_wallet" | "depositor" | "business" | "both"

type WalletStateContextType = {
  state: WalletStateType
  setState: (s: WalletStateType) => void
}

const WalletStateContext = createContext<WalletStateContextType>({
  state: "both",
  setState: () => {},
})

export function WalletStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<WalletStateType>("both")
  return (
    <WalletStateContext.Provider value={{ state, setState }}>
      {children}
    </WalletStateContext.Provider>
  )
}

export function useWalletState() {
  return useContext(WalletStateContext)
}
