import React, { useState, useMemo } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowUpDown, X, SlidersHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface FilterComponenteProps {
  children: React.ReactNode,
  data: Array<Record<string, any>>,
  onFilteredDataChange: (arg: any) => any
}

const FilterComponent = ({ children, data, onFilteredDataChange } : FilterComponenteProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')

  // Filtrar los campos basados en los datos, excluyendo objetos
  const fields = useMemo(() => {
    if (data.length > 0) {
      return Object.keys(data[0]).filter(key => typeof data[0][key] !== 'object')
    }
    return []
  }, [data])

  // Filtrar y ordenar los datos según el término de búsqueda y el orden
  const filteredAndSortedData = useMemo(() => {
    let result = [...data]

    // Filtrado por término de búsqueda
    if (searchTerm) {
      result = result.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // Ordenación: Si hay campos de ordenación, ordenar los datos
    if (result.length > 0) {
      result.sort((a, b) => {
        const field = fields[0] // Siempre usaremos el primer campo para ordenar
        if (a[field] < b[field]) return sortOrder === 'asc' ? -1 : 1
        if (a[field] > b[field]) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
    }

    onFilteredDataChange(result)
    return result
  }, [data, searchTerm, sortOrder, fields, onFilteredDataChange])

  const resetFilters = () => {
    setSearchTerm('')
  }

  return (
    <div className="w-full mb-6 space-y-6">
      {/* Header with title and action button */}
      <div className="flex items-center justify-between">
        {children}
      </div>

      {/* Filter controls */}
      <div className="flex flex-col sm:flex-row gap-4 my-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-12 py-2 w-full"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => setSearchTerm('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            <span>Ordenar</span>
            <ArrowUpDown className={`h-4 w-4 ${sortOrder === 'asc' ? 'transform rotate-180' : ''}`} />
          </Button>
          <Button variant="outline" onClick={resetFilters} className="whitespace-nowrap">
            Restablecer
          </Button>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center">
        <Badge variant="secondary" className="text-sm font-medium">
          Resultados: {filteredAndSortedData.length}
        </Badge>
      </div>
    </div>
  )
}

export default FilterComponent
