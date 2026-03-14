"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, ExternalLink, ShieldCheck, FileText } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// ─── Chain icons ─────────────────────────────────────────────────────────────

function EthIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#627EEA" fillOpacity="0.12" />
      <path d="M16 5l-6.5 11.3 6.5 3.9 6.5-3.9L16 5z" fill="#627EEA" fillOpacity="0.7" />
      <path d="M16 22.4l-6.5-3.8 6.5 8.4 6.5-8.4-6.5 3.8z" fill="#627EEA" />
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

// ─── Sparkline ────────────────────────────────────────────────────────────────

function Sparkline({ data }: { data: number[] }) {
  if (data.length < 2) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 0.001
  const W = 64, H = 28
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * W
      const y = H - ((v - min) / range) * H * 0.8 - H * 0.1
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(" ")
  const isFlat = data[data.length - 1] === data[0]
  const color = isFlat ? "#9CA3AF" : "#16a34a"
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="shrink-0">
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

// ─── Utilization bar ─────────────────────────────────────────────────────────

function UtilizationBar({
  pct,
  fundBalance,
  deployedCapital,
  stablecoin,
}: {
  pct: number
  fundBalance: string
  deployedCapital: string
  stablecoin: string
}) {
  if (pct === 0) return null
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
        <span className="font-medium text-gray-600">Capital Utilization</span>
        <span className="font-bold text-gray-700">{pct.toFixed(1)}% deployed</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all"
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
        <span>{fundBalance} {stablecoin} idle</span>
        <span>{deployedCapital} {stablecoin} deployed</span>
      </div>
    </div>
  )
}

// ─── Maturity breakdown ───────────────────────────────────────────────────────

function MaturityBreakdown({
  breakdown,
}: {
  breakdown: { d30: number; d60: number; d90: number; d120: number }
}) {
  const items = [
    { label: "30d", pct: breakdown.d30, color: "bg-green-400" },
    { label: "60d", pct: breakdown.d60, color: "bg-emerald-400" },
    { label: "90d", pct: breakdown.d90, color: "bg-amber-400" },
    { label: "120d", pct: breakdown.d120, color: "bg-orange-400" },
  ].filter((i) => i.pct > 0)

  return (
    <div>
      <p className="text-xs font-medium text-gray-600 mb-2">Receivable Maturity Mix</p>
      <div className="flex gap-3 flex-wrap mb-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className={cn("w-2 h-2 rounded-full shrink-0", item.color)} />
            <span className="text-xs text-gray-600">
              {item.label}: <span className="font-semibold">{item.pct}%</span>
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-0.5 h-1.5 rounded-full overflow-hidden">
        {items.map((item) => (
          <div
            key={item.label}
            className={cn("h-full", item.color)}
            style={{ width: `${item.pct}%` }}
          />
        ))}
        {items.reduce((s, i) => s + i.pct, 0) < 100 && (
          <div className="h-full bg-gray-100 flex-1" />
        )}
      </div>
    </div>
  )
}

// ─── Pool data ────────────────────────────────────────────────────────────────

