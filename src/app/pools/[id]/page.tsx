"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts"
import { ArrowLeft, ExternalLink, Copy, ChevronLeft, ChevronRight, Search, Clock, ChevronDown, Download } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type TimeRange = "1W" | "1M" | "1Y"

// ─── Chart data ───────────────────────────────────────────────────────────────

// Token price — steady daily yield accrual at 15% APY
const tokenData: Record<TimeRange, { date: string; price: number }[]> = {
  "1W": [
    { date: "Mar 07", price: 1.0580 },
    { date: "Mar 08", price: 1.0584 },
    { date: "Mar 09", price: 1.0589 },
    { date: "Mar 10", price: 1.0594 },
    { date: "Mar 11", price: 1.0598 },
    { date: "Mar 12", price: 1.0609 },
    { date: "Mar 13", price: 1.0620 },
  ],
  "1M": [
    { date: "Feb 12", price: 1.0480 }, { date: "Feb 14", price: 1.0486 },
    { date: "Feb 16", price: 1.0492 }, { date: "Feb 18", price: 1.0498 },
    { date: "Feb 20", price: 1.0505 }, { date: "Feb 22", price: 1.0511 },
    { date: "Feb 24", price: 1.0517 }, { date: "Feb 26", price: 1.0524 },
    { date: "Feb 28", price: 1.0530 }, { date: "Mar 02", price: 1.0537 },
    { date: "Mar 04", price: 1.0544 }, { date: "Mar 06", price: 1.0551 },
    { date: "Mar 08", price: 1.0558 }, { date: "Mar 10", price: 1.0565 },
    { date: "Mar 12", price: 1.0580 }, { date: "Mar 13", price: 1.0620 },
  ],
  "1Y": [
    { date: "Mar '25", price: 1.0000 }, { date: "Apr '25", price: 1.0124 },
    { date: "May '25", price: 1.0180 }, { date: "Jun '25", price: 1.0237 },
    { date: "Jul '25", price: 1.0295 }, { date: "Aug '25", price: 1.0353 },
    { date: "Sep '25", price: 1.0412 }, { date: "Oct '25", price: 1.0472 },
    { date: "Nov '25", price: 1.0533 }, { date: "Dec '25", price: 1.0530 },
    { date: "Jan '26", price: 1.0564 }, { date: "Feb '26", price: 1.0592 },
    { date: "Mar '26", price: 1.0620 },
  ],
}

// Cash view — Fund Balance, Deployed Capital, Capital Account
const cashData: Record<TimeRange, { date: string; fundBalance: number; deployedCapital: number; capitalAccount: number }[]> = {
  "1W": [
    { date: "Mar 06", fundBalance: 380, deployedCapital: 100000, capitalAccount: 106620 },
    { date: "Mar 07", fundBalance: 380, deployedCapital: 100050, capitalAccount: 106673 },
    { date: "Mar 08", fundBalance: 380, deployedCapital: 100100, capitalAccount: 106726 },
    { date: "Mar 09", fundBalance: 380, deployedCapital: 100150, capitalAccount: 106780 },
    { date: "Mar 10", fundBalance: 583, deployedCapital: 100328, capitalAccount: 106882 },
    { date: "Mar 11", fundBalance: 583, deployedCapital: 100328, capitalAccount: 106882 },
    { date: "Mar 12", fundBalance: 583, deployedCapital: 100328, capitalAccount: 106882 },
    { date: "Mar 13", fundBalance: 583, deployedCapital: 100328, capitalAccount: 106882 },
  ],
  "1M": [
    { date: "Feb 12", fundBalance: 350, deployedCapital: 98000, capitalAccount: 104300 },
    { date: "Feb 16", fundBalance: 360, deployedCapital: 98500, capitalAccount: 104850 },
    { date: "Feb 20", fundBalance: 599, deployedCapital: 99100, capitalAccount: 105450 },
    { date: "Feb 24", fundBalance: 310, deployedCapital: 99700, capitalAccount: 106050 },
    { date: "Feb 28", fundBalance: 320, deployedCapital: 100000, capitalAccount: 106400 },
    { date: "Mar 04", fundBalance: 380, deployedCapital: 100200, capitalAccount: 106650 },
    { date: "Mar 08", fundBalance: 380, deployedCapital: 100280, capitalAccount: 106770 },
    { date: "Mar 13", fundBalance: 583, deployedCapital: 100328, capitalAccount: 106882 },
  ],
  "1Y": [
    { date: "Mar '25", fundBalance: 0,   deployedCapital: 50000, capitalAccount: 50000  },
    { date: "May '25", fundBalance: 200, deployedCapital: 60000, capitalAccount: 60500  },
    { date: "Jul '25", fundBalance: 180, deployedCapital: 75000, capitalAccount: 76200  },
    { date: "Sep '25", fundBalance: 350, deployedCapital: 94000, capitalAccount: 100200 },
    { date: "Nov '25", fundBalance: 400, deployedCapital: 98000, capitalAccount: 104800 },
    { date: "Jan '26", fundBalance: 310, deployedCapital: 99500, capitalAccount: 106200 },
    { date: "Mar '26", fundBalance: 583, deployedCapital: 100328, capitalAccount: 106882 },
  ],
}

