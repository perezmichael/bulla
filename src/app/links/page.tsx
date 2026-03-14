"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Search, Copy, QrCode, Trash2, Pencil, Plus } from "lucide-react"

// ─── Mock data matching screenshot ───────────────────────────────────────────

const links = [
  {
    id: "1",
    name: "Mike's Link",
    dateCreated: "24 Apr 2025",
    amountCollected: "0 ETH",
    url: "https://banker.bulla.network/#/link-pay?net...",
  },
]

// ─── Mobile link card ────────────────────────────────────────────────────────

function LinkCard({ link }: { link: typeof links[0] }) {
  return (
    <div className="p-4 border-b border-gray-100 last:border-0">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900">{link.name}</p>
          <p className="text-xs text-gray-500 mt-0.5">{link.dateCreated}</p>
          <p className="text-xs text-gray-500 mt-0.5">{link.amountCollected} collected</p>
          <p className="text-xs text-brand-primary mt-1 truncate max-w-[220px]">{link.url}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="text-gray-400 hover:text-gray-600 p-1">
            <Copy className="w-4 h-4" />
          </button>
          <button className="text-gray-400 hover:text-gray-600 p-1">
            <QrCode className="w-4 h-4" />
          </button>
          <button className="text-gray-400 hover:text-red-500 p-1">
            <Trash2 className="w-4 h-4" />
          </button>
          <button className="text-gray-400 hover:text-gray-600 p-1">
            <Pencil className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LinksPage() {
  return (
    <div className="space-y-6 pb-20">

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">My Links</h1>
        <Button className="bg-brand-primary hover:bg-orange-600 text-white font-semibold text-sm h-10 px-4 shrink-0">
          <Plus className="w-4 h-4 mr-1.5" />
          Create new link
        </Button>
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-[280px]">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search Links..."
          className="pl-9 h-10 border-gray-300 text-sm"
        />
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block border border-gray-200 rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-white border-b border-gray-200 hover:bg-white">
              <TableHead className="font-semibold text-xs uppercase tracking-wide text-gray-500 py-3">Link ID</TableHead>
              <TableHead className="font-semibold text-xs uppercase tracking-wide text-gray-500 py-3">Date Created</TableHead>
              <TableHead className="font-semibold text-xs uppercase tracking-wide text-gray-500 py-3">Amount Collected</TableHead>
              <TableHead className="font-semibold text-xs uppercase tracking-wide text-gray-500 py-3">Link</TableHead>
              <TableHead className="w-[80px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {links.map((link) => (
              <TableRow key={link.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
                <TableCell className="py-4 text-sm text-gray-800 font-medium">{link.name}</TableCell>
                <TableCell className="py-4 text-sm text-gray-600">{link.dateCreated}</TableCell>
                <TableCell className="py-4 text-sm text-gray-600">{link.amountCollected}</TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 truncate max-w-[260px]">{link.url}</span>
                    <button className="text-gray-400 hover:text-gray-600 shrink-0" title="Copy link">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 shrink-0" title="QR code">
                      <QrCode className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center justify-end gap-1.5">
                    <button className="text-gray-400 hover:text-red-500 p-1 rounded" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 p-1 rounded" title="Edit">
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile card list */}
      <div className="sm:hidden border border-gray-200 rounded-lg overflow-hidden bg-white">
        {links.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </div>
    </div>
  )
}