type Pool = {
  id: string
  name: string
  createdDate: string
  originator: string
  originatorUrl: string
  poolManager: string
  poolManagerUrl: string
  poolManagerDesc: string
  targetYield: string
  network: "Ethereum" | "Redbelly"
  stablecoin: string
  fundBalance: string
  deployedCapital: string
  capitalAccount: string
  currentPrice: string
  tokensAvailable: string
  totalSupply: string
  tokenSymbol: string
  canInteract: boolean
  minDeposit: string
  utilizationPct: number
  creditRating: string
  creditRatingNote: string
  maturityBreakdown: { d30: number; d60: number; d90: number; d120: number } | null
  priceHistory: number[]
  lpaUrl: string | null
  logo: React.ReactNode
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

const pools: Pool[] = [
  {
    id: "1",
    name: "TCS Settlement Pool - Mainnet V2.1",
    createdDate: "Mar 10, 2026",
    originator: "tcsblockchain.com",
    originatorUrl: "#",
    poolManager: "TCS Blockchain Inc.",
    poolManagerUrl: "#",
    poolManagerDesc: "Tokenizes working capital for trucking companies",
    targetYield: "7.95%",
    network: "Ethereum",
    stablecoin: "PYUSD",
    fundBalance: "0.000",
    deployedCapital: "0.000",
    capitalAccount: "0.000",
    currentPrice: "1.000 PYUSD",
    tokensAvailable: "0.000 BFT-TCS-V2_1",
    totalSupply: "0.000 BFT-TCS-V2_1",
    tokenSymbol: "BFT-TCS-V2_1",
    canInteract: true,
    minDeposit: "10,000 PYUSD",
    utilizationPct: 0,
    creditRating: "AAA / AA–",
    creditRatingNote: "Eligible receivables require S&P AAA/AA– rated freight recipients with confirmed bill of lading. Net 30–45 day terms.",
    maturityBreakdown: null,
    priceHistory: [1.0, 1.0, 1.0, 1.0, 1.0],
    lpaUrl: "#",
    logo: <TCSLogo />,
  },
  {
    id: "2",
    name: "TARAM Funding Pool - Redbelly",
    createdDate: "Aug 12, 2025",
    originator: "taram.io",
    originatorUrl: "#",
    poolManager: "TARAM Trade Engine",
    poolManagerUrl: "#",
    poolManagerDesc: "AI-powered cross-border trade finance for SME importers/exporters",
    targetYield: "15%",
    network: "Redbelly",
    stablecoin: "USDC",
    fundBalance: "583.838",
    deployedCapital: "100,327.611",
    capitalAccount: "106,882.073",
    currentPrice: "1.048 USDC",
    tokensAvailable: "557.059 BFT-TARAM",
    totalSupply: "101,979.732 BFT-TARAM",
    tokenSymbol: "BFT-TARAM",
    canInteract: false,
    minDeposit: "10,000 USDC",
    utilizationPct: 93.9,
    creditRating: "Insured",
    creditRatingNote: "Each invoice is underwritten by an insurance provider for credit risk. TARAM selects clients based on creditworthiness and trade history. 30–120 day cycles.",
    maturityBreakdown: { d30: 0, d60: 15, d90: 25, d120: 60 },
    priceHistory: [1.0, 1.012, 1.024, 1.036, 1.047, 1.053, 1.062],
    lpaUrl: "#",
    logo: <TARAMLogo />,
  },
]

// ─── Pool card ────────────────────────────────────────────────────────────────

function PoolCard({ pool }: { pool: Pool }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-5 sm:p-6">

        {/* Top section */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-5">

          {/* Logo + info */}
          <div className="flex items-start gap-3 min-w-0">
            {pool.logo}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-base font-bold text-gray-900 leading-tight">{pool.name}</h3>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <Badge
                  variant="outline"
                  className="text-[10px] px-1.5 py-0 border-green-300 text-green-700 bg-green-50 font-semibold"
                >
                  <ShieldCheck className="w-2.5 h-2.5 mr-1" />
                  {pool.creditRating}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mt-0.5">Created {pool.createdDate}</p>
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                <span>Originator:</span>
                <a href={pool.originatorUrl} className="text-brand-primary hover:underline font-medium">
                  {pool.originator}
                </a>
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                <span>Pool Manager:</span>
                <a href={pool.poolManagerUrl} className="text-brand-primary hover:underline font-medium">
                  {pool.poolManager}
                </a>
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Yield + Network */}
          <div className="flex gap-8 lg:ml-auto lg:mr-6 shrink-0">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Target Yield (before fees)</p>
              <p className="text-lg font-bold text-gray-900">{pool.targetYield}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Network</p>
              <div className="flex items-center gap-1.5 font-bold text-gray-900">
                {pool.network === "Ethereum" ? <EthIcon size={16} /> : <RedbellyIcon size={16} />}
                <span className="text-sm">{pool.network}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col items-start gap-1.5 shrink-0">
            <div className="flex items-center gap-2 flex-wrap lg:flex-nowrap">
              <Link href={`/pools/${pool.id}`} className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto h-9 px-5 border-brand-dark text-brand-dark font-semibold text-sm hover:bg-gray-50"
                >
                  View Details
                </Button>
              </Link>
              {pool.canInteract ? (
                <>
                  <Button
                    variant="outline"
                    disabled
                    className="w-full sm:w-auto h-9 px-5 border-gray-200 text-gray-400 font-semibold text-sm cursor-not-allowed"
                  >
                    Redeem
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto h-9 px-5 border-amber-300 text-amber-700 bg-amber-50 font-semibold text-sm hover:bg-amber-100"
                  >
                    Deposit
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  className="w-full sm:w-auto h-9 px-5 border-brand-dark text-brand-dark font-semibold text-sm hover:bg-gray-50"
                >
                  Switch Network
                </Button>
              )}
            </div>
            <p className="text-xs text-gray-400 pl-0.5">
              Min. deposit: <span className="font-semibold text-gray-500">{pool.minDeposit}</span>
            </p>
          </div>
        </div>

        <Separator className="my-5 bg-gray-100" />

        {/* Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1">Fund Balance</p>
            <p className="text-sm font-bold text-gray-900">{pool.fundBalance} {pool.stablecoin}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1">Deployed Capital</p>
            <p className="text-sm font-bold text-gray-900">{pool.deployedCapital} {pool.stablecoin}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1">Capital Account</p>
            <p className="text-sm font-bold text-gray-900">{pool.capitalAccount} {pool.stablecoin}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1">Current Price Per Token</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-gray-900">{pool.currentPrice}</p>
              <Sparkline data={pool.priceHistory} />
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="text-xs text-gray-500 font-medium mb-1">Tokens Available / Total Supply</p>
            <div className="flex items-start gap-1">
              <p className="text-sm font-bold text-gray-900 leading-snug">
                {pool.tokensAvailable} / {pool.totalSupply}
              </p>
              <ExternalLink className="w-3 h-3 text-gray-400 mt-0.5 shrink-0" />
            </div>
          </div>
        </div>

        {/* Utilization bar */}
        {pool.utilizationPct > 0 && (
          <div className="mt-4">
            <UtilizationBar
              pct={pool.utilizationPct}
              fundBalance={pool.fundBalance}
              deployedCapital={pool.deployedCapital}
              stablecoin={pool.stablecoin}
            />
          </div>
        )}

        {/* More details toggle */}
        <div className="mt-5">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1.5 text-sm font-bold text-brand-dark hover:text-brand-primary transition-colors"
          >
            More Details{" "}
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Expanded details */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Credit quality */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Credit Quality</p>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-600 leading-relaxed">{pool.creditRatingNote}</p>
              </div>
            </div>

            {/* Pool structure */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Pool Structure</p>
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400 w-24 shrink-0">Pool Owner</span>
                  <span className="text-gray-700">Bulla Network (Arkitoken Inc.)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400 w-24 shrink-0">Pool Manager</span>
                  <span className="text-gray-700">{pool.poolManager}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400 w-24 shrink-0">Participant</span>
                  <span className="text-gray-700">You (non-custodial)</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Pool is independent and fully segregated. No cross-collateralization.
                </p>
              </div>
            </div>

            {/* Maturity breakdown or LPA */}
            <div className="space-y-4">
              {pool.maturityBreakdown ? (
                <MaturityBreakdown breakdown={pool.maturityBreakdown} />
              ) : (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Receivable Terms</p>
                  <p className="text-sm text-gray-600">Net 30–45 days. Pool is newly launched — no deployed capital yet.</p>
                </div>
              )}

              {pool.lpaUrl && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Legal Agreement</p>
                  <a
                    href={pool.lpaUrl}
                    className="inline-flex items-center gap-1.5 text-sm text-brand-primary hover:underline font-medium"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Download LPA (Liquidity Pool Agreement)
                  </a>
                  <p className="text-xs text-gray-400 mt-1">
                    Redemptions processed FIFO · standard 10 business day window
                  </p>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PoolsPage() {
  return (
    <div className="space-y-6 pb-20">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Bulla Finance Pool List</h1>
        <p className="text-sm text-gray-500 mt-1">Browse investment opportunities in our finance pools</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <div className="border-b border-gray-200">
          <TabsList className="flex w-max bg-transparent p-0 gap-0 h-auto rounded-none">
            {["active", "test", "archived"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="rounded-none px-5 py-2.5 text-sm text-gray-500 border-b-2 border-transparent capitalize
                  data-[state=active]:border-brand-dark data-[state=active]:text-brand-dark
                  data-[state=active]:bg-transparent data-[state=active]:shadow-none
                  hover:text-gray-800"
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="active" className="mt-6 space-y-4">
          {pools.map((pool) => (
            <PoolCard key={pool.id} pool={pool} />
          ))}
        </TabsContent>

        <TabsContent value="test" className="mt-6">
          <div className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg text-sm">
            No test pools available.
          </div>
        </TabsContent>

        <TabsContent value="archived" className="mt-6">
          <div className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg text-sm">
            No archived pools.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
