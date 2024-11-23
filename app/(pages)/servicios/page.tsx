'use client'
import ButtonTheme from '@/app/components/global/ButtonTheme';
import CustomItemCard from '@/app/components/global/CustomItemCard';
import ErrorInterface from '@/app/components/global/ErrorInterface';
import FilterComponent from '@/app/components/global/FilterComponent';
import CreateTemplateModal from '@/app/components/plantillas/createTemplateModal';
import CreateRolModal from '@/app/components/roles/createRolModal';
import EditRolModal from '@/app/components/roles/editRolModal';
import CreateServiceModal from '@/app/components/servicios/createServiceModal';
import CardSkeleton from '@/app/components/skeletons/CardSkeleton';
import PagesLoading from '@/app/components/skeletons/PagesLoading';
import { eliminarPlantilla, obtenerPlantillas } from '@/lib/services/plantilla';
import { eliminarRol, obtenerRoles } from '@/lib/services/rol';
import { eliminarServicio, obtenerServicios } from '@/lib/services/servicio';
import { Fallback } from '@radix-ui/react-avatar';
import { Briefcase, BriefcaseBusiness, HandHelping } from 'lucide-react';
import Link from 'next/link';
import React, { Suspense, useEffect, useState } from 'react'
import useSWR from 'swr'

export default function ListRoles() {
    const [filteredData, setFilteredData] = useState<any>([])
    /** Elimina la plantilla seleccionada */
    async function eliminarFun(id: number) {
        await eliminarServicio(id)
        mutate()
    }

    /** Abre y cierra el modal */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeOpenModal = () => setIsModalOpen(!isModalOpen);

    /** Carga los datos */
    
    const { data, error, isLoading, mutate } = useSWR<any>('/servicios', obtenerServicios)
    
    if (error) return <ErrorInterface></ErrorInterface>
    if (isLoading) return <PagesLoading></PagesLoading>
    
    return (
        <div className="flex flex-col w-full h-screen overflow-auto p-6">
            <FilterComponent
            data={data}
            onFilteredDataChange={setFilteredData}
            >
                <div className="w-full">
                    <div className="flex space-x-4 items-end">
                        <h3 className='text-2xl font-bold'>Servicios</h3>
                        <ButtonTheme onClick={closeOpenModal}>
                            <HandHelping className="w-5 h-5 mr-2" />
                            <span>Agregar</span>
                            <span className="ml-2 bg-white bg-opacity-20 text-xs font-bold py-1 px-2 rounded-full">+</span>
                        </ButtonTheme>

                    </div>
                </div>
            </FilterComponent>

                <>
                {isModalOpen && <CreateServiceModal closeEvent={closeOpenModal} />}
                

                <div className="space-y-4">
                    {filteredData.map((plantilla: any) => (
                        <CustomItemCard
                            key={plantilla.id}
                            id={plantilla.id}
                            nombre={plantilla.nombre}
                            elementos={[plantilla.descripcion]}
                            verHref='/plantillas/ver'
                            editarHref={`servicios/editar/${plantilla.id}`}
                            IconCard={HandHelping}
                            eliminarAction={eliminarFun}
                        ></CustomItemCard>
                    ))}
                </div>
            </>
            
        </div>
    )
}

