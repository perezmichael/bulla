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
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

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
  <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
    <span className="text-[10px] font-bold text-gray-500 tracking-tight">TCS</span>
  </div>
)
const TARAMLogo = () => (
  <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M6 18L12 6l6 12" stroke="#E53E3E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 14h7" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
)
const NexusLogo = () => (
  <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
    <span className="text-[10px] font-bold text-blue-600 tracking-tight">NXS</span>
  </div>
)
const GalaxyLogo = () => (
  <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">
    <span className="text-[11px] font-bold text-indigo-600 tracking-tight">GD</span>
  </div>
)
const MeridianLogo = () => (
  <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
    <span className="text-[10px] font-bold text-emerald-600 tracking-tight">MRD</span>
  </div>
)
const ZeroHashLogo = () => (
  <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
    <span className="text-[10px] font-bold text-slate-500 tracking-tight">ZH</span>
  </div>
)

// ─── Position data ────────────────────────────────────────────────────────────

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

// ─── Bill data ────────────────────────────────────────────────────────────────

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

// ─── Activity data ────────────────────────────────────────────────────────────

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

const recentActivity: ActivityEvent[] = [
  { id: "a1", type: "invoice_repaid",  label: "Invoice repaid to pool",  sublabel: "TARAM · Mundra to Hamburg",       amount: "8,200 USDC",  incoming: true,  date: "Mar 13", poolId: "2" },
  { id: "a2", type: "invoice_repaid",  label: "Invoice repaid to pool",  sublabel: "ZeroHash Reserve · US Receivable",amount: "42,000 USDC", incoming: true,  date: "Mar 11", poolId: "6" },
  { id: "a3", type: "invoice_funded",  label: "Invoice funded",          sublabel: "Galaxy Credit · Corp receivable", amount: "18,500 USDC", incoming: false, date: "Mar 09", poolId: "4" },
  { id: "a4", type: "pool_deposit",    label: "New deposit",             sublabel: "0x6696be8 → TARAM Pool",          amount: "599.30 USDC", incoming: true,  date: "Feb 19", poolId: "2" },
  { id: "a5", type: "invoice_funded",  label: "Invoice funded",          sublabel: "Nexus · Supply chain SME",        amount: "9,400 USDC",  incoming: false, date: "Feb 14", poolId: "3" },
  { id: "a6", type: "invoice_repaid",  label: "Invoice repaid to pool",  sublabel: "Galaxy Credit · Net 30 settled",  amount: "22,300 USDC", incoming: true,  date: "Feb 11", poolId: "4" },
  { id: "a7", type: "pool_redemption", label: "Redemption processed",    sublabel: "0x6696be8 · TARAM Pool",          amount: "10.48 USDC",  incoming: false, date: "Feb 20", poolId: "2" },
]

// ─── Shared helpers ───────────────────────────────────────────────────────────

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

// ─── Portfolio summary ────────────────────────────────────────────────────────

