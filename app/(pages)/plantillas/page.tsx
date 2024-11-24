'use client'
import ButtonTheme from '@/app/components/global/ButtonTheme';
import CustomItemCard from '@/app/components/global/CustomItemCard';
import ErrorInterface from '@/app/components/global/ErrorInterface';
import CreateTemplateModal from '@/app/components/plantillas/createTemplateModal';
import PagesLoading from '@/app/components/skeletons/PagesLoading';
import { eliminarPlantilla, obtenerPlantillas } from '@/lib/services/plantilla';
import { Plantilla } from '@/lib/utils/definitions';
import { Briefcase, BriefcaseBusiness, LayoutPanelLeftIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';

export default function ListPlantillas() {
    /** Elimina la plantilla seleccionada */
    async function eliminarFun(id: number) {
        await eliminarPlantilla(id)
        mutate()
    }


    /** Abre y cierra el modal */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeOpenModal = () => setIsModalOpen(!isModalOpen);

    /** Carga los datos */
    const { data: plantillas, error, isLoading, mutate } = useSWR<Plantilla[]>('/plantillas', obtenerPlantillas)
    if (error) return <ErrorInterface></ErrorInterface>
    if (plantillas == undefined) return <PagesLoading></PagesLoading>
    if (isLoading) return <PagesLoading></PagesLoading>
    return (
        <div className="flex flex-col w-full h-screen overflow-auto p-6 bg-white text-primary">

            <>
                {isModalOpen && <CreateTemplateModal closeEvent={closeOpenModal} />}
                <div className="w-full">
                    <div className="flex space-x-4 mb-6 items-end">
                        <h3 className='text-2xl font-bold'>Plantillas</h3>
                        <ButtonTheme onClick={closeOpenModal}>
                            <LayoutPanelLeftIcon className="w-5 h-5 mr-2" />
                            <span>Agregar</span>
                            <span className="ml-2 bg-white bg-opacity-20 text-xs font-bold py-1 px-2 rounded-full">+</span>
                        </ButtonTheme>

                    </div>
                </div>
                <div className="space-y-4">
                    {plantillas.map((plantilla: Plantilla) => (
                        <CustomItemCard
                            key={plantilla.id}
                            id={plantilla.id}
                            nombre={plantilla.nombre}
                            elementos={[plantilla.descripcion]}
                            verHref='/plantillas/ver'
                            editarHref={`constructor/plantilla/editar/${plantilla.id}`}
                            IconCard={LayoutPanelLeftIcon}
                            eliminarAction={eliminarFun}
                        ></CustomItemCard>
                    ))}
                </div>
            </>


        </div>
    )
}