// ─── D&R transaction data ─────────────────────────────────────────────────────

const drTransactions = [
  { wallet: "0x6696be8...087c6407", date: "20 Feb 2026", action: "Redemption", asset: "10.481 USDC",       shares: "10.0000 BFT-TARAM",       depositPrice: "",          redemptionPrice: "1.048 USDC" },
  { wallet: "0x6696be8...087c6407", date: "19 Feb 2026", action: "Deposit",    asset: "599.304 USDC",     shares: "569.7885 BFT-TARAM",      depositPrice: "1.052 USDC", redemptionPrice: "1.048 USDC" },
  { wallet: "0x6696be8...087c6407", date: "19 Feb 2026", action: "Deposit",    asset: "299.984 USDC",     shares: "285.2093 BFT-TARAM",      depositPrice: "1.052 USDC", redemptionPrice: "1.048 USDC" },
  { wallet: "0x6696be8...087c6407", date: "13 Feb 2026", action: "Deposit",    asset: "1,498.500 USDC",   shares: "1,428.3408 BFT-...",       depositPrice: "1.049 USDC", redemptionPrice: "1.044 USDC" },
  { wallet: "0x6696be8...087c6407", date: "27 Jan 2026", action: "Redemption", asset: "5.024 USDC",       shares: "5.0000 BFT-TARAM",        depositPrice: "",          redemptionPrice: "1.005 USDC" },
  { wallet: "0x485bd59...cf05b09b", date: "12 Oct 2025", action: "Deposit",    asset: "49,900.000 USDC",  shares: "49,611.8683 BFT-...",      depositPrice: "1.006 USDC", redemptionPrice: "1.003 USDC" },
  { wallet: "0x485bd59...cf05b09b", date: "09 Oct 2025", action: "Deposit",    asset: "100.000 USDC",     shares: "99.5249 BFT-TARAM",       depositPrice: "1.005 USDC", redemptionPrice: "1.000 USDC" },
  { wallet: "0x6696be8...087c6407", date: "25 Sep 2025", action: "Deposit",    asset: "25,000.000 USDC",  shares: "25,000.0000 BFT-...",      depositPrice: "1.000 USDC", redemptionPrice: "1.000 USDC" },
  { wallet: "0x6696be8...087c6407", date: "22 Sep 2025", action: "Deposit",    asset: "24,950.000 USDC",  shares: "24,950.0000 BFT-...",      depositPrice: "1.000 USDC", redemptionPrice: "1.000 USDC" },
  { wallet: "0x6696be8...087c6407", date: "22 Sep 2025", action: "Deposit",    asset: "50.000 USDC",      shares: "50.0000 BFT-TARAM",       depositPrice: "1.000 USDC", redemptionPrice: "1.000 USDC" },
]

// ─── Invoice data ─────────────────────────────────────────────────────────────

