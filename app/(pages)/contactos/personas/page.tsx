"use client"
import { User } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import FilterComponent from '@/app/components/global/FilterComponent'
import ButtonTheme from '@/app/components/global/ButtonTheme'
import CustomItemCard from '@/app/components/global/CustomItemCard'
import { eliminarCliente, obtenerClientes } from '@/lib/services/cliente'
import ErrorInterface from '@/app/components/global/ErrorInterface'
import PagesLoading from '@/app/components/skeletons/PagesLoading'
import useSWR from 'swr'
import { Cliente } from '@/lib/utils/definitions'




export default function PersonasVistaClient() {
  async function eliminarFun(id: number) {
    await eliminarCliente(id)
    mutate()
  }
  
  /** Carga los datos */
  const { data: clientes, error, isLoading, mutate } = useSWR<Cliente[]>('/contactos/personas', obtenerClientes)
  if (error) return <ErrorInterface></ErrorInterface>
  if (isLoading) return <PagesLoading></PagesLoading>
  if (clientes == undefined) return <ErrorInterface></ErrorInterface>
  return (
    <div className="flex flex-col w-full h-screen overflow-auto">
      <main className="flex-1 h-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            {/*<FilterComponent data={data} onFilteredDataChange={setFilteredData}>*/}
              <h3 className='text-2xl font-bold'>Clientes</h3>
              <Link href={'personas/crear'}>
                <ButtonTheme>
                  <User className="w-5 h-5 mr-2" />
                  <span>Agregar</span>
                  <span className="ml-2 bg-white bg-opacity-20 text-xs font-bold py-1 px-2 rounded-full">+</span>
                </ButtonTheme>
              </Link>
            {/*</FilterComponent>*/}
          </div>
          <div className="space-y-4">
            {clientes.map((cliente: Cliente) => (
              <CustomItemCard
                key={cliente.id}
                IconCard={User}
                editarHref={`personas/editar/${cliente.id}`}
                verHref={`personas/ver/${cliente.id}`}
                id={cliente.id}
                eliminarAction={eliminarFun}
                nombre={cliente.nombre}
                elementos={[cliente.correo, cliente.telefono, cliente.organizacion.nombre]}></CustomItemCard>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
