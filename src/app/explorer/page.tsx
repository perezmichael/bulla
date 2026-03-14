"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, ArrowRightLeft, FileText, Blocks, Users, Coins, Box, CheckCircle, Clock, Zap } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function ExplorerPage() {
    return (
        <div className="space-y-8 pb-20">
            {/* Header with Stats and Shortcuts */}
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Bulla Explorer</h1>
                        <p className="text-muted-foreground mt-1">
                            Real-time network status and transaction history.
                        </p>
                    </div>
                    {/* Shortcuts */}
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="hidden md:flex">
                            <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                            Gas: 12 Gwei
                        </Button>
                        <Button variant="outline" size="sm">
                            <Box className="w-4 h-4 mr-2 text-brand-primary" />
                            Latest Block: 1928374
                        </Button>
                        <Button className="bg-brand-primary hover:bg-orange-600 text-white" size="sm">
                            Verify Contract
                        </Button>
                    </div>
                </div>

                {/* Network Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="bg-brand-dark text-white border-none shadow-md">
                        <CardContent className="p-4 py-3">
                            <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Bulla Price</div>
                            <div className="text-lg font-bold flex items-end gap-2">
                                $1.24 <span className="text-xs text-green-400 mb-1">(+2.4%)</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-gray-200 shadow-sm">
                        <CardContent className="p-4 py-3">
                            <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Market Cap</div>
                            <div className="text-lg font-bold text-gray-900">$42.5M</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-gray-200 shadow-sm">
                        <CardContent className="p-4 py-3">
                            <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Transactions (24h)</div>
                            <div className="text-lg font-bold text-gray-900">142,893</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-gray-200 shadow-sm">
                        <CardContent className="p-4 py-3">
                            <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Active Accounts</div>
                            <div className="text-lg font-bold text-gray-900">12,405</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by Address, ENS, Transaction Hash, Block, or Token"
                            className="pl-10 h-10 border-gray-300 focus:border-brand-primary focus:ring-brand-primary shadow-sm"
                        />
                    </div>
                    <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                        <Filter className="w-4 h-4 mr-2" />
                        Advanced Filters
                    </Button>
                </div>
            </div>

            {/* Main Content Area */}
            <Tabs defaultValue="payments" className="w-full">
                <TabsList className="flex w-full md:w-auto overflow-x-auto justify-start gap-1 bg-transparent p-0 border-b border-gray-200 mb-6 rounded-none h-auto">
                    <TabsTrigger value="payments" className="data-[state=active]:border-b-2 data-[state=active]:border-brand-dark data-[state=active]:text-brand-dark data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 border-b-2 border-transparent hover:text-gray-900">Payments</TabsTrigger>
                    <TabsTrigger value="netflows" className="data-[state=active]:border-b-2 data-[state=active]:border-brand-dark data-[state=active]:text-brand-dark data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 border-b-2 border-transparent hover:text-gray-900">Net Flows</TabsTrigger>
                    <TabsTrigger value="nfttransfers" className="data-[state=active]:border-b-2 data-[state=active]:border-brand-dark data-[state=active]:text-brand-dark data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 border-b-2 border-transparent hover:text-gray-900">NFT Transfers</TabsTrigger>
                    <TabsTrigger value="payables" className="data-[state=active]:border-b-2 data-[state=active]:border-brand-dark data-[state=active]:text-brand-dark data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 border-b-2 border-transparent hover:text-gray-900">Payables</TabsTrigger>
                    <TabsTrigger value="receivables" className="data-[state=active]:border-b-2 data-[state=active]:border-brand-dark data-[state=active]:text-brand-dark data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 border-b-2 border-transparent hover:text-gray-900">Receivables</TabsTrigger>
                    <TabsTrigger value="loanoffers" className="data-[state=active]:border-b-2 data-[state=active]:border-brand-dark data-[state=active]:text-brand-dark data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 border-b-2 border-transparent hover:text-gray-900">Loan Offers</TabsTrigger>
                    <TabsTrigger value="swaps" className="data-[state=active]:border-b-2 data-[state=active]:border-brand-dark data-[state=active]:text-brand-dark data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 border-b-2 border-transparent hover:text-gray-900">Swaps</TabsTrigger>
                </TabsList>

                <TabsContent value="payments" className="mt-0">
                    <Card className="border-none shadow-sm ring-1 ring-gray-200">
                        <Table>
                            <TableHeader className="bg-gray-50/50">
                                <TableRow>
                                    <TableHead className="w-[150px]">Tx Hash</TableHead>
                                    <TableHead className="w-[100px]">Method</TableHead>
                                    <TableHead className="w-[100px]">Block</TableHead>
                                    <TableHead>From</TableHead>
                                    <TableHead>To</TableHead>
                                    <TableHead className="text-right">Value</TableHead>
                                    <TableHead className="text-right">Fee</TableHead>
                                    <TableHead className="text-right">Age</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <TableRow key={i} className="hover:bg-gray-50/50">
                                        <TableCell className="font-mono text-xs text-brand-primary cursor-pointer hover:underline">0x3f...1a2b</TableCell>
                                        <TableCell><Badge variant="outline" className="font-mono font-normal text-xs bg-gray-50">Transfer</Badge></TableCell>
                                        <TableCell className="text-blue-600 text-xs">1928374</TableCell>
                                        <TableCell className="font-mono text-xs text-gray-500">0xab...cd12</TableCell>
                                        <TableCell className="font-mono text-xs text-gray-500">0xef...3456</TableCell>
                                        <TableCell className="text-right font-medium text-xs">125.00 USDC</TableCell>
                                        <TableCell className="text-right text-xs text-gray-400">0.001 ETH</TableCell>
                                        <TableCell className="text-right text-xs text-gray-500">12 secs ago</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>

                <TabsContent value="netflows" className="mt-0">
                    <Card className="border-none shadow-sm ring-1 ring-gray-200">
                        <div className="p-12 text-center text-gray-500">
                            <ArrowRightLeft className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <h3 className="text-lg font-medium text-gray-900">Net Flows</h3>
                            <p>Visualizing flow of funds relative to the network.</p>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="nfttransfers" className="mt-0">
                    <Card className="border-none shadow-sm ring-1 ring-gray-200">
                        <div className="p-12 text-center text-gray-500">
                            <Box className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <h3 className="text-lg font-medium text-gray-900">NFT Transfers</h3>
                            <p>Latest NFT movement on the network.</p>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="payables" className="mt-0">
                    <Card className="border-none shadow-sm ring-1 ring-gray-200">
                        <div className="p-12 text-center text-gray-500">
                            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <h3 className="text-lg font-medium text-gray-900">Payables</h3>
                            <p>Outstanding invoices and payment requests.</p>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="receivables" className="mt-0">
                    <Card className="border-none shadow-sm ring-1 ring-gray-200">
                        <div className="p-12 text-center text-gray-500">
                            <Coins className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <h3 className="text-lg font-medium text-gray-900">Receivables</h3>
                            <p>Incoming payments and tracked invoices.</p>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="loanoffers" className="mt-0">
                    <Card className="border-none shadow-sm ring-1 ring-gray-200">
                        <div className="p-12 text-center text-gray-500">
                            <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <h3 className="text-lg font-medium text-gray-900">Loan Offers</h3>
                            <p>Active lending and borrowing offers.</p>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="swaps" className="mt-0">
                    <Card className="border-none shadow-sm ring-1 ring-gray-200">
                        <div className="p-12 text-center text-gray-500">
                            <ArrowRightLeft className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <h3 className="text-lg font-medium text-gray-900">Swaps</h3>
                            <p>Recent compiled swap activities.</p>
                        </div>
                    </Card>
                </TabsContent>

            </Tabs>
        </div>
    )
}