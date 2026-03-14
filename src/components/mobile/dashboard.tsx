"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ArrowUpRight, Copy, CheckCircle2, Clock, XCircle } from "lucide-react"

interface LinkItem {
    id: string;
    date: string;
    description: string;
    amount: string;
    status: string;
    clicks: number;
}

export function MobileDashboard({ links }: { links: LinkItem[] }) {
    return (
        <div className="flex flex-col gap-6 pb-20">
            {/* Mobile Hero: Balance / Summary */}
            <div className="bg-brand-dark text-white rounded-2xl p-6 shadow-xl shadow-gray-900/20 mx-1">
                <div className="text-gray-300 text-sm font-medium mb-1">Total Revenue</div>
                <div className="text-4xl font-bold tracking-tight mb-4">$12,450.00</div>
                <div className="flex gap-2">
                     <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-medium flex items-center">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        +20.1%
                     </div>
                     <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-medium">
                        12 Active Links
                     </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
                <Button className="h-12 bg-white text-brand-dark border-2 border-brand-dark/10 hover:bg-gray-50 shadow-sm text-base font-semibold" variant="outline">
                    Create Invoice
                </Button>
                <Button className="h-12 bg-brand-primary text-white hover:bg-orange-600 shadow-orange-500/20 shadow-lg text-base font-semibold">
                    New Link
                </Button>
            </div>

            {/* Recent Activity Stack */}
            <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                    <h3 className="font-semibold text-lg">Recent Activity</h3>
                    <Button variant="link" className="text-brand-primary h-auto p-0">See All</Button>
                </div>
                
                {links.map((link) => (
                    <Card key={link.id} className="border-none shadow-sm ring-1 ring-gray-100">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                                    link.status === 'paid' ? 'bg-green-100 text-green-600' :
                                    link.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                                    'bg-red-100 text-red-600'
                                }`}>
                                    {link.status === 'paid' ? <CheckCircle2 className="w-5 h-5" /> :
                                     link.status === 'pending' ? <Clock className="w-5 h-5" /> :
                                     <XCircle className="w-5 h-5" />}
                                </div>
                                <div className="flex flex-col overflow-hidden">
                                    <span className="font-semibold text-gray-900 truncate max-w-[150px]">{link.description}</span>
                                    <span className="text-xs text-gray-500">{link.date}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="font-bold text-gray-900">{link.amount}</span>
                                <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-normal bg-gray-100 text-gray-600">
                                    {link.status}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
