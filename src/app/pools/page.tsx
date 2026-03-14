"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ChevronDown, ExternalLink } from "lucide-react"
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

// ─── Pool data ────────────────────────────────────────────────────────────────

type Pool = {
  id: string
  name: string
  createdDate: string
  originator: string
  originatorUrl: string
  targetYield: string
  network: "Ethereum" | "Redbelly"
  fundBalance: string
  deployedCapital: string
  capitalAccount: string
  currentPrice: string
  tokensAvailable: string
  totalSupply: string
  tokenSymbol: string
  canInteract: boolean  // true = on correct network (show Redeem + Deposit)
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
    targetYield: "7.95%",
    network: "Ethereum",
    fundBalance: "0.000 PYUSD",
    deployedCapital: "0.000 PYUSD",
    capitalAccount: "0.000 PYUSD",
    currentPrice: "1.000 PYUSD",
    tokensAvailable: "0.000 BFT-TCS-V2_1",
    totalSupply: "0.000 BFT-TCS-V2_1",
    tokenSymbol: "BFT-TCS-V2_1",
    canInteract: true,
    logo: <TCSLogo />,
  },
  {
    id: "2",
    name: "TARAM Funding Pool - Redbelly",
    createdDate: "Aug 12, 2025",
    originator: "taram.io",
    originatorUrl: "#",
    targetYield: "15%",
    network: "Redbelly",
    fundBalance: "583.838 USDC",
    deployedCapital: "100,327.611 USDC",
    capitalAccount: "106,882.073 USDC",
    currentPrice: "1.048 USDC",
    tokensAvailable: "557.059 BFT-TARAM",
    totalSupply: "101,979.732 BFT-TARAM",
    tokenSymbol: "BFT-TARAM",
    canInteract: false,
    logo: <TARAMLogo />,
  },
]

// ─── Pool card ────────────────────────────────────────────────────────────────

function PoolCard({ pool }: { pool: Pool }) {
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
              </div>
              <p className="text-sm text-gray-500 mt-0.5">Created {pool.createdDate}</p>
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                <span>Originator:</span>
                <a href={pool.originatorUrl} className="text-brand-primary hover:underline font-medium">
                  {pool.originator}
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
          <div className="flex items-center gap-2 shrink-0 flex-wrap lg:flex-nowrap">
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
        </div>

        <Separator className="my-5 bg-gray-100" />

        {/* Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1">Fund Balance</p>
            <p className="text-sm font-bold text-gray-900">{pool.fundBalance}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1">Deployed Capital</p>
            <p className="text-sm font-bold text-gray-900">{pool.deployedCapital}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1">Capital Account</p>
            <p className="text-sm font-bold text-gray-900">{pool.capitalAccount}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1">Current Price Per Token</p>
            <p className="text-sm font-bold text-gray-900">{pool.currentPrice}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="text-xs text-gray-500 font-medium mb-1">Tokens Available for Redemption / Total Supply</p>
            <div className="flex items-start gap-1">
              <p className="text-sm font-bold text-gray-900 leading-snug">
                {pool.tokensAvailable} / {pool.totalSupply}
              </p>
              <ExternalLink className="w-3 h-3 text-gray-400 mt-0.5 shrink-0" />
            </div>
          </div>
        </div>

        {/* More details toggle */}
        <div className="mt-5">
          <button className="flex items-center gap-1.5 text-sm font-bold text-brand-dark hover:text-brand-primary transition-colors">
            More Details <ChevronDown className="w-4 h-4" />
          </button>
        </div>
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
