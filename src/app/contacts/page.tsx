"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Search, Copy, MoreVertical, ChevronDown, ChevronUp, ChevronsUpDown, UserPlus } from "lucide-react"

// ─── Mock data ────────────────────────────────────────────────────────────────

const contacts = [
  { id: "1", name: "ACCOUNT 4", wallet: "0xe47...d446", email: "", groups: ["Marketing"] },
  { id: "2", name: "Bulla Demo Wallet", wallet: "0xf47...064e", email: "", groups: ["Marketing"] },
]

// ─── Group badge ─────────────────────────────────────────────────────────────

function GroupBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
      {label}
    </span>
  )
}

// ─── Mobile contact card ──────────────────────────────────────────────────────

function ContactCard({ contact }: { contact: typeof contacts[0] }) {
  return (
    <div className="p-4 border-b border-gray-100 last:border-0">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900">{contact.name}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-gray-500 font-mono">{contact.wallet}</span>
            <button className="text-gray-400 hover:text-gray-600">
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
          {contact.email && <p className="text-xs text-gray-500 mt-0.5">{contact.email}</p>}
          {contact.groups.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {contact.groups.map((g) => <GroupBadge key={g} label={g} />)}
            </div>
          )}
        </div>
        <button className="text-gray-400 hover:text-gray-600 p-1 shrink-0">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactsPage() {
  const [selected, setSelected] = useState<string[]>([])

  const toggleAll = () => {
    setSelected(selected.length === contacts.length ? [] : contacts.map((c) => c.id))
  }

  const toggleOne = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
  }

  return (
    <div className="space-y-6 pb-20">

      {/* Header */}
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">Contacts</h1>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <div className="relative w-full sm:w-[280px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-9 h-10 border-gray-300 text-sm" />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" className="h-10 px-5 border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50">
            Import
          </Button>
          <Button variant="outline" className="h-10 px-5 border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50">
            Export
          </Button>
          <Button className="h-10 px-5 bg-brand-primary hover:bg-orange-600 text-white font-semibold text-sm">
            New Contact
          </Button>
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block border border-gray-200 rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-white border-b border-gray-200 hover:bg-white">
              <TableHead className="w-[44px] py-3 px-4">
                <input
                  type="checkbox"
                  checked={selected.length === contacts.length}
                  onChange={toggleAll}
                  className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary w-4 h-4 cursor-pointer"
                />
              </TableHead>
              <TableHead className="py-3 font-semibold text-xs uppercase tracking-wide text-gray-500">
                <button className="flex items-center gap-1 hover:text-gray-800">
                  Name <ChevronUp className="w-3.5 h-3.5" />
                </button>
              </TableHead>
              <TableHead className="py-3 font-semibold text-xs uppercase tracking-wide text-gray-500">
                <button className="flex items-center gap-1 hover:text-gray-800">
                  Wallet <ChevronsUpDown className="w-3.5 h-3.5" />
                </button>
              </TableHead>
              <TableHead className="py-3 font-semibold text-xs uppercase tracking-wide text-gray-500">
                <button className="flex items-center gap-1 hover:text-gray-800">
                  Email <ChevronsUpDown className="w-3.5 h-3.5" />
                </button>
              </TableHead>
              <TableHead className="py-3 font-semibold text-xs uppercase tracking-wide text-gray-500">
                <button className="flex items-center gap-1 hover:text-gray-800">
                  Groups <ChevronsUpDown className="w-3.5 h-3.5" />
                </button>
              </TableHead>
              <TableHead className="w-[48px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow
                key={contact.id}
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50"
              >
                <TableCell className="py-3.5 px-4">
                  <input
                    type="checkbox"
                    checked={selected.includes(contact.id)}
                    onChange={() => toggleOne(contact.id)}
                    className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary w-4 h-4 cursor-pointer"
                  />
                </TableCell>
                <TableCell className="py-3.5 text-sm font-medium text-gray-900">
                  {contact.name}
                </TableCell>
                <TableCell className="py-3.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-mono text-gray-600">{contact.wallet}</span>
                    <button className="text-gray-400 hover:text-gray-600" title="Copy address">
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </TableCell>
                <TableCell className="py-3.5 text-sm text-gray-500">
                  {contact.email || ""}
                </TableCell>
                <TableCell className="py-3.5">
                  <div className="flex flex-wrap gap-1">
                    {contact.groups.map((g) => <GroupBadge key={g} label={g} />)}
                  </div>
                </TableCell>
                <TableCell className="py-3.5 text-right pr-4">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Actions bar */}
        <div className="border-t border-gray-100 px-4 py-3">
          <Button
            variant="outline"
            disabled={selected.length === 0}
            className="h-9 px-4 border-gray-300 text-gray-500 font-medium text-sm disabled:opacity-40"
          >
            Actions <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Mobile card list */}
      <div className="sm:hidden border border-gray-200 rounded-lg overflow-hidden bg-white">
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
        <div className="border-t border-gray-100 px-4 py-3">
          <Button
            variant="outline"
            disabled
            className="h-9 px-4 border-gray-300 text-gray-500 font-medium text-sm disabled:opacity-40"
          >
            Actions <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}
