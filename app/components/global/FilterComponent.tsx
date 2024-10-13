import React, { useState, useMemo } from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, ArrowUpDown, X } from "lucide-react"

interface FilterComponenteProps {
  children: React.ReactNode,
  data: Array<Record<string, any>>,
  onFilteredDataChange: (arg: any) => any
}

const FilterComponent = ({ children, data, onFilteredDataChange } : FilterComponenteProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')

  const fields = useMemo(() => {
    if (data.length > 0) {
      return Object.keys(data[0]).filter(key => typeof data[0][key] !== 'object')
    }
    return []
  }, [data])

  const filteredAndSortedData = useMemo(() => {
    let result = [...data]

    // Filter
    if (searchTerm) {
      result = result.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // Sort
    if (sortField) {
      result.sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1
        if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
    }

    onFilteredDataChange(result)
    return result
  }, [data, searchTerm, sortField, sortOrder, onFilteredDataChange])

  const resetFilters = () => {
    setSearchTerm('')
    setSortField('')
    setSortOrder('asc')
  }

  return (
    <div className="w-full">
      <div className='mb-6 flex gap-8 items-end'>
        {children}
      </div>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
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
          <Select value={sortField} onValueChange={setSortField}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Ordenar por..." />
            </SelectTrigger>
            <SelectContent>
              {fields.map((field) => (
                <SelectItem key={field} value={field}>
                  {field}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            <ArrowUpDown className={`h-4 w-4 ${sortOrder === 'asc' ? 'transform rotate-180' : ''}`} />
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-sm font-medium">
            Resultados: {filteredAndSortedData.length}
          </Badge>
          <Button variant="link" onClick={resetFilters} className="text-sm">
            Restablecer filtros
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FilterComponent