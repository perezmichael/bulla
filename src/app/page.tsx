"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  TrendingUp, ArrowUpRight, ArrowDownLeft,
  ChevronRight, ExternalLink,
  Clock, AlertCircle, Link2,
  ChevronDown, ChevronUp, CheckCircle2,
  ArrowDownRight, RefreshCw, FileText,
  Wallet, WifiOff, Building2, Sparkles,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useWalletState } from "@/contexts/wallet-state"

// ─── Chain icons ──────────────────────────────────────────────────────────────

function EthIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#627EEA" fillOpacity="0.12" />
      <path d="M16 5l-6.5 11.3 6.5 3.9 6.5-3.9L16 5z" fill="#627EEA" fillOpacity="0.7" />
      <path d="M16 22.4l-6.5-3.8 6.5 8.4 6.5-8.4-6.5 3.8z" fill="#627EEA" />
    </svg>
  )
}

function BaseIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#0052FF" fillOpacity="0.12" />
      <circle cx="16" cy="16" r="6" fill="#0052FF" fillOpacity="0.8" />
    </svg>
  )
}

function GnosisIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#04795B" fillOpacity="0.12" />
      <path d="M16 9a7 7 0 100 14A7 7 0 0016 9zm0 11a4 4 0 110-8 4 4 0 010 8z" fill="#04795B" fillOpacity="0.8" />
    </svg>
  )
}

function RedbellyIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#E53E3E" fillOpacity="0.12" />
      <circle cx="16" cy="16" r="6" fill="#E53E3E" fillOpacity="0.8" />
    </svg>
  )
}

function PolygonIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#8247E5" fillOpacity="0.12" />
      <path d="M20.5 12.8l-3.8-2.2c-.4-.2-1-.2-1.4 0l-3.8 2.2c-.4.2-.7.7-.7 1.2v4.3c0 .5.3 1 .7 1.2l3.8 2.2c.4.2 1 .2 1.4 0l3.8-2.2c.4-.2.7-.7.7-1.2V14c0-.5-.3-1-.7-1.2z" fill="#8247E5" fillOpacity="0.8" />
    </svg>
  )
}

// ─── Pool logos ───────────────────────────────────────────────────────────────

const TCSLogo = () => (
  <div className="size-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
    <span className="text-[10px] font-bold text-gray-500 tracking-tight">TCS</span>
  </div>
)
const TARAMLogo = () => (
  <div className="size-10 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M6 18L12 6l6 12" stroke="#E53E3E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 14h7" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
)
const NexusLogo = () => (
  <div className="size-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
    <span className="text-[10px] font-bold text-blue-600 tracking-tight">NXS</span>
  </div>
)
const GalaxyLogo = () => (
  <div className="size-10 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">
    <span className="text-[11px] font-bold text-indigo-600 tracking-tight">GD</span>
  </div>
)
const MeridianLogo = () => (
  <div className="size-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
    <span className="text-[10px] font-bold text-emerald-600 tracking-tight">MRD</span>
  </div>
)
const ZeroHashLogo = () => (
  <div className="size-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
    <span className="text-[10px] font-bold text-slate-500 tracking-tight">ZH</span>
  </div>
)

// ─── Types ────────────────────────────────────────────────────────────────────

type Network = "Ethereum" | "Redbelly" | "Base" | "Polygon"

type Position = {
  id: string
  shortName: string
  network: Network
  tokenSymbol: string
  tokensHeld: string
  currentValue: string
  depositedValue: string
  yieldEarned: string
  yieldEarnedPct: string
  targetYield: string
  pricePerToken: string
  daysActive: number
  utilizationPct: number
  nextMaturityDate: string | null
  poolManager: string
  isNew: boolean
  logo: React.ReactNode
}

type Bill = {
  id: string
  counterparty: string
  description: string
  amount: string
  usdAmount: string
  dueDate: string
  overdue: boolean
  chain: "eth" | "base" | "gnosis"
}