function PortfolioSummary({ positions }: { positions: Position[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="bg-[#14282D] text-white rounded-lg px-4 py-3">
        <p className="text-xs text-gray-400 font-medium">Portfolio Value</p>
        <p className="text-xl font-bold mt-0.5">$112,415.42</p>
        <p className="text-xs text-gray-400 mt-0.5">{positions.length} active pools</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
        <p className="text-xs text-gray-500 font-medium">Total Deposited</p>
        <p className="text-xl font-bold text-gray-900 mt-0.5">$108,000.00</p>
        <p className="text-xs text-gray-400 mt-0.5">across all positions</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
        <p className="text-xs text-gray-500 font-medium">Yield Earned</p>
        <p className="text-xl font-bold text-green-700 mt-0.5">+$4,415.42</p>
        <div className="flex items-center gap-1 mt-0.5">
          <TrendingUp className="w-3 h-3 text-green-600" />
          <span className="text-xs text-green-600 font-semibold">+4.09% total return</span>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
        <p className="text-xs text-gray-500 font-medium">Avg. Target Yield</p>
        <p className="text-xl font-bold text-gray-900 mt-0.5">7.76%</p>
        <p className="text-xs text-gray-400 mt-0.5">weighted average</p>
      </div>
    </div>
  )
}

// ─── Quick actions ────────────────────────────────────────────────────────────

function QuickActions() {
  const actions = [
    { icon: <ArrowUpRight className="w-4 h-4" />, label: "Deposit to Pool", href: "/pools",   accent: true },
    { icon: <FileText className="w-4 h-4" />,     label: "Create Invoice",  href: "/create",  accent: false },
    { icon: <Link2 className="w-4 h-4" />,         label: "Request Payment", href: "/links",   accent: false },
    { icon: <RefreshCw className="w-4 h-4" />,     label: "View History",    href: "/explorer",accent: false },
  ]
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

// ─── Position card ────────────────────────────────────────────────────────────

function PositionCard({ pos }: { pos: Position }) {
  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm p-4 flex flex-col gap-3 min-w-[260px] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
      {/* Header */}
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
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      <Separator className="bg-gray-100" />

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
        <div>
          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Current Value</p>
          <p className="text-sm font-bold text-gray-900 mt-0.5">{pos.currentValue}</p>
          <p className="text-[10px] text-gray-400">deposited {pos.depositedValue}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Yield Earned</p>
          <p className={cn(
            "text-sm font-bold mt-0.5",
            parseFloat(pos.yieldEarned.replace(/[$,]/g, "")) > 0 ? "text-green-700" : "text-gray-400"
          )}>
            {pos.yieldEarned}
          </p>
          <div className="flex items-center gap-0.5 text-[10px] text-green-600 font-semibold mt-0.5">
            {parseFloat(pos.yieldEarned.replace(/[$,]/g, "")) > 0 && <TrendingUp className="w-2.5 h-2.5" />}
            {pos.yieldEarnedPct}
          </div>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Target Yield</p>
          <p className="text-sm font-bold text-green-700 mt-0.5">{pos.targetYield}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Price / Token</p>
          <p className="text-sm font-bold text-gray-900 mt-0.5">{pos.pricePerToken}</p>
          <p className="text-[10px] text-gray-400">{pos.daysActive}d active</p>
        </div>
      </div>

      {/* Utilization + maturity */}
      {pos.utilizationPct > 0 ? (
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] text-gray-500">
            <span className="font-medium">{pos.utilizationPct}% deployed</span>
            {pos.nextMaturityDate && (
              <span className="flex items-center gap-1 text-gray-400">
                <Clock className="w-2.5 h-2.5" />
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

      {/* CTAs */}
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

// ─── Bill row ─────────────────────────────────────────────────────────────────

function BillRow({ bill, type }: { bill: Bill; type: "payable" | "receivable" }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className={cn(
        "w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5",
        type === "payable" ? "bg-red-50 border border-red-100"
          : bill.overdue ? "bg-amber-50 border border-amber-200"
          : "bg-green-50 border border-green-100"
      )}>
        {bill.overdue
          ? <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
          : type === "payable"
            ? <ArrowUpRight className="w-3.5 h-3.5 text-red-500" />
            : <ArrowDownLeft className="w-3.5 h-3.5 text-green-600" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{bill.counterparty}</p>
        <p className="text-xs text-gray-500 truncate">{bill.description}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <ChainDot chain={bill.chain} />
          <span className={cn("text-[10px] font-medium flex items-center gap-0.5", bill.overdue ? "text-amber-600" : "text-gray-400")}>
            <Clock className="w-2.5 h-2.5" />
            {bill.overdue ? "Overdue · " : ""}{bill.dueDate}
          </span>
        </div>
      </div>
      <div className="text-right shrink-0">
        <p className={cn("text-sm font-bold", type === "payable" ? "text-gray-900" : "text-green-700")}>
          {bill.usdAmount}
        </p>
        <p className="text-[10px] text-gray-400">{bill.amount}</p>
      </div>
    </div>
  )
}

// ─── Activity feed ────────────────────────────────────────────────────────────

function ActivityIcon({ type }: { type: ActivityEvent["type"] }) {
  const base = "w-7 h-7 rounded-full flex items-center justify-center shrink-0"
  if (type === "invoice_repaid")
    return <div className={cn(base, "bg-green-50 border border-green-200")}><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /></div>
  if (type === "invoice_funded")
    return <div className={cn(base, "bg-blue-50 border border-blue-200")}><ArrowUpRight className="w-3.5 h-3.5 text-blue-600" /></div>
  if (type === "pool_deposit")
    return <div className={cn(base, "bg-amber-50 border border-amber-200")}><ArrowDownRight className="w-3.5 h-3.5 text-amber-600" /></div>
  return <div className={cn(base, "bg-gray-50 border border-gray-200")}><RefreshCw className="w-3.5 h-3.5 text-gray-500" /></div>
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [billsExpanded, setBillsExpanded] = useState(true)
  const overdueCount = [...payables, ...receivables].filter((b) => b.overdue).length

  return (
    <div className="space-y-6 pb-20">

      {/* ── Quick Actions ───────────────────────────────────────────────── */}
      <QuickActions />

      {/* ── Your Positions ──────────────────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900">Your Positions</h2>
          <Link href="/pools" className="flex items-center gap-1 text-sm font-medium text-brand-primary hover:underline">
            All pools <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Portfolio summary */}
        <PortfolioSummary positions={positions} />

        {/* Position cards */}
        <div className="mt-4 flex gap-4 overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-3 pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {positions.map((pos) => (
            <PositionCard key={pos.id} pos={pos} />
          ))}
        </div>
      </section>

      {/* ── Billing ─────────────────────────────────────────────────────── */}
      <section>
        <div
          className="flex items-center justify-between mb-3 cursor-pointer group"
          onClick={() => setBillsExpanded((v) => !v)}
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
              Full history <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <button className="text-gray-400 group-hover:text-gray-600 transition-colors">
              {billsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {!billsExpanded && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="border border-gray-200 rounded-lg bg-white px-4 py-3">
              <p className="text-xs text-gray-500 mb-1">Total Payable</p>
              <p className="text-base font-bold text-gray-900">$3,616.49</p>
              <p className="text-[10px] text-gray-400">{payables.length} bills</p>
            </div>
            <div className="border border-gray-200 rounded-lg bg-white px-4 py-3">
              <p className="text-xs text-gray-500 mb-1">Total Receivable</p>
              <p className="text-base font-bold text-green-700">$8,324.96</p>
              <p className="text-[10px] text-gray-400">{receivables.length} invoices</p>
            </div>
            {overdueCount > 0 && (
              <div className="border border-amber-200 rounded-lg bg-amber-50 px-4 py-3 col-span-2 flex items-center gap-3">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-amber-800">{overdueCount} overdue item</p>
                  <p className="text-[10px] text-amber-700">Click to expand and review</p>
                </div>
              </div>
            )}
          </div>
        )}

        {billsExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/60">
                <div>
                  <p className="text-sm font-bold text-gray-900">Top Payables</p>
                  <p className="text-xs font-semibold text-red-600 mt-0.5">Total: $3,616.49</p>
                </div>
                <Link href="/explorer" className="flex items-center gap-1 text-xs font-medium text-brand-primary hover:underline">
                  See all <ChevronRight className="w-3 h-3" />
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
                  See all <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="px-4">
                {receivables.map((bill) => <BillRow key={bill.id} bill={bill} type="receivable" />)}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── Recent Pool Activity ─────────────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900">Recent Pool Activity</h2>
          <Link href="/pools" className="flex items-center gap-1 text-sm font-medium text-brand-primary hover:underline">
            All pools <ChevronRight className="w-3.5 h-3.5" />
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
                  <p className={cn("text-sm font-bold", event.incoming ? "text-green-700" : "text-gray-700")}>
                    {event.incoming ? "+" : "−"}{event.amount}
                  </p>
                  <p className="text-[10px] text-gray-400">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Explorer CTA ────────────────────────────────────────────────── */}
      <section>
        <div className="border border-gray-200 rounded-lg bg-white px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-gray-900">Full Transaction History</p>
            <p className="text-xs text-gray-500 mt-0.5">Search and filter all payments, transfers, swaps, and more across all chains.</p>
          </div>
          <Link href="/explorer" className="shrink-0">
            <Button variant="outline" className="h-9 px-5 border-2 border-brand-dark text-brand-dark font-semibold text-sm hover:bg-gray-50 flex items-center gap-1.5">
              Open Explorer <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  )
}