const invoices = [
  { debtor: "0xe96...d82c", creditor: "0x3c3...5b73", id: "3-v1",  status: "Paid",    funded: "26 Sep 2025", due: "22 Dec 2025", description: "RFQ_20SD040_Ex USA to Dammam - 4315",                              expected: 87,  actual: 102 },
  { debtor: "0xe96...d82c", creditor: "0x3c3...5b73", id: "4-v1",  status: "Paid",    funded: "26 Sep 2025", due: "24 Jan 2026", description: "25SD292_RFQ-01_USA to Jeddah_DDP Courier / Air Freight - 6940",    expected: 120, actual: 133 },
  { debtor: "0xe96...d82c", creditor: "0x3c3...5b73", id: "5-v1",  status: "Paid",    funded: "26 Sep 2025", due: "24 Jan 2026", description: "24SD225_RFQ - DDU/FCL India to Dammam - 13314",                    expected: 120, actual: 131 },
  { debtor: "0xe96...d82c", creditor: "0x3c3...5b73", id: "6-v1",  status: "Paid",    funded: "01 Oct 2025", due: "30 Jan 2026", description: "EXW USA to Dammam, DDU RFQ207SD239",                               expected: 122, actual: 135 },
  { debtor: "0xe96...d82c", creditor: "0x3c3...5b73", id: "7-v1",  status: "Paid",    funded: "29 Oct 2025", due: "26 Feb 2026", description: "INV_2025ST20476 India to Dammam_CIF",                              expected: 120, actual: 107 },
  { debtor: "0xe96...d82c", creditor: "0x3c3...5b73", id: "8-v1",  status: "Paid",    funded: "10 Nov 2025", due: "10 Mar 2026", description: "INV_2025ST20478 Dammam FCL",                                       expected: 120, actual: 102 },
  { debtor: "0xe96...d82c", creditor: "0x3c3...5b73", id: "9-v1",  status: "Paid",    funded: "03 Dec 2025", due: "02 Apr 2026", description: "EXW Mundra to Hamburg, DDU RFQ20250037",                           expected: 120, actual: 73  },
  { debtor: "0xe96...d82c", creditor: "0x3c3...5b73", id: "10-v1", status: "Paid",    funded: "05 Jan 2026", due: "05 May 2026", description: "RFQ_2050ST010_Ex Mundra to Dammam - 8200",                         expected: 120, actual: 39  },
  { debtor: "0xe96...d82c", creditor: "0x3c3...5b73", id: "11-v1", status: "Pending", funded: "07 Jan 2026", due: "07 May 2026", description: "EXW US to Jeddah DDP RFQ2026KB0008",                              expected: 120, actual: null },
  { debtor: "0xe96...d82c", creditor: "0x3c3...5b73", id: "12-v1", status: "Pending", funded: "11 Feb 2026", due: "11 Jun 2026", description: "Ind to Turkey CIF RFQ2026SH23",                                    expected: 120, actual: null },
]

// ─── Custom tooltip ───────────────────────────────────────────────────────────

function TokenTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-lg px-3 py-2 text-sm">
      <p className="text-gray-500 text-xs mb-1">{label}</p>
      <p className="font-semibold text-gray-900">{payload[0].value.toFixed(6)} USDC</p>
    </div>
  )
}

function CashTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-lg px-3 py-2 text-sm min-w-[180px]">
      <p className="text-gray-500 text-xs mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-4 mb-0.5">
          <span className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
            {p.name}
          </span>
          <span className="font-medium text-gray-900 text-xs">
            {p.value.toLocaleString("en-US", { maximumFractionDigits: 0 })} USDC
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Time range toggle ────────────────────────────────────────────────────────

function TimeRangeToggle({ value, onChange }: { value: TimeRange; onChange: (v: TimeRange) => void }) {
  return (
    <div className="flex bg-gray-100 rounded-md p-0.5 shrink-0">
      {(["1W", "1M", "1Y"] as TimeRange[]).map((r) => (
        <button
          key={r}
          onClick={() => onChange(r)}
          className={cn(
            "h-7 px-3 text-xs font-medium rounded-sm transition-colors",
            value === r ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
          )}
        >
          {r}
        </button>
      ))}
    </div>
  )
}

// ─── TARAM logo ───────────────────────────────────────────────────────────────

