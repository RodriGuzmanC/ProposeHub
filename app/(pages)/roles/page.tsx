'use client'
import ButtonTheme from '@/app/components/global/ButtonTheme';
import CustomItemCard from '@/app/components/global/CustomItemCard';
import CreateTemplateModal from '@/app/components/plantillas/createTemplateModal';
import CreateRolModal from '@/app/components/roles/createRolModal';
import EditRolModal from '@/app/components/roles/editRolModal';
import PagesLoading from '@/app/components/skeletons/PagesLoading';
import { eliminarPlantilla, obtenerPlantillas } from '@/lib/services/plantilla';
import { eliminarRol, obtenerRoles } from '@/lib/services/rol';
import { Briefcase, BriefcaseBusiness } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function ListRoles() {
    const [loading, setLoading] = useState(true)
    /** Elimina la plantilla seleccionada */
    async function eliminarFun(id: number) {
        await eliminarRol(id)
        fetchPlantillas()
    }
    /* Obtiene las plantillas */
    const [plantillas, setPlantillas] = useState<any>([]);

    async function fetchPlantillas() {
        setPlantillas(await obtenerRoles());
    }

    useEffect(() => {
        fetchPlantillas()
        setLoading(false)
    }, [])

    /** Abre y cierra el modal */
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeOpenModal = () => setIsModalOpen(!isModalOpen);

    /** Abre cierra modal de editar */
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const closeOpenEditModal = () => setIsEditModalOpen(!isModalOpen);

    return (
        <div className="flex flex-col w-full h-screen overflow-auto p-6">
            {loading ? <PagesLoading></PagesLoading> :
                (
                    <>
                        {isModalOpen && <CreateRolModal closeEvent={closeOpenModal} />}
                        <div className="w-full">
                            <div className="flex space-x-4 mb-6 items-end">
                                <h3 className='text-2xl font-bold'>Plantillas</h3>
                                <ButtonTheme onClick={closeOpenModal}>
                                    <BriefcaseBusiness className="w-5 h-5 mr-2" />
                                    <span>Agregar</span>
                                    <span className="ml-2 bg-white bg-opacity-20 text-xs font-bold py-1 px-2 rounded-full">+</span>
                                </ButtonTheme>

                            </div>
                        </div>
                        <div className="space-y-4">
                            {plantillas.map((plantilla: any) => (
                                /*<PropuestaCard numero={propuesta.id} monto={propuesta.monto}></PropuestaCard>*/
                                <CustomItemCard
                                    key={plantilla.id}
                                    id={plantilla.id}
                                    nombre={plantilla.nombre}
                                    elementos={[plantilla.descripcion]}
                                    verHref='/plantillas/ver'
                                    editarHref={`roles/editar/${plantilla.id}`}
                                    IconCard={Briefcase}
                                    eliminarAction={eliminarFun}
                                ></CustomItemCard>
                            ))}
                        </div>
                    </>
                )
            }

        </div>
    )
}
