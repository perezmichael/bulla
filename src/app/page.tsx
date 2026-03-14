"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Search, Clock, ChevronDown, ChevronRight, Folder, AlertTriangle,
  Zap, FileText, Layers, Coins, ArrowRightLeft, Upload, MoreVertical,
  ArrowRightLeft as Swap,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Sub-components ──────────────────────────────────────────────────────────

function YouBadge() {
  return (
    <span className="inline-flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 text-xs px-1.5 py-0.5 rounded font-medium shrink-0">
      <Folder className="w-3 h-3" />
      You
    </span>
  )
}

function EthIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#627EEA" fillOpacity="0.12" />
      <path d="M16 5l-6.5 11.3 6.5 3.9 6.5-3.9L16 5z" fill="#627EEA" fillOpacity="0.7" />
      <path d="M16 22.4l-6.5-3.8 6.5 8.4 6.5-8.4-6.5 3.8z" fill="#627EEA" />
    </svg>
  )
}

function BaseIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#0052FF" fillOpacity="0.12" />
      <circle cx="16" cy="16" r="6" fill="#0052FF" fillOpacity="0.8" />
    </svg>
  )
}

function GnosisIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#04795B" fillOpacity="0.12" />
      <path d="M16 9a7 7 0 100 14A7 7 0 0016 9zm0 11a4 4 0 110-8 4 4 0 010 8z" fill="#04795B" fillOpacity="0.8" />
    </svg>
  )
}

function ChainIcon({ chain }: { chain: "eth" | "base" | "gnosis" }) {
  if (chain === "eth") return <EthIcon />
  if (chain === "base") return <BaseIcon />
  return <GnosisIcon />
}

// ─── Mock data matching the screenshot ──────────────────────────────────────

type Payment = {
  from: string
  to: string
  fromIsYou?: boolean
  toIsYou?: boolean
  chain: "eth" | "base" | "gnosis"
  date: string
  amount: string
  warning?: boolean
  usdMark: string
  usdAmount: string
  description?: string
  categories?: string
  notes?: string
  muted?: boolean
}

const payments: Payment[] = [
  { from: "Unverified Contract", to: "you", toIsYou: true, chain: "base", date: "13 Feb 2026", amount: "1 USDC", usdMark: "$0.9999", usdAmount: "$0.9999" },
  { from: "0x8a8...181f", to: "you", toIsYou: true, chain: "base", date: "19 Dec 2025", amount: "2,000,000 fourdigitfid", warning: true, usdMark: "Not Found", usdAmount: "Not Found", muted: true },
  { from: "Unverified Contract", to: "you", toIsYou: true, chain: "eth", date: "02 Nov 2025", amount: "0.0001 UNI", usdMark: "$5.7777", usdAmount: "$0.0006" },
  { from: "0x8aa...4e51", to: "you", toIsYou: true, chain: "eth", date: "02 Nov 2025", amount: "427.32 Visit website earnuni.org to claim...", warning: true, usdMark: "Not Found", usdAmount: "Not Found", muted: true },
  { from: "you", fromIsYou: true, to: "WETH9", chain: "eth", date: "19 Mar 2025", amount: "0.01 ETH", usdMark: "$2,049.8413", usdAmount: "$20.4984" },
  { from: "WETH9", to: "you", toIsYou: true, chain: "eth", date: "19 Mar 2025", amount: "0.01 WETH", usdMark: "$2,047.7049", usdAmount: "$20.4770" },
  { from: "0x902...8243", to: "you", toIsYou: true, chain: "base", date: "10 Feb 2025", amount: "0.0001 ACHIVX", warning: true, usdMark: "Not Found", usdAmount: "Not Found", muted: true },
  { from: "0x89e...5e6d", to: "you", toIsYou: true, chain: "base", date: "10 Feb 2025", amount: "1 USDC", usdMark: "$0.9999", usdAmount: "$0.9999" },
  { from: "you", fromIsYou: true, to: "0xd52...3793", chain: "gnosis", date: "29 Feb 2024", amount: "49 USDC", usdMark: "$1.0015", usdAmount: "$49.0732", description: "Bulla Premium..." },
  { from: "GnosisSaf...", to: "you", toIsYou: true, chain: "gnosis", date: "27 Feb 2024", amount: "50 USDC", usdMark: "$1.0001", usdAmount: "$50.0030", description: "Prem Memb to test MP" },
]