type ActivityEvent = {
  id: string
  type: "invoice_repaid" | "invoice_funded" | "pool_deposit" | "pool_redemption"
  label: string
  sublabel: string
  amount: string
  incoming: boolean
  date: string
  poolId: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const positions: Position[] = [
  {
    id: "2",
    shortName: "TARAM Pool",
    network: "Redbelly",
    tokenSymbol: "BFT-TARAM",
    tokensHeld: "5,000.000",
    currentValue: "$5,240.00",
    depositedValue: "$5,000.00",
    yieldEarned: "$240.00",
    yieldEarnedPct: "+4.80%",
    targetYield: "15%",
    pricePerToken: "$1.048",
    daysActive: 170,
    utilizationPct: 93.9,
    nextMaturityDate: "May 7, 2026",
    poolManager: "TARAM Trade Engine",
    isNew: false,
    logo: <TARAMLogo />,
  },
  {
    id: "1",
    shortName: "TCS Settlement Pool",
    network: "Ethereum",
    tokenSymbol: "BFT-TCS-V2_1",
    tokensHeld: "15,000.000",
    currentValue: "$15,013.06",
    depositedValue: "$15,000.00",
    yieldEarned: "$13.06",
    yieldEarnedPct: "+0.09%",
    targetYield: "7.95%",
    pricePerToken: "$1.001",
    daysActive: 4,
    utilizationPct: 0,
    nextMaturityDate: null,
    poolManager: "TCS Blockchain Inc.",
    isNew: true,
    logo: <TCSLogo />,
  },
  {
    id: "3",
    shortName: "Nexus Supply Chain Pool",
    network: "Base",
    tokenSymbol: "BFT-NEXUS",
    tokensHeld: "10,000.000",
    currentValue: "$10,685.60",
    depositedValue: "$10,000.00",
    yieldEarned: "$685.60",
    yieldEarnedPct: "+6.86%",
    targetYield: "10.5%",
    pricePerToken: "$1.069",
    daysActive: 238,
    utilizationPct: 94.7,
    nextMaturityDate: "Apr 2, 2026",
    poolManager: "Nexus Capital Group",
    isNew: false,
    logo: <NexusLogo />,
  },
  {
    id: "4",
    shortName: "Galaxy Digital Credit Fund",
    network: "Ethereum",
    tokenSymbol: "BFT-GALAXY",
    tokensHeld: "25,000.000",
    currentValue: "$26,169.25",
    depositedValue: "$25,000.00",
    yieldEarned: "$1,169.25",
    yieldEarnedPct: "+4.68%",
    targetYield: "8.5%",
    pricePerToken: "$1.047",
    daysActive: 201,
    utilizationPct: 96.1,
    nextMaturityDate: "Mar 28, 2026",
    poolManager: "Galaxy Digital Inc.",
    isNew: false,
    logo: <GalaxyLogo />,
  },
  {
    id: "5",
    shortName: "Meridian Invoice Pool",
    network: "Polygon",
    tokenSymbol: "BFT-MRD",
    tokensHeld: "3,000.000",
    currentValue: "$3,082.85",
    depositedValue: "$3,000.00",
    yieldEarned: "$82.85",
    yieldEarnedPct: "+2.76%",
    targetYield: "12%",
    pricePerToken: "$1.028",
    daysActive: 84,
    utilizationPct: 78.5,
    nextMaturityDate: "Apr 18, 2026",
    poolManager: "Meridian Finance",
    isNew: false,
    logo: <MeridianLogo />,
  },
  {
    id: "6",
    shortName: "ZeroHash Yield Reserve",
    network: "Ethereum",
    tokenSymbol: "BFT-ZH",
    tokensHeld: "50,000.000",
    currentValue: "$52,224.66",
    depositedValue: "$50,000.00",
    yieldEarned: "$2,224.66",
    yieldEarnedPct: "+4.45%",
    targetYield: "5.8%",
    pricePerToken: "$1.044",
    daysActive: 280,
    utilizationPct: 99.2,
    nextMaturityDate: "Mar 22, 2026",
    poolManager: "ZeroHash Inc.",
    isNew: false,
    logo: <ZeroHashLogo />,
  },
]

const payables: Bill[] = [
  { id: "p1", counterparty: "tcsblockchain.com", description: "Settlement fee Q1",    amount: "2,500 USDC", usdAmount: "$2,500.00", dueDate: "Mar 20, 2026", overdue: false, chain: "eth" },
  { id: "p2", counterparty: "0xd52...3793",       description: "Vendor services",      amount: "850 USDC",   usdAmount: "$850.00",   dueDate: "Mar 15, 2026", overdue: false, chain: "gnosis" },
  { id: "p3", counterparty: "Bulla Network",      description: "Premium subscription", amount: "49 USDC",    usdAmount: "$49.00",    dueDate: "Mar 28, 2026", overdue: false, chain: "base" },
  { id: "p4", counterparty: "0x8a8...181f",        description: "Infrastructure fee",   amount: "0.05 ETH",   usdAmount: "$97.49",    dueDate: "Apr 1, 2026",  overdue: false, chain: "eth" },
  { id: "p5", counterparty: "SaaS Provider",      description: "Monthly plan",         amount: "120 USDC",   usdAmount: "$120.00",   dueDate: "Apr 5, 2026",  overdue: false, chain: "base" },
]

const receivables: Bill[] = [
  { id: "r1", counterparty: "GnosisSaf...",  description: "Consulting retainer",  amount: "5,000 USDC", usdAmount: "$5,000.00", dueDate: "Mar 16, 2026", overdue: false, chain: "gnosis" },
  { id: "r2", counterparty: "0x89e...5e6d", description: "Project milestone #2", amount: "1,200 USDC", usdAmount: "$1,200.00", dueDate: "Mar 22, 2026", overdue: false, chain: "base" },
  { id: "r3", counterparty: "0x902...8243", description: "Dev work — Phase 1",   amount: "0.5 ETH",    usdAmount: "$974.96",   dueDate: "Mar 31, 2026", overdue: false, chain: "eth" },
  { id: "r4", counterparty: "0x8aa...4e51", description: "Overdue license fee",  amount: "800 USDC",   usdAmount: "$800.00",   dueDate: "Mar 10, 2026", overdue: true,  chain: "gnosis" },
  { id: "r5", counterparty: "Unverified",   description: "Token sale proceeds",  amount: "350 USDC",   usdAmount: "$350.00",   dueDate: "Apr 2, 2026",  overdue: false, chain: "base" },
]

const recentActivity: ActivityEvent[] = [
  { id: "a1", type: "invoice_repaid",  label: "Invoice repaid to pool",  sublabel: "TARAM · Mundra to Hamburg",       amount: "8,200 USDC",  incoming: true,  date: "Mar 13", poolId: "2" },
  { id: "a2", type: "invoice_repaid",  label: "Invoice repaid to pool",  sublabel: "ZeroHash Reserve · US Receivable",amount: "42,000 USDC", incoming: true,  date: "Mar 11", poolId: "6" },
  { id: "a3", type: "invoice_funded",  label: "Invoice funded",          sublabel: "Galaxy Credit · Corp receivable", amount: "18,500 USDC", incoming: false, date: "Mar 09", poolId: "4" },
  { id: "a4", type: "pool_deposit",    label: "New deposit",             sublabel: "0x6696be8 → TARAM Pool",          amount: "599.30 USDC", incoming: true,  date: "Feb 19", poolId: "2" },
  { id: "a5", type: "invoice_funded",  label: "Invoice funded",          sublabel: "Nexus · Supply chain SME",        amount: "9,400 USDC",  incoming: false, date: "Feb 14", poolId: "3" },
  { id: "a6", type: "invoice_repaid",  label: "Invoice repaid to pool",  sublabel: "Galaxy Credit · Net 30 settled",  amount: "22,300 USDC", incoming: true,  date: "Feb 11", poolId: "4" },
  { id: "a7", type: "pool_redemption", label: "Redemption processed",    sublabel: "0x6696be8 · TARAM Pool",          amount: "10.48 USDC",  incoming: false, date: "Feb 20", poolId: "2" },
]

const PROTOCOL_STATS = [
  { label: "Total Value Locked", value: "$48.2M" },
  { label: "Active Pools",       value: "12" },
  { label: "Businesses",         value: "340+" },
  { label: "Networks",           value: "4" },
]

// ─── Shared sub-components ────────────────────────────────────────────────────

function NetworkBadge({ network }: { network: Network }) {
  const icons: Record<Network, React.ReactNode> = {
    Ethereum: <EthIcon size={13} />,
    Redbelly: <RedbellyIcon size={13} />,
    Base:     <BaseIcon size={13} />,
    Polygon:  <PolygonIcon size={13} />,
  }
  return (
    <div className="flex items-center gap-1">
      {icons[network]}
      <span className="text-xs text-gray-500">{network}</span>
    </div>
  )
}

function ChainDot({ chain }: { chain: "eth" | "base" | "gnosis" }) {
  if (chain === "eth")  return <EthIcon size={13} />
  if (chain === "base") return <BaseIcon size={13} />
  return <GnosisIcon size={13} />
}

function ActivityIcon({ type }: { type: ActivityEvent["type"] }) {
  const base = "size-7 rounded-full flex items-center justify-center shrink-0"
  if (type === "invoice_repaid")
    return <div className={cn(base, "bg-green-50 border border-green-200")}><CheckCircle2 className="size-3.5 text-green-600" /></div>
  if (type === "invoice_funded")
    return <div className={cn(base, "bg-blue-50 border border-blue-200")}><ArrowUpRight className="size-3.5 text-blue-600" /></div>
  if (type === "pool_deposit")
    return <div className={cn(base, "bg-amber-50 border border-amber-200")}><ArrowDownRight className="size-3.5 text-amber-600" /></div>
  return <div className={cn(base, "bg-gray-50 border border-gray-200")}><RefreshCw className="size-3.5 text-gray-500" /></div>
}

function QuickActionBar({ actions }: {
  actions: { icon: React.ReactNode; label: string; href: string; accent?: boolean }[]
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {actions.map((a) => (
        <Link key={a.label} href={a.href}>
          <div className={cn(
            "flex items-center gap-2.5 px-4 py-3 rounded-lg border font-medium text-sm transition-colors cursor-pointer",
            a.accent
              ? "bg-brand-primary border-brand-primary text-white hover:bg-orange-600"
              : "bg-white border-gray-200 text-gray-700 hover:border-brand-dark hover:text-brand-dark"
          )}>
            {a.icon}
            {a.label}
          </div>
        </Link>
      ))}
    </div>
  )
}

function PortfolioSummary() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="bg-[#14282D] text-white rounded-lg px-4 py-3">
        <p className="text-xs text-gray-400 font-medium">Portfolio Value</p>
        <p className="text-xl font-bold tabular-nums mt-0.5">$112,415.42</p>
        <p className="text-xs text-gray-400 mt-0.5">{positions.length} active pools</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
        <p className="text-xs text-gray-500 font-medium">Total Deposited</p>
        <p className="text-xl font-bold text-gray-900 tabular-nums mt-0.5">$108,000.00</p>
        <p className="text-xs text-gray-400 mt-0.5">across all positions</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
        <p className="text-xs text-gray-500 font-medium">Yield Earned</p>
        <p className="text-xl font-bold text-green-700 tabular-nums mt-0.5">+$4,415.42</p>
        <div className="flex items-center gap-1 mt-0.5">
          <TrendingUp className="size-3 text-green-600" />
          <span className="text-xs text-green-600 font-semibold">+4.09% total return</span>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
        <p className="text-xs text-gray-500 font-medium">Avg. Target Yield</p>
        <p className="text-xl font-bold text-gray-900 tabular-nums mt-0.5">7.76%</p>
        <p className="text-xs text-gray-400 mt-0.5">weighted average</p>
      </div>
    </div>
  )
}

