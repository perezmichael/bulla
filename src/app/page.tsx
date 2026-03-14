"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft,
  ChevronRight, ExternalLink, Zap, FileText, Coins,
  ArrowRightLeft, Clock, AlertCircle,
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

// ─── Mock data ────────────────────────────────────────────────────────────────

type ChainBalance = {
  chain: "eth" | "base" | "gnosis"
  label: string
  amount: string
  icon: React.ReactNode
}

const chainBalances: ChainBalance[] = [
  { chain: "eth",    label: "Ethereum", amount: "$6,200.14", icon: <EthIcon size={14} /> },
  { chain: "base",   label: "Base",     amount: "$4,813.88", icon: <BaseIcon size={14} /> },
  { chain: "gnosis", label: "Gnosis",   amount: "$1,436.30", icon: <GnosisIcon size={14} /> },
]

type Position = {
  id: string
  poolName: string
  shortName: string
  network: "Ethereum" | "Redbelly"
  tokenSymbol: string
  tokensHeld: string
  currentValue: string
  targetYield: string
  pricePerToken: string
  pnlPercent: string
  pnlPositive: boolean
  logo: React.ReactNode
  hasPosition: boolean
}

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

const positions: Position[] = [
  {
    id: "2",
    poolName: "TARAM Funding Pool - Redbelly",
    shortName: "TARAM Pool",
    network: "Redbelly",
    tokenSymbol: "BFT-TARAM",
    tokensHeld: "5,000.000",
    currentValue: "$5,240.00",
    targetYield: "15%",
    pricePerToken: "$1.048",
    pnlPercent: "+4.80%",
    pnlPositive: true,
    logo: <TARAMLogo />,
    hasPosition: true,
  },
  {
    id: "1",
    poolName: "TCS Settlement Pool - Mainnet V2.1",
    shortName: "TCS Pool",
    network: "Ethereum",
    tokenSymbol: "BFT-TCS-V2_1",
    tokensHeld: "0.000",
    currentValue: "$0.00",
    targetYield: "7.95%",
    pricePerToken: "$1.000",
    pnlPercent: "0.00%",
    pnlPositive: true,
    logo: <TCSLogo />,
    hasPosition: false,
  },
]

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
  { id: "p1", counterparty: "tcsblockchain.com", description: "Settlement fee Q1",  amount: "2,500 USDC", usdAmount: "$2,500.00", dueDate: "Mar 20, 2026", overdue: false, chain: "eth" },
  { id: "p2", counterparty: "0xd52...3793",       description: "Vendor services",    amount: "850 USDC",   usdAmount: "$850.00",   dueDate: "Mar 15, 2026", overdue: false, chain: "gnosis" },
  { id: "p3", counterparty: "Bulla Network",      description: "Premium subscription",amount: "49 USDC",   usdAmount: "$49.00",   dueDate: "Mar 28, 2026", overdue: false, chain: "base" },
  { id: "p4", counterparty: "0x8a8...181f",       description: "Infrastructure fee",  amount: "0.05 ETH",  usdAmount: "$97.49",   dueDate: "Apr 1, 2026",  overdue: false, chain: "eth" },
  { id: "p5", counterparty: "SaaS Provider",      description: "Monthly plan",        amount: "120 USDC",  usdAmount: "$120.00",  dueDate: "Apr 5, 2026",  overdue: false, chain: "base" },
]

const receivables: Bill[] = [
  { id: "r1", counterparty: "GnosisSaf...",  description: "Consulting retainer",   amount: "5,000 USDC", usdAmount: "$5,000.00", dueDate: "Mar 16, 2026", overdue: false, chain: "gnosis" },
  { id: "r2", counterparty: "0x89e...5e6d", description: "Project milestone #2",  amount: "1,200 USDC", usdAmount: "$1,200.00", dueDate: "Mar 22, 2026", overdue: false, chain: "base" },
  { id: "r3", counterparty: "0x902...8243", description: "Dev work — Phase 1",    amount: "0.5 ETH",    usdAmount: "$974.96",  dueDate: "Mar 31, 2026", overdue: false, chain: "eth" },
  { id: "r4", counterparty: "0x8aa...4e51", description: "Overdue license fee",   amount: "800 USDC",   usdAmount: "$800.00",  dueDate: "Mar 10, 2026", overdue: true,  chain: "gnosis" },
  { id: "r5", counterparty: "Unverified",   description: "Token sale proceeds",   amount: "350 USDC",   usdAmount: "$350.00",  dueDate: "Apr 2, 2026",  overdue: false, chain: "base" },
]