// ─── Action shortcut button ──────────────────────────────────────────────────

function ActionBtn({ label, icon, className }: { label: string; icon: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-1.5 group cursor-pointer", className)}>
      <div className="w-11 h-11 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
        {icon}
      </div>
      <span className="text-[10px] font-semibold text-brand-dark uppercase tracking-wide">{label}</span>
    </div>
  )
}

// ─── FROM / TO cell ──────────────────────────────────────────────────────────

function FromToCell({ row }: { row: Payment }) {
  return (
    <div className="flex items-center gap-1.5 min-w-0">
      {row.fromIsYou ? <YouBadge /> : (
        <span className={cn("text-sm font-medium truncate max-w-[110px]", row.muted ? "text-gray-400" : "text-gray-800")}>
          {row.from}
        </span>
      )}
      {!row.fromIsYou && (
        <button className="shrink-0 text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-3.5 h-3.5" />
        </button>
      )}
      <span className="text-gray-400 shrink-0">→</span>
      {row.toIsYou ? <YouBadge /> : (
        <span className={cn("text-sm font-medium truncate max-w-[110px]", row.muted ? "text-gray-400" : "text-gray-800")}>
          {row.to}
        </span>
      )}
      {!row.toIsYou && (
        <button className="shrink-0 text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  )
}

// ─── Mobile payment card ─────────────────────────────────────────────────────

function PaymentCard({ row }: { row: Payment }) {
  return (
    <div className={cn("py-3 px-4 border-b border-gray-100 last:border-0", row.muted ? "opacity-60" : "")}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1 min-w-0">
          <FromToCell row={row} />
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
            <ChainIcon chain={row.chain} />
            <span>{row.date}</span>
          </div>
          <div className={cn("flex items-center gap-1 text-sm font-medium mt-0.5", row.muted ? "text-gray-400" : "text-gray-800")}>
            <span>{row.amount}</span>
            {row.warning && <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
          </div>
          {row.usdAmount !== "Not Found" ? (
            <span className="text-xs text-gray-500">{row.usdAmount}</span>
          ) : (
            <span className="text-xs text-gray-400">Not Found</span>
          )}
          {row.description && <span className="text-xs text-gray-500 truncate">{row.description}</span>}
        </div>
        <button className="text-brand-primary text-sm font-medium shrink-0 hover:underline">View</button>
      </div>
    </div>
  )
}

// ─── Tab label with optional badge ──────────────────────────────────────────

function TabLabel({ label, count }: { label: string; count?: number }) {
  return (
    <span className="flex items-center gap-1.5">
      {label}
      {count != null && (
        <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-gray-100 text-gray-600 text-[10px] font-semibold">
          {count}
        </span>
      )}
    </span>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="space-y-6 pb-20">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Explorer</h1>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        <div className="flex items-center gap-4 sm:gap-5 overflow-x-auto pb-1 sm:pb-0">
          <ActionBtn label="Send" icon={<Zap className="w-4.5 h-4.5 text-brand-primary" />} />
          <ActionBtn label="Request" icon={<FileText className="w-4.5 h-4.5 text-brand-primary" />} />
          <ActionBtn label="Batch" className="hidden sm:flex" icon={<Layers className="w-4.5 h-4.5 text-brand-primary" />} />
          <ActionBtn label="Loan" icon={<Coins className="w-4.5 h-4.5 text-brand-primary" />} />
          <ActionBtn label="Swap" className="hidden sm:flex" icon={<ArrowRightLeft className="w-4.5 h-4.5 text-brand-primary" />} />
          <ActionBtn label="Export" className="hidden sm:flex" icon={<Upload className="w-4.5 h-4.5 text-brand-primary" />} />
        </div>
      </div>

      {/* Tabs — nav on top, filter bar + content inside */}
      <Tabs defaultValue="payments" className="w-full space-y-0">

        {/* Tab nav row */}
        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 border-b border-gray-200">
          <TabsList className="flex w-max bg-transparent p-0 gap-0 h-auto rounded-none">
            {[
              { value: "payments", label: "Payments" },
              { value: "netflows", label: "Net Flows" },
              { value: "nfttransfers", label: "NFT Transfers" },
              { value: "payables", label: "Payables" },
              { value: "receivables", label: "Receivables", count: 2 },
              { value: "loanoffers", label: "Loan Offers", count: 1 },
              { value: "swaps", label: "Swaps" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-none px-4 py-2.5 text-sm text-gray-500 border-b-2 border-transparent
                  data-[state=active]:border-brand-dark data-[state=active]:text-brand-dark
                  data-[state=active]:bg-transparent data-[state=active]:shadow-none
                  hover:text-gray-800 whitespace-nowrap"
              >
                <TabLabel label={tab.label} count={tab.count} />
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Payments tab — filter bar + table */}
        <TabsContent value="payments" className="mt-0 space-y-4 pt-4">

          {/* Filter bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">

            {/* Search */}
            <div className="relative shrink-0 hidden md:block w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search payments..." className="pl-9 h-9 border-gray-300 text-sm w-full" />
            </div>

            {/* Date range */}
            <Button variant="outline" className="h-9 px-3 border-gray-300 text-gray-500 bg-white font-normal shrink-0 hidden md:flex items-center gap-2 text-sm w-[160px] justify-start">
              <Clock className="w-4 h-4 shrink-0" />
              <span className="truncate">Select date range</span>
            </Button>

            {/* Dropdown filters */}
            {[
              { label: "Wallets",    w: "w-[100px]" },
              { label: "Networks",   w: "w-[110px]" },
              { label: "Tokens",     w: "w-[100px]" },
              { label: "In And Out", w: "w-[115px]", mdOnly: true },
              { label: "Category",   w: "w-[110px]", mdOnly: true },
              { label: "Link IDs",   w: "w-[100px]" },
            ].map((f) => (
              <div key={f.label} className={cn("shrink-0", f.w, f.mdOnly ? "hidden md:block" : "")}>
                <Select>
                  <SelectTrigger className="h-9 border-gray-300 bg-white text-sm w-full">
                    <SelectValue placeholder={f.label} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}

            <div className="flex-1" />

            {/* Organize + Export */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <Button variant="outline" className="h-9 px-4 border-2 border-brand-dark text-brand-dark font-semibold text-sm hover:bg-gray-50">
                Organize
              </Button>
              <Button variant="outline" className="h-9 px-4 border-2 border-brand-dark text-brand-dark font-semibold text-sm hover:bg-gray-50 flex items-center gap-1">
                Export <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block border border-gray-200 rounded-lg overflow-hidden bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-white border-b border-gray-200 hover:bg-white">
                  <TableHead className="font-semibold text-xs uppercase tracking-wide text-gray-500 py-3 w-[220px]">From / To</TableHead>
                  <TableHead className="font-semibold text-xs uppercase tracking-wide text-gray-500 py-3 w-[60px]">Chain</TableHead>
                  <TableHead className="font-semibold text-xs uppercase tracking-wide text-gray-500 py-3 w-[110px]">Date</TableHead>
                  <TableHead className="font-semibold text-xs uppercase tracking-wide text-gray-500 py-3 w-[160px]">Amount</TableHead>
                  <TableHead className="font-semibold text-xs uppercase tracking-wide text-gray-500 py-3 w-[110px]">USD Mark</TableHead>
                  <TableHead className="font-semibold text-xs uppercase tracking-wide text-gray-500 py-3 w-[110px]">USD Amount</TableHead>
                  <TableHead className="font-semibold text-xs uppercase tracking-wide text-gray-500 py-3">Description</TableHead>
                  <TableHead className="font-semibold text-xs uppercase tracking-wide text-gray-500 py-3 w-[100px]">Categories</TableHead>
                  <TableHead className="font-semibold text-xs uppercase tracking-wide text-gray-500 py-3 w-[80px]">Notes</TableHead>
                  <TableHead className="w-[50px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((row, i) => (
                  <TableRow
                    key={i}
                    className={cn(
                      "border-b border-gray-100 hover:bg-gray-50/50 transition-colors",
                      row.muted ? "opacity-60" : ""
                    )}
                  >
                    <TableCell className="py-3"><FromToCell row={row} /></TableCell>
                    <TableCell className="py-3"><ChainIcon chain={row.chain} /></TableCell>
                    <TableCell className="py-3 text-sm text-gray-600 whitespace-nowrap">{row.date}</TableCell>
                    <TableCell className="py-3">
                      <div className="flex items-center gap-1">
                        <span className={cn("text-sm font-medium", row.muted ? "text-gray-400" : "text-gray-800")}>{row.amount}</span>
                        {row.warning && <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      {row.usdMark === "Not Found"
                        ? <span className="text-sm text-gray-400">Not Found</span>
                        : <span className="text-sm text-gray-700">{row.usdMark}</span>}
                    </TableCell>
                    <TableCell className="py-3">
                      {row.usdAmount === "Not Found"
                        ? <span className="text-sm text-gray-400">Not Found</span>
                        : <span className="text-sm text-gray-700">{row.usdAmount}</span>}
                    </TableCell>
                    <TableCell className="py-3 text-sm text-gray-600 max-w-[160px] truncate">{row.description || ""}</TableCell>
                    <TableCell className="py-3 text-sm text-gray-600">{row.categories || ""}</TableCell>
                    <TableCell className="py-3 text-sm text-gray-600">{row.notes || ""}</TableCell>
                    <TableCell className="py-3 text-right">
                      <button className="text-brand-primary text-sm font-medium hover:underline">View</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile card stack */}
          <div className="md:hidden border border-gray-200 rounded-lg overflow-hidden bg-white">
            <div className="p-3 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search payments..." className="pl-9 h-9 border-gray-200 text-sm" />
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {payments.map((row, i) => (
                <PaymentCard key={i} row={row} />
              ))}
            </div>
          </div>
        </TabsContent>

        {[
          { value: "netflows",     label: "Net Flows",     icon: <ArrowRightLeft className="w-8 h-8 text-gray-300" />, desc: "Visualizing flow of funds relative to the network." },
          { value: "nfttransfers", label: "NFT Transfers", icon: <Layers className="w-8 h-8 text-gray-300" />,         desc: "Latest NFT movement on the network." },
          { value: "payables",     label: "Payables",      icon: <FileText className="w-8 h-8 text-gray-300" />,       desc: "Outstanding invoices and payment requests." },
          { value: "receivables",  label: "Receivables",   icon: <Coins className="w-8 h-8 text-gray-300" />,          desc: "Incoming payments and tracked invoices." },
          { value: "loanoffers",   label: "Loan Offers",   icon: <Coins className="w-8 h-8 text-gray-300" />,          desc: "Active lending and borrowing offers." },
          { value: "swaps",        label: "Swaps",         icon: <ArrowRightLeft className="w-8 h-8 text-gray-300" />, desc: "Recent compiled swap activities." },
        ].map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-4">
            <div className="border border-gray-200 rounded-lg bg-white p-12 text-center text-gray-500">
              <div className="flex justify-center mb-4">{tab.icon}</div>
              <h3 className="text-base font-semibold text-gray-800 mb-1">{tab.label}</h3>
              <p className="text-sm">{tab.desc}</p>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
