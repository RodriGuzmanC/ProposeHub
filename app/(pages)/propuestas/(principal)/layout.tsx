"use client"
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Clock, Briefcase, CheckCircle, XCircle, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { LayoutPropsLib } from '@/lib/utils/definitions'

const proposalStates = [
  { id: '1', label: 'En progreso', icon: Clock },
  { id: '2', label: 'Abierto', icon: Briefcase },
  { id: '3', label: 'Aceptado', icon: CheckCircle },
  { id: '4', label: 'Declinado', icon: XCircle },
]




export default function ModernProposalSidebar({children} : LayoutPropsLib) {
  const [activeState, setActiveState] = useState('1')
  const router = useRouter();

  const handleStateChange = (state: any) => {
    setActiveState(state);
    router.push(`?estado=${state}`, undefined);
  };

  return (
    <div className='flex w-full h-screen bg-white'>
    <aside className="w-64 h-screen bg-principal-800 text-gray-300 p-4 flex flex-col">
      <div className="relative mb-4">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <Input
          type="search"
          placeholder="Search"
          className="w-full pl-8 bg-gray-800 border-gray-700 focus:border-blue-600 text-gray-300 placeholder-gray-500"
        />
      </div>
      <ScrollArea className="flex-grow">
        <nav className="space-y-1">
          <h2 className="px-2 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Estados de Propuesta
          </h2>
          {proposalStates.map((state) => (
            <Button
              key={state.id}
              variant="ghost"
              className={`w-full justify-start px-2 py-1.5 ${
                activeState === state.id
                  ? 'bg-blue-600/20 text-white'
                  : 'text-gray-400 hover:bg-blue-600/10 hover:text-white'
              }`}
              onClick={() => handleStateChange(state.id)}
            >
              <state.icon className={`mr-2 h-4 w-4 ${activeState === state.id ? 'text-white' : ''}`} />
              {state.label}
              
            </Button>
          ))}
          {/*<div className="pt-4 mt-4 border-t border-gray-800">
            <Button
              variant="ghost"
              className="w-full justify-start px-2 py-1.5 text-gray-400 hover:bg-blue-600/10 hover:text-white"
            >
              <Settings className="mr-2 h-4 w-4" />
              Configuración
            </Button>
          </div>*/}
        </nav>
      </ScrollArea>
    </aside>
    {children}
    </div>
  )
}