function PositionCard({ pos }: { pos: Position }) {
  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm p-4 flex flex-col gap-3 min-w-[260px] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
      <div className="flex items-start gap-3">
        {pos.logo}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-gray-900 leading-tight truncate">{pos.shortName}</p>
            {pos.isNew && (
              <span className="shrink-0 text-[9px] font-bold text-green-700 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-full">
                NEW
              </span>
            )}
          </div>
          <NetworkBadge network={pos.network} />
        </div>
        <Link href={`/pools/${pos.id}`} className="shrink-0 text-gray-400 hover:text-brand-primary transition-colors">
          <ExternalLink className="size-4" />
        </Link>
      </div>

      <Separator className="bg-gray-100" />

      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
        <div>
          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Current Value</p>
          <p className="text-sm font-bold text-gray-900 tabular-nums mt-0.5">{pos.currentValue}</p>
          <p className="text-[10px] text-gray-400">deposited {pos.depositedValue}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Yield Earned</p>
          <p className={cn(
            "text-sm font-bold tabular-nums mt-0.5",
            parseFloat(pos.yieldEarned.replace(/[$,]/g, "")) > 0 ? "text-green-700" : "text-gray-400"
          )}>
            {pos.yieldEarned}
          </p>
          <div className="flex items-center gap-0.5 text-[10px] text-green-600 font-semibold mt-0.5">
            {parseFloat(pos.yieldEarned.replace(/[$,]/g, "")) > 0 && <TrendingUp className="size-2.5" />}
            {pos.yieldEarnedPct}
          </div>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Target Yield</p>
          <p className="text-sm font-bold text-green-700 mt-0.5">{pos.targetYield}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Price / Token</p>
          <p className="text-sm font-bold text-gray-900 tabular-nums mt-0.5">{pos.pricePerToken}</p>
          <p className="text-[10px] text-gray-400">{pos.daysActive}d active</p>
        </div>
      </div>

      {pos.utilizationPct > 0 ? (
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] text-gray-500">
            <span className="font-medium">{pos.utilizationPct}% deployed</span>
            {pos.nextMaturityDate && (
              <span className="flex items-center gap-1 text-gray-400">
                <Clock className="size-2.5" />
                {pos.nextMaturityDate}
              </span>
            )}
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pos.utilizationPct}%` }} />
          </div>
        </div>
      ) : (
        <div className="text-[10px] text-gray-400 bg-gray-50 rounded px-2 py-1.5">
          Pool just launched — deploying capital now
        </div>
      )}

      <div className="flex gap-2 mt-auto">
        <Link href={`/pools/${pos.id}`} className="flex-1">
          <Button variant="outline" className="w-full h-8 text-xs font-semibold border-brand-dark text-brand-dark hover:bg-gray-50">
            View Pool
          </Button>
        </Link>
        <Button variant="outline" className="flex-1 h-8 text-xs font-semibold border-amber-300 text-amber-700 bg-amber-50 hover:bg-amber-100">
          Deposit
        </Button>
      </div>
    </div>
  )
}

function FeaturedPoolCard({ pool }: { pool: Position }) {
  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm p-4 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        {pool.logo}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-gray-900 leading-tight truncate">{pool.shortName}</p>
          <NetworkBadge network={pool.network} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <div>
          <p className="text-[10px] text-gray-500 font-medium uppercase">Target Yield</p>
          <p className="text-sm font-bold text-green-700 mt-0.5">{pool.targetYield}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 font-medium uppercase">Utilization</p>
          <p className="text-sm font-bold text-gray-900 tabular-nums mt-0.5">{pool.utilizationPct}%</p>
        </div>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pool.utilizationPct}%` }} />
      </div>
      <Link href={`/pools/${pool.id}`}>
        <Button variant="outline" className="w-full h-8 text-xs font-semibold border-brand-dark text-brand-dark hover:bg-gray-50">
          View Pool
        </Button>
      </Link>
    </div>
  )
}

