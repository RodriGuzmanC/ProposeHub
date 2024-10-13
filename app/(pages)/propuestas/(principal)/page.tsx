"use client"
import PropuestaCard from '@/app/components/PropuestaCard'
import { Filter, Plus, Briefcase, Edit2, Eye } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'


const propuestas = [
  { id: 1, titulo: 'Propuesta 1', monto: 1500, fecha: '15 octubre 2024', estado: 'aceptado' },
  { id: 2, titulo: 'Propuesta 2', monto: 2100, fecha: '10 octubre 2024', estado: 'aceptado' },
  { id: 3, titulo: 'Propuesta 3', monto: 1200, fecha: '08 octubre 2024', estado: 'aceptado' },
  { id: 4, titulo: 'Propuesta 4', monto: 2500, fecha: '31 octubre 2024', estado: 'aceptado' },
  { id: 5, titulo: 'Propuesta 5', monto: 2500, fecha: '31 octubre 2024', estado: 'aceptado' },
  { id: 6, titulo: 'Propuesta 6', monto: 2500, fecha: '31 octubre 2024', estado: 'abierto' },
  { id: 7, titulo: 'Propuesta 7', monto: 2500, fecha: '31 octubre 2024', estado: 'abierto' },
  { id: 8, titulo: 'Propuesta 8', monto: 2500, fecha: '31 octubre 2024', estado: 'en-progreso' },
  { id: 9, titulo: 'Propuesta 9', monto: 2500, fecha: '31 octubre 2024', estado: 'aceptado' },
  { id: 10, titulo: 'Propuesta 10', monto: 2500, fecha: '31 octubre 2024', estado: 'abierto' },
  { id: 11, titulo: 'Propuesta 11', monto: 2500, fecha: '31 octubre 2024', estado: 'abierto' },
  { id: 12, titulo: 'Propuesta 12', monto: 2500, fecha: '31 octubre 2024', estado: 'en-progreso' },
  { id: 13, titulo: 'Propuesta 13', monto: 2500, fecha: '31 octubre 2024', estado: 'declinado' },
  { id: 14, titulo: 'Propuesta 14', monto: 2500, fecha: '31 octubre 2024', estado: 'declinado' },
  { id: 15, titulo: 'Propuesta 15', monto: 2500, fecha: '31 octubre 2024', estado: 'declinado' },
]

export default function Propuestas() {
  const searchParams = useSearchParams()
  const search = searchParams.get("estado") || 'abierto'
  const [filteredProposals, setFilteredProposals] = useState([]);

  useEffect(()=> {
    const propuestasFiltradas = propuestas.filter(propuesta => propuesta.estado == search)
    setFilteredProposals(propuestasFiltradas);
  }, [search]);

  return (
    <div className="flex flex-col w-full h-screen overflow-auto">
      
      <main className="flex-1 h-full">
        <div className="h-full p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-black">{filteredProposals.length} propuesta{filteredProposals.length !== 1 ? 's' : ''}</h2>
            <div className="flex space-x-4">
              <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                <Filter className="w-5 h-5 mr-2" />
                Filtrar
              </button>
              <Link href="propuestas/crear/" className="flex items-center px-4 py-2 rounded-md text-white bg-principal">
                <Plus className="w-5 h-5 mr-2" />
                Nueva propuesta
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            {filteredProposals.map((propuesta) => (
              <PropuestaCard numero={propuesta.id} monto={propuesta.monto}></PropuestaCard>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
