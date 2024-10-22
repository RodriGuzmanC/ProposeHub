'use client'

import React, { Suspense, useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Users, Briefcase, MessageSquare, PieChart, LogOut, Menu } from 'lucide-react'
import { HeightIcon } from '@radix-ui/react-icons'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import PagesLoading from '../components/skeletons/PagesLoading'

const navItems = [
  { id: 'inicio', icon: Home, label: 'Inicio', href: '/inicio' },
  { id: 'contactos', icon: Users, label: 'Contactos', href: '/contactos/personas' },
  { id: 'propuestas', icon: Briefcase, label: 'Propuestas', href: '/propuestas' },
  { id: 'plantillas', icon: Briefcase, label: 'Plantillas', href: '/plantillas' },
  //{ id: 'mensajes', icon: MessageSquare, label: 'Mensajes', href: '/mensajes' },
  { id: 'usuarios', icon: Users, label: 'Usuarios', href: '/usuarios' }
]

interface Props {
    children: React.ReactNode;
}

export default function ModernNavbar({children}: Props) {
  const [activeItem, setActiveItem] = useState('inicio')
  const [isCollapsed, setIsCollapsed] = useState(false)

  const pathName = usePathname()

  return (
    <div className="flex min-h-screen overflow-auto">
      <aside className={`flex flex-col h-screen bg-principal-900 text-gray-100 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="flex items-center justify-between p-4">
          {!isCollapsed && <h1 className="text-xl font-bold">ProposeHub</h1>}
          <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <ScrollArea className="flex-grow">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={pathName.startsWith(item.href) ? "secondary" : "ghost"}
                className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-4'}`}
                onClick={() => setActiveItem(item.id)}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className={`h-5 w-5 ${isCollapsed ? 'mr-0' : 'mr-3'}`} />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </Button>
            ))}
          </nav>
        </ScrollArea>
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/avatar.png" alt="Usuario" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div>
                <p className="text-sm font-medium">Usuario</p>
                <p className="text-xs text-gray-400">usuario@ejemplo.com</p>
              </div>
            )}
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-4" asChild>
            <Link href="/logout">
              <LogOut className="h-4 w-4 mr-2" />
              {!isCollapsed && "Cerrar sesión"}
            </Link>
          </Button>
        </div>
      </aside>
      <main className="flex-grow">
        <Suspense fallback={<PagesLoading></PagesLoading>}>
        {children}
        </Suspense>
      </main>
    </div>
  )
}