type FeaturedPool = {
  id: string
  name: string
  shortName: string
  targetYield: string
  capitalAccount: string
  fundBalance: string
  network: "Ethereum" | "Redbelly"
  logo: React.ReactNode
  canDeposit: boolean
}

const featuredPools: FeaturedPool[] = [
  {
    id: "2",
    name: "TARAM Funding Pool - Redbelly",
    shortName: "TARAM Funding Pool",
    targetYield: "15%",
    capitalAccount: "106,882.073 USDC",
    fundBalance: "583.838 USDC",
    network: "Redbelly",
    logo: <TARAMLogo />,
    canDeposit: false,
  },
  {
    id: "1",
    name: "TCS Settlement Pool - Mainnet V2.1",
    shortName: "TCS Settlement Pool",
    targetYield: "7.95%",
    capitalAccount: "0.000 PYUSD",
    fundBalance: "0.000 PYUSD",
    network: "Ethereum",
    logo: <TCSLogo />,
    canDeposit: true,
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function ActionBtn({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
      <div className="w-11 h-11 rounded-full bg-white/15 border border-white/20 flex items-center justify-center group-hover:bg-white/25 transition-colors">
        {icon}
      </div>
      <span className="text-[10px] font-semibold text-white/80 uppercase tracking-wide">{label}</span>
    </div>
  )
}

function NetworkBadge({ network }: { network: "Ethereum" | "Redbelly" }) {
  return (
    <div className="flex items-center gap-1">
      {network === "Ethereum" ? <EthIcon size={13} /> : <RedbellyIcon size={13} />}
      <span className="text-xs text-gray-500">{network}</span>
    </div>
  )
}

function SectionHeader({ title, href, linkLabel = "View all" }: { title: string; href: string; linkLabel?: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-base font-bold text-gray-900">{title}</h2>
      <Link href={href} className="flex items-center gap-1 text-sm font-medium text-brand-primary hover:underline">
        {linkLabel} <ChevronRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  )
}

function ChainDot({ chain }: { chain: "eth" | "base" | "gnosis" }) {
  if (chain === "eth")    return <EthIcon size={13} />
  if (chain === "base")   return <BaseIcon size={13} />
  return <GnosisIcon size={13} />
}

// ─── Wallet Snapshot Bar ──────────────────────────────────────────────────────

function WalletSnapshot() {
  return (
    <div className="rounded-xl bg-brand-dark text-white p-5 sm:p-6 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">

        {/* Portfolio total */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-white/60 uppercase tracking-wider mb-1">Portfolio Value</p>
          <div className="flex items-end gap-3 flex-wrap">
            <span className="text-3xl sm:text-4xl font-bold tracking-tight">$12,450.32</span>
            <div className="flex items-center gap-1 mb-1 bg-green-500/15 border border-green-500/25 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3.5 h-3.5 text-green-400" />
              <span className="text-sm font-semibold text-green-400">+$234.15 (1.92%)</span>
            </div>
          </div>
          <p className="text-xs text-white/50 mt-1">Today vs. yesterday · Updated just now</p>

          {/* Chain breakdown pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {chainBalances.map((c) => (
              <div
                key={c.chain}
                className="flex items-center gap-1.5 bg-white/10 border border-white/10 px-2.5 py-1 rounded-full text-xs font-medium text-white/80"
              >
                {c.icon}
                <span className="text-white/60">{c.label}</span>
                <span>{c.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-4 sm:gap-5 pt-1">
          <ActionBtn label="Send"    icon={<Zap           className="w-4.5 h-4.5 text-white" />} />
          <ActionBtn label="Request" icon={<FileText       className="w-4.5 h-4.5 text-white" />} />
          <ActionBtn label="Pay"     icon={<Coins          className="w-4.5 h-4.5 text-white" />} />
          <ActionBtn label="Swap"    icon={<ArrowRightLeft className="w-4.5 h-4.5 text-white" />} />
        </div>
      </div>
    </div>
  )
}

// ─── Your Positions ───────────────────────────────────────────────────────────

function PositionCard({ pos }: { pos: Position }) {
  return (
    <div className={cn(
      "border border-gray-200 rounded-lg bg-white shadow-sm p-4 flex flex-col gap-3 min-w-[260px] sm:min-w-0 flex-shrink-0 sm:flex-shrink",
      !pos.hasPosition && "opacity-70"
    )}>
      {/* Header */}
      <div className="flex items-start gap-3">
        {pos.logo}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-gray-900 leading-tight truncate">{pos.shortName}</p>
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
          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Tokens Held</p>
          <p className="text-sm font-bold text-gray-900 mt-0.5">{pos.tokensHeld}</p>
          <p className="text-[10px] text-gray-400">{pos.tokenSymbol}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Current Value</p>
          <p className="text-sm font-bold text-gray-900 mt-0.5">{pos.currentValue}</p>
          <div className={cn(
            "text-[10px] font-semibold flex items-center gap-0.5 mt-0.5",
            pos.pnlPositive ? "text-green-600" : "text-red-500"
          )}>
            {pos.pnlPositive
              ? <TrendingUp className="w-3 h-3" />
              : <TrendingDown className="w-3 h-3" />}
            {pos.pnlPercent}
          </div>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Target Yield</p>
          <p className="text-sm font-bold text-green-700 mt-0.5">{pos.targetYield}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Price / Token</p>
          <p className="text-sm font-bold text-gray-900 mt-0.5">{pos.pricePerToken}</p>
        </div>
      </div>

      {/* CTA */}
      <div className="flex gap-2 mt-1">
        <Link href={`/pools/${pos.id}`} className="flex-1">
          <Button variant="outline" className="w-full h-8 text-xs font-semibold border-brand-dark text-brand-dark hover:bg-gray-50">
            View Pool
          </Button>
        </Link>
        {pos.hasPosition && (
          <Button variant="outline" className="flex-1 h-8 text-xs font-semibold border-amber-300 text-amber-700 bg-amber-50 hover:bg-amber-100">
            Deposit
          </Button>
        )}
      </div>
    </div>
  )
}

// ─── Payables / Receivables ───────────────────────────────────────────────────

function BillRow({ bill, type }: { bill: Bill; type: "payable" | "receivable" }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      {/* Direction icon */}
      <div className={cn(
        "w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5",
        type === "payable"
          ? "bg-red-50 border border-red-100"
          : bill.overdue
            ? "bg-amber-50 border border-amber-200"
            : "bg-green-50 border border-green-100"
      )}>
        {bill.overdue
          ? <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
          : type === "payable"
            ? <ArrowUpRight className="w-3.5 h-3.5 text-red-500" />
            : <ArrowDownLeft className="w-3.5 h-3.5 text-green-600" />}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{bill.counterparty}</p>
        <p className="text-xs text-gray-500 truncate">{bill.description}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <ChainDot chain={bill.chain} />
          <span className={cn(
            "text-[10px] font-medium flex items-center gap-0.5",
            bill.overdue ? "text-amber-600" : "text-gray-400"
          )}>
            <Clock className="w-2.5 h-2.5" />
            {bill.overdue ? "Overdue · " : ""}{bill.dueDate}
          </span>
        </div>
      </div>

      {/* Amount */}
      <div className="text-right shrink-0">
        <p className={cn(
          "text-sm font-bold",
          type === "payable" ? "text-gray-900" : "text-green-700"
        )}>
          {bill.usdAmount}
        </p>
        <p className="text-[10px] text-gray-400">{bill.amount}</p>
      </div>
    </div>
  )
}

function BillsPanel({
  title,
  bills,
  type,
  total,
  href,
}: {
  title: string
  bills: Bill[]
  type: "payable" | "receivable"
  total: string
  href: string
}) {
  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
      {/* Panel header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/60">
        <div>
          <p className="text-sm font-bold text-gray-900">{title}</p>
          <p className={cn(
            "text-xs font-semibold mt-0.5",
            type === "payable" ? "text-red-600" : "text-green-700"
          )}>
            Total: {total}
          </p>
        </div>
        <Link href={href} className="flex items-center gap-1 text-xs font-medium text-brand-primary hover:underline">
          See all <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Rows */}
      <div className="px-4">
        {bills.map((bill) => (
          <BillRow key={bill.id} bill={bill} type={type} />
        ))}
      </div>
    </div>
  )
}

// ─── Featured Pools Strip ─────────────────────────────────────────────────────

function FeaturedPoolCard({ pool }: { pool: FeaturedPool }) {
  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm p-4 min-w-[240px] sm:min-w-0 flex-shrink-0 sm:flex-shrink flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start gap-2.5">
        {pool.logo}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-gray-900 leading-tight line-clamp-2">{pool.shortName}</p>
          <NetworkBadge network={pool.network} />
        </div>
      </div>

      <Separator className="bg-gray-100" />

      {/* Key metrics */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-2">
        <div>
          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Target Yield</p>
          <p className="text-base font-bold text-green-700">{pool.targetYield}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Capital Account</p>
          <p className="text-xs font-bold text-gray-900 mt-0.5 leading-snug">{pool.capitalAccount}</p>
        </div>
        <div className="col-span-2">
          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Fund Balance</p>
          <p className="text-xs font-bold text-gray-900 mt-0.5">{pool.fundBalance}</p>
        </div>
      </div>

      {/* CTA */}
      <div className="flex gap-2 mt-auto">
        <Link href={`/pools/${pool.id}`} className="flex-1">
          <Button variant="outline" className="w-full h-8 text-xs font-semibold border-brand-dark text-brand-dark hover:bg-gray-50">
            View Details
          </Button>
        </Link>
        {pool.canDeposit ? (
          <Button className="flex-1 h-8 text-xs font-semibold bg-brand-primary hover:bg-orange-600 text-white">
            Deposit
          </Button>
        ) : (
          <Button variant="outline" className="flex-1 h-8 text-xs font-semibold border-gray-200 text-gray-400 cursor-not-allowed" disabled>
            Switch Net.
          </Button>
        )}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-20">

      {/* ── Wallet Snapshot ───────────────────────────────────────────────── */}
      <WalletSnapshot />

      {/* ── Your Positions ────────────────────────────────────────────────── */}
      <section>
        <SectionHeader title="Your Positions" href="/pools" linkLabel="All pools" />
        {/* Horizontal scroll on mobile, grid on sm+ */}
        <div className="flex gap-4 overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-3 pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {positions.map((pos) => (
            <PositionCard key={pos.id} pos={pos} />
          ))}
          {/* "Browse pools" prompt card */}
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center gap-2 text-center min-w-[220px] sm:min-w-0 flex-shrink-0 sm:flex-shrink cursor-pointer hover:border-brand-primary/40 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
              <Coins className="w-5 h-5 text-brand-primary" />
            </div>
            <p className="text-sm font-semibold text-gray-700">Explore pools</p>
            <p className="text-xs text-gray-400 leading-snug">Discover and invest in new finance pools</p>
            <Link href="/pools">
              <Button variant="outline" className="mt-1 h-7 px-3 text-xs font-semibold border-brand-dark text-brand-dark hover:bg-gray-50">
                Browse <ChevronRight className="w-3 h-3 ml-0.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Payables / Receivables ────────────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900">Outstanding Bills</h2>
          <Link href="/explorer" className="flex items-center gap-1 text-sm font-medium text-brand-primary hover:underline">
            Full history <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BillsPanel
            title="Top Payables"
            bills={payables}
            type="payable"
            total="$3,616.49"
            href="/explorer"
          />
          <BillsPanel
            title="Top Receivables"
            bills={receivables}
            type="receivable"
            total="$8,324.96"
            href="/explorer"
          />
        </div>
      </section>

      {/* ── Featured Pools ────────────────────────────────────────────────── */}
      <section>
        <SectionHeader title="Featured Pools" href="/pools" linkLabel="Browse all" />
        <div className="flex gap-4 overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-3 pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {featuredPools.map((pool) => (
            <FeaturedPoolCard key={pool.id} pool={pool} />
          ))}
        </div>
      </section>

      {/* ── Secondary: Explorer link ──────────────────────────────────────── */}
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
