"use client"

import { ArrowUpRight, FileSpreadsheet, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Report card data ─────────────────────────────────────────────────────────

const reports = [
  {
    id: "ledger",
    icon: <FileSpreadsheet className="w-6 h-6 text-gray-600" />,
    title: "Ledger Export",
    description: "Export CSVs for receivables, payables, and cash disbursements and import them into your general ledger.",
    cta: "Start your ledger export",
    featured: true,
  },
  {
    id: "1099",
    icon: <FileText className="w-6 h-6 text-gray-600" />,
    title: "1099 Tax Prep",
    description: "Generate organized 1099 tax data for individual wallets.",
    cta: "Start your 1099s",
    featured: false,
  },
  {
    id: "8949",
    icon: <FileText className="w-6 h-6 text-gray-600" />,
    title: "8949 Tax Prep",
    description: "Crypto gains and losses.",
    cta: "Start your 8949s",
    featured: false,
  },
]

// ─── Beta badge ───────────────────────────────────────────────────────────────

function BetaBadge() {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-brand-primary text-brand-primary bg-orange-50 text-[11px] font-semibold">
      Beta
    </span>
  )
}

// ─── Report card ──────────────────────────────────────────────────────────────

function ReportCard({ report }: { report: typeof reports[0] }) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-white p-6 flex flex-col gap-4 hover:shadow-sm transition-shadow",
        report.featured
          ? "border-brand-primary ring-1 ring-brand-primary/20"
          : "border-gray-200"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">{report.icon}</div>
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-lg font-bold text-gray-900">{report.title}</h3>
          <BetaBadge />
        </div>
      </div>
      <p className="text-sm text-gray-500 leading-relaxed flex-1">{report.description}</p>
      <button className="flex items-center gap-1 text-brand-primary text-sm font-semibold hover:underline self-start mt-auto">
        {report.cta} <ArrowUpRight className="w-4 h-4" />
      </button>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReportingPage() {
  return (
    <div className="space-y-8 pb-20">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">Reporting Explorer</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  )
}
