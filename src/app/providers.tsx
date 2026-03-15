"use client"

import { WalletStateProvider } from "@/contexts/wallet-state"
import { DemoSwitcher } from "@/components/demo-switcher"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WalletStateProvider>
      {children}
      <DemoSwitcher />
    </WalletStateProvider>
  )
}