function BillRow({ bill, type }: { bill: Bill; type: "payable" | "receivable" }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className={cn(
        "size-7 rounded-full flex items-center justify-center shrink-0 mt-0.5",
        type === "payable" ? "bg-red-50 border border-red-100"
          : bill.overdue ? "bg-amber-50 border border-amber-200"
          : "bg-green-50 border border-green-100"
      )}>
        {bill.overdue
          ? <AlertCircle className="size-3.5 text-amber-500" />
          : type === "payable"
            ? <ArrowUpRight className="size-3.5 text-red-500" />
            : <ArrowDownLeft className="size-3.5 text-green-600" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{bill.counterparty}</p>
        <p className="text-xs text-gray-500 truncate">{bill.description}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <ChainDot chain={bill.chain} />
          <span className={cn("text-[10px] font-medium flex items-center gap-0.5", bill.overdue ? "text-amber-600" : "text-gray-400")}>
            <Clock className="size-2.5" />
            {bill.overdue ? "Overdue · " : ""}{bill.dueDate}
          </span>
        </div>
      </div>
      <div className="text-right shrink-0">
        <p className={cn("text-sm font-bold tabular-nums", type === "payable" ? "text-gray-900" : "text-green-700")}>
          {bill.usdAmount}
        </p>
        <p className="text-[10px] text-gray-400">{bill.amount}</p>
      </div>
    </div>
  )
}