function TARAMLogo({ size = 40 }: { size?: number }) {
  return (
    <div
      className="rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
        <path d="M6 18L12 6l6 12" stroke="#E53E3E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.5 14h7" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
}

// ─── Y-axis formatter ─────────────────────────────────────────────────────────

const formatCashTick = (v: number) => {
  if (v === 0) return "0"
  if (v >= 1000) return `${(v / 1000).toFixed(0)}K`
  return String(v)
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PoolDetailPage({ params }: { params: { id: string } }) {
  const [tokenRange, setTokenRange] = useState<TimeRange>("1W")
  const [cashRange, setCashRange] = useState<TimeRange>("1W")
  const [invoicePage, setInvoicePage] = useState(1)

  const currentTokenPrice = tokenData["1W"].at(-1)!.price

  return (
    <div className="space-y-6 pb-20">

      {/* Breadcrumb + back */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <nav className="flex items-center gap-1.5 text-sm text-gray-500">
          <Link href="/pools" className="hover:text-gray-800 transition-colors">Bulla Financing Pools</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">TARAM Funding Pool - Redbelly</span>
        </nav>
        <Link href="/pools" className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors shrink-0">
          <ArrowLeft className="w-4 h-4" />
          Back to Pool List
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <TARAMLogo size={44} />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2 flex-wrap">
            TARAM Funding Pool - Redbelly
            <ExternalLink className="w-4 h-4 text-gray-400 shrink-0" />
          </h1>
        </div>
        <Button variant="outline" className="h-10 px-5 border-brand-dark text-brand-dark font-semibold text-sm hover:bg-gray-50 shrink-0">
          Switch Network
        </Button>
      </div>

      {/* Main chart card */}
      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
        <Tabs defaultValue="token" className="w-full">

          {/* Tab nav */}
          <div className="border-b border-gray-200 px-6 pt-1">
            <TabsList className="flex w-max bg-transparent p-0 gap-0 h-auto rounded-none">
              {[
                { value: "token", label: "Bulla Finance Token" },
                { value: "cash", label: "Cash View" },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-none px-4 py-3 text-sm font-medium text-gray-500 border-b-2 border-transparent
                    data-[state=active]:border-brand-primary data-[state=active]:text-brand-primary
                    data-[state=active]:bg-transparent data-[state=active]:shadow-none
                    hover:text-gray-800 whitespace-nowrap"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* ── Bulla Finance Token ── */}
          <TabsContent value="token" className="p-5 sm:p-6 mt-0 space-y-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">TARAM Funding Pool Token</p>
                <p className="text-3xl font-bold text-gray-900 tracking-tight">
                  {currentTokenPrice.toFixed(6)} USDC
                </p>
              </div>
              <TimeRangeToggle value={tokenRange} onChange={setTokenRange} />
            </div>

            <div className="h-[220px] sm:h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tokenData[tokenRange]} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="tokenGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#EA580C" stopOpacity={0.18} />
                      <stop offset="100%" stopColor="#EA580C" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#F3F4F6" />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9CA3AF", fontSize: 11 }}
                    dy={8}
                  />
                  <YAxis
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9CA3AF", fontSize: 11 }}
                    domain={["auto", "auto"]}
                    tickFormatter={(v) => v.toFixed(2)}
                    width={44}
                  />
                  <Tooltip content={<TokenTooltip />} cursor={{ stroke: "#E5E7EB", strokeWidth: 1 }} />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#EA580C"
                    strokeWidth={2}
                    fill="url(#tokenGradient)"
                    dot={false}
                    activeDot={{ r: 4, fill: "#EA580C", strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <Separator className="my-5 bg-gray-100" />
            <PoolStatsGrid />
          </TabsContent>

          {/* ── Cash View ── */}
          <TabsContent value="cash" className="p-5 sm:p-6 mt-0 space-y-0">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex flex-wrap gap-6 sm:gap-10">
                <div>
                  <p className="text-xs text-gray-500 flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                    Fund Balance
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900">583.838 USDC</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                    Deployed Capital
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900">100,327.611 USDC</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                    Capital Account
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900">106,882.073 USDC</p>
                </div>
              </div>
              <TimeRangeToggle value={cashRange} onChange={setCashRange} />
            </div>

            <div className="h-[220px] sm:h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cashData[cashRange]} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                  <CartesianGrid vertical={false} stroke="#F3F4F6" />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9CA3AF", fontSize: 11 }}
                    dy={8}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9CA3AF", fontSize: 11 }}
                    tickFormatter={formatCashTick}
                    width={40}
                  />
                  <Tooltip
                    content={<CashTooltip />}
                    cursor={{ stroke: "#E5E7EB", strokeWidth: 1 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="capitalAccount"
                    name="Capital Account"
                    stroke="#6366F1"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="deployedCapital"
                    name="Deployed Capital"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    strokeDasharray="5 3"
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="fundBalance"
                    name="Fund Balance"
                    stroke="#EF4444"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <Separator className="my-5 bg-gray-100" />
            <PoolStatsGrid />
          </TabsContent>
        </Tabs>
      </div>

      {/* ── Bottom tabs: D&R / Invoices / Redemption Queue ── */}
      <Tabs defaultValue="dr" className="w-full">
        <div className="border-b border-gray-200">
          <TabsList className="flex w-max bg-transparent p-0 gap-0 h-auto rounded-none">
            {[
              { value: "dr",    label: "Deposit & Redemptions" },
              { value: "inv",   label: "Invoices" },
              { value: "queue", label: "Redemption Queue" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-none px-4 py-2.5 text-sm font-medium text-gray-500 border-b-2 border-transparent
                  data-[state=active]:border-brand-primary data-[state=active]:text-brand-primary
                  data-[state=active]:bg-transparent data-[state=active]:shadow-none
                  hover:text-gray-800 whitespace-nowrap"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* ── Deposit & Redemptions ── */}
        <TabsContent value="dr" className="mt-5 space-y-4">
          <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
            {/* Summary header */}
            <div className="p-5 sm:p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Deposit & Redemptions</h2>
              <div className="flex flex-wrap items-end gap-6 sm:gap-10 justify-between">
                <div className="flex flex-wrap gap-6 sm:gap-10">
                  <div>
                    <p className="text-xs font-bold text-green-600 flex items-center gap-1 mb-1">
                      <ArrowLeft className="w-3 h-3" /> IN
                    </p>
                    <p className="text-lg font-bold text-gray-900">102,397.788 USDC</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-red-500 flex items-center gap-1 mb-1">
                      OUT <span className="rotate-180 inline-block">←</span>
                    </p>
                    <p className="text-lg font-bold text-gray-900">15.505 USDC</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">TOTAL</p>
                    <p className="text-lg font-bold text-gray-900">102,382.283 USDC</p>
                  </div>
                </div>
                <Button variant="outline" className="h-9 px-4 border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50 flex items-center gap-1.5 shrink-0">
                  Export <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* D&R table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-white">
                    {["Wallet", "Date", "Action", "Asset Amount", "Share Amount", "Deposit Price", "Redemption Price", ""].map((h) => (
                      <th key={h} className="py-3 px-4 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500 whitespace-nowrap first:pl-5 last:pr-5">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {drTransactions.map((tx, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                      <td className="py-3.5 pl-5 pr-4">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs text-gray-600">{tx.wallet}</span>
                          <button className="text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-sm text-gray-600 whitespace-nowrap">{tx.date}</td>
                      <td className="py-3.5 px-4">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs font-medium",
                            tx.action === "Deposit"
                              ? "border-green-300 text-green-700 bg-green-50"
                              : "border-red-300 text-red-600 bg-red-50"
                          )}
                        >
                          {tx.action}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-sm text-gray-800 whitespace-nowrap">{tx.asset}</td>
                      <td className="py-3.5 px-4 text-sm text-gray-600 whitespace-nowrap">{tx.shares}</td>
                      <td className="py-3.5 px-4 text-sm text-gray-600 whitespace-nowrap">{tx.depositPrice || <span className="text-gray-300">—</span>}</td>
                      <td className="py-3.5 px-4 text-sm text-gray-600 whitespace-nowrap">{tx.redemptionPrice}</td>
                      <td className="py-3.5 pr-5 text-right">
                        <button className="text-brand-primary text-sm font-medium hover:underline">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* ── Invoices ── */}
        <TabsContent value="inv" className="mt-5 space-y-4">
          {/* Invoice filter bar */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap overflow-x-auto pb-1">
            <div className="relative w-full sm:w-[200px] shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search invoices..." className="pl-9 h-9 border-gray-300 text-sm w-full" />
            </div>
            <Button variant="outline" className="h-9 px-3 border-gray-300 text-gray-500 font-normal shrink-0 flex items-center gap-2 text-sm w-[155px] justify-start">
              <Clock className="w-4 h-4 shrink-0" />
              <span className="truncate">Select date range</span>
            </Button>
            <div className="shrink-0 w-[100px]">
              <Select>
                <SelectTrigger className="h-9 border-gray-300 bg-white text-sm w-full">
                  <SelectValue placeholder="Wallets" />
                </SelectTrigger>
                <SelectContent><SelectItem value="all">All</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="shrink-0 w-[100px]">
              <Select>
                <SelectTrigger className="h-9 border-gray-300 bg-white text-sm w-full">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1" />
            <Button variant="outline" className="h-9 px-4 border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50 flex items-center gap-1.5 shrink-0">
              Export <ChevronDown className="w-4 h-4" />
            </Button>
          </div>

          {/* Invoice table */}
          <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["Debtor", "Original Creditor", "Invoice ID", "Status", "Funded", "Due", "Description", "Expected F.", "Actual"].map((h) => (
                      <th key={h} className="py-3 px-4 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500 whitespace-nowrap first:pl-5">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                      <td className="py-3.5 pl-5 pr-4">
                        <div className="flex items-center gap-1">
                          <span className="font-mono text-xs text-gray-600">({inv.debtor})</span>
                          <button className="text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100">
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1">
                          <span className="font-mono text-xs text-gray-600">({inv.creditor})</span>
                          <button className="text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100">
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-sm text-gray-700">{inv.id}</td>
                      <td className="py-3.5 px-4">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs font-medium",
                            inv.status === "Paid"
                              ? "border-green-300 text-green-700 bg-green-50"
                              : "border-amber-300 text-amber-700 bg-amber-50"
                          )}
                        >
                          {inv.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-sm text-gray-600 whitespace-nowrap">{inv.funded}</td>
                      <td className="py-3.5 px-4 text-sm text-gray-600 whitespace-nowrap">{inv.due}</td>
                      <td className="py-3.5 px-4 text-sm text-gray-600 max-w-[280px] truncate">{inv.description}</td>
                      <td className="py-3.5 px-4 text-sm text-gray-700 text-right">{inv.expected}</td>
                      <td className="py-3.5 px-4 text-sm text-gray-700 text-right">
                        {inv.actual ?? <span className="text-gray-300">---</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-center gap-2">
              <button
                onClick={() => setInvoicePage((p) => Math.max(1, p - 1))}
                disabled={invoicePage === 1}
                className="p-1.5 rounded border border-gray-200 text-gray-500 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {[1, 2].map((p) => (
                <button
                  key={p}
                  onClick={() => setInvoicePage(p)}
                  className={cn(
                    "w-8 h-8 rounded text-sm font-medium transition-colors",
                    invoicePage === p
                      ? "bg-brand-dark text-white"
                      : "border border-gray-200 text-gray-600 hover:border-gray-300"
                  )}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setInvoicePage((p) => Math.min(2, p + 1))}
                disabled={invoicePage === 2}
                className="p-1.5 rounded border border-gray-200 text-gray-500 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </TabsContent>

        {/* ── Redemption Queue ── */}
        <TabsContent value="queue" className="mt-5">
          <div className="border border-gray-200 rounded-lg bg-white p-12 text-center text-gray-400 shadow-sm">
            <Download className="w-8 h-8 mx-auto mb-3 text-gray-300" />
            <p className="text-sm font-medium text-gray-500">No pending redemptions</p>
            <p className="text-xs mt-1">Redemption requests will appear here when submitted.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// ─── Pool stats grid (shared between tab views) ───────────────────────────────

function PoolStatsGrid() {
  return (
    <div>
      <h3 className="text-sm font-bold text-gray-900 mb-4">Pool Stats</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {[
          { label: "Fund Balance",    value: "583.838 USDC" },
          { label: "Capital Account", value: "106,882.073 USDC" },
          { label: "Total Supply",    value: "101,979.732 BFT-TARAM" },
          { label: "Currency",        value: "USDC", icon: <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-1" /> },
          { label: "Network",         value: "Redbelly Network", icon: <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1" /> },
          { label: "Token",           value: "BFT-TARAM" },
        ].map((s) => (
          <div key={s.label}>
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className="text-sm font-semibold text-gray-900 flex items-center">
              {s.icon}{s.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
