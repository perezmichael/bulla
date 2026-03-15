"use client"

import { useWalletState, WalletStateType } from "@/contexts/wallet-state"
import { cn } from "@/lib/utils"
import { WifiOff, Wallet, TrendingUp, Building2, Users, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

const STATES: {
  value: WalletStateType
  label: string
  sub: string
  icon: React.ReactNode
}[] = [
  {
    value: "unconnected",
    label: "Unconnected",
    sub: "No wallet connected",
    icon: <WifiOff className="size-3.5" />,
  },
  {
    value: "new_wallet",
    label: "New Wallet",
    sub: "Connected, no history",
    icon: <Wallet className="size-3.5" />,
  },
  {
    value: "depositor",
    label: "Depositor",
    sub: "Investor with positions",
    icon: <TrendingUp className="size-3.5" />,
  },
  {
    value: "business",
    label: "Business",
    sub: "Bills & invoices only",
    icon: <Building2 className="size-3.5" />,
  },
  {
    value: "both",
    label: "Power User",
    sub: "Positions + billing",
    icon: <Users className="size-3.5" />,
  },
]

export function DemoSwitcher() {
  const { state, setState } = useWalletState()
  const [collapsed, setCollapsed] = useState(false)

  const current = STATES.find((s) => s.value === state)!

  return (
    <div
      className="fixed bottom-5 right-5 z-50 bg-[#0e1f23] text-white rounded-xl shadow-xl border border-white/10 overflow-hidden"
      style={{ minWidth: 200 }}
    >
      {/* Header */}
      <button
        onClick={() => setCollapsed((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2.5 border-b border-white/10 hover:bg-white/5 transition-colors"
        aria-label="Toggle demo switcher"
      >
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-amber-400 shrink-0" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Demo
          </span>
          <span className="text-[10px] text-gray-500">·</span>
          <span className="text-[10px] font-semibold text-white truncate max-w-[90px]">
            {current.label}
          </span>
        </div>
        {collapsed ? (
          <ChevronUp className="size-3.5 text-gray-500 shrink-0" />
        ) : (
          <ChevronDown className="size-3.5 text-gray-500 shrink-0" />
        )}
      </button>

      {/* State list */}
      {!collapsed && (
        <div className="p-1.5 flex flex-col gap-0.5">
          {STATES.map((s) => {
            const active = state === s.value
            return (
              <button
                key={s.value}
                onClick={() => setState(s.value)}
                className={cn(
                  "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors w-full group",
                  active
                    ? "bg-white/12 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/6"
                )}
              >
                <span
                  className={cn(
                    "shrink-0 transition-colors",
                    active ? "text-amber-400" : "text-gray-600 group-hover:text-gray-400"
                  )}
                >
                  {s.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold leading-tight">{s.label}</div>
                  <div className="text-[10px] text-gray-500 leading-tight truncate">{s.sub}</div>
                </div>
                {active && (
                  <span className="size-1.5 rounded-full bg-amber-400 shrink-0 ml-auto" />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
