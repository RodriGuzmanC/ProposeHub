"use client"
import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, ContactRound, Building2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutPropsLib } from '@/lib/utils/definitions'

const proposalStates = [
    { id: 'personas', label: 'Personas', icon: ContactRound, href: '/contactos/personas' },
    { id: 'organizaciones', label: 'Organizacones', icon: Building2, href: '/contactos/organizaciones' },
]




export default function ModernProposalSidebar({ children }: LayoutPropsLib) {
    const pathName = usePathname()


    return (
        <div className='flex w-full h-screen bg-white overflow-auto'>
            <aside className="w-64 h-screen bg-popover text-popover-foreground p-4 flex flex-col">
                <div className="relative mb-4">
                    {/*<Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input
                        type="search"
                        placeholder="Search"
                        className="w-full pl-8 bg-gray-800 border-gray-700 focus:border-blue-600 text-gray-300 placeholder-gray-500"
                    />*/}
                </div>
                <ScrollArea className="flex-grow">
                    <nav className="space-y-1">
                        <h2 className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider">
                            Contactos
                        </h2>
                        {proposalStates.map((state) => (
                            <Link key={state.id} href={state.href}>
                                <Button
                                    key={state.id}
                                    variant="ghost"
                                    className={`w-full justify-start px-2 py-1.5 ${pathName.startsWith(state.href)
                                            ? 'bg-secondary text-foreground hover:text-white'
                                            : 'text-foreground '
                                        }`}
                                >
                                    <state.icon className={`mr-2 h-4 w-4 hover:text-inherit ${pathName.startsWith(state.href) ? 'text-white' : ''}`} />
                                    {state.label}
                                    {state.id === 'en-progreso' && (
                                        <span className="ml-auto bg-gray-700 text-gray-300 text-xs px-1.5 py-0.5 rounded-full">
                                            14
                                        </span>
                                    )}
                                </Button>
                            </Link>
                        ))}
                        {/*<div className="pt-4 mt-4 border-t border-gray-800">
                            <Button
                                variant="ghost"
                                className="w-full justify-start px-2 py-1.5 text-gray-400 hover:bg-blue-600/10 hover:text-white"
                            >
                                <Trash className="mr-2 h-4 w-4" />
                                Eliminados
                            </Button>
                        </div>*/}
                    </nav>
                </ScrollArea>
            </aside>
            <div className='overflow-auto w-full text-primary'>
                {children}
            </div>
        </div>
    )
}