function BillingPanel() {
  const [expanded, setExpanded] = useState(true)
  const overdueCount = [...payables, ...receivables].filter((b) => b.overdue).length

  return (
    <section>
      <div
        className="flex items-center justify-between mb-3 cursor-pointer group"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-gray-900">Billing</h2>
          {overdueCount > 0 && (
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full">
              {overdueCount} overdue
            </span>
          )}
          <span className="text-xs text-gray-400 font-medium hidden sm:inline">
            Net: <span className="text-green-700 font-semibold">+$4,708.47</span> incoming
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/explorer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-sm font-medium text-brand-primary hover:underline"
          >
            Full history <ChevronRight className="size-3.5" />
          </Link>
          <button className="text-gray-400 group-hover:text-gray-600 transition-colors" aria-label="Toggle billing section">
            {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
        </div>
      </div>

      {!expanded && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="border border-gray-200 rounded-lg bg-white px-4 py-3">
            <p className="text-xs text-gray-500 mb-1">Total Payable</p>
            <p className="text-base font-bold text-gray-900 tabular-nums">$3,616.49</p>
            <p className="text-[10px] text-gray-400">{payables.length} bills</p>
          </div>
          <div className="border border-gray-200 rounded-lg bg-white px-4 py-3">
            <p className="text-xs text-gray-500 mb-1">Total Receivable</p>
            <p className="text-base font-bold text-green-700 tabular-nums">$8,324.96</p>
            <p className="text-[10px] text-gray-400">{receivables.length} invoices</p>
          </div>
          {overdueCount > 0 && (
            <div className="border border-amber-200 rounded-lg bg-amber-50 px-4 py-3 col-span-2 flex items-center gap-3">
              <AlertCircle className="size-4 text-amber-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-amber-800">{overdueCount} overdue item</p>
                <p className="text-[10px] text-amber-700">Click to expand and review</p>
              </div>
            </div>
          )}
        </div>
      )}

      {expanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/60">
              <div>
                <p className="text-sm font-bold text-gray-900">Top Payables</p>
                <p className="text-xs font-semibold text-red-600 mt-0.5">Total: $3,616.49</p>
              </div>
              <Link href="/explorer" className="flex items-center gap-1 text-xs font-medium text-brand-primary hover:underline">
                See all <ChevronRight className="size-3" />
              </Link>
            </div>
            <div className="px-4">
              {payables.map((bill) => <BillRow key={bill.id} bill={bill} type="payable" />)}
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/60">
              <div>
                <p className="text-sm font-bold text-gray-900">Top Receivables</p>
                <p className="text-xs font-semibold text-green-700 mt-0.5">Total: $8,324.96</p>
              </div>
              <Link href="/explorer" className="flex items-center gap-1 text-xs font-medium text-brand-primary hover:underline">
                See all <ChevronRight className="size-3" />
              </Link>
            </div>
            <div className="px-4">
              {receivables.map((bill) => <BillRow key={bill.id} bill={bill} type="receivable" />)}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function ActivityFeed() {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-gray-900">Recent Pool Activity</h2>
        <Link href="/explorer" className="flex items-center gap-1 text-sm font-medium text-brand-primary hover:underline">
          Full history <ChevronRight className="size-3.5" />
        </Link>
      </div>
      <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-50">
          {recentActivity.map((event) => (
            <div key={event.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50/50 transition-colors">
              <ActivityIcon type={event.type} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{event.label}</p>
                <p className="text-xs text-gray-500 truncate">{event.sublabel}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={cn("text-sm font-bold tabular-nums", event.incoming ? "text-green-700" : "text-gray-700")}>
                  {event.incoming ? "+" : "−"}{event.amount}
                </p>
                <p className="text-[10px] text-gray-400">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExplorerCTA() {
  return (
    <section>
      <div className="border border-gray-200 rounded-lg bg-white px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-gray-900">Full Transaction History</p>
          <p className="text-xs text-gray-500 mt-0.5 text-pretty">Search and filter all payments, transfers, swaps, and more across all chains.</p>
        </div>
        <Link href="/explorer" className="shrink-0">
          <Button variant="outline" className="h-9 px-5 border-2 border-brand-dark text-brand-dark font-semibold text-sm hover:bg-gray-50 flex items-center gap-1.5">
            Open Explorer <ExternalLink className="size-3.5" />
          </Button>
        </Link>
      </div>
    </section>
  )
}

// ─── View: Unconnected ────────────────────────────────────────────────────────

function UnconnectedView() {
  const featuredPools = [positions[0], positions[3], positions[5]]

  return (
    <div className="space-y-10 pb-20">
      {/* Hero */}
      <div className="text-center py-10 space-y-5">
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full">
          <Sparkles className="size-3.5" />
          On-chain working capital finance
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 text-balance">
          Earn yield on idle capital.<br />
          <span className="text-brand-primary">Get paid faster.</span>
        </h1>
        <p className="text-gray-500 text-base max-w-xl mx-auto text-pretty leading-relaxed">
          Bulla connects investors with real-world invoice pools, giving businesses access to working capital and depositors above-market stablecoin yields.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button className="bg-brand-primary hover:bg-orange-600 text-white h-11 px-8 text-sm font-semibold">
            Connect Wallet
          </Button>
          <Link href="/pools">
            <Button variant="outline" className="h-11 px-8 text-sm font-semibold border-gray-300">
              Browse Pools
            </Button>
          </Link>
        </div>
      </div>

      {/* Protocol stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PROTOCOL_STATS.map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-lg px-4 py-4 text-center">
            <p className="text-2xl font-bold text-gray-900 tabular-nums">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Featured pools */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900">Featured Pools</h2>
          <Link href="/pools" className="flex items-center gap-1 text-sm font-medium text-brand-primary hover:underline">
            View all <ChevronRight className="size-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {featuredPools.map((pool) => (
            <FeaturedPoolCard key={pool.id} pool={pool} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#14282D] rounded-xl p-6 text-white">
        <h2 className="text-base font-bold mb-5 text-balance">How Bulla Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              n: "1",
              title: "Choose a Pool",
              desc: "Browse curated invoice pools managed by vetted originators across multiple networks.",
            },
            {
              n: "2",
              title: "Deposit Stablecoins",
              desc: "Deposit USDC or other stablecoins and receive BFT tokens representing your share.",
            },
            {
              n: "3",
              title: "Earn Yield",
              desc: "Your capital funds real invoices. As they're repaid, your token value grows.",
            },
          ].map((step) => (
            <div key={step.n} className="flex gap-3">
              <div className="size-7 rounded-full bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-amber-400">{step.n}</span>
              </div>
              <div>
                <p className="text-sm font-bold mb-1">{step.title}</p>
                <p className="text-xs text-gray-400 text-pretty leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-5 border-t border-white/10">
          <Button className="bg-brand-primary hover:bg-orange-600 text-white h-10 px-6 text-sm font-semibold">
            Connect Wallet to Get Started
          </Button>
        </div>
      </section>
    </div>
  )
}

// ─── View: New Wallet ─────────────────────────────────────────────────────────

function NewWalletView() {
  const featuredPools = [positions[0], positions[3], positions[5]]

  return (
    <div className="space-y-6 pb-20">
      {/* Welcome banner */}
      <div className="bg-[#14282D] text-white rounded-xl p-5 flex items-start gap-4">
        <div className="size-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
          <Wallet className="size-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-400">Connected as</p>
          <p className="font-mono text-sm text-white">0x6696...be8f</p>
          <p className="text-xs text-gray-400 mt-1 text-pretty">
            No activity yet. Choose how you'd like to use Bulla below.
          </p>
        </div>
      </div>

      {/* Path selection */}
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-3">What would you like to do?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/pools">
            <div className="border-2 border-gray-200 hover:border-brand-primary rounded-xl p-5 cursor-pointer transition-colors group h-full">
              <div className="size-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center mb-3">
                <TrendingUp className="size-5 text-amber-600" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-brand-primary transition-colors">
                Invest in Pools
              </h3>
              <p className="text-xs text-gray-500 mt-1.5 text-pretty leading-relaxed">
                Deposit stablecoins into curated invoice pools and earn above-market yield. Pools target 6–15% APY, backed by real-world receivables.
              </p>
              <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-brand-primary">
                Browse pools <ChevronRight className="size-3.5" />
              </div>
            </div>
          </Link>

          <Link href="/contacts">
            <div className="border-2 border-gray-200 hover:border-brand-primary rounded-xl p-5 cursor-pointer transition-colors group h-full">
              <div className="size-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center mb-3">
                <FileText className="size-5 text-blue-600" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-brand-primary transition-colors">
                Manage Payments
              </h3>
              <p className="text-xs text-gray-500 mt-1.5 text-pretty leading-relaxed">
                Create on-chain invoices, request payments via link, and track what's owed to you — all fully verifiable on the blockchain.
              </p>
              <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-brand-primary">
                Create invoice <ChevronRight className="size-3.5" />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Available pools */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900">Available Pools</h2>
          <Link href="/pools" className="flex items-center gap-1 text-sm font-medium text-brand-primary hover:underline">
            View all <ChevronRight className="size-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {featuredPools.map((pool) => (
            <FeaturedPoolCard key={pool.id} pool={pool} />
          ))}
        </div>
      </section>

      {/* Bulla explainer strip */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          {
            icon: <CheckCircle2 className="size-4 text-green-600" />,
            title: "On-chain & auditable",
            desc: "Every transaction is recorded on-chain and independently verifiable.",
          },
          {
            icon: <RefreshCw className="size-4 text-blue-600" />,
            title: "FIFO redemption queue",
            desc: "Redemption requests are processed in order with contractual timing guarantees.",
          },
          {
            icon: <TrendingUp className="size-4 text-amber-600" />,
            title: "Real-world yield",
            desc: "Yield comes from real invoice repayments, not token emissions.",
          },
        ].map((item) => (
          <div key={item.title} className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex gap-3 items-start">
            <div className="mt-0.5 shrink-0">{item.icon}</div>
            <div>
              <p className="text-xs font-bold text-gray-900">{item.title}</p>
              <p className="text-[11px] text-gray-500 mt-0.5 text-pretty leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

// ─── View: Depositor ──────────────────────────────────────────────────────────

// Upcoming maturities sorted by urgency (days out from Mar 15, 2026)
const maturityChips = [
  { id: "6", poolName: "ZeroHash", date: "Mar 22", daysOut: 7  },
  { id: "4", poolName: "Galaxy",   date: "Mar 28", daysOut: 13 },
  { id: "3", poolName: "Nexus",    date: "Apr 2",  daysOut: 18 },
  { id: "5", poolName: "Meridian", date: "Apr 18", daysOut: 34 },
  { id: "2", poolName: "TARAM",    date: "May 7",  daysOut: 53 },
]

function PositionRow({ pos, last }: { pos: Position; last: boolean }) {
  return (
    <Link href={`/pools/${pos.id}`}>
      <div className={cn(
        "flex items-center gap-4 px-4 py-3.5 hover:bg-gray-50/70 transition-colors cursor-pointer group",
        !last && "border-b border-gray-100"
      )}>
        {/* Logo + Name */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {pos.logo}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-bold text-gray-900 truncate">{pos.shortName}</p>
              {pos.isNew && (
                <span className="shrink-0 text-[9px] font-bold text-green-700 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-full">
                  NEW
                </span>
              )}
            </div>
            <NetworkBadge network={pos.network} />
          </div>
        </div>

        {/* Current Value */}
        <div className="hidden sm:block text-right shrink-0 w-28">
          <p className="text-sm font-bold text-gray-900 tabular-nums">{pos.currentValue}</p>
          <p className="text-[10px] text-gray-400 tabular-nums">dep. {pos.depositedValue}</p>
        </div>

        {/* Yield Earned */}
        <div className="text-right shrink-0 w-24">
          <p className={cn(
            "text-sm font-bold tabular-nums",
            parseFloat(pos.yieldEarned.replace(/[$,]/g, "")) > 0 ? "text-green-700" : "text-gray-400"
          )}>
            {pos.yieldEarned}
          </p>
          <p className="text-[10px] text-green-600 font-semibold">{pos.yieldEarnedPct}</p>
        </div>

        {/* Target Yield */}
        <div className="hidden md:block text-right shrink-0 w-16">
          <p className="text-[10px] text-gray-400 font-medium">Target</p>
          <p className="text-sm font-bold text-gray-700">{pos.targetYield}</p>
        </div>

        {/* Status: utilization + maturity */}
        <div className="hidden lg:block shrink-0 w-36">
          {pos.utilizationPct > 0 ? (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] text-gray-500">
                <span>{pos.utilizationPct}%</span>
                {pos.nextMaturityDate && (
                  <span className="flex items-center gap-0.5 text-gray-400">
                    <Clock className="size-2.5" />
                    {pos.nextMaturityDate}
                  </span>
                )}
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pos.utilizationPct}%` }} />
              </div>
            </div>
          ) : (
            <div className="text-[10px] text-gray-400 bg-gray-50 rounded px-2 py-1">
              Deploying capital
            </div>
          )}
        </div>

        <ChevronRight className="size-4 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
      </div>
    </Link>
  )
}

function DepositorView() {
  return (
    <div className="space-y-5 pb-20">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="bg-[#14282D] text-white rounded-xl px-5 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs text-gray-400 font-medium mb-1">Portfolio Value</p>
          <div className="flex items-baseline gap-3 flex-wrap">
            <p className="text-3xl font-bold tabular-nums">$112,415.42</p>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="size-3.5 text-green-400" />
              <span className="text-green-400 font-semibold text-sm tabular-nums">+$4,415.42 (4.09%)</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1.5">
            $108,000 deposited · 6 active pools · 7.76% avg yield
          </p>
        </div>
        <div className="flex gap-2 sm:flex-col">
          <Link href="/pools">
            <Button className="bg-brand-primary hover:bg-orange-600 text-white h-10 px-6 font-semibold text-sm whitespace-nowrap flex items-center gap-2">
              <ArrowUpRight className="size-4" />
              Deposit More
            </Button>
          </Link>
          <Link href="/explorer">
            <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10 h-10 px-4 text-sm whitespace-nowrap">
              History
            </Button>
          </Link>
        </div>
      </div>

      {/* ── Maturity strip ───────────────────────────────────────────── */}
      <section>
        <div className="flex items-center gap-2 mb-2.5">
          <Clock className="size-3.5 text-amber-500" />
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Upcoming Maturities</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {maturityChips.map((chip) => (
            <Link key={chip.id} href={`/pools/${chip.id}`} className="shrink-0">
              <div className={cn(
                "flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition-colors",
                chip.daysOut <= 14
                  ? "bg-amber-50 border-amber-200 hover:border-amber-400"
                  : "bg-white border-gray-200 hover:border-gray-300"
              )}>
                <span className={cn(
                  "text-xs font-bold",
                  chip.daysOut <= 14 ? "text-amber-800" : "text-gray-700"
                )}>
                  {chip.poolName}
                </span>
                <span className={cn(
                  "text-xs",
                  chip.daysOut <= 14 ? "text-amber-600" : "text-gray-400"
                )}>
                  {chip.date}
                </span>
                {chip.daysOut <= 14 && (
                  <span className="text-[9px] font-bold bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded-full">
                    {chip.daysOut}d
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Positions table ──────────────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900">Your Positions</h2>
          <Link href="/pools" className="flex items-center gap-1 text-sm font-medium text-brand-primary hover:underline">
            All pools <ChevronRight className="size-3.5" />
          </Link>
        </div>

        {/* Column headers — desktop only */}
        <div className="hidden lg:flex items-center gap-4 px-4 pb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
          <div className="flex-1">Pool</div>
          <div className="w-28 text-right">Value</div>
          <div className="w-24 text-right">Return</div>
          <div className="w-16 text-right">Target</div>
          <div className="w-36">Status</div>
          <div className="w-4" />
        </div>

        <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
          {positions.map((pos, i) => (
            <PositionRow key={pos.id} pos={pos} last={i === positions.length - 1} />
          ))}
        </div>
      </section>

      {/* ── Compact activity ─────────────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900">Recent Activity</h2>
          <Link href="/explorer" className="flex items-center gap-1 text-sm font-medium text-brand-primary hover:underline">
            Full history <ChevronRight className="size-3.5" />
          </Link>
        </div>
        <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-50">
            {recentActivity.slice(0, 4).map((event) => (
              <div key={event.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50/50 transition-colors">
                <ActivityIcon type={event.type} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{event.label}</p>
                  <p className="text-xs text-gray-500 truncate">{event.sublabel}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={cn("text-sm font-bold tabular-nums", event.incoming ? "text-green-700" : "text-gray-700")}>
                    {event.incoming ? "+" : "−"}{event.amount}
                  </p>
                  <p className="text-[10px] text-gray-400">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

// ─── View: Business ───────────────────────────────────────────────────────────

function BusinessView() {
  const overdueCount = [...payables, ...receivables].filter((b) => b.overdue).length

  const actions = [
    { icon: <FileText className="size-4" />,      label: "Create Invoice",  href: "/contacts", accent: true },
    { icon: <Link2 className="size-4" />,          label: "Request Payment", href: "/links",    accent: false },
    { icon: <ArrowUpRight className="size-4" />,  label: "Pay a Bill",      href: "/explorer", accent: false },
    { icon: <RefreshCw className="size-4" />,      label: "History",         href: "/explorer", accent: false },
  ]

  return (
    <div className="space-y-6 pb-20">
      {/* Net position summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#14282D] text-white rounded-lg px-4 py-3">
          <p className="text-xs text-gray-400 font-medium">Net Position</p>
          <p className="text-xl font-bold tabular-nums mt-0.5">+$4,708.47</p>
          <p className="text-xs text-gray-400 mt-0.5">more coming in</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
          <p className="text-xs text-gray-500 font-medium">Total Payable</p>
          <p className="text-xl font-bold text-gray-900 tabular-nums mt-0.5">$3,616.49</p>
          <p className="text-[10px] text-gray-400">{payables.length} bills</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
          <p className="text-xs text-gray-500 font-medium">Total Receivable</p>
          <p className="text-xl font-bold text-green-700 tabular-nums mt-0.5">$8,324.96</p>
          <p className="text-[10px] text-gray-400">{receivables.length} invoices</p>
        </div>
        <div className={cn(
          "rounded-lg px-4 py-3",
          overdueCount > 0 ? "bg-amber-50 border border-amber-200" : "bg-white border border-gray-200"
        )}>
          <p className={cn("text-xs font-medium", overdueCount > 0 ? "text-amber-700" : "text-gray-500")}>
            Overdue
          </p>
          <p className={cn("text-xl font-bold tabular-nums mt-0.5", overdueCount > 0 ? "text-amber-800" : "text-gray-900")}>
            {overdueCount > 0 ? `${overdueCount} item` : "None"}
          </p>
          <p className={cn("text-[10px] mt-0.5", overdueCount > 0 ? "text-amber-600" : "text-gray-400")}>
            {overdueCount > 0 ? "Needs attention" : "All on time"}
          </p>
        </div>
      </div>

      <QuickActionBar actions={actions} />

      {/* Billing panels */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900">Billing</h2>
          <Link href="/explorer" className="flex items-center gap-1 text-sm font-medium text-brand-primary hover:underline">
            Full history <ChevronRight className="size-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/60">
              <div>
                <p className="text-sm font-bold text-gray-900">Payables</p>
                <p className="text-xs font-semibold text-red-600 mt-0.5">Total: $3,616.49</p>
              </div>
              <Link href="/contacts" className="flex items-center gap-1 text-xs font-medium text-brand-primary hover:underline">
                + New bill
              </Link>
            </div>
            <div className="px-4">
              {payables.map((bill) => <BillRow key={bill.id} bill={bill} type="payable" />)}
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/60">
              <div>
                <p className="text-sm font-bold text-gray-900">Receivables</p>
                <p className="text-xs font-semibold text-green-700 mt-0.5">Total: $8,324.96</p>
              </div>
              <Link href="/links" className="flex items-center gap-1 text-xs font-medium text-brand-primary hover:underline">
                + Request
              </Link>
            </div>
            <div className="px-4">
              {receivables.map((bill) => <BillRow key={bill.id} bill={bill} type="receivable" />)}
            </div>
          </div>
        </div>
      </section>

      {/* Pool discovery CTA */}
      <section>
        <div className="border border-gray-200 rounded-lg bg-white px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="size-4 text-green-600" />
              <p className="text-sm font-semibold text-gray-900">Earn yield on idle capital</p>
            </div>
            <p className="text-xs text-gray-500 text-pretty">
              Your stablecoins can earn 6–15% APY in Bulla's curated invoice pools while sitting unused.
            </p>
          </div>
          <Link href="/pools" className="shrink-0">
            <Button className="bg-brand-primary hover:bg-orange-600 text-white h-9 px-5 font-semibold text-sm flex items-center gap-1.5">
              Browse Pools <ChevronRight className="size-3.5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

// ─── View: Both (Power User) ──────────────────────────────────────────────────

function BothView() {
  const actions = [
    { icon: <ArrowUpRight className="size-4" />, label: "Deposit to Pool",  href: "/pools",    accent: true },
    { icon: <FileText className="size-4" />,      label: "Create Invoice",  href: "/contacts", accent: false },
    { icon: <Link2 className="size-4" />,          label: "Request Payment", href: "/links",    accent: false },
    { icon: <RefreshCw className="size-4" />,      label: "View History",    href: "/explorer", accent: false },
  ]

  return (
    <div className="space-y-6 pb-20">
      <QuickActionBar actions={actions} />

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900">Your Positions</h2>
          <Link href="/pools" className="flex items-center gap-1 text-sm font-medium text-brand-primary hover:underline">
            All pools <ChevronRight className="size-3.5" />
          </Link>
        </div>
        <PortfolioSummary />
        <div className="mt-4 flex gap-4 overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-3 pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {positions.map((pos) => (
            <PositionCard key={pos.id} pos={pos} />
          ))}
        </div>
      </section>

      <BillingPanel />
      <ActivityFeed />
      <ExplorerCTA />
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { state } = useWalletState()

  if (state === "unconnected") return <UnconnectedView />
  if (state === "new_wallet")  return <NewWalletView />
  if (state === "depositor")   return <DepositorView />
  if (state === "business")    return <BusinessView />
  return <BothView />
}
