import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Search, Settings, Wallet, ChevronDown, RefreshCw, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  return (
    <nav className="bg-[#14282D] text-white shadow-md border-b border-white/10">
      <div className="flex h-16 items-center px-4 container mx-auto justify-between gap-4">
        {/* Left Side: Logo & Navigation */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/bulla-logo.png"
              alt="Bulla Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="font-bold text-xl tracking-tight text-white">Bulla</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-1 text-sm font-medium text-gray-300">
            <Link href="/" className="hover:text-white hover:bg-white/10 px-3 py-2 rounded-md transition-all">Explorer</Link>
            <Link href="/contacts" className="hover:text-white hover:bg-white/10 px-3 py-2 rounded-md transition-all">Contacts</Link>
            <Link href="/pools" className="hover:text-white hover:bg-white/10 px-3 py-2 rounded-md transition-all">Finance Pools</Link>
            <Link href="/reporting" className="hover:text-white hover:bg-white/10 px-3 py-2 rounded-md transition-all">Reporting</Link>
            <Link href="/links" className="hover:text-white hover:bg-white/10 px-3 py-2 rounded-md transition-all">My Links</Link>
            <button className="hover:text-white hover:bg-white/10 px-3 py-2 rounded-md transition-all flex items-center gap-1">
              Help <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right Side: Utilities */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-transparent">
            <Search className="w-5 h-5" />
          </Button>

          {/* Currency Pill */}
          <div className="hidden md:flex items-center bg-white text-[#14282D] px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
            <span>$ USD</span>
          </div>

          {/* Safe Status */}
          <div className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-200">
            <RefreshCw className="w-4 h-4 text-gray-400" />
            <span>Safe</span>
          </div>

          {/* Wallet Address */}
          <div className="hidden md:flex items-center gap-2 bg-[#1C363D] hover:bg-[#23454E] transition-colors border border-white/10 px-3 py-1.5 rounded-md cursor-pointer">
            <Wallet className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-200 font-mono">0x15...57d</span>
          </div>

          {/* Chain Switcher */}
          <div className="hidden md:flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-white/5">
            {/* Eth Logo Placeholder (Simple Circle or SVG if preferred) */}
            <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center border border-white/20">
              <svg className="w-3 h-3 text-white" viewBox="0 0 32 32" fill="currentColor">
                <path d="M15.925 23.96l-9.819-5.796L15.925 32l9.83-13.836-9.83 5.796zM16.075 0L6.254 16.297l9.82 5.805 9.82-5.805L16.075 0zm0 14.524v-6.09l4.582 7.61-4.582-1.52z" />
              </svg>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>

          {/* Settings */}
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-transparent">
            <Settings className="w-5 h-5" />
          </Button>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                {/* Mobile Menu Content... simplified for this pass */}
                <div className="flex flex-col gap-4 mt-8">
                  <Link href="/" className="text-lg font-medium text-gray-800">Explorer</Link>
                  <Link href="/contacts" className="text-lg font-medium text-gray-800">Contacts</Link>
                  <Link href="/pools" className="text-lg font-medium text-gray-800">Finance Pools</Link>
                  <Link href="/reporting" className="text-lg font-medium text-gray-800">Reporting</Link>
                  <Link href="/links" className="text-lg font-medium text-gray-800">My Links</Link>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col gap-4">
                  {/* Mobile Wallet & Chain */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-[#1C363D] hover:bg-[#23454E] transition-colors border border-white/10 px-3 py-1.5 rounded-md cursor-pointer w-full justify-center">
                      <Wallet className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-200 font-mono">0x15...57d</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-100 border border-gray-200 w-full justify-center">
                      <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center border border-white/20">
                        <svg className="w-3 h-3 text-white" viewBox="0 0 32 32" fill="currentColor">
                          <path d="M15.925 23.96l-9.819-5.796L15.925 32l9.83-13.836-9.83 5.796zM16.075 0L6.254 16.297l9.82 5.805 9.82-5.805L16.075 0zm0 14.524v-6.09l4.582 7.61-4.582-1.52z" />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-700">Ethereum</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center bg-gray-100 text-[#14282D] px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
                      <span>$ USD</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                      <RefreshCw className="w-4 h-4 text-gray-400" />
                      <span>Safe</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
