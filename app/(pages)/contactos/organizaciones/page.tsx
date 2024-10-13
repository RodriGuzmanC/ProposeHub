"use client"
import ButtonTheme from '@/app/components/global/ButtonTheme'
import FilterComponent from '@/app/components/global/FilterComponent'
import OrgInfoCard from '@/app/components/organizaciones/OrgInfoCard'
import { Button } from '@/components/ui/button'
import { OrganizationsDataExample } from '@/lib/api'
import { Filter, Plus, Briefcase, Edit2, Eye, Building2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'



export default function Contactos() {

    const [formularioCrear, setFormularioCrear] = useState(false);
    const [filteredData, setFilteredData] = useState(OrganizationsDataExample);

    const mostrarFormulario = () => {
        setFormularioCrear(!formularioCrear);
    }
    return (
        <div className="flex flex-col w-full h-screen overflow-auto">
            <main className="flex-1 h-full">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex space-x-4 w-full">

                            <FilterComponent data={OrganizationsDataExample} onFilteredDataChange={setFilteredData}>
                                <h3 className='text-2xl font-bold'>Organizaciones</h3>
                                <Link href={'organizaciones/crear'}>
                                    <ButtonTheme >
                                        <Building2 className="w-5 h-5 mr-2" />
                                        <span>Agregar</span>
                                        <span className="ml-2 bg-white bg-opacity-20 text-xs font-bold py-1 px-2 rounded-full">+</span>
                                    </ButtonTheme>
                                </Link>
                            </FilterComponent>


                        </div>
                    </div>
                    <div className="space-y-4">
                        {filteredData.map((organization) => (
                            <OrgInfoCard id={organization.id} nombre={organization.nombre} telefono={organization.telefono} correo={organization.correo}></OrgInfoCard>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}